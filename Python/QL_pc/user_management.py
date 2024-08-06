import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import sqlite3
import pandas as pd

def add_user(entry_user, pc_name_to_id, selected_pc_name, treeview_user, entry_user_id, entry_tk_domain, entry_mail, entry_password):
    ten_user = entry_user.get().strip()
    user_id = entry_user_id.get().strip()
    tk_domain = entry_tk_domain.get().strip()
    mail = entry_mail.get().strip()
    password = entry_password.get().strip()

    if not ten_user:
        messagebox.showerror("Error", "Tên Người dùng không được để trống!")
        return
    
    if not user_id:
        messagebox.showerror("Error", "ID Người dùng không được để trống!")
        return

    try:
        user_id = int(user_id)
    except ValueError:
        messagebox.showerror("Error", "ID Người dùng phải là số nguyên!")
        return

    # Check if the entered user_id already exists
    conn = sqlite3.connect('ql_pc.db')
    c = conn.cursor()
    c.execute("SELECT * FROM tb_users WHERE id_user = ?", (user_id,))
    existing_user = c.fetchone()
    
    if existing_user:
        messagebox.showerror("Error", f"ID Người dùng {user_id} đã tồn tại. Vui lòng chọn ID khác!")
        conn.close()
        return

    pc_name = selected_pc_name.get()
    if pc_name not in pc_name_to_id:
        messagebox.showerror("Error", "Tên PC không hợp lệ!")
        conn.close()
        return
    
    pc_id_user = pc_name_to_id[pc_name]

    c.execute("INSERT INTO tb_users (id_user, ten_user, id_pc, tk_domain, mail, password) VALUES (?, ?, ?, ?, ?, ?)", 
              (user_id, ten_user, pc_id_user, tk_domain, mail, password))
    conn.commit()
    conn.close()
    messagebox.showinfo("Success", "Đã thêm Người dùng mới thành công!")
    entry_user.delete(0, tk.END)
    entry_user_id.delete(0, tk.END)
    entry_tk_domain.delete(0, tk.END)
    entry_mail.delete(0, tk.END)
    entry_password.delete(0, tk.END)
    update_treeview(treeview_user)

def update_treeview(treeview_user):
    for i in treeview_user.get_children():
        treeview_user.delete(i)

    conn = sqlite3.connect('ql_pc.db')
    c = conn.cursor()
    c.execute("""
        SELECT tb_users.id_user, tb_users.ten_user, tb_pc.id_pc, tb_pc.ten_pc, tb_users.tk_domain, tb_users.mail, tb_users.password
        FROM tb_users 
        JOIN tb_pc ON tb_users.id_pc = tb_pc.id_pc
    """)
    rows = c.fetchall()
    conn.close()

    for row in rows:
        treeview_user.insert("", "end", values=row)

def delete_user(treeview_user):
    selected_item = treeview_user.selection()
    if not selected_item:
        messagebox.showerror("Error", "Vui lòng chọn một Người dùng để xóa!")
        return
    
    user_id = treeview_user.item(selected_item, 'values')[0]
    
    conn = sqlite3.connect('ql_pc.db')
    c = conn.cursor()
    c.execute("DELETE FROM tb_users WHERE id_user = ?", (user_id,))
    conn.commit()
    conn.close()
    messagebox.showinfo("Success", f"Đã xóa Người dùng có ID {user_id} thành công!")
    update_treeview(treeview_user)

def update_user(treeview_user, entry_new_name):
    selected_item = treeview_user.selection()
    if not selected_item:
        messagebox.showerror("Error", "Vui lòng chọn một Người dùng để cập nhật!")
        return
    
    user_id = treeview_user.item(selected_item, 'values')[0]
    new_ten_user = entry_new_name.get().strip()

    conn = sqlite3.connect('ql_pc.db')
    c = conn.cursor()
    c.execute("UPDATE tb_users SET ten_user = ? WHERE id_user = ?", (new_ten_user, user_id))
    conn.commit()
    conn.close()
    messagebox.showinfo("Success", f"Cập nhật tên Người dùng có ID {user_id} thành công!")
    update_treeview(treeview_user)

