import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle

# Dữ liệu giả lập
data = {
    'area': [50, 80, 120, 150, 200],
    'rooms': [2, 3, 4, 5, 6],
    'price': [1, 2, 3.5, 4.5, 6]  # Giá tính bằng tỷ VNĐ
}
df = pd.DataFrame(data)

# Huấn luyện mô hình
model = LinearRegression()
model.fit(df[['area', 'rooms']], df['price'])

# Lưu mô hình vào file
with open('real_estate_model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("Mô hình đã được lưu tại src/models/real_estate_model.pkl!")
