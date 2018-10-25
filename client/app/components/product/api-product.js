import axios from "axios";

export default {
  // Image CRUD API
    // Upload image
      uploadFile: function(file){
        return axios.post('/api/uploadFile', file);
      },
    // Load all Images
      loadImages: function(){
        return axios.get('/api/files');
      },
    // load one image
      loadOneImage: function(filename){
        return axios.get('/api/image/', filename);
      },
    // Load Last Image
      loadLastImg: function(){
        return axios.get('/api/fileid')
      },
  // Product CRUD API
    // Gets all products
      getProducts: function() {
        return axios.get("/api/products");
      },
    // Saves a product to the database
      addProduct: function(productData) {
        return axios.post("/api/products", productData);
      },
    // Get Category
      getCategory: function (Category_type) {
        return axios.get("/api/products/"+ Category_type)
      },
    // Gets the product with the given id
      getProduct: function(id) {
        return axios.get("/api/product/" + id);
      },
    // Deletes the product with the given id
      deleteProduct: function(id) {
        return axios.delete("/api/product/" + id);
      },
    // Update a producty by ID
      updateProduct: function(id, productData){
        return axios.put(`/api/product/${id}`, productData);
      }
};
