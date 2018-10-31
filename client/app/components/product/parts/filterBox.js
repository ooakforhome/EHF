import React, {Component} from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../../../actions/product-action';
import { Field, reduxForm } from "redux-form";
import API from "../api-product";
import Range from "./Range"
// import { Link } from "react-router-dom";



class NewProduct extends Component {

  onSubmit(values){
    API.addProduct(values)
      .then(res => console.log(res))
      .then(()=> window.location = '/products/all')
  }

  renderField(field){
    return(
      <div className={field.className}>
        <p>{field.label}</p>
        <input className="form-control" type="text"
          {...field.input} />
      </div>
    );
  }

  render(){
    const { handleSubmit } = this.props;

    return(
      <div className="filterboxSize">
        <div>
          <h3>Search</h3>
        <hr />
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              id = "Product_Shipping_Weight"
              type="text"
              label="Product_Name"
              name="Product_Name"
              className="input_box"
              component={this.renderField}
            />
            <Field
              id = "product_weight"
              type="text"
              label="Product_Weight"
              name="Product_Weight"
              className="input_box"
              component={this.renderField}
            />
            <Field
              id = "Product_Shipping_Weight"
              type="text"
              label="Product_Shipping_Weight"
              name="Product_Shipping_Weight"
              className="input_box"
              component={this.renderField}
            />
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}


export default reduxForm({
  form: "AddNewProduct"
})(connect(null, { createProduct })(NewProduct));
