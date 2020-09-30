### TUTORIAL DE CRIACAO DE SERVIDOR EM NODEJS COM SEQUELIZE

###### PARTE01

- Instale o nodejs, busque no google e instale, v12 e ultima versão estavel;
- Instale o Yarn, https://classic.yarnpkg.com/pt-BR/docs/install/#windows-stable ;
- Crie uma pasta e abre-a no vscode, abra tbm um terminal com caminho desta pasta;
- Rode npm init -y, este comando irá criar na pasta do projeto um package.json um arquivo que guarda as informações do projeto, nome, descricção, dependencias, etc;
- instalaremos algumas dependencais:
	- yarn add express (Frameword para criar aplicação servidor)
	- yarn add cors (Dependencia de authorizacao de acesso remoto na API)
	- yarn add dotenv (Dependencia de variavel d ambiente)
	- yarn add sequelize (Dependencia de banco de dados sequelize)
	- yarn add mysql2 (Dependencia de drive do banco)
	- yarn add -D nodemon (dependencia de desenvolvimento para rodarmos nosso ambiente)
	- yarn add -D sucrase (dependencia de desenvovimento para buildar o javascript)
	- yarn add -D sequelize-cli (dependencia de desenvovimento do sequelize)
	
>>Esses comando pode rodar tudo em um script so, por exemplo:
yarn add express cors dotenv sequelize mysql2
yarn add -D nodemon sucrase sequelize-cli


###### > Na raiz do projeto crie um arquivo nodemon.json com o conteudo:
>>este e para quando buildarmos, ele converter nosso javascript os arquivos imports.
```js
{
	"execMap":{
		"js": "sucrase-node"
	}
}
```

###### > No arquivo package.json, procure a orientação "scripts" e crie um novo script, ficara assim:
>>esse script dev sera rodado no terminal posteriormente assim "npm run dev", e executara o nodemon lendo no arquivo na pasta e criando o servidor.
```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon src/server.js"
  },
```

###### > Crie um arquivo na raiz do projeto chamado .env e coloque o conteudo abaixo:
```js
  PORT=3333
```


###### > Na do projeto crie uma pasta chamada src, e dentro dentra um arquivo chamado server.js, app.js e routes.js, neste arquivo coloque o conteudo:

#Arquivo Server.js
```js
import app from "./app.js";

const PORT = process.env.PORT || 3333;
app.listen(PORT);
```

#Arquivo app.js
```js
import express from "express";
import cors from "cors";
import routes from "./routes.js";

const app = express();
app.use(cors());
app.use(routes);

export default app;
```

#Arquivo routes.js
```js
import {Router} from "express";
const routes = new Router();

routes.get("/", (res, req) => {
	return res.status(200).json({ok: "Hello World"});
});

export default routes;
```


###### > Agora salvando tudo e indo no terminal na raiz de nosso projeto e rodarmos o script que criamos "npm run dev" ou "yarn dev", o nodemon sera acionado e lerá o arquivo server.js, ao abrirmos o navegador, e digitamos http://127.0.0.1:3333 sera mostrado na tela hello world.

##

###### PARTE02

###### > Vamos criar um controller para automatizar melhor nossas rotas, em src crie uma pasta app e dentro dela uma pasta controllers e um arquivo chamado HomeController.js ficando assim:
>>src/app/controllers/HomeController.js
o HomeController.js sera uma classe JS e nela vamos transportar o (req, res) do arquivo de routes e trazendo para o controller para facilitarmos e organizarmos nosso projeto.

```js
class HomeController {
	async index(req, res){
	return res.status(200).json({message: "Hello World!"});
	}
}
export default new HomeController();
```
>>E vamos alterar nosso arquivode routes para:

```js
import {Router} from "express";
import HomeController from "./app/controlles/HomeController.js";
const routes = new Router();

routes.get("/", HomeController.index);

export default routes;
```

>>Rodando nosso projeto novamente, vai continuar rodando normalmente.


###### PARTE03

Nesta parte vamos iniciar com banco de dados usando sequelize e configurando mais ainda nosso projeto.
Primeiramente vamos criar um arquivo .sequelizerc para mapear os arquivos e pastas que o sequelize interpretará.

```js
const {resolve} = require('path');

module.exports = {
  config: resolve(__dirname, 'src', 'config', 'database.js'),
  'models-path': resolve(__dirname, 'src', 'app', 'models'),
  'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
  'seeders-path': resolve(__dirname, 'src', 'database', 'seeds'),
}


```

> Dentro de src crie uma pata config e um arquivo database.js
/src/config/database.js

