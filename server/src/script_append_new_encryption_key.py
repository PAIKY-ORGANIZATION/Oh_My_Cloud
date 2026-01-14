
import os



shared_env_variables_file_name = 'shared.env'

binary_key = os.urandom(32) #$ This will actually be "10011011010010100101" etc... When printed you get something like "b'\x9bJ\x95'" but that's just a representation.

key_hex_string = binary_key.hex() #$ This is an actual hex string like "9b4a95" etc...


with open(f'config/{shared_env_variables_file_name}', 'a') as f:
    f.write(f'ENCRYPTION_KEY={key_hex_string}\n')