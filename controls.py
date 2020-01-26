from adafruit_servokit import ServoKit
from time import sleep

THROTTLED_STEPS = 2.5
#THROTTLE = 1 / 20
THROTTLE = 0

kit = ServoKit(channels = 16)

servos = {
    "base": {
        "device": kit.servo[0],
        "max_angle": 180,
        "min_angle": 0
    },
    "right": {
        "device": kit.servo[1],
        "max_angle": 130,
        "min_angle": 10
    },
    "left": {
        "device": kit.servo[2],
        "max_angle": 140,
        "min_angle": 0
    },
    "grapper": {
        "device": kit.servo[3],
        "max_angle": 50,
        "min_angle": 0
    }
}

sign = lambda x: -1 if x < 0 else 1
scale = lambda x, x_min, x_max, y_min, y_max: (((x - x_min) * (y_max - y_min)) / (x_max - x_min)) + y_min

def reset():
    for key in servos:
        servos[key]["device"].angle = servos[key]["min_angle"]

def move(servo_name, distance, throttled = False):
    servo = servos[servo_name]
    distance = int(distance)
    if servo["device"].angle + distance > servo["max_angle"] or servo["device"].angle + distance < servo["min_angle"]:
        print("Angle {} is out of range for distance {}".format(servo["device"].angle, distance))
        return False

    try:
        if not throttled:
            servo["device"].angle += distance

        else:
            print(abs(distance))
            while abs(distance) > 0:
                steps = THROTTLED_STEPS * sign(distance) if abs(THROTTLED_STEPS) < abs(distance) else distance
                print("Moving {} steps (angle {}, distance {})".format(steps, servo["device"].angle, distance))
                servo["device"].angle += steps
                distance -= steps
                sleep(THROTTLE)

    except:
        return True

    return True

def move_to_angle(servo_name, angle, throttled = False):
    angle = int(angle)
    servo = servos[servo_name]
    servo["device"].angle = angle
    #distance = angle - servo["device"].angle
    #return move(servo_name, distance, throttled)

def set_min(servo_name, throttled = False):
    servo = servos[servo_name]
    return move(servo_name, servo["min_angle"] - servo["device"].angle, throttled)

def set_max(servo_name, throttled = False):
    servo = servos[servo_name]
    return move(servo_name, servo["max_angle"] - servo["device"].angle, throttled)

def move_to_percentage(servo_name, percentage, throttled = False):
    percentage = int(percentage)
    servo = servos[servo_name]
    max_angle = servo["max_angle"]
    min_angle = servo["min_angle"]
    new_angle = (max_angle - min_angle) * (percentage / 100) + min_angle
    return move_to_angle(servo_name, new_angle, throttled)

control_functions = [reset, move, move_to_angle, set_min, set_max, move_to_percentage]

if __name__ == "__main__":
    def command_line_loop():    
        while True:
            keys = list(servos.keys())
            print("Key ({}):".format(", ".join(keys)))
            key = input()
            if not key in keys:
                print("{} is not valid".format(key))
                continue

            print("Current Angle ({}): {}".format(key, servos[key]["device"].angle))

            print("Method: (1: move, 2: set_min, 3: set_max, 4: move_to_angle, 5: move_to_percentage, 6: reset)")
            method = int(input())

            # print("Throttling: (0 or 1, default: 1)")
            # throttled = bool(input())
            throttled = True

            if method == 1:
                print("Distance:")
                d = int(input())
                move(key, d, throttled)

            elif method == 2:
                set_min(key, throttled)

            elif method == 3:
                set_max(key, throttled)

            elif method == 4:
                print("Angle:")
                angle = int(input())
                move_to_angle(key, angle, throttled)

            elif method == 5:
                print("Percentage:")
                percentage = float(input())
                move_to_percentage(key, percentage, throttled)

            elif method == 6:
                reset()
                
    command_line_loop()

    
