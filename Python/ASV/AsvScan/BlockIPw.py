import subprocess
import socket

def read_file(file_path):
    with open(file_path, 'r') as file:
        return [line.strip() for line in file.readlines()]

def resolve_domain_to_ip(domain):
    try:
        return socket.gethostbyname(domain)
    except socket.gaierror:
        print(f"Failed to resolve domain {domain}")
        return None

def block_domains(domains):
    count = 0
    for domain in domains:
        ip = resolve_domain_to_ip(domain)
        if ip:
            try:
                subprocess.run(['netsh', 'advfirewall', 'firewall', 'add', 'rule', 'name=BlockDomain_{}'.format(domain), 'dir=out', 'action=block', 'remoteip={}'.format(ip)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
                count += 1
            except subprocess.CalledProcessError as e:
                print(f"Failed to block domain {domain} (IP: {ip}): {e}")
    print(f"Blocked {count} domains!")

def block_ips(ips):
    count = 0
    for ip in ips:
        try:
            subprocess.run(['netsh', 'advfirewall', 'firewall', 'add', 'rule', 'name=BlockIP_{}'.format(ip), 'dir=out', 'action=block', 'remoteip={}'.format(ip)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
            count += 1
        except subprocess.CalledProcessError as e:
            print(f"Failed to block IP {ip}: {e}")
    print(f"Blocked {count} IP (range) addresses!")

def block_ports(ports):
    count = 0
    for port in ports:
        try:
            subprocess.run(['netsh', 'advfirewall', 'firewall', 'add', 'rule', 'name=BlockPort_{}'.format(port), 'dir=out', 'action=block', 'protocol=TCP', 'remoteport={}'.format(port)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
            subprocess.run(['netsh', 'advfirewall', 'firewall', 'add', 'rule', 'name=BlockPort_{}_UDP'.format(port), 'dir=out', 'action=block', 'protocol=UDP', 'remoteport={}'.format(port)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
            count += 1
        except subprocess.CalledProcessError as e:
            print(f"Failed to block port {port}: {e}")
    print(f"Blocked {count} ports!")

def main():
    domain_file = 'domain.txt'
    ip_file = 'ip.txt'
    port_file = 'port.txt'
    
    domains = read_file(domain_file)
    ips = read_file(ip_file)
    ports = read_file(port_file)
    
    block_domains(domains)
    block_ips(ips)
    block_ports(ports)

if __name__ == "__main__":
    main()
