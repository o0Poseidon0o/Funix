# Create your views here.
import pickle
import random  # Thêm import này
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Load tất cả các mô hình khi khởi động
with open('mlapi/ml_model.pkl', 'rb') as f:
    ml_model = pickle.load(f)

with open('mlapi/real_estate_model.pkl', 'rb') as f:
    real_estate_model = pickle.load(f)

with open('mlapi/dice_model.pkl', 'rb') as f:
    dice_model = pickle.load(f)

@csrf_exempt
def predict(request):
    """Dự đoán với ml_model."""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            feature1 = data.get('feature1', 0)
            feature2 = data.get('feature2', 0)

            # Kiểm tra dữ liệu đầu vào
            if feature1 is None or feature2 is None:
                return JsonResponse({'error': 'Thiếu dữ liệu đầu vào!'}, status=400)

            # Dự đoán
            prediction = ml_model.predict([[feature1, feature2]])[0]
            return JsonResponse({'prediction': int(prediction)})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request'}, status=400)


@csrf_exempt
def predict_price(request):
    """Dự đoán giá bất động sản với real_estate_model."""
    if request.method == 'POST':
        try:
            # Lấy dữ liệu từ request
            data = json.loads(request.body)
            area = data.get('area')
            rooms = data.get('rooms')

            if area is None or rooms is None:
                return JsonResponse({'error': 'Thiếu dữ liệu đầu vào!'}, status=400)

            # Dự đoán
            prediction = real_estate_model.predict([[area, rooms]])[0]

            # Trả về kết quả
            return JsonResponse({'predicted_price': round(prediction, 2)})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


def get_regression_data(request):
    """Lấy dữ liệu hồi quy với real_estate_model."""
    try:
        # Kiểm tra mô hình
        if real_estate_model is None:
            return JsonResponse({'error': 'Mô hình không tồn tại!'}, status=500)

        # Dữ liệu huấn luyện
        data = {
            'area': [50, 80, 120, 150, 200],
            'rooms': [2, 3, 4, 5, 6],
            'price': [1, 2, 3.5, 4.5, 6]
        }

        # Dự đoán
        areas = data['area']
        predictions = real_estate_model.predict([[a, 4] for a in areas]).tolist()

        # Hệ số hồi quy và điểm cắt
        coefficients = real_estate_model.coef_.tolist()
        intercept = real_estate_model.intercept_

        return JsonResponse({
            'data': data,
            'predictions': predictions,
            'coefficients': coefficients,
            'intercept': intercept
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)




@csrf_exempt
def predict_dice_roll(request):
    """
    API dự đoán số lần tung xúc xắc để đạt [6, 6].
    """
    if request.method == 'POST':
        try:
            # Lấy dữ liệu từ yêu cầu
            data = json.loads(request.body)
            simulation_index = data.get('simulation_index', 1)  # Chỉ số mô phỏng (mặc định 1)

            # Dự đoán số lần tung để đạt [6, 6]
            predicted_roll = predict_dice_roll.predict([[simulation_index]])[0]

            return JsonResponse({'predicted_roll': round(predicted_roll)})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
@csrf_exempt
def dice_roll_distribution(request):
    """
    API trả về dữ liệu phân phối số lần tung để đạt [6, 6].
    """
    try:
        # Dữ liệu phân phối giả lập (hoặc có thể sinh từ mô hình)
        roll_data = [
            {"rolls": i, "frequency": random.randint(5, 50)}  # Dữ liệu ngẫu nhiên
            for i in range(1, 21)  # 20 kết quả đầu tiên
        ]

        return JsonResponse({'distribution': roll_data}, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

# views.py
import random
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def simulate_dice_view(request):
    """
    Mô phỏng số lần tung để xuất hiện [6, 6].
    """
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            trials = int(data.get("trials", 1000))  # Số lần mô phỏng, mặc định là 1000

            # Mô phỏng xúc xắc công bằng
            def simulate_fair_dice(trials):
                count_66 = 0
                for _ in range(trials):
                    dice_1 = random.randint(1, 6)
                    dice_2 = random.randint(1, 6)
                    if dice_1 == 6 and dice_2 == 6:
                        count_66 += 1
                return count_66

            # Kết quả mô phỏng
            result = simulate_fair_dice(trials)
            probability = result / trials

            return JsonResponse({
                "trials": trials,
                "count_66": result,
                "probability": probability
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request"}, status=400)

@csrf_exempt
def simulate_biased_dice_view(request):
    """
    Mô phỏng số lần tung để xuất hiện [6, 6] với xúc xắc không công bằng.
    """
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            trials = int(data.get("trials", 1000))  # Số lần mô phỏng, mặc định là 1000
            bias_weight = int(data.get("bias_weight", 5))  # Trọng số cho mặt 6

            # Mô phỏng xúc xắc không công bằng
            def simulate_biased_dice(trials, bias_weight):
                weights = [1, 1, 1, 1, 1, bias_weight]
                count_66 = 0
                for _ in range(trials):
                    dice_1 = random.choices([1, 2, 3, 4, 5, 6], weights=weights)[0]
                    dice_2 = random.choices([1, 2, 3, 4, 5, 6], weights=weights)[0]
                    if dice_1 == 6 and dice_2 == 6:
                        count_66 += 1
                return count_66

            # Kết quả mô phỏng
            result = simulate_biased_dice(trials, bias_weight)
            probability = result / trials

            return JsonResponse({
                "trials": trials,
                "bias_weight": bias_weight,
                "count_66": result,
                "probability": probability
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request"}, status=400)
