
import random

def guessing_game():
    number = random.randint(1, 100)
    attempts = 0
    print("Welcome to the Guessing Game!")
    print("I've picked a number between 1 and 100. Try to guess it!")

    while True:
        try:
            guess = int(input("Enter your guess: "))
            attempts += 1
            if guess < number:
                print("Too low! Try higher.")
            elif guess > number:
                print("Too high! Try lower.")
            else:
                print(f"Congratulations! You guessed it in {attempts} attempts.")
                break
        except ValueError:
            print("Please enter a valid number.")

if __name__ == "__main__":
    guessing_game()
