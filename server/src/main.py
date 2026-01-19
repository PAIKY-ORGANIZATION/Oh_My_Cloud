

import os
from typing import cast
from bootstrap_env import load_env_from_local_files, validate_env




load_env_from_local_files() #* Loading the env variables from the local files.

validate_env() #* Making sure all the required env variables are loaded.


import uvicorn
from interfaces.db.emit_base import emit_base



if __name__ == "__main__":

    emit_base()
    

    reload = True if os.environ.get('DEV') == "1" else False

    uvicorn.run(
        app="interfaces.http.app:app",
        port=3001,
        reload=reload,
        host="0.0.0.0" #$ For Docker the network interface is usually "172.20.0.0/8"
    )