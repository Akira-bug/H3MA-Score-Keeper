import mysql.connector

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

        # Query to retrieve statistics for the fighter by name
        query = """
            SELECT score AS total_score
            FROM fencers
            WHERE name = %s
        """

        # Execute the query with the fighter's name as a parameter
        cursor.execute(query, (fighter_name,))

        # Fetch the results
        result = cursor.fetchone()

        if result:
            total_score = result
            print(f"Fighter: {fighter_name}")
            print(f"Total Score: {total_score}")
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
    fighter_name = input("Enter fighter's name: ")
    compile_fighter_stats(fighter_name)
