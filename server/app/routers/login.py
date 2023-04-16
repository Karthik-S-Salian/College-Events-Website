from tokenize import Token
from fastapi import status,HTTPException,Depends,APIRouter
from .. import models,utils,oauth2,schemas
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from ..database import get_db
from sqlalchemy.orm import Session


router=APIRouter(prefix="/login",tags=["Authentication"])

@router.post("/",response_model=schemas.Token)
def login(user_credentials:OAuth2PasswordRequestForm=Depends(),db:Session=Depends(get_db)):

    user=db.query(models.User).filter(models.User.email==user_credentials.username).first()
    print(user)

    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="INVALID CREDENTIALS")
    
    if not utils.verify_password(user_credentials.password,user.password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="INVALID CREDENTIALS")

    access_token=oauth2.create_access_token(data={"user_id":user.id})
    return {"access_token":access_token,"token_type":"bearer"}


@router.post("/signin",status_code=status.HTTP_201_CREATED)
def create_user(user:schemas.CreateUser,db: Session = Depends(get_db)):
    
    user.password=utils.hash(user.password)
    new_user=models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    access_token=oauth2.create_access_token(data={"user_id":new_user.id})
    return {"access_token":access_token,"token_type":"bearer"}

@router.get("/verify",status_code=status.HTTP_200_OK)
def verify_user(db: Session = Depends(get_db),current_user:schemas.ResponseUser=Depends(oauth2.get_current_user)):
    if current_user:
        access_token=oauth2.create_access_token(data={"user_id":current_user.id})
        return {"access_token":access_token,"token_type":"bearer"}


@router.get("/test",status_code=status.HTTP_200_OK)
def get_all_users(db: Session = Depends(get_db)):
    return {"users":db.query(models.User).all()}


        


