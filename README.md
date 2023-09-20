# API exemplo em Node.js Rest com Express & MySQL

## Preparar ambiente
```bash
npm i
```
- Instalar docker
- Importar os seguintes containers:

### rodar mysql

```bash
docker run --name mysql-local-lowercase -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:5.6 --lower_case_table_names=1
```

### criar tabela mysql
```sql
CREATE DATABASE testdb;
USE testdb;
CREATE TABLE IF NOT EXISTS `tutorials` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description varchar(255),
  published BOOLEAN DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

## abrindo o servidor

```bash
npm start
```

quando aparecer a msg "Server is running on port 8080.", pronto :)
