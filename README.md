# Desafio NG.CASH

### 📋 Dependencias para rodar o app

- Docker-compose -> Seu docker-compose precisa estar pelo menos na versão 1.29 [Veja a documentação para instruções de como instalar/atualizar](https://docs.docker.com/compose/install/)

### 🔧 Como rodar o app

```bash
    # Clone o repositório
    $ git clone git@github.com:RafaelCunhaS/NG.CASH-Desafio.git

    # Vá até a pasta criada
    $ cd NG.CASH-Desafio

    # Suba os containers com o docker-compose (o app estará rodando em plano de fundo em seu  localhost na porta 3000 (http://localhost:3000/) quando a construção acabar)
    $ docker-compose up -d --build

    # Os seguindo usuários(as) já estarão no banco de dados do app para teste de Login e Transações
    username: Joaozinho
    password: 1234567Z

    username: Mariazinha
    password: Z7654321

    username: Zezinho
    password: ASDFGHJ1

    # Quando terminar de utilizar o app, desfaça os containers criados
    $ docker-compose down --remove-orphans
```

### Quando o processo de construção dos containers terminar, o app estará rodando em [localhost:3000](http://localhost:3000/)

#### Os seguintes usuários(as) já estarão no banco de dados do app para teste de Login e Transações
username: Joaozinho
password: 1234567Z

username: Mariazinha
password: Z7654321

username: Zezinho
password: ASDFGHJ1

## Backend
<details>
 <summary>Endpoints</summary>
  
  <details>
  <summary>Descrições</summary>
  
  |  | Método | Descrição |
  |---|---|---|
  | 01 | `POST - http://localhost:3001/login` | Efetua o login do usuário. |
  | 02 | `POST - http://localhost:3001/register` | Cria um novo usuário. |
  | 03 | `POST - http://localhost:3001/transaction` | Cria uma nova transação. |
  | 04 | `GET - http://localhost:3001/transaction?date=2022-11-18&type=cashOut` | Busca todas transações que envolvem o usuário (queries para filtragem são aceitas). |
  | 05 | `GET - http://localhost:3001/account` | Busca o saldo em conta do usuário. |
  
  </details>
  
  ### Validando token nas requisições
  
  - Todo o endpoint que <strong>NÃO</strong> precisar validar o `token` terá o símbolo :x: ao lado. Para todos os demais, será necessário fazer a validação de credenciais de autenticação informadas no cabeçalho da requisição HTTP authorization.
  
  - O `token` já possui informações do usuário (accountId e username) que podem ser utilizadas pelo frontend decodificando o JWT.
  
  - Os endpoints que precisarem do `token`, deverão recebê-lo através do Headers.Authorization.
  
  <details>
  <summary>Casos de erro de token</summary>
  
  - Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
  
              {
                "message": "Token not found"
              }
  
   - Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
  
              {
                "message": "Expired or invalid token"
              }
  
  </details>

  ## Respostas em caso de sucesso
  
  ### I - Login (`/login`)
  #### [POST `/login`] :x:
  
  <details>
  
  + Request (application/json)
  + Body
    
            {
              "username": "Joaozinho",
              "password": "1234567Z"
            }
  
  + Response 200 Ok (application/json)
  
            {
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MSwicm9sZSI6ImFkbWluaXN0cmF0b3IifSwiaWF0IjoxNjYwMjgwMTIxLCJleHAiOjE2NjA4ODQ5MjF9.1j9MEbNaFI9y1Fv0vaMIM56wPNbH-df4subWyQd6OX4"
            }
  
  </details>
  
  ### II - Register (`/register`)
  #### [POST `/register`] :x:
  
  <details>
  
  + Request (application/json)
  + Body
  
            {
              "username": "newCustomer012",
              "password": "%new-customer%"
            }
  
  + Response 201 Created (application/json)
  
            {
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6NCwicm9sZSI6ImN1c3RvbWVyIn0sImlhdCI6MTY2MDI3Nzg5NywiZXhwIjoxNjYwODgyNjk3fQ.KbyaKb69XywMwtEq0-CqpdJl8G0jkfJsnme8qAxg3So"
            }
  
  </details>
  
  ### III - Transaction (`/transaction`)
  #### [POST `/transaction`]
  
  <details>
  
  + Request (application/json)
  + Body
  
            {
              "username": "Joaozinho",
              "value": 12
            }
  
  + Response 201 Created (application/json)
  
            {
              "id": 4,
              "debitedAccountId": 4,
              "creditedAccountId": 1,
              "value": "12.00",
              "createdAt": "2022-11-21T02:15:29.867Z"
            }
  
  </details>
  
  #### [GET `/transaction`]
  
  <details>
  
  + Response 200 Ok (application/json)
  
            [
              {
                "id": 2,
                "debitedAccountId": 2,
                "creditedAccountId": 1,
                "value": "100.00",
                "createdAt": "2022-11-18T14:19:00.996Z",
                "debited_account_id": 2,
                "credited_account_id": 1,
                "debitedUser": {
                  "username": "Mariazinha"
                },
                "creditedUser": {
                  "username": "Joaozinho"
                }
              },
              {
                "id": 3,
                "debitedAccountId": 3,
                "creditedAccountId": 2,
                "value": "10.00",
                "createdAt": "2022-11-19T14:19:00.996Z",
                "debited_account_id": 3,
                "credited_account_id": 2,
                "debitedUser": {
                  "username": "Zezinho"
                },
                "creditedUser": {
                  "username": "Mariazinha"
                }
              },
              {
                "id": 1,
                "debitedAccountId": 1,
                "creditedAccountId": 2,
                "value": "100.00",
                "createdAt": "2022-11-17T14:19:00.996Z",
                "debited_account_id": 1,
                "credited_account_id": 2,
                "debitedUser": {
                  "username": "Joaozinho"
                },
                "creditedUser": {
                  "username": "Mariazinha"
                }
              }
            ]
  
  </details>
  
  ### IV - Account (`/account`)
  #### [GET `/account`]
  
  <details>
  
  + Response 200 Ok (application/json)
  
            {
              "id": 2,
              "balance": "110.00"
            }
  
  </details>
</details>