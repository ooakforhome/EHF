import React, { Component } from "react";

class Paginator extends Component {

  nexthandleChange(e){
    e.preventDefault();
      this.setState({
        limit: 10,
        offset: this.state.offset+=1
      })
      this.updates();
      console.log(this.state.offset);
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
      console.log(this.state.offset);
  };

  updates(){
    this.props.fetchProducts({limit: this.state.limit, offset: this.state.offset});
  };

  render(){
    return(
      <div className ="floatleftblock">
        <button onClick={this.prevhandleChange.bind(this)} name="prev" value="1" >Prev</button>
        <p>current page{this.state.offset}</p>
        <button onClick={this.nexthandleChange.bind(this)} name="next" value="1" >next</button>
      </div>
    )
  }
}

export default Paginator
