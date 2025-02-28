# mlapi/train_model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import pickle

# Dữ liệu giả lập (dùng dữ liệu thực nếu có)
data = {
    'feature1': [1, 2, 3, 4, 5],
    'feature2': [5, 4, 3, 2, 1],
    'label': [0, 0, 1, 1, 1],
}
df = pd.DataFrame(data)

# Tách dữ liệu
X = df[['feature1', 'feature2']]
y = df['label']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Huấn luyện mô hình
model = LogisticRegression()
model.fit(X_train, y_train)

# Lưu mô hình
with open('ml_model.pkl', 'wb') as f:
    pickle.dump(model, f)
