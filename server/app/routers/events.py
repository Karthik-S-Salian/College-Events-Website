from fastapi import Response,status,HTTPException,Depends,APIRouter, File, UploadFile,Form,Header
from .. import schemas,oauth2,models
from ..database import get_db
from sqlalchemy.orm import Session
from typing import List
from uuid import uuid4
from uuid import UUID
from pathlib import Path
from fastapi.responses import FileResponse
from sqlalchemy import func
from math import sqrt, pow

router=APIRouter(prefix="/events",tags=["Events"])


@router.get("/",response_model=List[schemas.EventCardResponse])
def get_all_events(latitude=Header(),longitude=Header(),db: Session = Depends(get_db),current_user:schemas.ResponseUser=Depends(oauth2.get_current_user)):
    if(latitude and longitude):
        events=db.query(
            models.Events,
            func.sqrt(func.pow((models.Events.latitude - latitude), 2) + func.pow((models.Events.longitude - longitude), 2)).label('distance')
            ).order_by('distance').all()
        events=[event[0] for event in events]
    else: 
        events=db.query(models.Events).all()
    return events
    


@router.get("/{id}",response_model=schemas.ResponseEvent)
def get_event(id:int,db: Session = Depends(get_db),current_user:schemas.ResponseUser=Depends(oauth2.get_current_user)):
    event=db.query(models.Events).filter(models.Events.id==id).first()
    if not event:
       raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                detail=f"user with id = {id} doesnot exit")

    return event

@router.post("/",status_code=status.HTTP_201_CREATED,response_model=schemas.ResponseEvent)
async def create_event(event:schemas.RequestEvent,db: Session = Depends(get_db),current_user:schemas.ResponseUser=Depends(oauth2.get_current_user)):
    event_data=event.dict()
    try:
        next((Path(__file__)/f"../../data/images/").glob(f"{event_data['poster']}.*"))
    except StopIteration:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="poster not found")

    event_data['poster']=str(event_data['poster'])
    new_event=models.Events(user_id=current_user.id,**event_data)
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event


@router.delete("/{id}",status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id:int,db: Session = Depends(get_db),current_user:schemas.ResponseUser=Depends(oauth2.get_current_user)):
    event_query=db.query(models.Events).filter(models.Events.id==id)
    if event_query.first()==None:
       raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                detail=f"post with id = {id} doesnot exit")
    if not current_user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                detail=f"not authorized to perform this action")
    event_query.delete(synchronize_session=False)
    db.commit()
    return


@router.put("/{id}",response_model=schemas.ResponseEvent)
def update_post_put(id:int,changed_event:schemas.RequestEvent,db: Session = Depends(get_db),current_user:schemas.ResponseUser=Depends(oauth2.get_current_user)):
    event_query=db.query(models.Events).filter(models.Events.id==id)
    event=event_query.first()
    if not event:
       raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                detail=f"post with id = {id} doesnot exit")
            
    if not current_user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                detail=f"not authorized to perform this action")

    event_data=changed_event.dict()
    try:
        next((Path(__file__)/f"../../data/images/").glob(f"{event_data['poster']}.*"))
    except StopIteration:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="poster not found")


    event_query.update(event_data,synchronize_session=False)
    db.commit()
    db.refresh(event)
    return event







