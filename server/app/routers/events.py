from fastapi import Response,status,HTTPException,Depends,APIRouter, File, UploadFile,Form
from .. import schemas,oauth2,models
from ..database import get_db
from sqlalchemy.orm import Session
from typing import List
from uuid import uuid4
from uuid import UUID
from pathlib import Path
from fastapi.responses import FileResponse

router=APIRouter(prefix="/events",tags=["Events"])


@router.get("/",response_model=List[schemas.EventCardResponse])
def get_all_events(db: Session = Depends(get_db),current_user:schemas.ResponseUser=Depends(oauth2.get_current_user)):
    events=db.query(models.Events).all()
    return events


@router.get("/{id}",response_model=schemas.Event)
def get_event(id:int,db: Session = Depends(get_db),current_user:schemas.ResponseUser=Depends(oauth2.get_current_user)):
    event=db.query(models.Events).filter(models.Events.id==id).first()
    if not event:
       raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                detail=f"user with id = {id} doesnot exit")

    return event


@router.post("/",status_code=status.HTTP_201_CREATED,response_model=schemas.Event)
async def create_event(event:schemas.RequestEvent = Depends(),db: Session = Depends(get_db),current_user:schemas.ResponseUser=Depends(oauth2.get_current_user)):
    event_data=event.dict()
    path=next((Path(__file__)/f"../../data/images/").glob(f"{event_data['poster']}.*"))

    if path is None:
        HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="poster not found")

    print(current_user)

    event_data['poster']=str(event_data['poster'])
    new_event=models.Events(user_id=current_user.id,**event_data)
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event








