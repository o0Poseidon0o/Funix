import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import sqlite3
import csv
from tkcalendar import DateEntry  # Import DateEntry widget from tkcalendar
import datetime

# Function to add baotri record
def add_baotri(entry_date, entry_content, pc_name_to_id, selected_pc_name, selected_reason):
    date_baotri_str = entry_date.get_date().strftime('%d/%m/%Y')  # Get date from DateEntry widget
    try:
        date_baotri = datetime.datetime.strptime(date_baotri_str, '%d/%m/%Y').date()
    except ValueError:
        messagebox.showerror("Error", "Ngày bảo trì không hợp lệ. Vui lòng nhập lại theo định dạng DD/MM/YYYY!")
        return

    content_baotri = entry_content.get("1.0", tk.END).strip()

    if date_baotri_str == "":
        messagebox.showerror("Error", "Ngày bảo trì không được để trống!")
        return

    pc_name = selected_pc_name.get()
    if pc_name not in pc_name_to_id:
        messagebox.showerror("Error", "Tên PC không hợp lệ!")
        return
    
    pc_id_baotri = pc_name_to_id[pc_name]

    reason = selected_reason.get()
    if reason not in ["thay thế", "sửa chữa", "gia hạn"]:
        messagebox.showerror("Error", "Lý do bảo trì không hợp lệ!")
        return

    conn = sqlite3.connect('ql_pc.db')
    c = conn.cursor()
    c.execute("INSERT INTO tb_baotri (date_baotri, content_baotri, id_pc, reason) VALUES (?, ?, ?, ?)", (date_baotri, content_baotri, pc_id_baotri, reason))
    conn.commit()
    conn.close()
    messagebox.showinfo("Success", "Đã thêm thông tin bảo trì mới thành công!")
    entry_date.set_date(datetime.date.today())  # Reset DateEntry widget to today's date
    entry_content.delete("1.0", tk.END)

def update_listbox(listbox_baotri):
    listbox_baotri.delete(0, tk.END)

    conn = sqlite3.connect('ql_pc.db')
    c = conn.cursor()
    c.execute("SELECT id_baotri, date_baotri, content_baotri, id_pc, reason FROM tb_baotri")
    rows = c.fetchall()
    conn.close()

    for row in rows:
        baotri_id = row[0]
        date_baotri_str = row[1]  # Get date as string from database

        # Ensure date is formatted as DD/MM/YYYY
        formatted_date = datetime.datetime.strptime(date_baotri_str, '%Y-%m-%d').strftime('%d/%m/%Y')

        listbox_baotri.insert(tk.END, f"{baotri_id} - Ngày bảo trì: {formatted_date} - PC ID: {row[3]} - Lý do: {row[4]}")




# Function to delete selected baotri record
def delete_baotri(listbox_baotri):
    selected_indices = listbox_baotri.curselection()
    if not selected_indices:
        messagebox.showerror("Error", "Vui lòng chọn một thông tin bảo trì để xóa!")
        return
    
    for idx in selected_indices:
        baotri_info = listbox_baotri.get(idx)
        baotri_id = baotri_info.split()[0]
        
        conn = sqlite3.connect('ql_pc.db')
        c = conn.cursor()
        c.execute("DELETE FROM tb_baotri WHERE id_baotri = ?", (baotri_id,))
        conn.commit()
        conn.close()
        
        messagebox.showinfo("Success", f"Đã xóa thông tin bảo trì có ID {baotri_id} thành công!")
    
    update_listbox(listbox_baotri)

# Function to search for baotri record by PC name
def search_baotri_by_pc(pc_name_combobox, baotri_details, listbox_baotri):
    pc_name = pc_name_combobox.get()
    conn = sqlite3.connect('ql_pc.db')
    c = conn.cursor()
    c.execute("SELECT id_baotri, date_baotri, content_baotri, tb_baotri.id_pc, reason FROM tb_baotri INNER JOIN tb_pc ON tb_baotri.id_pc = tb_pc.id_pc WHERE tb_pc.ten_pc LIKE ?", (f'%{pc_name}%',))
    result = c.fetchall()
    conn.close()

    if result:
        baotri_details.delete(1.0, tk.END)
        baotri_id, baotri_date, baotri_content, baotri_pc_id, baotri_reason = result[0]
        formatted_date = baotri_date.strftime('%d/%m/%Y')
        baotri_details.insert(tk.END, f"ID: {baotri_id}\nNgày bảo trì: {formatted_date}\nNội dung: {baotri_content}\nPC ID: {baotri_pc_id}\nLý do: {baotri_reason}\n")

        for index, item in enumerate(listbox_baotri.get(0, tk.END)):
            if baotri_id in item:
                listbox_baotri.selection_clear(0, tk.END)
                listbox_baotri.selection_set(index)
                listbox_baotri.see(index)
                break
    else:
        messagebox.showinfo("Search Result", "Không tìm thấy thông tin bảo trì phù hợp.")
        baotri_details.delete(1.0, tk.END)

# Function to import baotri records from CSV
def import_from_csv(filedialog, add_baotri_from_csv, listbox_baotri):
    file_path = filedialog.askopenfilename(filetypes=[("CSV Files", "*.csv")])
    if file_path:
        add_baotri_from_csv(file_path, listbox_baotri)

