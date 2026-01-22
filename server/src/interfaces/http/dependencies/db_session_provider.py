





#% USE THIS PATTERN FOR ANY DEPENDENCY THAT NEEDS TO BE A CONTEXT MANAGER.
#% USE THIS PATTERN FOR ANY DEPENDENCY THAT NEEDS TO BE A CONTEXT MANAGER.
#% USE THIS PATTERN FOR ANY DEPENDENCY THAT NEEDS TO BE A CONTEXT MANAGER.
#% USE THIS PATTERN FOR ANY DEPENDENCY THAT NEEDS TO BE A CONTEXT MANAGER.
#% USE THIS PATTERN FOR ANY DEPENDENCY THAT NEEDS TO BE A CONTEXT MANAGER.
#% USE THIS PATTERN FOR ANY DEPENDENCY THAT NEEDS TO BE A CONTEXT MANAGER.
#% USE THIS PATTERN FOR ANY DEPENDENCY THAT NEEDS TO BE A CONTEXT MANAGER.
#% USE THIS PATTERN FOR ANY DEPENDENCY THAT NEEDS TO BE A CONTEXT MANAGER.
#% USE THIS PATTERN FOR ANY DEPENDENCY THAT NEEDS TO BE A CONTEXT MANAGER.
#% USE THIS PATTERN FOR ANY DEPENDENCY THAT NEEDS TO BE A CONTEXT MANAGER.
#% USE THIS PATTERN FOR ANY DEPENDENCY THAT NEEDS TO BE A CONTEXT MANAGER.
#% USE THIS PATTERN FOR ANY DEPENDENCY THAT NEEDS TO BE A CONTEXT MANAGER.
#% USE THIS PATTERN FOR ANY DEPENDENCY THAT NEEDS TO BE A CONTEXT MANAGER.
#% USE THIS PATTERN FOR ANY DEPENDENCY THAT NEEDS TO BE A CONTEXT MANAGER.

from interfaces.db.db_session_maker import AsyncSessionMaker


# @asynccontextmanager  #- FastAPI uses this decorator to turn the dependency into a context manager.
async def get_db_session_provider():
    session = AsyncSessionMaker()
    #% FastAPI follows this rule:
        #$ "FastAPI uses introspection to detect that a dependency contains a yield inside a try / finally (or try / except / finally), FastAPI turns that dependency into a context manager."

    #% Under the hood, it will call .__anext__() on it to get the session and pass it to all the downstream dependencies. 
    #% When the handler ends , the "finally" block naturally runs.

    #% If an exception is raised, it will be thrown 

    try:
        yield session

    except Exception as e:
        await session.rollback()
        raise e #$ This bubbles up to all the exception handlers.

    finally:
        await session.close()



#% This pseudo-code shows how FastAPI calls your handler inside of the context manager that it builds out of your dependency function.
# with gen as g:
#     try:
#         db_dependency = await g.__anext__()
#         await handler(db_dependency)
#     except Exception as e:
#         gen.athrow(e)
