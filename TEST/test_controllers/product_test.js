const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server/server');

const Product = mongoose.model('Product');

describe('product controller', () => {
  it('Post to /api/products', (done)=> {
    Product.count().then(count => {
      request(app)
        .post('/api/products')
          .send({ Product_Name: "ChooChooooo" })
            .end(()=> {
              Product.count().then(newCount => {
                assert(count + 1 === newCount);
                done();
              })
            })
    })
  });



}); // end describe
