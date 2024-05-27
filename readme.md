# Payment App Notifier

## Como executar
Configure as variaveis de ambiente de payment-app\notification-service\.env
```
USER_EMAIL="emaildestion@mail.com"
EMAIL="email@mail.com"
EMAIL_PASSWORD="emailsenha"
```

 Execute o arquivo docker compose para realizar a criação dos recursos necessários. 
```
docker-compose up
```
 Acesse o diretorio payment service. 
```
cd payment-service
```
 Execute o seguinte comando para criação de estruturas de PAYMENT dentro do banco de dados.
```
prisma migrate dev
```
Execute o seguinte comando para realizar a instalação das dependencias do projeto.
```
npm install
```
Execute este comando para iniciar a aplicação de payment.
```
npm start
```
 Acesse o diretorio notification service. 
```
cd notification-service
```
 Execute o seguinte comando para criação de estruturas de NOTIFICATION dentro do banco de dados.
```
prisma migrate dev
```
Execute o seguinte comando para realizar a instalação das dependencias do projeto.
```
npm install
```
Execute este comando para iniciar a aplicação de notification.
```
npm start
```

## ENVIAR
`POST: localhost:3000/credit-card/send`
```
{
    "idUser": string,
    "orderNumber": integer,
    "orderValue": double
}
```
}
## BUSCAR
`GET: localhost:3001/mail/get?idUser={idUser}`
