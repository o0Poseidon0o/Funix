import nmap
import wmi
import tkinter as tk
from tkinter import ttk, messagebox
import csv
import logging

# Cấu hình file log
logging.basicConfig(filename="scanner.log", level=logging.INFO, 
                    format="%(asctime)s - %(levelname)s - %(message)s")

# Hàm quét mạng LAN
def scan_lan(network):
    scanner = nmap.PortScanner()
    try:
        scanner.scan(hosts=network, arguments='-n -sP -PE')
        hosts = [host for host in scanner.all_hosts() if scanner[host].state() == 'up']
        logging.info(f"Scan completed for network: {network}, Active hosts: {len(hosts)}")
        return hosts
    except Exception as e:
        logging.error(f"Error scanning network {network}: {str(e)}")
        messagebox.showerror("Error", f"Failed to scan network: {str(e)}")
        return []

# Hàm lấy thông tin hệ thống qua WMI
def get_remote_system_info(target_machine, username, password):
    try:
        connection = wmi.WMI(computer=target_machine, user=username, password=password)
        system_info = connection.Win32_ComputerSystem()[0]
        os_info = connection.Win32_OperatingSystem()[0]
        processor_info = connection.Win32_Processor()[0]
        memory_info = connection.Win32_PhysicalMemory()
        ram_size = sum(int(mem.Capacity) for mem in memory_info) / (1024 ** 3)
        result = {
            "IP Address": target_machine,
            "Device Name": system_info.Name,
            "Processor": processor_info.Name.strip(),
            "Installed RAM": f"{ram_size:.2f} GB",
            "Product ID": os_info.SerialNumber,
            "System Type": os_info.OSArchitecture
        }
        logging.info(f"Successfully retrieved info for {target_machine}")
        return result
    except Exception as e:
        logging.warning(f"Failed to retrieve info for {target_machine}: {str(e)}")
        return {"IP Address": target_machine, "Error": str(e)}

# Hàm xuất kết quả ra file CSV
def export_to_csv(data, filename="system_info.csv"):
    try:
        with open(filename, mode="w", newline="", encoding="utf-8") as file:
            writer = csv.DictWriter(file, fieldnames=data[0].keys())
            writer.writeheader()
            writer.writerows(data)
        logging.info(f"Data exported successfully to {filename}")
        messagebox.showinfo("Success", f"Data exported successfully to {filename}")
    except Exception as e:
        logging.error(f"Failed to export data: {str(e)}")
        messagebox.showerror("Error", f"Failed to export data: {str(e)}")

# Giao diện đồ họa
class NetworkScannerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("LAN System Information Scanner")
        self.data = []

        # Input network range
        self.network_label = tk.Label(root, text="Network Range (e.g., 192.168.1.0/24):")
        self.network_label.pack(pady=5)
        self.network_entry = tk.Entry(root, width=30)
        self.network_entry.pack(pady=5)

        # Input username and password
        self.username_label = tk.Label(root, text="Username:")
        self.username_label.pack(pady=5)
        self.username_entry = tk.Entry(root, width=30)
        self.username_entry.pack(pady=5)

        self.password_label = tk.Label(root, text="Password:")
        self.password_label.pack(pady=5)
        self.password_entry = tk.Entry(root, width=30, show="*")
        self.password_entry.pack(pady=5)

        # Buttons
        self.scan_button = tk.Button(root, text="Scan & Get Info", command=self.scan_network)
        self.scan_button.pack(pady=10)

        self.export_button = tk.Button(root, text="Export to CSV", command=self.export_data)
        self.export_button.pack(pady=10)

        # Treeview for results
        self.tree = ttk.Treeview(root, columns=("IP Address", "Device Name", "Processor", "Installed RAM", "Product ID", "System Type"), show="headings")
        self.tree.heading("IP Address", text="IP Address")
        self.tree.heading("Device Name", text="Device Name")
        self.tree.heading("Processor", text="Processor")
        self.tree.heading("Installed RAM", text="Installed RAM")
        self.tree.heading("Product ID", text="Product ID")
        self.tree.heading("System Type", text="System Type")
        self.tree.pack(pady=10, fill=tk.BOTH, expand=True)

    def scan_network(self):
        network = self.network_entry.get().strip()
        username = self.username_entry.get().strip()
        password = self.password_entry.get().strip()

        if not network or not username or not password:
            messagebox.showerror("Error", "Please provide network range, username, and password.")
            return

        try:
            live_hosts = scan_lan(network)
            if not live_hosts:
                messagebox.showinfo("No Hosts", "No active hosts found in the network range.")
                return

            self.data = []
            for host in live_hosts:
                info = get_remote_system_info(host, username, password)
                if "Error" in info:
                    messagebox.showwarning("Warning", f"Failed to retrieve info for {host}: {info['Error']}")
                self.data.append(info)
                self.tree.insert("", tk.END, values=list(info.values()))
        except Exception as e:
            logging.error(f"Failed to scan network: {str(e)}")
            messagebox.showerror("Error", f"Failed to scan network: {str(e)}")

    def export_data(self):
        if not self.data:
            messagebox.showerror("Error", "No data to export.")
            return
        export_to_csv(self.data)

# Chạy ứng dụng
if __name__ == "__main__":
    root = tk.Tk()
    app = NetworkScannerApp(root)
    root.mainloop()
