import React, { Component } from "react";
import { connect } from 'react-redux';
import { renderAdmin } from '../../actions/admin-action';
import { ProductsBox } from './parts/ProductsBox';
import Categories from '../componentParts/Categories';
import API from './api-product';
import { Link } from 'react-router-dom';
import Logout from './parts/Logout';
import { setInStorage, getFromStorage } from '../utils/storage';

//SPD to Products
class AdminProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,import React, { Component } from "react";
      import { connect } from 'react-redux';
      import { renderAdmin } from '../../actions/admin-action';
      import { ProductsBox } from './parts/ProductsBox';
      import Categories from '../componentParts/Categories';
      import API from './api-product';
      import { Link } from 'react-router-dom';
      import Logout from './parts/Logout';
      import { setInStorage, getFromStorage } from '../utils/storage';
      import pagination from '../componentParts/pagination';

      //SPD to Products
      class AdminProducts extends Component {
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
          this.checkValidation();
        }


        checkValidation(){
          const obj = getFromStorage('the_main_app');
          if (obj && obj.token) {
            const { token } = obj;
            // Verify token
            fetch('/api/admin/verify?token=' + token)
              .then(res => res.json())
              .then(json => {
                if (json.success) {
                  this.setState({
                    token,
                    isLoading: false
                  });
                  this.loadDatas();
                } else {
                  window.location =`/`;
                }
              });
          } else {
              window.location =`/`;
          }
        }


        loadDatas(){
          const {limit, offset} = this.state;
          const theName = this.state.Category_type.split(' ').join('+'); // query need + in between space
          this.props.renderAdmin({
            limit: limit,
            offset: offset,
            Category_type: theName
          });
        }

        handleClick(e){
            e.preventDefault();
              window.location =`/admin/product/${e.target.value}`;
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
          this.props.renderAdmin({limit: 10, offset: 0, Category_type:theName})
        };


      nexthandleChange(){
          const totalOffset = Math.floor(this.props.adminproducts.count/10);
          const {limit, offset} = this.state;
          let theName = this.state.Category_type.split(' ').join('+');

          if(this.state.offset >= totalOffset){
            this.props.renderAdmin({limit: limit, offset: offset, Category_type:theName})
              this.setState({offset: totalOffset})
          } else {
            this.props.renderAdmin({limit: limit, offset: offset+1, Category_type:theName})
              this.setState({offset: this.state.offset+1})
          }
          // pagination.tnexthandleChange(
          //   this.props.adminproducts.count,
          //   this.state.limit,
          //   this.state.offset,
          //   theName,
          //   this.props.renderAdmin
          // )

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

      // refrash products data
        updates(){
          const theName = this.state.Category_type.split(' ').join('+'); // query need + in between space
          this.props.renderAdmin({Category_type: theName, limit: this.state.limit, offset: this.state.offset});
        };

      // Logout Admin
        onclick_logout(e){
          e.preventDefault();
          API.adminLogout( this.state.token )
          .then( respond => {
            if(respond.data.success === false){
              alert("logout unsuccessful");
            } else {
              window.location="/";
            }
          })
        };

      // add new product
        addNewProduct(e){
          e.preventDefault();
          window.location=`/newproduct/${this.state.token}`
        }

        render() {
          // console.log(this.props.adminproducts.all);
          if(!this.props.adminproducts.all){
            return "waiting for data";
          }

          const TotalPages = Math.floor(this.props.adminproducts.count/10);
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
              <div>
                <Logout
                  onclick_logout = {this.onclick_logout.bind(this)}
                />
                <button onClick={this.addNewProduct.bind(this)}>ADD NEW PRODUCT</button>
              </div>
              <div className="category_nav">
                < Categories clickthenav = { this.handleClickthenav.bind(this) } />
              </div>
              <div className="products_box">
                <h1>{this.state.Category_type}</h1>


                  <div className ="floatleftblock text-center">
                    <button onClick={this.prevhandleChange.bind(this)} name="prev" value="1" >Prev</button>
                    <p>Page: {this.state.offset} of { TotalPages }</p>
                    <button onClick={this.nexthandleChange.bind(this)} name="next" value="1" >next</button>
                  </div>
                    <p>Total: {this.props.adminproducts.count}</p>
                <div>
                  <ProductList products = {this.props.adminproducts.all}/>
                </div>
                <div className ="floatleftblock text-center">
                  <button onClick={this.prevhandleChange.bind(this)} name="prev" value="1" >Prev</button>
                  <p>Page: {this.state.offset} of { TotalPages }</p>
                  <button onClick={this.nexthandleChange.bind(this)} name="next" value="1" >next</button>
                              <p>Total: {this.props.adminproducts.count}</p>
                </div>

              </div>
            </div>
          );
        }
      }


      const mapStateToProps = state => ({
        adminproducts: state.adminproducts.products
      });

      export default connect(mapStateToProps, { renderAdmin })(AdminProducts);

      offset: 0,
      count: 0,
      token:'',
      Category_type: "Accent Furnitures"
    };
  }

