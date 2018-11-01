const Product = require ('../models/Product_model');

module.exports = {
  // render params
  renderPerPage : function(criteria, sortProperty, offset = 0, limit =3){
    const query = Product.find(buildQuery(criteria))
      .sort({ [sortProperty]: 1 })
      .skip(offset)
      .limit(limit);

    return Promise.all([query, Product.find(buildQuery(criteria)).count()])
      .then((results) => {
        console.log ({
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

  if (criteria.Product_Weight) {
    query.Product_Weight = {
      $gte: criteria.Product_Weight.min,
      $lte: criteria.Product_Weight.max
    };
  }

  if (criteria.Product_Shipping_Weight) {
    query.Product_Shipping_Weight = {
      $gte: criteria.Product_Shipping_Weight.min,
      $lte: criteria.Product_Shipping_Weight.max
    };
  }

  return query;
};
