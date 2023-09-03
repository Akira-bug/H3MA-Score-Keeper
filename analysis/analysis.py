import mysql.connector
import sys

# Replace with your database connection details
db_config = {
    "host": "192.168.56.12",  # Change to the IP or hostname of your MySQL server
    "user": "webuser",    # Change to your MySQL username
    "password": "insecure_db_pw",  # Change to your MySQL password
    "database": "HEMA_SK"  # Change to your database name
}

def compile_fighter_stats(fighter_name):
    try:
        # Establish a connection to the database
        connection = mysql.connector.connect(**db_config)

        # Create a cursor object to interact with the database
        cursor = connection.cursor()

        # Query to count the total matches and calculate the total score for the specified fighter
        score_query = """
            SELECT 
                COUNT(*) AS total_matches,
                SUM(CASE
                    WHEN fighter1 = %s THEN score1
                    WHEN fighter2 = %s THEN score2
                    ELSE 0
                END) AS total_score
            FROM matches
            WHERE fighter1 = %s OR fighter2 = %s
        """

        # Query to count the number of wins for the fighter
        wins_query = """
            SELECT COUNT(*) AS wins
            FROM matches
            WHERE (fighter1 = %s OR fighter2 = %s) AND victor = %s
        """

       # Execute the score query with the fighter's name as a parameter
        cursor.execute(score_query, (fighter_name, fighter_name, fighter_name, fighter_name))
        score_result = cursor.fetchone()

        # Execute the wins query with the fighter's name as a parameter
        cursor.execute(wins_query, (fighter_name, fighter_name, fighter_name))
        wins_result = cursor.fetchone()


        if score_result and wins_result:
            total_matches = score_result[0]
            total_score = score_result[1]
            total_wins = wins_result[0]
            average_score = total_score/total_wins
            win_rate = total_wins/total_matches

            print("**************************************");
            print(f"Fighter: {fighter_name}")
            print(f"Total Score: {total_score}")
            print(f"Match Count: {total_matches}")
            print(f"Victories: {total_wins}")
            print(f"Average score per match: {round(average_score, 2)}")
            print(f"Win Rate: {win_rate}")
            print("**************************************");
            print(f"Updating score for : {fighter_name}")
            print("***************************************");
            update_query = """
                UPDATE fencers
                SET score = %s
                WHERE name = %s
            """
            cursor.execute(update_query, (total_score, fighter_name))
            connection.commit()  # Commit the transaction

            print("Score updated in the 'fencers' table")

        else:
            print(f"No data found for fighter: {fighter_name}")

    except mysql.connector.Error as e:
        print(f"Error: {e}")
    finally:
        # Close the cursor and database connection
        if cursor:
            cursor.close()
        if connection.is_connected():
            connection.close()

if __name__ == "__main__":
    if len(sys.argv) > 1:
        # Use the command-line argument as the fighter's name if provided
        fighter_name = sys.argv[1]
    else:
        # Prompt for input if no command-line argument is provided
        fighter_name = input("Please enter the fighter's name: ")

    compile_fighter_stats(fighter_name)
