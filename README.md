# MERN-boilerplate

This is a boilerplate project using the following technologies:
- [React](https://facebook.github.io/react/) and [React Router](https://reacttraining.com/react-router/) for the frontend
- [Express](http://expressjs.com/) and [Mongoose](http://mongoosejs.com/) for the backend
- [Sass](http://sass-lang.com/) for styles (using the SCSS syntax)
- [Webpack](https://webpack.github.io/) for compilation


## Requirements

- [Node.js](https://nodejs.org/en/)   6+

```shell
npm install
```


## Running

Make sure to add a `config.js` file in the `config` folder. See the example there for more details.

Production mode:

```shell
npm start
```

Development (Webpack dev server) mode:

```shell
npm run start:dev
```
mongoimport --db EHF --collection products --type JSON --file C:/Users/David/pagetest2/EHF-MarketPlace/products.json
mongoimport --db EHF --collection products --type csv --file C:/Users/David/pagetest2/products.csv

mongoexport --host localhost:27017 --db EHF --collection products --type csv --out C:/Users/David/Desktop/products.csv
mongoexport --db EHF_SITE --collection products --type json --out C:/Users/David/Desktop/EHF-Product_CSV/products_site.json

mongoexport --username  --password "pass" --collection contacts --db marketing --out mdb1-examplenet.json
