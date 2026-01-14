from fastapi import APIRouter
from interfaces.http.controllers.users.auth_check import auth_check_controller
from interfaces.http.controllers.users.create_user_controller import create_user_controller
from interfaces.http.controllers.users.delete_user_controller import delete_user_controller
from interfaces.http.controllers.users.login_controller import login_controller




users_router = APIRouter(prefix='/users')

users_router.post("/create")(create_user_controller)
users_router.post("/login")(login_controller)
users_router.get("/auth-check")(auth_check_controller)
users_router.delete("/delete")(delete_user_controller)