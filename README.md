# Teste Pill

Este repositório contêm uma API e um cliente, onde a API provê um endpoint que recebe a URL de uma página de produto, faz a coleta de dados e retorna as informações. Já o cliente recebe uma URL via `query string`, consulta a API e em caso de sucesso exibe os dados do produto.

## Intalação

Este projeto utiliza Docker para rodar os servidores e o banco de dados, para realizar a instalação você vai precisar seguir 2 passos:

1. Primeiro Passo: subir os container's

Para isso execute:

`docker-compose up --build`

Isso fará com que o docker "crie" um container para a API (backend), para o Cliente (frontend) e para o Bando de dodos (MySQL). Se tudo correr bem você já terá as aplicações sendo executadas, porém ainda não estará pronto pois o banco de dados e suas tabelas ainda não foram criados, para isso siga o passo 2.

2. Segundo passo: executar os scripts do banco de dados

Na raiz do projeto você deve encontrar um diretório chamado scripts com 3 arquivos, acesso o banco de dados utilizando seu cliente preferido e utilize os dados abaixo para conexão.

**Importante:** Os scripts devem ser executados na ordem correta.

**Dados para conexão com o banco** 
MYSQL_HOST: localhost 
MYSQL_PORT: 3306 
MYSQL_USER: root 
MYSQL_PASSWORD: mysecretpassword 
MYSQL_DATABASE: test_pill 

Obs.: Se tiver problemas talvez seja necessário utilizar o nome do serviço ao invés de localhost, tente mudar para `mysql`.

Se tudo correu bem você já pode acessar o cliente, lembrando que é necessário passar o endereço do produto. Exemplo: http://localhost:3000/?url=https://www.drogasil.com.br/naldecon-pack-blister-com-6-comprimidos.html

## API

Uma parte importante deste projeto é a API, para conhecer melhor sobre suas rotas, como realizar requisições e quais retornos [acesse a documentaçãoo da API](api/README.md).

## Desenvolvimento

### API

### Client