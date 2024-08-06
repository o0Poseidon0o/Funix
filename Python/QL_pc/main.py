import tkinter as tk
from tkinter import messagebox, ttk
from pc_management import show_pc_management
from user_management import show_user_management
from baotri_management import show_baotri_management
from baocao_management import show_baocao_management
import sqlite3


def main():
    root = tk.Tk()
    root.title("Quản lý PC và Người dùng")

    # Kết nối đến cơ sở dữ liệu
    conn = sqlite3.connect('ql_pc.db')
    c = conn.cursor()

    # Lấy kích thước màn hình
    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()
    
    # Thiết lập kích thước cửa sổ
    root.geometry(f"{screen_width}x{screen_height}+0+0")

    pc_management_frame = tk.Frame(root)
    user_management_frame = tk.Frame(root)
    baotri_management_frame = tk.Frame(root)
    baocao_management_frame = tk.Frame(root)

    # Variable to track authentication status
    authenticated = False

    # Function to show PC management interface
    def show_pc():
        nonlocal authenticated
        if authenticated:
            user_management_frame.pack_forget()
            baotri_management_frame.pack_forget()
            baocao_management_frame.pack_forget()
            show_pc_management(root, pc_management_frame, user_management_frame, baotri_management_frame)
        else:
            authenticate()

    # Function to show User management interface
    def show_user():
        nonlocal authenticated
        if authenticated:
            pc_management_frame.pack_forget()
            baotri_management_frame.pack_forget()
            baocao_management_frame.pack_forget()
            show_user_management(root, user_management_frame, pc_management_frame, baotri_management_frame)
        else:
            authenticate()

    # Function to show Baotri management interface
    def show_baotri():
        nonlocal authenticated
        if authenticated:
            pc_management_frame.pack_forget()
            user_management_frame.pack_forget()
            baocao_management_frame.pack_forget()
            show_baotri_management(root, baotri_management_frame, pc_management_frame)
        else:
            authenticate()

    # Function to show Report management interface
    def show_baocao():
        nonlocal authenticated
        if authenticated:
            pc_management_frame.pack_forget()
            user_management_frame.pack_forget()
            baotri_management_frame.pack_forget()
            show_baocao_management(root, baocao_management_frame, pc_management_frame, user_management_frame, baotri_management_frame)
        else:
            authenticate()

    # Function to authenticate user
    def authenticate():
        nonlocal authenticated
        # Create a Toplevel window for login
        login_window = tk.Toplevel(root)
        login_window.title("Đăng nhập")

        # Calculate the position to center the login window
        window_width = 300
        window_height = 180
        x = (screen_width - window_width) // 2
        y = (screen_height - window_height) // 2
        login_window.geometry(f"{window_width}x{window_height}+{x}+{y}")

        label_username = tk.Label(login_window, text="Username:")
        label_username.pack(pady=10)
        entry_username = tk.Entry(login_window)
        entry_username.pack()

        label_password = tk.Label(login_window, text="Password:")
        label_password.pack(pady=10)
        entry_password = tk.Entry(login_window, show="*")
        entry_password.pack()

        def check_credentials():
            nonlocal authenticated
            username = entry_username.get()
            password = entry_password.get()

            # Query the database to check credentials
            c.execute("SELECT COUNT(*) FROM dang_nhap WHERE id_dangnhap=? AND pass=?", (username, password))
            result = c.fetchone()

            if result and result[0] > 0:
                authenticated = True
                login_window.destroy()
                # Once authenticated, show the requested management interface
                show_pc()  # You can change this to whichever interface you want to show first
            else:
                messagebox.showerror("Lỗi đăng nhập", "Tên người dùng hoặc mật khẩu không đúng.")

        btn_login = tk.Button(login_window, text="Đăng nhập", command=check_credentials, width=20, height=3)
        btn_login.pack(pady=10)

  
    
    # Create a frame to hold the buttons
    button_frame = tk.Frame(root)
    button_frame.pack(pady=10)

    # Buttons to switch between management interfaces
    btn_show_pc_management = tk.Button(button_frame, text="Quản lý PC", command=show_pc, bg="Red",fg="White",width=15, height=2, borderwidth=2, relief="raised")
    btn_show_pc_management.grid(row=0, column=0, padx=10)

    btn_show_user_management = tk.Button(button_frame, text="Quản lý Người dùng", command=show_user,bg="Blue",fg="White",width=15, height=2, borderwidth=2, relief="raised")
    btn_show_user_management.grid(row=0, column=1, padx=10)

    btn_show_baotri_management = tk.Button(button_frame, text="Quản lý Bảo trì", command=show_baotri, bg="Green", fg="white",width=15, height=2, borderwidth=2, relief="raised")
    btn_show_baotri_management.grid(row=0, column=2, padx=10)

    btn_show_baocao_management = tk.Button(button_frame, text="Báo cáo", command=show_baocao, bg="#ff00ff", fg="White",width=15, height=2, borderwidth=2, relief="raised")
    btn_show_baocao_management.grid(row=0, column=3, padx=10)
    

    # Đóng kết nối cơ sở dữ liệu khi thoát ứng dụng
    root.protocol("WM_DELETE_WINDOW", lambda: (conn.close(), root.destroy()))

    root.mainloop()

if __name__ == "__main__":
    main()
