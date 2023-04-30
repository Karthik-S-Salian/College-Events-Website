from fastapi import Response,status,HTTPException,Depends,APIRouter, File, UploadFile,Form
from .. import schemas,oauth2,models
from uuid import uuid4
from uuid import UUID
from pathlib import Path
from fastapi.responses import FileResponse

router=APIRouter(prefix="/images",tags=["Images"])


@router.get("/{filename}",status_code=status.HTTP_200_OK)
def get_image(filename:UUID):
    path=next((Path(__file__)/f"../../data/images/").glob(f"{filename}.*"))

    if path.exists():
        return FileResponse(path)
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="image not found")

@router.post("/",status_code=status.HTTP_202_ACCEPTED)
async def upload_image(file: UploadFile):
    file_name=uuid4()
    file_type=file.filename.split('.')[-1]

    if not file_type in ["png","jpg","jpeg","avif","webp"]:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"invalid file type")

    with open((Path(__file__)/f"../../data/images/{file_name}.{file_type}").absolute(),'wb') as fh:
        fh.write(await file.read())
    return {"filename": file_name}