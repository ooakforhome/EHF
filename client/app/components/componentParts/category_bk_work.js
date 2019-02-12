import React, { Component } from 'react';

class Categories extends Component {
  constructor(props){
    super(props);
    this.state={
      menuActive: false,
    }
  }

  showCategoriesBox(){
    this.setState({
      menuActive: !this.state.menuActive
    })
  }

  render(){
    const navLists = ["Accent Furnitures", "Bookcases", "Bathroom Furnitures", "Bath Accessories", "Hooks and Rods", "Bath Hardwares", "Over The Doors", "Window Hardwares", "Window Panels", "Shower Curtains", "Beauty Devices", "Gardens", "LED", "Pets"];


    const ListMaps = navLists.map((navList) =>
      <ul key={navList}>
        <li
          id={navList}
          onClick={this.props.clickthenav}
          className="navlist"
          name={navList}>
        {navList}
        </li>
      </ul>
    );

    const CategoryBtn(){
      return (
        <button onClick={this.showCategoriesBox.bind(this)}>
          CATEGORY LIST
        </button>
      )
    }

    console.log(this.state.menuActive)
    return(
      <div>
          <CategoryBtn />:
          <ListMaps />
      </div>
    )
  }
}

export default Categories;
{(`${this.state.menuActive}` === false)?
  <ListMaps /> :
  <CategoryBtn />
}
