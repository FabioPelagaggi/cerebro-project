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
cd cerebro-project
```

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

---

Happy coding!