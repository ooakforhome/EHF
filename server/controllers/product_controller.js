const Product = require ('../models/Product_model');


module.exports = {
        // find all limit10
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

        // find all
        getProductsAll: function(req, res) {
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
            .findById(req.query._id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
        updateProduct: function(req, res) {
          Product
            .findOneAndUpdate({ _id: req.params._id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
        updateManyProducts: function(req, res){
          for(var key in req.body){
            Product
              .findByIdAndUpdate({ _id: key }, {Inventory: req.body[key].Inventory})
              .then(dbModel => res.json(dbModel))
              .catch(err => res.status(422).json(err));
          }

          // const data = {
          //     "5c659fd385c99104667249f4": {"Inventory": "3"},
          //     "5c659fd385c99104667249f5": {"Inventory": "4"},
          //     "5c659fd385c99104667249f6": {"Inventory": "5"}
          //   }
          //
          //   function alot(info){
          //
          //     return Object.keys(info).map(key => {
          //       return(key +": => "+ info[key].Inventory)
          //     })
          //   }
          //
          //   console.log(alot(data));
    },
        deleteProduct: function(req, res) {
          Product
            .findOneAndDelete({ _id: req.params._id, root: Product })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
