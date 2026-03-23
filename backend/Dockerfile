# Bước 1: Build ứng dụng (Dùng Maven để đóng gói code thành file .jar)
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests
# 1. Base Image: Use a lightweight Java 17 runtime (Alpine Linux)

FROM eclipse-temurin:17-jre-alpine

# 2. Metadata (Optional but good practice)
LABEL maintainer="student@university.edu"

# 3. Work Directory: Create a folder inside the container to hold our app
WORKDIR /app

# 4. Copy: Take the JAR from your host 'target' folder and put it in the container
#    Note: We rename it to 'app.jar' for simplicity
COPY --from=build /app/target/*.jar app.jar

# 5. Expose: Document that this container listens on port 8080
EXPOSE 8080

# 6. Entrypoint: The command to run when the container starts
#    We use "exec" form (array) so signals (SIGTERM) are passed correctly
ENTRYPOINT ["java", "-jar", "app.jar"]