const Product = require ('../models/Product_model');

module.exports = {
        // find all
        getProducts: function(req, res) {
          var pageOptions = {
            offset: parseInt(req.query.offset),
            limit: parseInt(req.query.limit)
          }

          Product
            .find()
            .sort({Category_type:1})
            .limit(pageOptions.limit)
            .skip(pageOptions.limit*pageOptions.offset)
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



        // render params
    //     renderPerPage: function(req, res){
    //       var limit = req.params.page || 12;
    //       var page = req.params.page || 1;
    //       var count = 0;
    //
    //     Product
    //       .find()
    //       .skip((limit * page) - limit)
    //       .limit(limit)
    //       .exec(function(err, products){
    //         Product.count().exec(function(err, count){
    //           if(err) return next(err)
    //           res.render('./products/all', {
    //             products: products,
    //             current: page,
    //             pages: Math.ceil(count / limit)
    //           })
    //         })
    //       })
    // },
