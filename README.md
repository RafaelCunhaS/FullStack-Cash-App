# Desafio NG.CASH

### 📋 Dependencias para rodar o app

- Docker-compose -> Seu docker-compose precisa estar pelo menos na versão 1.29 [Veja a documentação para instruções de como instalar/atualizar](https://docs.docker.com/compose/install/)

### 🔧 Como rodar o app

```bash
    # Clone o repositório
    $ git clone git@github.com:RafaelCunhaS/NG.CASH-Desafio.git

    # Vá até a pasta criada
    $ cd NG.CASH-Desafio

    # Suba os containers com o docker-compose, o app estará rodando em plano de fundo em seu 
    # localhost na porta 3000 (http://localhost:3000/) quando a construção acabar
    $ docker-compose up -d --build

    # Quando terminar de utilizar o app, desfaça os containers criados
    $ docker-compose down --remove-orphans
```

### Quando o processo de construção dos containers terminar, o app estará rodando em [localhost:3000](http://localhost:3000/)

### Documentação da API do backend estará em [localhost:3001/docs](http://localhost:3001/docs/)

#### Os seguintes usuários(as) já estarão no banco de dados do app para teste de Login e Transações
- username: Joaozinho | password: 1234567Z

- username: Mariazinha | password: Z7654321

- username: Zezinho | password: ASDFGHJ1
