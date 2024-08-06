import os
import shutil

def readInfectedFilesList(file_path):
    with open(file_path, 'r') as file:
        infected_files = file.readlines()
    # Loại bỏ ký tự xuống dòng và khoảng trắng ở đầu/cuối
    infected_files = [file.strip() for file in infected_files]
    return infected_files

def moveInfectedFiles(infected_files, destination_dir):
    if not os.path.exists(destination_dir):
        os.makedirs(destination_dir)
    
    for file_path in infected_files:
        if os.path.exists(file_path):
            file_name = os.path.basename(file_path)
            dest_file_path = os.path.join(destination_dir, file_name)
            
            try:
                shutil.move(file_path, dest_file_path)
                print(f"Moved {file_path} to {dest_file_path}")
            except IOError as e:
                print(f"Unable to move {file_path}: {e}")
        else:
            print(f"File {file_path} does not exist!")

def main():
    # Đường dẫn đến tệp tin infectedFilesList.txt
    infected_files_list_path = 'infectedFilesList.txt'
    
    # Đường dẫn đến thư mục đích để di chuyển các tệp tin bị nhiễm
    destination_dir = r"C:\InfectedFiles"

    # Đọc danh sách các tệp tin bị nhiễm từ tệp tin
    infected_files = readInfectedFilesList(infected_files_list_path)
    
    # Di chuyển các tệp tin bị nhiễm đến thư mục đích
    moveInfectedFiles(infected_files, destination_dir)

if __name__ == "__main__":
    main()
