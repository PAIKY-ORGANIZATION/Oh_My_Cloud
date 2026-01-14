# Running the application

### Running locally
(Loads environment variables from ./config/local.env and ./config/shared.env)

    `
        ENVIRONMENT=local python3 ./src/main.py    
    `

### Running with docker compose
No need to specify an ENVIRONMENT, the ENV's are loaded on the compose (backend > env_file)

    `
        python3 ./src/main.py
    `

# Top level packages 
    Will be declared in requirements.in 

    Use pip to install  "pip-tools"

    Compile a "lock" file with `pip-compile` (requirements.txt will be issued as the lock file)

    Now simple install  the project packages with `pip install  -r requirements.txt`




