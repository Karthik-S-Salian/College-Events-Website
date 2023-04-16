from .database import Base
from sqlalchemy import Boolean, Column,Integer, String,ForeignKey
from sqlalchemy.sql.sqltypes import TIMESTAMP,DATETIME
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship



class Events(Base):
    __tablename__="posts"
    id =Column(Integer,primary_key=True)
    title=Column(String,nullable=False)
    description=Column(String)
    poster=Column(String)
    location=Column(String)
    registration_link=Column(String)
    publish=Column(Boolean,server_default="FALSE",nullable=False)
    created_at=Column(TIMESTAMP(timezone=True),nullable=False,server_default=text('CURRENT_TIMESTAMP'))
    timings=Column(TIMESTAMP(timezone=True))
    user_id=Column(Integer,ForeignKey("users.id",ondelete="CASCADE"),nullable=False)
    owner=relationship("User")


class User(Base):
    __tablename__="users"
    id =Column(Integer,primary_key=True)
    name=Column(String,nullable=False)
    email=Column(String,nullable=False,unique=True)
    password=Column(String,nullable=False)
    is_admin=Column(Boolean,server_default="FALSE",nullable=False)
    created_at=Column(TIMESTAMP(timezone=True),nullable=False,server_default=text('CURRENT_TIMESTAMP'))