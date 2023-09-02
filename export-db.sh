#!/bin/bash

# Configuration
DB_USER="webuser"
DB_PASSWORD="insecure_db_pw"
DB_NAME="HEMA_SK"
EXPORT_FILE="export.sql"
DB_HOST="192.168.56.12"

# Export the database
echo "Exporting database..."
mysqldump -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME > $EXPORT_FILE
echo "Database export complete."

echo "Database export finished."
