

import asyncio
from bcrypt import hashpw, checkpw, gensalt
from lib.thread_executors import thread_pool



#% Even though bcrypt is CPU bound (hashing takes a full CPU core), it's written so that it the GIL is released so you don't have to spawn extra Processes. Multithreading is fine here without spawning extra Processes. Use extra Processes only if the CPU work does take the GIL.


class BcryptHasherService:


    #* ===  Hashing ===

    def _hash_password_sync(self, password: str) -> str:
        return hashpw(password=password.encode("utf-8"), salt=gensalt()).decode("utf-8")


    async def hash_password_async (self, password: str) -> str:
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(thread_pool, self._hash_password_sync, password)





    #* ===  Verifying ===

    def _verify_password_sync(self, unhashed_password: str, hashed_password: str):
        return checkpw(password=unhashed_password.encode('utf-8'), hashed_password=hashed_password.encode('utf-8'))

    async def verify_password_async (self, *, unhashed_password: str, hashed_password: str) -> bool:
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(thread_pool, self._verify_password_sync, unhashed_password, hashed_password)


