
import random
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import pickle

def generate_specific_double_data():
    """
    Mô phỏng dữ liệu tung xúc xắc và đếm số lần tung để đạt [6, 6].
    """
    simulations = 10000  # Số lần mô phỏng
    results = []
    for _ in range(simulations):
        for roll in range(1, 101):  # Giới hạn số lần đổ xúc xắc
            dice_1 = random.randint(1, 6)
            dice_2 = random.randint(1, 6)
            if dice_1 == 6 and dice_2 == 6:  # Điều kiện cả hai mặt đều là 6
                results.append(roll)
                break
    return pd.DataFrame({'roll_number': results})

# 1. Tạo dữ liệu mô phỏng
df = generate_specific_double_data()

# 2. Chuẩn bị dữ liệu để huấn luyện
X = df.index.values.reshape(-1, 1)  # Dữ liệu mô phỏng (chỉ số mô phỏng)
y = df['roll_number']  # Số lần tung để đạt [6, 6]

# 3. Huấn luyện mô hình sử dụng RandomForest
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X, y)

# 4. Lưu mô hình vào file
with open('specific_double_model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("Mô hình dự đoán đã được lưu vào file dice_model.pkl")
