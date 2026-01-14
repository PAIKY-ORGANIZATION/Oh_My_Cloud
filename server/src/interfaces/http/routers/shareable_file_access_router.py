from fastapi import APIRouter

from interfaces.http.controllers.shareable_file_access.consume_shareable_file_access_controller import consume_shareable_file_access_controller
from interfaces.http.controllers.shareable_file_access.create_shareable_file_access_controller import create_shareable_file_access_controller

shareable_file_access_router = APIRouter(prefix="/shareable")


shareable_file_access_router.post("/create")(create_shareable_file_access_controller)
shareable_file_access_router.get("/{shareable_file_access_id}")(consume_shareable_file_access_controller) #! Uses POST because a body is needed.


@shareable_file_access_router.get("/protected/{shareable_file_access_id}")
def protected_shareable_file_access_controller():
    return "This doesn't exist yet. It needs to be an actual interactive page."