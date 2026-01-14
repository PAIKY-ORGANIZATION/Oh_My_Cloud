

import os
from bootstrap_env import load_env_from_local_files, validate_env




if os.environ.get('ENVIRONMENT') == "local": 
    #$ For docker, we will load the env files from the compose script to avoid pasting the env files in the Docker image.
    load_env_from_local_files() #* Loading the env variables from the local files.

validate_env() #* Making sure all the required env variables are loaded.


import uvicorn
from interfaces.db.emit_base import emit_base



if __name__ == "__main__":

    emit_base()
    
    uvicorn.run(
        app="interfaces.http.app:app",
        port=3001,
        reload=True,
        host="0.0.0.0" #$ For Docker the network interface is usually "172.20.0.0/8"
    )