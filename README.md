# 🚀 Organize My Mind - Project Setup Guide

primeiro rode o docker do banco 

```sh

docker-compose up db --build
# Apos isso considere dar esse comando para ver se o banco esta rodando(healthy)
docker ps

```
apos isso rode o typeorm para popular o banco de dados:

```
cd ./api-organize-my-mind

pnpm install

pnpm migration:run

```

apos isso rode o projeto

```

docker-compose up api #Caso queira ocultar as logs da api utilize o -d ao final do comando.

```

Caso queira limpar os dockers utilize estes 2 comandos abaixo:

```

docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q) && docker rmi $(docker images -a -q) && docker volume prune -f && docker network prune -f && docker builder prune -f

docker-compose down -v

```

## 📌 Prerequisites

-   🐳 Docker and Docker Compose installed
-   🖥️ Basic knowledge of terminal commands

## 🛠️ Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/organize-my-mind.git
    ```
2. Navigate to the project folder:
    ```sh
    cd organize-my-mind
    ```

## 🏗️ Setting Up and Running the Project

1. Start the services using Docker Compose:

    ```sh
    docker-compose up -d
    ```

    - This will start both the MySQL database and the API.
    - The first run might take longer as it downloads the required images.

2. Check if the containers are running:

    ```sh
    docker ps
    ```

    - Ensure that `api_organize_my_mind` and `mysql_organize_my_mind` are up.

3. Access the API (if applicable):
    - Open your browser or use Postman to make requests to `http://localhost:3000`

## 🛑 Stopping the Project

To stop the running containers:

```sh
docker-compose down
```

## 🧹 Cleaning Up Docker Resources

If you need to remove unused Docker data and free up space:

```sh
docker system prune -a
```

-   **Warning ⚠️**: This will remove all stopped containers, networks, and images not in use.

Enjoy using **Organize My Mind**! 🎯
