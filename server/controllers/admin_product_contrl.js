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
      .catch(err => res.status(422).json({"error": err}));
  },

  // add
  addProduct: function(req, res) {
    Product
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  updateProduct: function(req, res) {
    Product
      .findOneAndUpdate({ _id: req.params._id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  deleteProduct: function(req, res) {
      Product
        .findOneAndDelete({ _id: req.params._id })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  },
  searchProductFromAdmin: function(req, res){
    let offset = parseInt(req.query.offset);
    let limit = parseInt(req.query.limit);
    let search = { $regex: req.query.search, $options: 'i' }
    // User.find( { $or:[ {'_id':objId}, {'name':param}, {'nickname':param} ]}
    const query = Product
      .find({
        $or:[
          {'SKU': search },
          {'Category_type': search },
          {'Color': search },
          {'Product_Name': search}
         ]
        })
      .limit(limit)
      .skip(offset*limit);

    return Promise.all([query, Product.find({
      $or:[
        {'SKU': req.query.search},
        {'Category_type': req.query.search},
        {'Color': req.query.search}]
      }).countDocuments()])
    .then((results) => {
      return res.json({
       all: results[0],
       count: results[1],
       offset: offset,
       limit: limit
      });
    });
  }

};
