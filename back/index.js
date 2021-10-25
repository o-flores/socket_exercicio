const express = require('express')
const cors = require('cors');
const app = express();
const PORT = 3001;
const server = require('http').createServer(app);

const Products = require('./models/products');

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET','POST']
  }
});

app.use(cors());

io.on('connection', (socket) => {
  socket.on('increaseValue', async({ id, price }) => {
    if (price <= 100) {
      await Products.increaseValue(id);
      const product = await Products.getById(id);
      io.emit('refreshValue',product);
    }
  });
});

app.get('/products', async (req, res) => {
  const products = await Products.getAll();
  res.status(200).json(products);
});

server.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))