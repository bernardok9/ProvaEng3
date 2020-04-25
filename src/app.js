/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
import express from 'express';
import cors from 'cors';
import { uuid } from 'uuidv4';



const app = express();
app.use(express.json());
app.use(cors());


let products = []; //id, code, description, buyPrice, sellPrice, tags:[], lovers;

app.get('/products', (request, response) => { //Okay
  // TODO: listagem de todos os produtos

  response.json(products);
});

app.post('/products', (request, response) => { //FAZER O TESTE DO LOVERS PRA SABER SE PODE ZERAR OU ALTERAR COM OS EXISTENTES
  // TODO: Salvar produto no array products
  const product = request.body;
  product.id = uuid();
  products.filter(num => num.code == product.code);
  products.push(product);

  response.status(201).json(product);

});

app.put('/products/:id', (request, response) => { //AJEITAR SE NÃO EXISTIR
  // TODO: Atualiza produto por ID
  const id = request.params.id;
  const code = request.body.code;
  const description = request.body.description;
  const buyPrice = request.body.buyPrice;
  const sellPrice = request.body.sellPrice;
  const tags = request.body.tags;

  let product = products.filter(num => num.id = id);
  product[0].code = code;
  product[0].description = description;
  product[0].buyPrice = buyPrice;
  product[0].sellPrice = sellPrice;
  product[0].tags = tags;



  response.json(product);
});


app.delete('/products/:code', (request, response) => {
  // TODO: Remove TODOS os produtos que possuam o código passado por parâmetro
  const {code} = request.params;
  const product = products.findIndex(num => num.code == code);
  if(product == -1){
    response.status(400).send();
  }else{
    products.splice(product,1);
    response.status(204).send();
  }
  

});


app.post('/products/:code/love', (request, response) => {
  // TODO: Incrementa em 1 o número de lovers de todos os produtos que possuam 
  // o code do parâmetro
  const product = products.map(num => num.code == request.params.code ? num.lovers++: num.lovers)
  response.json(products)
});

app.get('/products/:code', (request, response) => { //okay
  // TODO: Busca de todos os produtos com o código recebido por parâmetro.
  const {code} = request.params;
  const product = products.find(num => num.code == code);
 
  if(product == undefined){
    response.status(204)
  }  

  response.json(product);

});

export default app;
