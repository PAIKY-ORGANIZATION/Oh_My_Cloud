from datetime import datetime, timezone, timedelta
from interfaces.schemas.shareable_file_access.create_shareable_file_access_schemas import ExpirationTime


def time_formatter(expiration_time: ExpirationTime) -> datetime:
    now = datetime.now(timezone.utc)

    delta_unit_dict = {
        #$ `timedelta()` expects something like `timedelta(minutes=10)`.
        "m": "minutes",
        "h": "hours",
        "d": "days",
        "s": "seconds",
    }


    delta = timedelta(**{delta_unit_dict[expiration_time.unit]: expiration_time.amount}) #$ Will give something like `timedelta(minutes=10)`



    expires_at = now + delta
    
    return expires_at