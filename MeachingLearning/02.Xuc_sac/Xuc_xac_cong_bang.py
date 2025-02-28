import random

def roll_dice():
    dice_1 = random.randint(1, 6)
    dice_2 = random.randint(1, 6)
    return dice_1, dice_2

def simulate_fair_dice(trials):
    count_66 = 0
    for _ in range(trials):
        if roll_dice() == (6, 6):
            count_66 += 1
    return count_66

trials = 10000
result = simulate_fair_dice(trials)
print(f"Xác suất ra [6, 6] sau {trials} lần thử: {result / trials}")
