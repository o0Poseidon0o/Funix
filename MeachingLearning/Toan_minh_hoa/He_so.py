import numpy as np

# Dữ liệu
X = np.array([
    [1, 50, 2],
    [1, 80, 3],
    [1, 120, 4],
    [1, 150, 5]
])  # Ma trận đầu vào (4 mẫu, 2 đặc trưng + cột 1 cho intercept)

y = np.array([1.0, 2.0, 3.5, 4.5])  # Vector đầu ra

# 1. Tính ma trận chuyển vị
X_T = X.T

# 2. Tính tích ma trận (X^T X)
X_T_X = np.dot(X_T, X)

# 3. Tính nghịch đảo của (X^T X)
X_T_X_inv = np.linalg.inv(X_T_X)

# 4. Tính hệ số hồi quy beta
beta = np.dot(np.dot(X_T_X_inv, X_T), y)

print("Hệ số hồi quy (beta):", beta)