def search_user(entry_search, user_details, treeview_user, entry_update_id_user):
    ten_user = entry_search.get().strip()
    conn = sqlite3.connect('ql_pc.db')
    c = conn.cursor()
    c.execute("""
        SELECT tb_users.id_user, tb_users.ten_user, tb_pc.id_pc, tb_pc.ten_pc, tb_users.tk_domain, tb_users.mail, tb_users.password
        FROM tb_users 
        JOIN tb_pc ON tb_users.id_pc = tb_pc.id_pc
        WHERE tb_users.ten_user LIKE ?
    """, (f'%{ten_user}%',))
    result = c.fetchall()
    conn.close()
    
    if result:
        user_details.delete(1.0, tk.END)
        user_id, user_name, pc_id, pc_name, tk_domain, mail, password = result[0]
        user_details.insert(tk.END, f"ID: {user_id}\nTên Người dùng: {user_name}\nPC: {pc_name}\nTên TK: {tk_domain}\nEmail: {mail}\nMật khẩu: {password}\n")
        
        entry_update_id_user.config(state=tk.NORMAL)
        entry_update_id_user.delete(0, tk.END)
        entry_update_id_user.insert(0, user_id)
        entry_update_id_user.config(state='disabled')

        for item in treeview_user.get_children():
            if treeview_user.item(item, 'values')[1] == user_name:
                treeview_user.selection_set(item)
                treeview_user.see(item)
                break
    else:
        messagebox.showinfo("Search Result", "Không tìm thấy Người dùng phù hợp.")
        user_details.delete(1.0, tk.END)

def export_to_excel():
    conn = sqlite3.connect('ql_pc.db')
    df = pd.read_sql_query("""
        SELECT tb_users.id_user, tb_users.ten_user, tb_pc.id_pc, tb_pc.ten_pc, tb_users.tk_domain, tb_users.mail, tb_users.password
        FROM tb_users 
        JOIN tb_pc ON tb_users.id_pc = tb_pc.id_pc
    """, conn)
    conn.close()

    save_path = filedialog.asksaveasfilename(defaultextension=".xlsx", filetypes=[("Excel files", "*.xlsx"), ("All files", "*.*")])
    if save_path:
        df.to_excel(save_path, index=False)
        messagebox.showinfo("Success", "Danh sách người dùng đã được xuất ra file Excel thành công!")

