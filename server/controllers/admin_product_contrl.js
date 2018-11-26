const Product = require ('../models/Product_model');

module.exports = {
  getProductsAdmin: function(req, res){
    let offset = parseInt(req.query.offset);
    let limit = parseInt(req.query.limit);

    const query = Product
      .find({Category_type: req.query.Category_type})
      .sort({ Category_type:1 })
      .limit(limit)
      .skip(offset*limit);

    return Promise.all([query, Product.find({Category_type: req.query.Category_type}).countDocuments()])
    .then((results) => {
      return res.json({
       all: results[0],
       count: results[1],
       offset: offset,
       limit: limit
      });
    });
  },

  getProductByIdAdmin: function(req, res){
    Product
      .findById(req.params._id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }

};
