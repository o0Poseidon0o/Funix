import tkinter as tk
from tkinter import ttk, filedialog
from tkcalendar import DateEntry
import sqlite3
from datetime import datetime
from openpyxl import Workbook

def show_baocao_management(root, baocao_management_frame, pc_management_frame, user_management_frame, baotri_management_frame):
    pc_management_frame.pack_forget()
    user_management_frame.pack_forget()
    baotri_management_frame.pack_forget()
    baocao_management_frame.pack()

    for widget in baocao_management_frame.winfo_children():
        widget.destroy()

    label_report = tk.Label(baocao_management_frame, text="Báo cáo", font=("Helvetica", 16))
    label_report.grid(row=0, column=0, padx=10, pady=10, columnspan=4)

    label_pc_name = tk.Label(baocao_management_frame, text="Tên PC:")
    label_pc_name.grid(row=1, column=0, padx=10, pady=5)

    # Fetch PC names from the database
    conn = sqlite3.connect('ql_pc.db')
    c = conn.cursor()
    c.execute("SELECT ten_pc FROM tb_pc")
    pcs = c.fetchall()
    conn.close()
    
    pc_names = [pc[0] for pc in pcs]

    # Add an option for all PCs
    pc_names.insert(0, "Tất cả")

    selected_pc_name = tk.StringVar()
    pc_name_combobox = ttk.Combobox(baocao_management_frame, textvariable=selected_pc_name, values=pc_names)
    pc_name_combobox.grid(row=1, column=1, padx=10, pady=5)
    pc_name_combobox.set('Tất cả')  # Set default selection to "Tất cả"

    label_start_date = tk.Label(baocao_management_frame, text="Từ ngày:")
    label_start_date.grid(row=2, column=0, padx=10, pady=5)
    start_date_entry = DateEntry(baocao_management_frame, width=12, background='darkblue', foreground='white', borderwidth=2)
    start_date_entry.grid(row=2, column=1, padx=10, pady=5)

    label_end_date = tk.Label(baocao_management_frame, text="Đến ngày:")
    label_end_date.grid(row=2, column=2, padx=10, pady=5)
    end_date_entry = DateEntry(baocao_management_frame, width=12, background='darkblue', foreground='white', borderwidth=2)
    end_date_entry.grid(row=2, column=3, padx=10, pady=5)

    report_text = tk.Text(baocao_management_frame, width=80, height=20)
    report_text.grid(row=3, column=0, columnspan=4, padx=10, pady=10)

    def format_date(date_str):
        try:
            date_obj = datetime.strptime(date_str, '%Y-%m-%d')
            return date_obj.strftime("%d/%m/%Y")
        except ValueError:
            return date_str

    def generate_report():
        pc_name = selected_pc_name.get()
        start_date = start_date_entry.get_date()
        end_date = end_date_entry.get_date()
        
        conn = sqlite3.connect('ql_pc.db')
        c = conn.cursor()

        # Get number of PCs
        c.execute("SELECT COUNT(*) FROM tb_pc")
        num_pcs = c.fetchone()[0]

        # Get number of users
        c.execute("SELECT COUNT(*) FROM tb_users")
        num_users = c.fetchone()[0]

        if pc_name == "Tất cả":
            # Get maintenance history for all PCs within the date range
            c.execute("""SELECT date_baotri, content_baotri, tb_pc.ten_pc
                         FROM tb_baotri 
                         INNER JOIN tb_pc ON tb_baotri.id_pc = tb_pc.id_pc
                         WHERE date_baotri BETWEEN ? AND ?""", (start_date, end_date))
        else:
            # Get maintenance history for the selected PC within the date range
            c.execute("""SELECT date_baotri, content_baotri, tb_pc.ten_pc
                         FROM tb_baotri 
                         INNER JOIN tb_pc ON tb_baotri.id_pc = tb_pc.id_pc
                         WHERE tb_pc.ten_pc = ? AND date_baotri BETWEEN ? AND ?""", (pc_name, start_date, end_date))
        
        maintenance_records = c.fetchall()

        conn.close()

        report_text.delete(1.0, tk.END)
        report_text.insert(tk.END, f"Số lượng máy: {num_pcs}\n")
        report_text.insert(tk.END, f"Số lượng người dùng: {num_users}\n\n")

        if pc_name == "Tất cả":
            report_text.insert(tk.END, f"Lịch sử bảo trì cho Tất cả PC\n")
        else:
            report_text.insert(tk.END, f"Lịch sử bảo trì cho PC: {pc_name}\n")
        
        for record in maintenance_records:
            formatted_date = format_date(record[0])
            report_text.insert(tk.END, f"Ngày bảo trì: {formatted_date}, PC: {record[2]}, Nội dung: {record[1]}\n")
        
        # Export to Excel
        export_to_excel(maintenance_records)

    def export_to_excel(records):
        file_path = filedialog.asksaveasfilename(defaultextension=".xlsx", filetypes=[("Excel files", "*.xlsx")])
        if file_path:
            wb = Workbook()
            ws = wb.active
            ws.append(['Ngày bảo trì', 'PC', 'Nội dung'])
            
            for record in records:
                formatted_date = format_date(record[0])
                ws.append([formatted_date, record[2], record[1]])

            wb.save(file_path)

    btn_generate_report = tk.Button(baocao_management_frame, text="Tạo báo cáo", command=generate_report, bg="#228b22", fg="white",width=15, height=2, borderwidth=2, relief="raised")
    btn_generate_report.grid(row=2, column=4, padx=10, pady=5)

# Sample main function to initialize the application
def main():
    root = tk.Tk()
    root.title("Quản lý PC và Người dùng")

    baocao_management_frame = tk.Frame(root)
    pc_management_frame = tk.Frame(root)
    user_management_frame = tk.Frame(root)
    baotri_management_frame = tk.Frame(root)

    show_baocao_management(root, baocao_management_frame, pc_management_frame, user_management_frame, baotri_management_frame)

    root.mainloop()

if __name__ == "__main__":
    main()