# Function to add baotri records from CSV
def add_baotri_from_csv(file_path, listbox_baotri):
    try:
        conn = sqlite3.connect('ql_pc.db')
        c = conn.cursor()

        with open(file_path, newline='', encoding='utf-8') as csvfile:
            csvreader = csv.reader(csvfile)
            next(csvreader)  # Skip header row if exists

            for row in csvreader:
                date_baotri, content_baotri, pc_id_baotri, reason = row
                pc_id_baotri = int(pc_id_baotri.strip())
                c.execute("INSERT INTO tb_baotri (date_baotri, content_baotri, id_pc, reason) VALUES (?, ?, ?, ?)", (date_baotri.strip(), content_baotri.strip(), pc_id_baotri, reason.strip()))

        conn.commit()
        conn.close()
        messagebox.showinfo("Success", "Đã thêm thông tin bảo trì từ CSV thành công!")
        update_listbox(listbox_baotri)

    except sqlite3.Error as e:
        messagebox.showerror("Error", f"Lỗi khi thêm thông tin bảo trì từ CSV: {e}")

    except Exception as e:
        messagebox.showerror("Error", f"Lỗi không xác định: {e}")

# Function to display baotri management interface
def show_baotri_management(root, baotri_management_frame, pc_management_frame):
    pc_management_frame.pack_forget()
    baotri_management_frame.pack()

    label_baotri = tk.Label(baotri_management_frame, text="Quản lý Bảo trì", font=("Times New Roman", 28))
    label_baotri.grid(row=0, column=0, padx=10, pady=10)

    label_add_baotri = tk.Label(baotri_management_frame, text="Thêm thông tin bảo trì")
    label_add_baotri.grid(row=1, column=0, padx=10, pady=5)

    # DateEntry widget for selecting date
    entry_date = DateEntry(baotri_management_frame, width=12, background='darkblue', foreground='white', borderwidth=2)
    entry_date.grid(row=1, column=1, padx=10, pady=5)

    entry_content = tk.Text(baotri_management_frame, width=40, height=5)
    entry_content.grid(row=1, column=2, padx=10, pady=5)

    # Fetch PC names and IDs from database to populate the combobox
    conn = sqlite3.connect('ql_pc.db')
    c = conn.cursor()
    c.execute("SELECT id_pc, ten_pc FROM tb_pc")
    pcs = c.fetchall()
    conn.close()

    pc_name_to_id = {ten_pc: id_pc for id_pc, ten_pc in pcs}
    pc_names = list(pc_name_to_id.keys())

    # Combobox for selecting PC name
    selected_pc_name = tk.StringVar(baotri_management_frame)
    pc_name_combobox = ttk.Combobox(baotri_management_frame, textvariable=selected_pc_name, values=pc_names)
    pc_name_combobox.set('')  # Clear default selection
    pc_name_combobox.grid(row=1, column=3, padx=10, pady=5)

    # Combobox for selecting reason
    selected_reason = tk.StringVar(baotri_management_frame)
    reason_combobox = ttk.Combobox(baotri_management_frame, textvariable=selected_reason, values=["thay thế", "sửa chữa", "gia hạn"])
    reason_combobox.set('')  # Clear default selection
    reason_combobox.grid(row=1, column=4, padx=10, pady=5)

    btn_add_baotri = tk.Button(baotri_management_frame, text="Thêm thông tin bảo trì", command=lambda: add_baotri(entry_date, entry_content, pc_name_to_id, selected_pc_name, selected_reason), bg="Green", fg="white",width=20, height=2, borderwidth=2, relief="raised")
    btn_add_baotri.grid(row=2, column=2, padx=10, pady=5)

    listbox_baotri = tk.Listbox(baotri_management_frame, width=80, height=15)
    listbox_baotri.grid(row=3, column=0, columnspan=6, padx=10, pady=10)

    btn_update_list_baotri = tk.Button(baotri_management_frame, text="Cập nhật danh sách", command=lambda: update_listbox(listbox_baotri), bg="#008b8b", fg="white",width=15, height=2, borderwidth=2, relief="raised")
    btn_update_list_baotri.grid(row=4, column=1, padx=5, pady=5)

    btn_delete_baotri = tk.Button(baotri_management_frame, text="Xóa thông tin bảo trì", command=lambda: delete_baotri(listbox_baotri), bg="Red", fg="white",width=20, height=2, borderwidth=2, relief="raised")
    btn_delete_baotri.grid(row=4, column=2, padx=5, pady=5)

    entry_search_baotri = tk.Entry(baotri_management_frame)
    entry_search_baotri.grid(row=5, column=1, padx=10, pady=5)

    btn_search_baotri = tk.Button(baotri_management_frame, text="Tìm kiếm bảo trì theo PC", command=lambda: search_baotri_by_pc(pc_name_combobox, entry_content, listbox_baotri), bg="#00bfff", fg="white",width=20, height=2, borderwidth=2, relief="raised")
    btn_search_baotri.grid(row=5, column=2, padx=10, pady=5)

    btn_import_csv_baotri = tk.Button(baotri_management_frame, text="Nhập từ CSV", command=lambda: import_from_csv(filedialog, add_baotri_from_csv, listbox_baotri))
    btn_import_csv_baotri.grid(row=6, column=2, padx=10, pady=5)

# Main function to initialize the application
def main():
    root = tk.Tk()
    root.title("Quản lý PC và Người dùng")

    pc_management_frame = tk.Frame(root)
    baotri_management_frame = tk.Frame(root)

    show_baotri_management(root, baotri_management_frame, pc_management_frame)

    root.mainloop()

if __name__ == "__main__":
    main()
