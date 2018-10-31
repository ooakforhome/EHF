const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/EHF_test');
  mongoose.connection
    .once('open', () => done())
      .on('error', error => {
        console.warn("Test Warning", error);
      });
});

beforeEach(done => {
  const { products } = mongoose.connection.collections;
  products.drop()
    .then(() => done())
      .catch(() => done());
})
