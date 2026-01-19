# Running the application

### Running locally
(Loads environment variables from ./config/local.env and ./config/shared.env)
`ENVIRONMENT=local python3 `

### Running in docker (locally, URLs often set to "localhost")
(Loads environment variables from ./config/docker_local.env and ./config/shared.env)
`ENVIRONMENT=docker_local`


### Production vs Development mode
To choose between reload=True/False for `uvicorn.run()` use:
- `DEV=1`     for   reload=True
- `DEV=<Anything else>` for reload=False
You explicitly  need to pass the  `DEV` env.


##  Run example
`
    DEV=0 ENVIRONMENT=docker_local python3  src/main.py
` 





# Top level packages 
    Will be declared in requirements.in 

    Use pip to install  "pip-tools"

    Compile a "lock" file with `pip-compile` (requirements.txt will be issued as the lock file)

    Now simple install  the project packages with `pip install  -r requirements.txt`




