const pageparts = {

  tnexthandleChange(newList, tlimit, toffset, tcategory, trender){

    const totalOffset = Math.floor(newList/10);
    let theName = tcategory.split(' ').join('+');


    if(toffset >= totalOffset){
      trender({limit: tlimit, offset: toffset, Category_type:theName})
    } else {
      trender({limit: tlimit, offset: toffset+1, Category_type:theName})
    }
  },


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
  },

  onclick_logout(e){
    e.preventDefault();
    axios.get(`/api/user/logout?token=${this.state.token}`)
    .then( respond => {
      if(respond.data.success === false){
        alert("logout unsuccessful");
      } else {
        window.location = '/';
      }
    })
  }

}

export default pageparts
