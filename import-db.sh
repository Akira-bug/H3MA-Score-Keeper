#!/bin/bash

# Configuration
DB_USER="webuser"
DB_PASSWORD="insecure_db_pw"
DB_NAME="HEMA_SK"
EXPORT_FILE="export.sql"
EXPORT_DIR="/vagrant/client/"
DB_HOST="192.168.56.12"

# Import the database
echo "Importing database..."
mysql -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < "$EXPORT_DIR""$EXPORT_FILE"
echo "Database import complete."

echo "Database import finished."