import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import API from './api-basic';

// Page and parts import
import { fetchOneBasic } from '../../actions/basic-action';
import { BasicDetailBox } from './parts/BasicDetailBox';

class BasicProduct extends Component {
  constructor(props){
    super(props)
        this.state = {
        product: [],
        images: ''
      }
 }

 componentWillMount() {
   this.props.fetchOneBasic(this.props.match.params.id);
 }

// Change location
  backToProductsPageOnClick(e){
    e.preventDefault();
    window.location =`/products/`;
  }

  loadImage(){
    API.loadLastImg()
      .then( res =>
        this.setState({
          images: res.data[0].filename
        })
      )
      .catch(err => console.log("load image is not working"))
  }




  render(){
    console.log(this.props.basicproduct);
    if(!this.props.basicproduct){
      return("waiting for data")
    }
    return (
      <div className="BasicdetailPage">
        <div className="item_container" style={{visibility: 'visible'}}>
          <div className="backNav">
            <button onClick={this.backToProductsPageOnClick.bind(this)} className="backButton">BACK TO PRODUCTS PAGE</button>
          </div>
          <div className="detailPage">
            <BasicDetailBox item={this.props.basicproduct}/>
          </div>
        </div>
      </div>
      );
    }
  }

  const mapStateToProps = state => ({
    basicproduct: state.basicproducts.product
  });

export default connect(mapStateToProps, { fetchOneBasic } ) (BasicProduct);
