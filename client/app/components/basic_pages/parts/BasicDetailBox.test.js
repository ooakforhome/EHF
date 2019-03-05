import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'

// Components
import { BasicDetailBox } from './BasicDetailBox';

const product1 = {
  Actual_Product_Height: 32.125,
  Actual_Product_Length: 27,
  Actual_Product_Width: 14.5,
  Assembly_required: "Yes",
  Care_Instructions: "Wipe clean with damp cloth.",
  Category_type: "Accent Furnitures",
  Collection: "Gozo",
  Color: "White",
  Drawer_Length: "",
  Drawer_Width: "",
  Drawer_height: "",
  Drawerheight: "",
  Feature_1: "Some assembly required. Hardware included.",
  Feature_2: "Has the look and feel of abalone shells on the door fronts and drawer front",
  Feature_3: "Includes one internal, adjustable shelf.",
  Feature_4: "Antique brass, looped door knob",
  Feature_5: "Perfect for the bathroom, hallway,  living room, bedroom, or dining room",
  Feature_6: "Hinges and magnets are pre-installed",
  Feature_7: "Anti-tip strap included",
  Inches_in_between_shelf: null,
  Materials: "Manufactured Wood",
  Number_of_Cartons: 1,
  Packing_Carton_Depth: 35,
  Packing_Carton_Depth_2: null,
  Packing_Carton_Height: 11,
  Packing_Carton_Height_2: null,
  Packing_Carton_Width: 18,
  Packing_Carton_Width_2: null,
  Product_Description: "This beautiful 32\" High Accent Cabinet in White inlcudes Two Doors and One Top Drawer to store your stuff in a fahionable way. Neutral toned abalone shell- style design on all door and drawer fronts. Perfect for smaller spaces.  A simple yet original statement piece that will accent your decor and provide hidden storage for any clutter in your home.",
  Product_Name: "Apple B",
  Product_Shipping_Weight: 52,
  Product_Shipping_Weight_2: null,
  Product_Weight: 45,
  SKU: "655",
  Shelf_Length: "",
  Shelf_Width: "",
  Warranty: "90 Day Limited Manufacturer Warranty, free replacement parts",
  active: "true",
  addDate: "2019-02-22T15:34:29.248Z",
  images: "4bb94db07b8f83ad1863d7204c0a5af6.jpg",
  _id: "5c659fd385c99104667249f3"
}

describe('check BasicDetailBox component', ()=>{
  it("Detail Box is ready to be tested", () => {
    const wrapper = shallow(<BasicDetailBox {...product1}/>);
    expect(wrapper).toMatchSnapshot();
  });
  it("Detail Box is ready to be test without data", () => {
    const wrapper = shallow(<BasicDetailBox />);
    expect(wrapper).toMatchSnapshot();
  });
  it("Detail Box insert Data", ()=>{
    let wrapper = shallow(<BasicDetailBox {...product1}/>)
    expect( wrapper.find('h1').text()).toEqual('Apple B')
  });
  it("check Color after insert props data", ()=>{
    let wrapper = shallow(<BasicDetailBox {...product1}/>)

    expect(
      wrapper.containsMatchingElement(
        <p><b>Color</b> : White</p>
      )
    ).toBe(true)
  });
  it("check h1 product name", ()=>{
    let wrapper = shallow(<BasicDetailBox {...product1} />)

    expect(
      wrapper.containsMatchingElement(
        <h1>Apple B</h1>
      )
    ).toBe(true)
  });


});
