const Product = require ('../models/Product_model');

module.exports = {
  // Category Filter
  renderPerPage : function(req, res){
    let criteria;
    let sortProperty = req.query.sortProperty;
    let offset = parseInt(req.query.offset);
    let limit = parseInt(req.query.limit);

    const productName = req.query.Product_Name;

    const query = Product
    .find({$or: [
        {Category_type: req.query.Category_type},
        {Product_Name: req.query.Product_Name},
        {Product_Weight: req.query.Product_Weight}
        ]
      })
      .sort({ [sortProperty]: 1 })
      .skip(offset)
      .limit(limit);

      return Promise.all([query, Product.find({Category_type: req.query.category_type}).count()])
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


const buildQuery = (criteria) => {
  const query = {};

  if (criteria.Product_Name) {
    query.$text = { $search: criteria.Product_Name };
  }

  if (criteria.Category_type) {
    {Category_type : req.query.Category_type}
  }


  if (criteria.Product_Shipping_Weight) {
    query.Product_Shipping_Weight = {
      $gte: criteria.Product_Shipping_Weight.min,
      $lte: criteria.Product_Shipping_Weight.max
    };
  }

  return query;
};
