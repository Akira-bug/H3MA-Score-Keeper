import subprocess
import mysql.connector

# Define the path to the analysis scrip]\t
db_config = {
    "host": "192.168.56.12", 
    "user": "webuser",   
    "password": "insecure_db_pw", 
    "database": "HEMA_SK" 
}

analysis_script = "/vagrant/analysis/analysis.py"


try:
    # Establish a connection to the database
    connection = mysql.connector.connect(**db_config)

    # Create a cursor object to interact with the database
    cursor = connection.cursor()

    # Query to retrieve the list of fencer names
    cursor.execute("SELECT name FROM fencers")
    fencer_names = cursor.fetchall()

    # Iterate over the fencer names and run the analysis script for each fencer
    for fencer_name in fencer_names:
        fencer_name = fencer_name[0]  # Extract the name from the tuple

        # Construct the command to run the analysis script
        command = ["python3", analysis_script, fencer_name]

        # Use subprocess to execute the command
        subprocess.run(command)

    print("Analysis for all fencers completed successfully.")

except mysql.connector.Error as e:
    print(f"Error: {e}")

finally:
    # Close the cursor and database connection
    if cursor:
        cursor.close()
    if connection.is_connected():
        connection.close()
