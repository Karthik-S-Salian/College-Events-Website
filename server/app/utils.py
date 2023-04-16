from passlib.context import CryptContext

password_context=CryptContext(schemes="bcrypt",deprecated="auto")

def hash(password:str):
    return password_context.hash(password)

def verify_password(login_password,hashed_password):
    return password_context.verify(login_password,hashed_password)