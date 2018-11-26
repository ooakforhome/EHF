import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { setInStorage, getFromStorage } from '../utils/storage';

// Page and parts import
import { fetchOneMember } from '../../actions/member-action';
import { MemberDetailBox } from './parts/MemberDetailBox';

class MemberProduct extends Component {
  constructor(props){
    super(props)
        this.state = {
        product: [],
        images: '',
        token:'',
      }
 }

 componentWillMount() {
   this.props.fetchOneMember(this.props.match.params.id);
   this.checkValidation();
 }

 componentDidMount(){
   this.props.fetchOneMember(this.props.match.params.id)
 }

 checkValidation(){
   const obj = getFromStorage('the_main_app');
   if (obj && obj.token) {
     const { token } = obj;
     // Verify token
     fetch('/api/verify?token=' + token)
       .then(res => res.json())
       .then(json => {
         if (json.success) {
           this.setState({
             token,
             isLoading: false
           });
         } else {
           window.location =`/`;
         }
       });
   } else {
     window.location =`/`;
   }
 }

backToProductsPageOnClick(e){
  e.preventDefault();
  window.location =`/auth/products/${this.state.token}`;
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
        if(data){
          alert('Upload Successfully!!')
          this.loadImage();
        } else {
          alert('Upload failed')
        }
      })

 };

  render(){

    return (
      <div className="detailPage">
        <div className="item_container" style={{visibility: 'visible'}}>
          <div className="backNav">
            <button onClick={this.backToProductsPageOnClick.bind(this)} className="backButton">BACK TO PRODUCTS PAGE</button>
          </div>
          <div className="detailPage">
            <MemberDetailBox item={this.props.memberproduct}/>
          </div>
        </div>
      </div>
      );
    }
  }

  const mapStateToProps = state => ({
    memberproduct: state.memberproducts.product
  });

export default connect(mapStateToProps, { fetchOneMember } ) (MemberProduct);
