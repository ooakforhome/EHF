const Product = require ('../models/Product_model');

module.exports = {
  // Category Filter
  renderPerPage : function(req, res){
    let criteria;
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
