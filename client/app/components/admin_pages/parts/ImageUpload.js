import React, { Component } from "react";

export class ImageUpload extends Component {
  render(){
    return(
      <div>
        <form
            className="form_class"
            encType="multipart/form-data"
            onSubmit={this.props._handleSubmit} >
          <input
            className="fileInput fLeft"
            type="file"
            name= "file"
            id="file"
            onChange={this.props._handleImageChange} />
          <button
            className="saveBtn fLeft"
            type="submit">
              Upload
          </button>
        </form> 
      </div>
    )
  }
}
