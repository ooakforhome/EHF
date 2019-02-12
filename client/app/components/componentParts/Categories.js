import React, { Component } from 'react';

class Categories extends Component {
  constructor(props){
    super(props);
    this.state={
      menuActive: false,
    }
  }

categorybutton(){
  this.setState({
    menuActive: !this.state.menuActive
  })
}

  render(){
    const ListMaps = () => {
      const navLists = ["Accent Furnitures", "Bookcases", "Bathroom Furnitures", "Bath Accessories", "Hooks and Rods", "Bath Hardwares", "Over The Doors", "Window Hardwares", "Window Panels", "Shower Curtains", "Beauty Devices", "Gardens", "LED", "Pets"];

      return(
        <ul className="the_category_nav">
          {
            navLists.map(navList =>{
              return(
                <li
                  id={navList}
                  onClick={this.props.clickthenav}
                  className="navlist"
                  name={navList}>
                    {navList}
                </li>
              )
            })
          }
        </ul>
      )
    }

    const menuToggle = (this.state.menuActive === true)? <ListMaps /> : "";

    return(
      <div>
        <span>
        <button onClick={this.categorybutton.bind(this)}>
          {(`${this.state.menuActive}` === "false")? "+ Show Categories": "- Show Categories"}
        </button>
        </span>
        <span>
        {menuToggle}
        </span>
      </div>
    )
  }
}

export default Categories;
