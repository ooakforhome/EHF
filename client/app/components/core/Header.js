import React from 'react';
import { Link } from 'react-router-dom';

export const Header=()=>(
  <>
    <div id="header_id" className="header_container col-12 s-col-12">
      <div className="home_image col-6">
        <Link to="/">
          <img className="home_icon" src="https://image.flaticon.com/icons/svg/25/25694.svg"/>
        </Link>
      </div>
      <div className="col-6">
        <div className="login_container fRight">
          <Link to="/user_login" className="fLeft">
            <p>USER LOGIN</p>
          </Link>
          <Link to="/admin_login" className="fLeft">
            <p>ADMIN LOGIN</p>
          </Link>
        </div>
      </div>
    </div>
  </>
)
