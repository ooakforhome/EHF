const Product = require ('../models/Product_model');

module.exports = {
  getProductsBasic: function(req, res){
    let category_type = req.query.category_type;
    // let offset = parseInt(req.query.offset);
    // let limit = parseInt(req.query.limit);

    const query = Product
      .find({Category_type: category_type})
      .select('-UPC -Zone_8 -wholesale_price')
      .sort({ Category_type:1 })
      // .limit(limit)
      // .skip(offset*limit);

    return Promise.all([query, Product.find({Category_type: category_type}).countDocuments()])
    .then((results) => {
      return res.json({
       all: results[0],
       count: results[1],
       // offset: offset,
       // limit: limit
      });
    });
  },

  getProductByIdBasic: function(req, res){
    Product
      .findById(req.params._id)
      .select('-UPC -Zone_8 -wholesale_price -Product_Shipping_Method -Cubic_Feet')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  searchProduct: function(req, res){
    // let offset = parseInt(req.query.offset);
    // let limit = parseInt(req.query.limit);
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
      .select('-UPC -Zone_8 -wholesale_price')
      // .limit(limit)
      // .skip(offset*limit);

    return Promise.all([query, Product.find({
      $or:[
        {'SKU': search },
        {'Category_type': search },
        {'Color': search },
        {'Product_Name': search}
      ]
      }).countDocuments()])
    .then((results) => {
      return res.json({
       all: results[0],
       count: results[1],
       // offset: offset,
       // limit: limit
      });
    });
  }


};
