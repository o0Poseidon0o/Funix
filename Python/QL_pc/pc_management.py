import tkinter as tk
from tkinter import messagebox, filedialog
import sqlite3
import csv

def add_pc(entry_pc, entry_id_add, listbox_pc):
    ten_pc = entry_pc.get()
    if ten_pc.strip() == "":
        messagebox.showerror("Error", "Tên PC không được để trống!")
        return
    
    pc_id = entry_id_add.get()
    try:
        pc_id = int(pc_id)
    except ValueError:
        messagebox.showerror("Error", "ID PC phải là số nguyên!")
        return
    
    conn = sqlite3.connect('ql_pc.db')
    c = conn.cursor()
    c.execute("SELECT * FROM tb_pc WHERE id_pc = ?", (pc_id,))
    result = c.fetchone()
    
    if result:
        messagebox.showerror("Error", f"ID PC {pc_id} đã tồn tại. Vui lòng nhập ID khác.")
    else:
        c.execute("INSERT INTO tb_pc (id_pc, ten_pc) VALUES (?, ?)", (pc_id, ten_pc))
        conn.commit()
        conn.close()
        messagebox.showinfo("Success", "Đã thêm PC mới thành công!")
        entry_pc.delete(0, tk.END)
        entry_id_add.delete(0, tk.END)
        update_listbox(listbox_pc)

def update_listbox(listbox_pc):
    listbox_pc.delete(0, tk.END)

    conn = sqlite3.connect('ql_pc.db')
    c = conn.cursor()
    c.execute("SELECT * FROM tb_pc")
    rows = c.fetchall()
    conn.close()

    for row in rows:
        listbox_pc.insert(tk.END, f"{row[0]} - {row[1]}")

def delete_pc(listbox_pc):
    selected_index = listbox_pc.curselection()
    if not selected_index:
        messagebox.showerror("Error", "Vui lòng chọn một PC để xóa!")
        return
    
    pc_info = listbox_pc.get(selected_index)
    pc_id = pc_info.split()[0]
    
    conn = sqlite3.connect('ql_pc.db')
    c = conn.cursor()
    c.execute("DELETE FROM tb_pc WHERE id_pc = ?", (pc_id,))
    conn.commit()
    conn.close()
    messagebox.showinfo("Success", f"Đã xóa PC có ID {pc_id} thành công!")
    update_listbox(listbox_pc)

def update_pc(listbox_pc, entry_new_name):
    selected_index = listbox_pc.curselection()
    if not selected_index:
        messagebox.showerror("Error", "Vui lòng chọn một PC để cập nhật!")
        return
    
    pc_info = listbox_pc.get(selected_index)
    pc_id = pc_info.split()[0]
    new_ten_pc = entry_new_name.get()

    conn = sqlite3.connect('ql_pc.db')
    c = conn.cursor()
    c.execute("UPDATE tb_pc SET ten_pc = ? WHERE id_pc = ?", (new_ten_pc, pc_id))
    conn.commit()
    conn.close()
    messagebox.showinfo("Success", f"Cập nhật tên PC có ID {pc_id} thành công!")
    update_listbox(listbox_pc)
    entry_new_name.delete(0, tk.END)

def search_pc(entry_search, pc_details, listbox_pc, entry_update_id):
    ten_pc = entry_search.get()
    conn = sqlite3.connect('ql_pc.db')
    c = conn.cursor()
    c.execute("SELECT * FROM tb_pc WHERE ten_pc LIKE ?", (f'%{ten_pc}%',))
    result = c.fetchall()
    conn.close()
    
    if result:
        pc_details.delete(1.0, tk.END)
        pc_id, pc_name = result[0]
        pc_details.insert(tk.END, f"ID: {pc_id}\nTên PC: {pc_name}\n")
        
        entry_update_id.config(state=tk.NORMAL)
        entry_update_id.delete(0, tk.END)
        entry_update_id.insert(0, pc_id)
        entry_update_id.config(state='disabled')

        for index, item in enumerate(listbox_pc.get(0, tk.END)):
            if pc_name in item:
                listbox_pc.selection_clear(0, tk.END)
                listbox_pc.selection_set(index)
                listbox_pc.see(index)
                break
    else:
        messagebox.showinfo("Search Result", "Không tìm thấy PC phù hợp.")
        pc_details.delete(1.0, tk.END)

def import_from_csv(filedialog, add_pcs_from_csv):
    file_path = filedialog.askopenfilename(filetypes=[("CSV Files", "*.csv")])
    if file_path:
        add_pcs_from_csv(file_path)

