const Product = require ('../models/Product_model');

module.exports = {
  getProductsBasic: function(req, res){
    let offset = parseInt(req.query.offset);
    let limit = parseInt(req.query.limit);

    const query = Product
      .find({Category_type: req.query.Category_type})
      .select('-UPC -Zone_8 -wholesale_price -Retail')
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

  getProductByIdBasic: function(req, res){
    Product
      .findById(req.params._id)
      .select('-UPC -Zone_8 -wholesale_price -Retail -Product_Shipping_Method -SKU -Cubic_Feet -Packing_Carton_Width -Packing_Carton_Depth -Packing_Carton_Height')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }

}; 
