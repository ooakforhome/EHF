<h1>{this.state.Category_type}</h1>
    <p>Total: {this.props.adminproducts.count}</p>
<div className ="floatleftblock text-center">
  <button onClick={this.prevhandleChange.bind(this)} name="prev" value="1" >Prev</button>
  <p>Page: {this.state.offset} of { TotalPages }</p>
  <button onClick={this.nexthandleChange.bind(this)} name="next" value="1" >next</button>
</div>

/////////////////////////////////////////////
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
