
from interfaces.jwt_interface.jwt_service import JWTService


jwt_manager_singleton = JWTService()

def get_jwt_provider():
    return jwt_manager_singleton
