# Base image
FROM mysql

# Add all scripts 
COPY backup.sql /docker-entrypoint-initdb.d/

# Set environment variables

# Expose port
EXPOSE 3306