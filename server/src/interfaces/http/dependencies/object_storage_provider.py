from interfaces.object_storage.object_storage_service import ObjectStorageClientService

object_storage_singleton = ObjectStorageClientService()

def get_object_storage_provider():
    return object_storage_singleton