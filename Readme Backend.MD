# Cerebro Spring Boot Backend API

## Overview

This project is a RESTful API built using Spring Boot. It provides 4 endpoints for managing and accessing resources. The instructions below will guide you on how to set up, run, and use the API.

## Prerequisites

Before you can run this project, ensure you have the following installed on your machine:

- [Java Development Kit (JDK) 11 or higher](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Maven 3.6.0 or higher](https://maven.apache.org/install.html)
- [Git](https://git-scm.com/downloads)

## Getting Started

### Clone the Repository

First, clone the repository to your local machine using Git:

```bash
git clone https://github.com/FabioPelagaggi/cerebro-project
cd cerebro-project/backend
```

**Attention, the Backend project is located in the backend folder.**

### Configure the Application

Update the configuration files as needed. The primary configuration file is `src/main/resources/application.properties`.

### Build the Project

Navigate to the root directory of the project and build it using Maven:

```bash
mvn clean install
```

### Run the Application

After building the project, you can run the Spring Boot application:

```bash
mvn spring-boot:run
```

### Access the API

Once the application is running, you can access the API at `http://localhost:8080`.

## API Endpoints

Here are some of the primary endpoints provided by the API:

- **GET /mutants-records/**: Retrieve all resources.
- **GET /mutants-records/{id}**: Retrieve a specific resource by ID.
- **POST /mutants-records/**: Create a new resource.
- **PUT /mutants-records/{id}**: Update an existing resource by ID.
- **DELETE /mutants-records/{id}**: Delete a resource by ID.

### Example Request

To create a new resource, you can use the following `curl` command:

```bash
curl -X POST http://localhost:8080/mutants-records/ \
     -H "Content-Type: application/json" \
     -d '{
            "id": 10,
            "name": "Nightcrawler",
            "realName": "Kurt Wagner",
            "level": "Beta",
            "mutantPowers": [
            "Teleportation", "Super Agility", "Prehensile Tail"
            ],
            "description": "Nightcrawler is a mutant who possesses the ability to teleport, as well as incredible agility and a prehensile tail.",
            "image": "https://comicvine.gamespot.com/a/uploads/scale_small/12/124259/8645156-ezgif-1-0f4e60d046.jpg"
  }'
```

## Database

The database was created using docker with the following command:

```bash
docker run -e POSTGRES_HOST_AUTH_METHOD=trust -e POSTGRES_USER=backend -e POSTGRES_PASSWORD=backend -e POSTGRES_DB=backenddb -p 5434:5432 postgres:14
```

To Start and stop the docker container use the commands below:

```bash
docker stop peaceful_albattani
docker start peaceful_albattani
```

## Automated Tests for Persistence Layer

This project includes automated tests for the data persistence layer using Spring Boot, JUnit, and H2 Database. These tests ensure that the CRUD operations for `MutantRecord` entities are functioning correctly.

### Test Dependencies

The following dependencies are required for running the tests:

- `spring-boot-starter-test`: Provides support for testing Spring Boot applications.
- `h2`: An in-memory database for fast and isolated testing.

### Test Structure

The tests are located in the `src/test/java` directory and cover the basic CRUD operations for the `MutantRecord` entity. The primary test class is `MutantRecordsRepositoryTest`.

### Test Descriptions

1. **testSaveMutantRecord**:

   - Verifies that a new `MutantRecord` can be saved correctly in the database.
   - Ensures the generated ID is not null after saving.

2. **testFindAllMutantRecords**:

   - Verifies that all `MutantRecord` entities can be retrieved from the database.
   - Ensures the correct number of records are returned.

3. **testFindMutantRecordById**:

   - Verifies that a specific `MutantRecord` can be retrieved by its ID.
   - Ensures the retrieved record matches the expected values.

4. **testDeleteMutantRecord**:
   - Verifies that a `MutantRecord` can be deleted correctly from the database.
   - Ensures the record is no longer present after deletion.

### Running the Tests

You can run the tests using an IDE (such as IntelliJ IDEA or Eclipse) or via the command line using Maven or Gradle.

#### Using Maven:

```sh
./mvnw test
```

On Windows:

```sh
mvnw.cmd test
```

#### Using Gradle:

```sh
./gradlew test
```

On Windows:

```sh
gradlew.bat test
```
## Data Change History Functionality

This project includes a feature to track the history of changes made to `MutantRecord` entities. This functionality is crucial for auditing and traceability purposes. 

### How It Works

1. **Entity Setup**:
   - The `MutantRecordHistory` entity is created to store the history of changes. Each entry records the state of a `MutantRecord` before a change, the timestamp of the change, and the type of change (CREATE, UPDATE, DELETE).

2. **Service Layer**:
   - The `MutantRecordService` is responsible for handling the business logic of `MutantRecord` operations. For each create, update, or delete operation, the service saves the current state of the `MutantRecord` into the `MutantRecordHistory` table.
   - The `saveHistory` method in `MutantRecordService` handles the logging of changes by creating a new `MutantRecordHistory` entry.

3. **Endpoints**:
   - New endpoints are added to the `MutantRecordController` to allow querying the history of changes for a specific `MutantRecord`.
   - Example: To get the history of a specific record, use the endpoint `/mutants-records/{id}/history`.

### Usage

- **Create**: When a new `MutantRecord` is created, an entry is made in the history with the type `CREATE`.
- **Update**: When an existing `MutantRecord` is updated, an entry is made in the history with the type `UPDATE`.
- **Delete**: When a `MutantRecord` is deleted, an entry is made in the history with the type `DELETE`.

### Example

To fetch the history of changes for a `MutantRecord` with ID 1:

```sh
GET /mutants-records/1/history
```

This will return a list of `MutantRecordHistory` entries, showing the previous states of the record along with the timestamps and types of changes.

## Troubleshooting

### Common Issues

1. **Port Already in Use**: If port 8080 is already in use, you can change the port by modifying the `application.properties` file:

   ```properties
   server.port=8081
   ```

2. **Dependency Issues**: Ensure all dependencies are correctly specified in the `pom.xml` file and try running `mvn clean install` again.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or need further assistance, feel free to contact the project maintainer at [fabio.pnunes@al.infnet.edu.br](mailto:fabio.pnunes@al.infnet.edu.br).

