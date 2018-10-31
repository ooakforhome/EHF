const Product = require ('../models/Product_model');

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

module.exports = {
  // render params
  renderPerPage: function(req, res){

  const query = Product.find(buildQuery(criteria))
    .sort({[req.query.sortProperty]: 1})
    .skip(req.query.offset)
    .limit(req.query.limit)

  return Promise.all([query, Product.find(buildQuery(criteria)).count()])
    .then((result) => {
      return {
        all: results[0],
        count: result[1],
        offset: offset,
        limit: limit
      }
    })
  }
};


// let limit = parseInt(req.query.limit) || 12;
// let offset = parseInt(req.query.offset) || 1;
// let count = 0;
//
// Product
// .find()
// .skip((limit * offset) - limit)
// .limit(limit)
// .then(dbModel => res.json(dbModel))
// .catch(err => res.status(422).json(err));
