from adafruit_servokit import ServoKit
from time import sleep

TIMEOUT = 1/50

kit = ServoKit(channels = 16)

def testServo(servo, maxAngle):
    for i in range(0, maxAngle):
        servo.angle = i
        print(i)
        sleep(TIMEOUT)
    for i in range(maxAngle, 0, -1):
        servo.angle = i
        print(i)
        sleep(TIMEOUT)

print("Enter servo index:")
index = int(input())

print("Enter max angle (>= 180):")
angle = int(input())

print(f"Test servo {index}")
testServo(kit.servo[index], angle)

# while True:
#    print("Enter servo index: ")
#    index = int(input())
#    print("Enter angle: ")
#    angle = int(input())
#    kit.servo[index].angle = angle
