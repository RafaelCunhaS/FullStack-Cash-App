# Cash App

<details>
  <summary markdown="span"><strong>Português :brazil:</strong></summary><br />

### 📋 Dependências para rodar o app

- Docker-compose -> Seu docker-compose precisa estar pelo menos na versão 1.29 [Veja a documentação para instruções de como instalar/atualizar](https://docs.docker.com/compose/install/)

### 🔧 Como rodar o app

```bash
    # Clone o repositório
    $ git clone git@github.com:RafaelCunhaS/FullStack-Cash-App.git

    # Vá até a pasta criada
    $ cd FullStack-Cash-App

    # Suba os containers com o docker-compose, o app estará rodando em plano de fundo em seu 
    # localhost na porta 3000 (http://localhost:3000/) quando a construção acabar
    $ docker-compose up -d --build

    # Quando terminar de utilizar o app, desfaça os containers criados
    $ docker-compose down --remove-orphans
```

### Quando o processo de construção dos containers terminar, o app estará rodando em [localhost:3000](http://localhost:3000/)

### Documentação da API do backend estará em [localhost:3001/docs](http://localhost:3001/docs/)
  
### O banco de dados estará rodando na porta _3002_

#### Os seguintes usuários(as) já estarão no banco de dados do app para teste de Login e Transações
- username: Joaozinho | password: 1234567Z

- username: Mariazinha | password: Z7654321

- username: Zezinho | password: ASDFGHJ1
<br />
</details>

<details>
  <summary markdown="span"><strong>English :us:</strong></summary><br />

### 📋 Dependencies to run the app

- Docker-compose -> Your docker-compose needs to be at version 1.29 or higher [Veja a documentação para instruções de como instalar/atualizar](https://docs.docker.com/compose/install/)

### 🔧 How to run the app

```bash
    # Clone the repository
    $ git clone git@github.com:RafaelCunhaS/FullStack-Cash-App.git

    # Go into the project's directory
    $ cd FullStack-Cash-App

    # Build the project (the project will be running on the background when the build is finished)
    $ docker-compose up -d --build

    # When you're finished with the app, remove the containers previously built
    $ docker-compose down --remove-orphans
```

### When the build is finished the project will be running on your  [localhost:3000](http://localhost:3000/)

### Backend API documentation made with Swagger will be on [localhost:3001/docs](http://localhost:3001/docs/)
  
### The database will be running on port _3002_

#### The following users will be already registered on the db for test cases
- username: Joaozinho | password: 1234567Z

- username: Mariazinha | password: Z7654321

- username: Zezinho | password: ASDFGHJ1
<br />
</details>