// mount Redux data info.
  componentWillMount() {
    this.checkValidation();
  }

  componentDidMount(){
    this.props.renderAdmin({limit: this.state.limit, offset: this.state.offset, Category_type:this.state.Category_type})
  }

  componentDidUpdate(){

  }

  checkValidation(){
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/admin/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
            this.loadDatas();
          } else {
            window.location =`/`;
          }
        });
    } else {
        window.location =`/`;
    }
  }


  loadDatas(){
    const {limit, offset} = this.state;
    const theName = this.state.Category_type.split(' ').join('+'); // query need + in between space
    this.props.renderAdmin({
      limit: limit,
      offset: offset,
      Category_type: theName
    });
  }

  handleClick(e){
      e.preventDefault();
        window.location =`/admin/product/${e.target.value}`;
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
    this.props.renderAdmin({limit: 10, offset: 0, Category_type:theName})
  };


nexthandleChange(){
    const totalOffset = Math.floor(this.props.adminproducts.count/10);
    const {limit, offset} = this.state;
    let theName = this.state.Category_type.split(' ').join('+');


    if(this.state.offset >= totalOffset){
      this.setState({
        limit: 10,
        offset: totalOffset,
        Category_type: this.state.Category_type
      })
          this.props.renderAdmin({limit: limit, offset: offset, Category_type:theName})
    } else {
      this.setState({
        limit: 10,
        offset: this.state.offset+=1
      })
          this.props.renderAdmin({limit: limit, offset: offset, Category_type:theName})
    }
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

// refrash products data
  updates(){
    const theName = this.state.Category_type.split(' ').join('+'); // query need + in between space
    this.props.renderAdmin({Category_type: theName, limit: this.state.limit, offset: this.state.offset});
  };

// Logout Admin
  onclick_logout(e){
    e.preventDefault();
    API.adminLogout( this.state.token )
    .then( respond => {
      if(respond.data.success === false){
        alert("logout unsuccessful");
      } else {
        window.location="/";
      }
    })
  };

// add new product
  addNewProduct(e){
    e.preventDefault();
    window.location=`/newproduct/${this.state.token}`
  }

  render() {
    if(!this.props.adminproducts.all){
      return "waiting for data";
    }

    const TotalPages = Math.floor(this.props.adminproducts.count/10);
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
        <div>
          <Logout
            onclick_logout = {this.onclick_logout.bind(this)}
          />
          <button onClick={this.addNewProduct.bind(this)}>ADD NEW PRODUCT</button>
        </div>
        <div className="category_nav">
          < Categories clickthenav = { this.handleClickthenav.bind(this) } />
        </div>
        <div className="products_box">
          <h1>{this.state.Category_type}</h1>


            <div className ="floatleftblock text-center">
              <button onClick={this.prevhandleChange.bind(this)} name="prev" value="1" >Prev</button>
              <p>Page: {this.state.offset} of { TotalPages }</p>
              <button onClick={this.nexthandleChange.bind(this)} name="next" value="1" >next</button>
            </div>
              <p>Total: {this.props.adminproducts.count}</p>
          <div>
            <ProductList products = {this.props.adminproducts.all}/>
          </div>
          <div className ="floatleftblock text-center">
            <button onClick={this.prevhandleChange.bind(this)} name="prev" value="1" >Prev</button>
            <p>Page: {this.state.offset} of { TotalPages }</p>
            <button onClick={this.nexthandleChange.bind(this)} name="next" value="1" >next</button>
                        <p>Total: {this.props.adminproducts.count}</p>
          </div>

        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  adminproducts: state.adminproducts.products
});

export default connect(mapStateToProps, { renderAdmin })(AdminProducts);