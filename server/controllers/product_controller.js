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
        //render search
      renderSearch: function(criteria, sortProperty, offset = 0, limit = 12){

        Product.find(buildQuery(criteria))
          .sort({ [sortProperty]: 1 })
          .skip(offset)
          .limit(limit)
          .then(data => res.json(data))

    },

        // find all
        getProducts: function(req, res) {
          var pageOptions = {
            page: parseInt(req.query.page) || 0,
            limit: parseInt(req.query.limit) || req.query.length
          }

          Product
            .find()
            .sort({Category_type:1})
            .limit(pageOptions.limit)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
        // find by
        getCategory: function(req, res) {
          Product
            .find({Category_type: req.params.Category_type})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
        // add
        addProduct: function(req, res) {
          Product
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
        getProductsById: function(req, res) {
          Product
            .findById(req.params._id)
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
    }
};
