import os
import time
import sys
from os.path import join
from shutil import copyfile
import binascii
import timeit
import codecs
import hashlib

chunk_size = 41943040

filesTemp = []
fileTime = []
curSnap = "currentSnapshot.log"
newSnap = "newSnapshot.log"
newDir = r"C:\Xprinter" # Đổi đường dẫn thư mục cần quét
logDir = os.getcwd()
virusDB = 'md5.txt'
sha256DB = 'sha256.txt'

def createLogFile(snapshot, num):
    os.chdir(newDir)
    count = 0
    for (c, dirs, files) in os.walk('.'):
        try:
            for filename in files:
                curFile = os.path.join(c, filename)
                fUpdated = os.path.getmtime(curFile)
                if (time.mktime(time.localtime()) - fUpdated) < num:
                    fileTime.append(fUpdated)
                    if (curFile.find(',') > 0):
                        filename = filename.replace(',','##!##')
                    filesTemp.append(os.path.abspath(join(c, filename)))
                    count += 1
        except FileNotFoundError:
            print('Can\'t find the file (expected .dll):', curFile)
    allFiles = list(zip(filesTemp, fileTime))
    os.chdir(logDir)

    if os.path.isfile(snapshot) and (os.stat(snapshot).st_size > 0):
        print(f"Using existing snapshot: {snapshot}")
        return len(allFiles)  # Sử dụng số lượng tệp đã tìm thấy

    with open(snapshot, 'w') as logFile:
        for filePath, fileUpdateTime in allFiles:
            logFile.write(f"{filePath},{fileUpdateTime}\n")

    return count

def hashFile(filePath, algorithm='md5'):
    hash_func = hashlib.md5() if algorithm == 'md5' else hashlib.sha256()
    with open(filePath, 'rb') as f:
        while chunk := f.read(chunk_size):
            hash_func.update(chunk)
    return hash_func.hexdigest()

def virusScanner(virusTxt, sha256Txt, count):
    start = timeit.default_timer()
    counter = 0
    rekt = 0

    try:
        with codecs.open(curSnap, 'r', encoding='utf-8') as filepaths:
            lines = filepaths.readlines()

            plsCheck = open('infectedFilesList.txt', 'w')

            for line in lines:
                try:
                    linetemp = line.split(',')[0].strip()
                    md5Hash = hashFile(linetemp, 'md5')
                    sha256Hash = hashFile(linetemp, 'sha256')
                    counter += 1

                    with open(virusTxt, 'r') as hexCheck:
                        virHex = hexCheck.readlines()
                        for virus in virHex:
                            virus = virus.strip()
                            if md5Hash == virus:
                                print("Found a virus (MD5) in file", linetemp, "\n")
                                rekt += 1
                                plsCheck.write(linetemp + '\n')

                    with open(sha256Txt, 'r') as shaCheck:
                        shaHex = shaCheck.readlines()
                        for sha256 in shaHex:
                            sha256 = sha256.strip()
                            if sha256Hash == sha256:
                                print("Found a virus (SHA256) in file", linetemp, "\n")
                                rekt += 1
                                plsCheck.write(linetemp + '\n')

                    print("Scanning file", counter, "of", count, ":", linetemp)

                except PermissionError:
                    print("You don't have permission to scan this file!")
                except FileNotFoundError:
                    print("File doesn't exist!?")
                except IndexError:
                    print("IndexError: Invalid format in line:", line.strip())
                except Exception as e:
                    print(f"Error: {str(e)}")

        plsCheck.close()

        print("Found", rekt, "viruses.")
        print("Checked", counter, "files.")
        stop = timeit.default_timer()
        time = (stop - start)
        time = time / 86400
        time *= 1440
        print("Scanned for", int(time), "minutes.")

    except FileNotFoundError:
        print(f"File not found: {curSnap}")

totalFiles = 0

if not os.path.isfile(curSnap) or (os.stat(curSnap).st_size == 0):
    totalFiles = createLogFile(snapshot=curSnap, num=99999999999999)
else:
    totalFiles = createLogFile(snapshot=newSnap, num=175000)
    copyfile(newSnap, curSnap)

virusScanner(virusDB, sha256DB, totalFiles)
