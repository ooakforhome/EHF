import React, { Component } from 'react';
import axios from 'axios'

class AdminMembersPage extends Component {
  constructor(props){
    super(props);
    this.state={
      token: localStorage.getItem('admin_token'),
      allMembers: []
    }
  }

  componentWillMount(){
    axios.get(`/api/user/findall`)
      .then(res=>{
        if(res.status === 200){
          this.setState({
            allMembers: res.data.members_account
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
        <button
          onClick={()=> this.props.history.push(`/adminhome/${this.state.token}`)}>
          back
        </button>
        <p>Member page</p>
        {ShowMembers}
      </>
    )
  }
}

export default AdminMembersPage;
