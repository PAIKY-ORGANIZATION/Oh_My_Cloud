

def write_test_files(size_megabytes: int):

    size_bytes = size_megabytes * 1024 * 1024

    with open(f'test_upload_files/test_file_{size_megabytes}mb.txt', 'wb') as f:
        f.write(b'0' * size_bytes)



size_megabytes = input('Enter the size of the test file in megabytes: ')


write_test_files(int(size_megabytes))