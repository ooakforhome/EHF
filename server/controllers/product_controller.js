const Product = require ('../models/Product_model');

module.exports = {
        //render search
        renderSearch: function(){

        Product
          .find({})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },

        // render params
        renderPerPage: function(req, res){
          var perPage = 12;
          var page = req.params.page || 1;

        Product
          .find()
          .skip((perPage * page) - perPage)
          .limit(perPage)
          .exec(function(err, products){
            Product.count().exec(function(err, count){
              if(err) return next(err)
              res.render('./products/all', {
                products: products,
                current: page,
                pages: Math.ceil(count / perPage)
              })
            })
          })
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