```js
"use strict";
require('dotenv/config');

module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
```

*Lembrando que eh necessario criar no .env as variaveis citadas acima:
```js
#banco de dados 
DB_HOST=127.0.0.1
DB_NAME=gildb
DB_USER=root
DB_PASS=
```

> Dentro da pasta app criar uma pasta Models
/src/app/models
(posteriormente criaremos um arquivo aqui)


> Dentro da pasta src criar uma pasta database e dentro dela um arquivo index.js, uma pasta migration e uma pasta seeds
/src/database/index.js
/src/database/migrations/
/src/database/seeds/

O Arquivo Index.js e para centralizar a indexacao e incializacao da conexao com banco de dados, para isso apos esse arquivo criado no arquivo app.js crie a importacao do mesmo la, ficando assim

```js
.
.
.
//Antes da criacao do app instanciando  express
import "./database/index.js"

const app = express();
.
.
.
export default app
```

>>Agora vamos criar um arquivo da pasta models chamdo User.js /src/models/User.jssera uma classe em JS e este sera um espelho da tabela que teremos no banco de dados, contendos os campos os tipos dos campos etc.

```js
import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      mail: Sequelize.STRING,
      age: Sequelize.INTEGER,
      pass: Sequelize.STRING,      
    
    },
      {
        sequelize,
        tableName: 'cad_users'
      }
    );
    
     return this;

  }
}
export default User;

```

>>Vamos criar nossa classe no database/index.js para conectar no banco de dados

```js
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';

//Aqui sera um array que carregara todos os espelhos das tabelas, posteriormente o map fara a associacao
const models = [
  User,  
];

class Database {
  constructor(){
    this.init();
  }

  init(){
    this.connection = new Sequelize(databaseConfig);
    models
    .map(model=> model.init(this.connection) )
    .map(model=> model.associate && model.associate(this.connection.models) );
  }
}
export default new Database();
```

>>Vamos criar um arquivo create-table-users na pasta /src/database/migrations/ esse arquivo sera o que criara de fato o banco de dados, para isso vamos usar um comando: 
yarn sequelize migration:create --name=create-users
apos o --name voce pode colocar o nome que quiser mas ele ja criar padrao, pq antes do nome tem data e hora que padroniza a sequencia de criacao das tabelas.
Apos executar na pasta migrations tera uma arquivo criar vamos edita-lo e ficara assim:

```js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('cad_users', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      mail:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      age:{
        type: Sequelize.INTEGER,
        allowNull: false,
        
      },
      pass:{
        type: Sequelize.STRING,
        allowNull: false,
      
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cad_users');
  }
};

```

>>Vamos criar um arquivo na pasta /src/database/seeds este sera um arquivo que criara dados automatico no banco, nao e algo obrigatorio, mas por exemplo acabei de implantar um sistema pelo menos 01 usuario eu preciso para fazer o primeiro acesso, entao com o seed podemos automatizar isso.
Para isso vamos usar um comando: yarn sequelize seed:generate --name users
Sera criado um arquivo na pasts seeds

```js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cad_users', [
     { name: 'admin', mail: 'admin@mail.com', age:29, pass: '123456', created_at: new Date(), updated_at: new Date()},
    ], {});
    
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cad_users', null, {});
  }
};

```
>> Agora com tudo pronto podemos rodar todo projeto para isso seguiremos assim:

- Primeiro no workbench rode o comando create database nome_banco, lembrando que o nome_banco e o mesmo da sua variavel DB_NAME;
- No comander rode o comando yarn sequelize db:migrate este ira criar a tabela da migration criada
- No comander rode  o comando yarn sequelize db:seed:all este ira rodar os seeds e popular os dados
- Estando tudo certo rode yarn dev e inicie seu servidor

###### PARTE04

No Home Controller vamos fazer uma busca e retorno usuarios para isso vamos alterar o arquivo para:

```js
import Sequelize from "sequelize";
import User from "../models/User";

class HomeController {
    async index(req, res) {
       try {
        let users = await User.findAll();

        return res.status(200).json(users)
    } catch (error) {
        console.log("ocorreu um erro", error)
        return res.status(400).json({error:"ocorreu um erro"})
           
       }
    }



}
export default new HomeController();

```


>>Agora se formo no navegador e digitarmos 127.0.0.1:3333 ele ira na rota / entrara no controller e fara o select no banco de todos os usuarios cadastrados.


---
Desenvolvido por: [Gil](https://github.com) | [Igor](https://github.com) | [Joilson](https://github.com)