def show_user_management(root, user_management_frame, pc_management_frame=None, baotri_management_frame=None):
    user_management_frame.pack()
    if pc_management_frame:
        pc_management_frame.pack_forget()
    if baotri_management_frame:
        baotri_management_frame.pack_forget()

    # Labels and entry widgets for adding User
    label_user = tk.Label(user_management_frame, text="Quản lý Người dùng", font=("Times New Roman", 28), fg='Red')
    label_user.grid(row=0, column=1, padx=10, pady=10)

    label_add_user = tk.Label(user_management_frame, text="Thêm Người dùng")
    label_add_user.grid(row=1, column=0, padx=10, pady=5)
    
    entry_user = tk.Entry(user_management_frame)
    entry_user.grid(row=1, column=1, padx=10, pady=5)

    label_user_id = tk.Label(user_management_frame, text="ID Người dùng")
    label_user_id.grid(row=1, column=2, padx=10, pady=5)
    
    entry_user_id = tk.Entry(user_management_frame)
    entry_user_id.grid(row=1, column=3, padx=10, pady=5)

    label_tk_domain = tk.Label(user_management_frame, text="Tên tài khoản")
    label_tk_domain.grid(row=2, column=0, padx=10, pady=5)

    entry_tk_domain = tk.Entry(user_management_frame)
    entry_tk_domain.grid(row=2, column=1, padx=10, pady=5)

    label_mail = tk.Label(user_management_frame, text="Email")
    label_mail.grid(row=2, column=2, padx=10, pady=5)

    entry_mail = tk.Entry(user_management_frame)
    entry_mail.grid(row=2, column=3, padx=10, pady=5)

    label_password = tk.Label(user_management_frame, text="Mật khẩu")
    label_password.grid(row=2, column=4, padx=10, pady=5)

    entry_password = tk.Entry(user_management_frame, show="*")
    entry_password.grid(row=2, column=5, padx=10, pady=5)

    # Dropdown menu for selecting PC
    conn = sqlite3.connect('ql_pc.db')
    c = conn.cursor()
    c.execute("SELECT id_pc, ten_pc FROM tb_pc")
    pcs = c.fetchall()
    conn.close()

    pc_names = [pc[1] for pc in pcs]
    pc_name_to_id = {pc[1]: pc[0] for pc in pcs}
    selected_pc_name = tk.StringVar()
    selected_pc_name.set(pc_names[0])

    label_select_pc = tk.Label(user_management_frame, text="Chọn PC")
    label_select_pc.grid(row=3, column=0, padx=10, pady=5)
    
    dropdown_pc = ttk.Combobox(user_management_frame, textvariable=selected_pc_name, values=pc_names, state="readonly")
    dropdown_pc.grid(row=3, column=1, padx=10, pady=5)

    button_add_user = tk.Button(user_management_frame, text="Thêm Người dùng", command=lambda: add_user(entry_user, pc_name_to_id, selected_pc_name, treeview_user, entry_user_id, entry_tk_domain, entry_mail, entry_password))
    button_add_user.grid(row=3, column=2, padx=10, pady=5)

    # Treeview to display users
    columns = ("ID", "Tên Người dùng", "ID PC", "Tên PC", "Tên TK", "Email", "Mật khẩu")
    treeview_user = ttk.Treeview(user_management_frame, columns=columns, show="headings")
    treeview_user.heading("ID", text="ID")
    treeview_user.heading("Tên Người dùng", text="Tên Người dùng")
    treeview_user.heading("ID PC", text="ID PC")
    treeview_user.heading("Tên PC", text="Tên PC")
    treeview_user.heading("Tên TK", text="Tên TK")
    treeview_user.heading("Email", text="Email")
    treeview_user.heading("Mật khẩu", text="Mật khẩu")

    for col in columns:
        treeview_user.column(col, width=100)

    treeview_user.grid(row=4, column=0, columnspan=6, padx=10, pady=10)
    update_treeview(treeview_user)

    # Entry for new user name to update
    label_new_name = tk.Label(user_management_frame, text="Tên Người dùng mới")
    label_new_name.grid(row=5, column=0, padx=10, pady=5)
    
    entry_new_name = tk.Entry(user_management_frame)
    entry_new_name.grid(row=5, column=1, padx=10, pady=5)

    button_update_user = tk.Button(user_management_frame, text="Cập nhật Người dùng", command=lambda: update_user(treeview_user, entry_new_name))
    button_update_user.grid(row=5, column=2, padx=10, pady=5)

    button_delete_user = tk.Button(user_management_frame, text="Xóa Người dùng", command=lambda: delete_user(treeview_user))
    button_delete_user.grid(row=5, column=3, padx=10, pady=5)

    # Search and display user details
    label_search_user = tk.Label(user_management_frame, text="Tìm kiếm Người dùng")
    label_search_user.grid(row=6, column=0, padx=10, pady=5)
    
    entry_search_user = tk.Entry(user_management_frame)
    entry_search_user.grid(row=6, column=1, padx=10, pady=5)

    user_details = tk.Text(user_management_frame, height=10, width=70)
    user_details.grid(row=7, column=0, columnspan=4, padx=10, pady=5)
    
    entry_update_id_user = tk.Entry(user_management_frame, state='disabled')
    entry_update_id_user.grid(row=7, column=4, padx=10, pady=5)

    button_search_user = tk.Button(user_management_frame, text="Tìm kiếm", command=lambda: search_user(entry_search_user, user_details, treeview_user, entry_update_id_user))
    button_search_user.grid(row=6, column=2, padx=10, pady=5)

    # Export users to Excel file
    button_export_excel = tk.Button(user_management_frame, text="Xuất ra Excel", command=export_to_excel)
    button_export_excel.grid(row=8, column=0, columnspan=4, padx=10, pady=10)