def add_pcs_from_csv(file_path, listbox_pc):
    try:
        conn = sqlite3.connect('ql_pc.db')
        c = conn.cursor()

        with open(file_path, newline='', encoding='utf-8') as csvfile:
            csvreader = csv.reader(csvfile)
            for row in csvreader:
                pc_id, ten_pc = row
                pc_id = int(pc_id.strip())
                c.execute("INSERT INTO tb_pc (id_pc, ten_pc) VALUES (?, ?)", (pc_id, ten_pc.strip()))

        conn.commit()
        conn.close()
        messagebox.showinfo("Success", "Đã thêm PCs từ CSV thành công!")
        update_listbox(listbox_pc)

    except sqlite3.Error as e:
        messagebox.showerror("Error", f"Lỗi khi thêm PCs từ CSV: {e}")

    except Exception as e:
        messagebox.showerror("Error", f"Lỗi không xác định: {e}")


def show_pc_management(root, pc_management_frame, user_management_frame, baotri_management_frame):
    pc_management_frame.pack()
    user_management_frame.pack_forget()
    baotri_management_frame.pack_forget()


    # Labels and entry widgets for adding PC
    label_pc = tk.Label(pc_management_frame, text="Quản lý PC", font=("Times New Roman", 28))
    label_pc.grid(row=0, column=1, padx=10, pady=10,sticky="nsew")

    label_add_pc = tk.Label(pc_management_frame, text="Tên PC")
    label_add_pc.grid(row=1, column=0, padx=10, pady=5)

    entry_pc = tk.Entry(pc_management_frame)
    entry_pc.grid(row=1, column=1, padx=10, pady=5)
    
    label_add_pc = tk.Label(pc_management_frame, text="ID PC")
    label_add_pc.grid(row=2, column=0, padx=10, pady=5)

    entry_id_add = tk.Entry(pc_management_frame)
    entry_id_add.grid(row=2, column=1, padx=10, pady=5)

    btn_delete_pc = tk.Button(pc_management_frame, text="Xóa PC", command=lambda: delete_pc(listbox_pc), bg="Red", fg="white",width=15, height=2, borderwidth=2, relief="raised")
    btn_delete_pc.grid(row=2, column=2, padx=10, pady=5)


    btn_add_pc = tk.Button(pc_management_frame, text="Thêm PC", command=lambda: add_pc(entry_pc, entry_id_add, listbox_pc), bg="Green", fg="white",width=15, height=2, borderwidth=2, relief="raised")
    btn_add_pc.grid(row=1, column=2, padx=10, pady=5)

    listbox_pc = tk.Listbox(pc_management_frame, width=50, height=10)
    listbox_pc.grid(row=3, column=0, columnspan=4, padx=10, pady=10)

    btn_update_list_pc = tk.Button(pc_management_frame, text="Cập nhật danh sách", command=lambda: update_listbox(listbox_pc), bg="#008b8b", fg="white",width=15, height=2, borderwidth=2, relief="raised")
    btn_update_list_pc.grid(row=4, column=1, padx=10, pady=5)

 
    entry_new_name = tk.Entry(pc_management_frame)
    entry_new_name.grid(row=6, column=0, padx=10, pady=5)

    btn_update_pc = tk.Button(pc_management_frame, text="Cập nhật PC", command=lambda: update_pc(listbox_pc, entry_new_name), bg="#ffa07a", fg="white",width=15, height=2, borderwidth=2, relief="raised")
    btn_update_pc.grid(row=6, column=1, padx=10, pady=5)

    entry_search_pc = tk.Entry(pc_management_frame)
    entry_search_pc.grid(row=5, column=0, padx=10, pady=5)

    btn_search_pc = tk.Button(pc_management_frame, text="Tìm kiếm PC", command=lambda: search_pc(entry_search_pc, pc_details, listbox_pc, entry_update_id), bg="#00bfff", fg="white",width=15, height=2, borderwidth=2, relief="raised")
    btn_search_pc.grid(row=5, column=1, padx=10, pady=5)

    pc_details = tk.Text(pc_management_frame, width=50, height=5)
    pc_details.grid(row=7, column=0, columnspan=4, padx=10, pady=10)

    entry_update_id = tk.Entry(pc_management_frame, state='disabled')
    entry_update_id.grid(row=8, column=1, padx=10, pady=5)

    btn_import_csv_pc = tk.Button(pc_management_frame, text="Nhập từ CSV", command=lambda: import_from_csv(filedialog, lambda file_path: add_pcs_from_csv(file_path, listbox_pc)), bg="#228b22", fg="white",width=15, height=2, borderwidth=2, relief="raised")
    btn_import_csv_pc.grid(row=9, column=1, padx=10, pady=5)
