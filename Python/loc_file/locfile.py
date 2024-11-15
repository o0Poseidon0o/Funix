import os
import shutil
from tkinter import Tk
from tkinter.filedialog import askdirectory

# Tạo một cửa sổ Tkinter ẩn
Tk().withdraw()

# Yêu cầu người dùng chọn thư mục nguồn
source_dir = askdirectory(title="Chọn thư mục nguồn chứa các file") 
if not source_dir:
    print("Bạn chưa chọn thư mục nguồn.")
    exit()

# Yêu cầu người dùng chọn thư mục đích
destination_dir = askdirectory(title="Chọn thư mục đích để lưu trữ các file")
if not destination_dir:
    print("Bạn chưa chọn thư mục đích.")
    exit()

# Tạo thư mục đích nếu chưa tồn tại
os.makedirs(destination_dir, exist_ok=True)

# Duyệt qua tất cả các thư mục và thư mục con trong thư mục nguồn
for root, dirs, files in os.walk(source_dir):
    for filename in files:
        # Kiểm tra nếu tên file chứa "DATATOWA01"
        if "DATATOWA01" in filename:
            # Đường dẫn đầy đủ đến file nguồn và đích
            source_file = os.path.join(root, filename)
            destination_file = os.path.join(destination_dir, filename)
            
            # Di chuyển file vào thư mục đích
            shutil.move(source_file, destination_file)
            print(f"Đã di chuyển file: {source_file} -> {destination_file}")

print("Đã di chuyển tất cả các file chứa 'DATATOWA01' vào thư mục đích.")
