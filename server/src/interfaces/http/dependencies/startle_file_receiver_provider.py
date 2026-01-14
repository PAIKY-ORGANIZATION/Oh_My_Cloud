from interfaces.file_handling.startle_file_receiver_service import StartleFileReceiverService


startle_file_receiver_singleton = StartleFileReceiverService()

def get_startle_file_receiver_provider():
    return startle_file_receiver_singleton

    