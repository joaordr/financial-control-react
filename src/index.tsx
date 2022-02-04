import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { createServer, Model } from 'miragejs';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Desenvolvimento de site',
          category: 'Dev',
          type: 'deposit',
          amount: 5000,
          createdAt: new Date('2021-03-10'),
        },
        {
          id: 2,
          title: 'Aluguel',
          category: 'Casa',
          type: 'withdraw',
          amount: 5000,
          createdAt: new Date('2021-05-05'),
        },       
      ],
    })
  },

  routes() {
    this.namespace = "api";
    this.get('/transactions', () => {
      return this.schema.all('transaction');

    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data);
    })

  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);