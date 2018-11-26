import React, { Component } from 'react';

class Categories extends Component {

  render(){
    const navLists = ["Accent Furnitures", "Bookcases", "Bathroom Furnitures", "Bath Accessories", "Hooks and Rods", "Bath Hardwares", "Over The Doors", "Window Hardwares", "Window Panels", "Shower Curtains", "Beauty Devices", "Gardens", "LED", "Pets"];


    const listMaps = navLists.map((navList) =>
      <ul key={navList}>
        <li id={navList} onClick={this.props.clickthenav} className="navlist" name={navList}>
        {navList}
        </li>
      </ul>
    );

    return(
      <div>
        {listMaps}
      </div>
    )
  }
}

export default Categories;
