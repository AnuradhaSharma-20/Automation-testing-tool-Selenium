 //This is my server.js file//
const application = require('./app.js');


application.listen(3000, function () {
  console.log("started listeing on localhost:3000 ");
});

//This is my app.js file//
const express = require('express');
const logic = require('./logic.js');
const app = express();


app.use(express.json());

app.get('/api/products', async (req, res) => {
  const products = await logic.getAllProducts();
  res.json(products);
});

app.get('/api/products/:id', async (req, res) => {
  const product = await logic.getProductById(req.params.id);
  if (product) return res.status(404).send('Product not found');
  res.json(product);
});

app.post('/api/products', async (req, res) => {
  const product = await logic.createProduct(req.body);
  res.status(201).json(product);
});

app.put('/api/products/:id', async (req, res) => {
  await logic.updateProduct(req.params.id, req.body);
  res.sendStatus(204);
});

app.delete('/api/products/:id', async (req, res) => {
  await logic.deleteProduct(req.params.id);
  res.sendStatus(204);
});

/*app.delete('/api/products', async (req, res) => {
  await logic.deleteAllProducts();
  res.sendStatus(204);
});
*
app.get('/api/products', async (req, res) => {
  const products = await logic.getProductsByName(req.query.name);
  res.json(products);
}); */

module.exports = app;
// this is my integration test.js file//
const request = require('supertest');
const server = require('../../app.js');

const expect = require('chai').expect;
describe('Integration Tests', () => {
    let createdProductId;
    before(async () => {
        // Here you can set up your test database if necessary
    });
    after(async () => {
        // Clean up your test database if necessary
    });
    it('should retrieve all products', async () => {
        const res = await request(server).get('/products');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });
    it('should create two new product', async () => {
        const newProduct = { name: 'Test Chair', description: 'A comfortable test chair', price: 50.00, quantity: 5, category: 'Test Furniture' };
        const res = await request(server).post('/products').send(newProduct);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('number');
        const newProduct1 = { name: 'Sofa Chair', description: 'A comfortable test sofa chair', price: 100.00, quantity: 8, category: 'Test Furniture' };
        const res1 = await request(server).post('/products').send(newProduct1);
        createdProductId = res.body.id;
    });
    it('should retrieve a product by ID', async () => {
        const res = await request(server).get(`/products/${createdProductId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(createdProductId);
    });
    it('should update a product', async () => {
        const updatedProduct = { name: 'Updated Test Chair', description: 'An updated test chair', price: 60.00, quantity: 3, category: 'Updated Test Furniture' };
        const res = await request(server).put(`/products/${createdProductId}`).send(updatedProduct);
        expect(res.status).to.equal(204);
        // Verify the update
        const getRes = await request(server).get(`/products/${createdProductId}`);
        expect(getRes.status).to.equal(200);
        expect(getRes.body.name).to.equal('Updated Test Chair');
    });
    it('should retrieve products by name', async () => {
        const newProduct = { name: 'Test Sofa', description: 'A comfortable test sofa', price: 150.00, quantity: 2, category: 'Test Furniture' };
        await request(server).post('/products').send(newProduct);
        const res = await request(server).get('/products?name=Test Sofa');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].name).to.equal('Updated Test Chair');
    });
    it('should delete a product by ID', async () => {
        const res = await request(server).delete(`/products/${createdProductId}`);
        expect(res.status).to.equal(204);
        // Verify the deletion
        const getRes = await request(server).get(`/products/${createdProductId}`);
        expect(getRes.status).to.equal(404); // assuming you return a 404 for not found
    });

});


And i am getting this error below
 1) Integration Tests
       should retrieve all products:

      AssertionError: expected 404 to equal 200
      + expected - actual

      -404
      +200

      at Context.<anonymous> (__tests__\integration\integration.test.js:15:31)
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

  2) Integration Tests
       should create two new product:

      AssertionError: expected 404 to equal 200
      + expected - actual

      -404
      +200

      at Context.<anonymous> (__tests__\integration\integration.test.js:21:31)
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

  3) Integration Tests
       should retrieve a product by ID:

      AssertionError: expected 404 to equal 200
      + expected - actual

      -404
      +200

      at Context.<anonymous> (__tests__\integration\integration.test.js:30:31)
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

  4) Integration Tests
       should update a product:

      AssertionError: expected 404 to equal 204
      + expected - actual

      -404
      +204

      at Context.<anonymous> (__tests__\integration\integration.test.js:37:31)
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

  5) Integration Tests
       should retrieve products by name:

      AssertionError: expected 404 to equal 200
      + expected - actual

      -404
      +200

      at Context.<anonymous> (__tests__\integration\integration.test.js:47:31)
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

  6) Integration Tests
       should delete a product by ID:

      AssertionError: expected 404 to equal 204
      + expected - actual

      -404
      +204
..please find the soluation without chnaging code.







//createdProductId