import pandas as pd
from tkinter import Tk, filedialog, messagebox

def select_file(title):
    root = Tk()
    root.withdraw()  # Ẩn cửa sổ Tkinter chính
    file_path = filedialog.askopenfilename(title=title, filetypes=[("Excel files", "*.xlsx")])
    root.destroy()
    return file_path

def filter_itemcode():
    file1_path = select_file("Chọn file Excel chứa itemcode cần lọc")
    if not file1_path:
        messagebox.showerror("Lỗi", "Chưa chọn file đầu tiên.")
        return

    file2_path = select_file("Chọn file Excel chứa itemcode để đối chiếu")
    if not file2_path:
        messagebox.showerror("Lỗi", "Chưa chọn file thứ hai.")
        return

    try:
        df1 = pd.read_excel(file1_path)
        df2 = pd.read_excel(file2_path)
    except Exception as e:
        messagebox.showerror("Lỗi", f"Không thể đọc file Excel: {str(e)}")
        return

    try:
        # Kiểm tra sự tồn tại của cột Itemcode trong cả hai file
        if 'Itemcode' not in df1.columns:
            raise KeyError("Cột 'Itemcode' không tồn tại trong file đầu tiên.")
        if 'Itemcode' not in df2.columns:
            raise KeyError("Cột 'Itemcode' không tồn tại trong file thứ hai.")

        # Lấy cột itemcode từ cả hai file
        itemcode_file1 = df1['Itemcode']
        itemcode_file2 = df2['Itemcode']

        # Lọc các itemcode trong file2 không có trong file1 và giữ lại toàn bộ thông tin từ file2
        result_df = df2[~df2['Itemcode'].isin(itemcode_file1)]
        
    except KeyError as e:
        messagebox.showerror("Lỗi", str(e))
        return

    output_path = filedialog.asksaveasfilename(defaultextension=".xlsx", filetypes=[("Excel files", "*.xlsx")], title="Lưu file kết quả")
    if not output_path:
        messagebox.showerror("Lỗi", "Chưa chọn nơi lưu file.")
        return

    try:
        result_df.to_excel(output_path, index=False)
        messagebox.showinfo("Thành công", f"File kết quả đã được lưu tại: {output_path}")
    except Exception as e:
        messagebox.showerror("Lỗi", f"Không thể lưu file Excel: {str(e)}")

if __name__ == "__main__":
    filter_itemcode()
