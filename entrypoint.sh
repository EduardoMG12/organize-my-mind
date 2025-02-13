#!/bin/bash

# Aguarda o banco de dados MySQL ficar saudável
while ! mysqladmin ping -h mysql -u user -ppassword; do
  sleep 1
  echo "Aguardando o MySQL..."
done

echo "MySQL está saudável. Executando migrations..."

# Roda as migrations do TypeORM
bun run migration:run

echo "Migrations concluídas. Iniciando a aplicação..."

# Inicia a aplicação NestJS
bun run start:dev