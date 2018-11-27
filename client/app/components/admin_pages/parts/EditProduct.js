import React, { Component } from 'react';
import { ImageUpload } from './ImageUpload';


class EditProduct extends Component{
 render(){
   return(
     <div>
       <div className='productEditBox'>
         <h2>EDIT SECTION</h2>
         <ImageUpload
            _handleSubmit = {this.props._handleSubmit}
            _handleImageChange = {this.props._handleImageChange}
         />
         <div>
          <div className="edit_md">
             <p className='editText'>Name</p>
             <input
              className='editInput'
               value = {this.props.Product_Name}
               onChange = {this.props.onChanges}
               name = "Product_Name"
               placeholder = "Change Item's Name"
             />
           </div>
           <div className="edit_md">
             <p className='editText'>SKU</p>
             <input
              className='editInput'
               value = {this.props.SKU}
               onChange = {this.props.onChanges}
               name = "SKU"
               placeholder = "Change SKU"
             />
           </div>
           <div className="edit_md">
             <p className='editText'>Materials</p>
             <input
              className='editInput'
               value = {this.props.Materials}
               onChange = {this.props.onChanges}
               name = "Materials"
               placeholder = "Change Materials  "
             />
           </div>
           <div className="edit_md">
             <p className='editText'>Color</p>
             <input
              className='editInput'
               value = {this.props.Color}
               onChange = {this.props.onChanges}
               name = 'Color'
               placeholder = "change color"
             />
           </div>

          <div className="edit_lg">
            <div className="edit_sm">
               <p className='editText'>Pkg width</p>
               <input
                className='editInput_sm'
                 value = {this.props.Packing_Carton_Width}
                 onChange = {this.props.onChanges}
                 name = 'Packing_Carton_Width'
                 placeholder = "pkg_width"
               />
            </div>
            <div className="edit_sm">
               <p className='editText'>Pkg height</p>
               <input
                className='editInput_sm'
                 value = {this.props.Packing_Carton_Height}
                 onChange = {this.props.onChanges}
                 name = 'Packing_Carton_Height'
                 placeholder = "pkg_height"
               />
            </div>
            <div className="edit_sm">
               <p className='editText'>Pkg depth</p>
               <input
                className='editInput_sm'
                 value = {this.props.Packing_Carton_Depth}
                 onChange = {this.props.onChanges}
                 name = 'Packing_Carton_Depth'
                 placeholder = "pkg_depth"
               />
            </div>
          </div>
          <div className="edit_lg">
            <div className="edit_sm">
               <p className='editText'>Product width</p>
               <input
                className='editInput_sm'
                 value = {this.props.Actual_Product_Width}
                 onChange = {this.props.onChanges}
                 name = 'Actual_Product_Width'
                 placeholder = "Product_width"
               />
            </div>
            <div className="edit_sm">
               <p className='editText'>Actual height</p>
               <input
                className='editInput_sm'
                 value = {this.props.Actual_Product_Height}
                 onChange = {this.props.onChanges}
                 name = 'Actual_Product_Height'
                 placeholder = "actual_height"
               />
            </div>
            <div className="edit_sm">
               <p className='editText'>Actual depth</p>
               <input
                className='editInput_sm'
                 value = {this.props.Actual_Product_Length}
                 onChange = {this.props.onChanges}
                 name = 'Actual_Product_Length'
                 placeholder = "actual_depth"
               />
            </div>
          </div>
          <div className="edit_xlg">
            <p className='editText'>Feature 1</p>
            <input
             className='editInput_xlg'
              value = {this.props.Feature_1}
              onChange = {this.props.onChanges}
              name = 'Feature_1'
              placeholder = "Feature 1"
            />
          </div>
          <div className="edit_xlg">
            <p className='editText'>Feature 2</p>
            <input
             className='editInput_xlg'
              value = {this.props.Feature_2}
              onChange = {this.props.onChanges}
              name = 'Feature_2'
              placeholder = "Feature 2"
            />
          </div>
          <div className="edit_xlg">
            <p className='editText'>Feature 3</p>
            <input
             className='editInput_xlg'
              value = {this.props.Feature_3}
              onChange = {this.props.onChanges}
              name = 'Feature_3'
              placeholder = "Feature 3"
            />
          </div>
          <div className="edit_xlg">
            <p className='editText'>Feature 4</p>
            <input
             className='editInput_xlg'
              value = {this.props.Feature_4}
              onChange = {this.props.onChanges}
              name = 'Feature_4'
              placeholder = "Feature 4"
            />
          </div>
          <div className="edit_xlg">
            <p className='editText'>Feature 5</p>
            <input
             className='editInput_xlg'
              value = {this.props.Feature_5}
              onChange = {this.props.onChanges}
              name = 'Feature_5'
              placeholder = "Feature 5"
            />
          </div>
          <div className="edit_xlg">
            <p className='editText'>Feature 6</p>
            <input
             className='editInput_xlg'
              value = {this.props.Feature_6}
              onChange = {this.props.onChanges}
              name = 'Feature_6'
              placeholder = "Feature 6"
            />
          </div>
          <div className="edit_xlg">
            <p className='editText'>Feature 7</p>
            <input
             className='editInput_xlg'
              value = {this.props.Feature_7}
              onChange = {this.props.onChanges}
              name = 'Feature_7'
              placeholder = "Feature 7"
            />
          </div>
          <div className="edit_xlg">
            <p className='editText'>Feature 8</p>
            <input
             className='editInput_xlg'
              value = {this.props.Feature_8}
              onChange = {this.props.onChanges}
              name = 'Feature_8'
              placeholder = "Feature 8"
            />
          </div>
          <div className="edit_xlg">
            <p className='editText'>Feature 9</p>
            <input
             className='editInput_xlg'
              value = {this.props.Feature_9}
              onChange = {this.props.onChanges}
              name = 'Feature_9'
              placeholder = "Feature 9"
            />
          </div>
          <div className="edit_submit">
           <button onClick={this.props.submitEdit}>
             submit
           </button>
          </div>
         </div>
       </div>
     </div>
   )
 }
}

export default EditProduct;
