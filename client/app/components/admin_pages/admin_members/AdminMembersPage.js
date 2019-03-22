import React, { Component } from 'react';
import axios from 'axios'

class AdminMembersPage extends Component {
  constructor(props){
    super(props);
    this.state={
      allMembers: []
    }
  }

  componentWillMount(){
    axios.get(`/api/user/findall`)
      .then(res=>{
        if(res.status === 200){
          console.log(res)
        // }

          this.setState({
            allMembers: res.data
          })
        }
      })
  }

  render(){
    if(!this.state.allMembers){
      console.log("wait")
    }

    const ShowMembers = (
      <ul>
        {this.state.allMembers.map((member, i)=>{
            return(
            <li key={i}>
              <ul>
                <li>{member.signUpDate}</li>
                <li>{member.email}</li>
                <li>{member.username}</li>
              </ul>
            </li>
            )
          })
        }
      </ul>
    )

    return(
      <>
        <p>Member page</p>
        {ShowMembers}
      </>
    )
  }
}

export default AdminMembersPage;
