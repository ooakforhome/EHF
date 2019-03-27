import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import API from '../api-product';
import axios from 'axios';

import { setInStorage, getFromStorage } from '../../utils/storage';

// Page and parts import
import { fetchOneAdmin } from '../../../actions/admin-action';
import { AdminDetailBox } from '../parts/AdminDetailBox';
import EditProduct from '../parts/EditProduct';

class AdminProduct extends Component {
  constructor(props){
    super(props)
        this.state = {
        product: [],
        images: '',
        token:localStorage.getItem('admin_token')
      }
 }

 componentWillMount() {
   const { token } = this.state
   this.props.fetchOneAdmin({id: this.props.match.params.id, token});
   this.checkValidation();
 }

 // componentDidMount(){
 //   const { token } = this.state
 //   this.props.fetchOneAdmin({id: this.props.match.params.id, token})
 // }

 checkValidation(){
   const { token } = this.state;
   axios.get(`/api/admin/verify?token=${token}`)
       .then(json => {
         if (json.data.success) {
           this.setState({
             isLoading: false
           });
         } else {
           this.props.history.push('/')
         }
       });
   }

backToProductsPageOnClick(e){
  e.preventDefault();
  // window.location = `/admin/products`
  this.props.history.push(`/admin/products`)
}

loadImage(){
  API.loadLastImg()
    .then( res =>
      this.setState({
        images: res.data[0].filename
      })
    )
}

 onChanges(e){
   this.setState({
     [e.target.name]: e.target.value
   })
 }

 _handleImageChange(e){
   e.preventDefault();
     this.setState({
       file: e.target.files[0]
     });
 }

 _handleSubmit(e){
   e.preventDefault();
   let formData = new FormData();
   formData.append("file", this.state.file);

   fetch('/api/upload', {
     method: 'POST',
     body: formData
   }).then(res => res.json())
      .then(data => {
        API.updateProduct(this.props.match.params.id, {
          images: data.upload
        }).then(info=>{
          alert('Upload successfully!!')
        }).catch(err=> alert(err))
      })

 };

 submitEdit(e){
   e.preventDefault()
   API.updateProduct(this.props.match.params.id, {
     Product_Name: this.state.Product_Name,
     SKU: this.state.SKU,
     Materials: this.state.Materials,
     Color: this.state.Color,
     Packing_Carton_Width: this.state.Packing_Carton_Width,
     Packing_Carton_Height: this.state.Packing_Carton_Height,
     Packing_Carton_Depth: this.state.Packing_Carton_Depth,
     Actual_Product_Width: this.state.Actual_Product_Width,
     Actual_Product_Height: this.state.Actual_Product_Height,
     Actual_Product_Length: this.state.Actual_Product_Length,
     Feature_1: this.state.Feature_1,
     Feature_2: this.state.Feature_2,
     Feature_3: this.state.Feature_3,
     Feature_4: this.state.Feature_4,
     Feature_5: this.state.Feature_5,
     Feature_6: this.state.Feature_6,
     Feature_7: this.state.Feature_7,
     Feature_8: this.state.Feature_8,
     Feature_9: this.state.Feature_9
   })
     .then(res => window.location.reload())
 }

  render(){
    // console.log("this is the toke: "+ this.state.token)
    // console.log(this.props.adminproduct)
    return (
      <div className="detailPage">
        <div className="item_container" style={{visibility: 'visible'}}>
          <div className="backNav">
            <button onClick={this.backToProductsPageOnClick.bind(this)} className="backButton">BACK TO PRODUCTS PAGE</button>
          </div>
          <div className="detailPage">
            <AdminDetailBox item={this.props.adminproduct}/>
          </div>
          <div className="updateBlock">
            <EditProduct
             submitEdit = {this.submitEdit.bind(this)}
             onChanges = {this.onChanges.bind(this)}
             _handleSubmit = {this._handleSubmit.bind(this)}
             _handleImageChange = {this._handleImageChange.bind(this)}
             />
          </div>
        </div>
      </div>
      );
    }
  }

  const mapStateToProps = state => ({
    adminproduct: state.adminproducts.product
  });

export default connect(mapStateToProps, { fetchOneAdmin } ) (AdminProduct);
