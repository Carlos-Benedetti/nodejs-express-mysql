# API exemplo em Node.js Rest com Express & MySQL

## Preparar ambiente
```bash
npm i
```
- Instalar docker
- Importar os seguintes containers:

1. ### Rodar mysql

    ```bash
    docker run --name mysql-local-lowercase -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:5.7 --lower_case_table_names=1
    ```

1. ### Criar um novo banco
    ```sql
    CREATE DATABASE synapse;
    ```

1. ### Selecionar o banco para uso
    ```sql
    USE synapse;
    ```

1. ### Criar a tabela para usuarios
    ```sql
    CREATE TABLE IF NOT EXISTS `user` (
      id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
      login varchar(255) NOT NULL,
      password_hash varchar(255) NOT NULL,
      first_name varchar(50),	
      last_name varchar(50),
      image_url varchar(250),
      active BOOLEAN DEFAULT true,
      last_modified_date timestamp
    );
    ```
1. ### Criar a tabela para ordens

    ```sql
    CREATE TABLE IF NOT EXISTS `order` (
      id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
      userId int,
      last_modified_date timestamp,
      FOREIGN KEY (userId) REFERENCES User(id)
    );
    ```

## abrindo o servidor

```bash
npm start
```

quando aparecer a msg "Server is running on port 8080.", pronto :)
