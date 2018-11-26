import React, { Component } from "react";
import { connect } from "react-redux";
import { renderBasic } from '../../actions/basic-action';
import { ProductsBox } from '../componentParts/ProductsBox';
import Categories from '../componentParts/Categories';
import API from './api-basic';
import { Link } from 'react-router-dom';
// import { setInStorage, getFromStorage } from '../utils/storage';

class BasicProductsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      offset: 0,
      count: 0,
      token:'',
      Category_type: "Accent Furnitures"
    };
  }

// mount Redux data info.
  componentWillMount() {
    this.loadDatas();
  }

  loadDatas(){
    const {limit, offset} = this.state;
    const theName = this.state.Category_type.split(' ').join('+'); // query need + in between space
    this.props.renderBasic({
      limit: limit,
      offset: offset,
      Category_type: theName
    });
  }

  handleClick(e){
      e.preventDefault();
        window.location =`/product/${e.target.value}`;
  }

  handleDelete(e){
    e.preventDefault();
    API.deleteProduct(e.target.value)
      window.location.reload();
  }

  // Categories link
  handleClickthenav(e){
    e.preventDefault();
    const theName = e.target.id.split(' ').join('+'); // query need + in between space
    this.setState({
      limit: 10,
      offset: 0,
      Category_type: e.target.id
    })
    this.props.renderBasic({limit: 10, offset: 0, Category_type:theName})
  };

//////////////////////////////////////////////////////////////////////////

nexthandleChange(){
    const offsetpage = this.props.basicproducts.count/10;
    const offsetleft = this.props.basicproducts.count%10 >= 1? 1 : 0;
    const totalOffset = parseInt(offsetpage) + parseInt(offsetleft) -1;
    const {limit, offset} = this.state;
    let theName = this.state.Category_type.split(' ').join('+');


    if(this.state.offset >= totalOffset){
      this.setState({
        limit: 10,
        offset: totalOffset,
        Category_type: this.state.Category_type
      })
    } else {
      this.setState({
        limit: 10,
        offset: this.state.offset+=1
      })
    }
    this.props.renderBasic({limit: limit, offset: offset, Category_type:theName})
};


  prevhandleChange(e){
    e.preventDefault();
      if(this.state.offset == 0){
        this.setState({limit:10, offset: 0})
      } else {
      this.setState({
        limit: 10,
        offset: this.state.offset-=1
      })
    }
    this.updates();
  };

  updates(){
    const theName = this.state.Category_type.split(' ').join('+'); // query need + in between space
    this.props.renderBasic({Category_type: theName, limit: this.state.limit, offset: this.state.offset});
  };


  render(){
    if(!this.props.basicproducts.all){
      return "waiting for data";
    }
    // console.log("===========newproducts all==================")
    // console.log(this.props.basicproducts.all)

    const ProductList = ({products}) => (
      <div>
        {products.map((product, i) =>
          <ProductsBox key={i}
                  {...product}
                  handleClick={this.handleClick.bind(this)}
                  handleDelete={this.handleDelete.bind(this)}
                  />
        )}
      </div>
    )

    return(
      <div>
        <div className="category_nav">
          < Categories clickthenav = { this.handleClickthenav.bind(this) } />
        </div>
        <div className="products_box">
          <h1>{this.state.Category_type}</h1>
          <Link to="/newproduct">
            <button>ADD PRODUCT</button>
          </Link>

            <div className ="floatleftblock">
              <button onClick={this.prevhandleChange.bind(this)} name="prev" value="1" >Prev</button>
              <p>current page{this.state.offset}</p>
              <p>Total: {this.props.basicproducts.count}</p>
              <button onClick={this.nexthandleChange.bind(this)} name="next" value="1" >next</button>
            </div>

          <div>
            <ProductList products = {this.props.basicproducts.all}/>
          </div>
          <div className ="floatleftblock">
            <button onClick={this.prevhandleChange.bind(this)} name="prev" value="1" >Prev</button>
            <p>current page{this.state.offset}</p>
            <button onClick={this.nexthandleChange.bind(this)} name="next" value="1" >next</button>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  basicproducts: state.basicproducts.products
});

export default connect(mapStateToProps, { renderBasic })(BasicProductsAll);
