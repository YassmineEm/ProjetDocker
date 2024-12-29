FROM maven:3.8.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml ./ 
COPY src ./src
RUN mvn clean package -DskipTests -U
RUN ls /app/target  # Vérifier que le JAR est bien généré

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/Etudiants-app-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]

