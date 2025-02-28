from django.urls import path
from .views import predict, predict_price, get_regression_data, predict_dice_roll,dice_roll_distribution,simulate_dice_view,simulate_biased_dice_view

urlpatterns = [
    path('predict/', predict, name='predict'),
    path('predict_price/', predict_price, name='predict_price'),
    path('get_regression_data/', get_regression_data, name='get_regression_data'),
    path('predict_dice_roll/', predict_dice_roll, name='predict_dice_roll'),
    path('dice-roll-distribution/', dice_roll_distribution, name='dice_roll_distribution'),
    path("simulate-dice/", simulate_dice_view, name="simulate_dice"),
    path("simulate-biased-dice/", simulate_biased_dice_view, name="simulate_biased_dice"),
]
