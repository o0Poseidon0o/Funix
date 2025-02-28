import random
def biased_roll():
    weights = [1, 1, 1, 1, 1, 5]  # Tăng trọng số mặt 6
    dice_1 = random.choices([1, 2, 3, 4, 5, 6], weights=weights)[0]
    dice_2 = random.choices([1, 2, 3, 4, 5, 6], weights=weights)[0]
    return dice_1, dice_2

def simulate_biased_dice(trials):
    count_66 = 0
    for _ in range(trials):
        if biased_roll() == (6, 6):
            count_66 += 1
    return count_66

trials = 10000
result_biased = simulate_biased_dice(trials)
print(f"Xác suất ra [6, 6] với xúc xắc không công bằng sau {trials} lần thử: {result_biased / trials}")
