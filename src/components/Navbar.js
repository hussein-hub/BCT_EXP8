import React, { Component } from 'react';
import Identicon from 'identicon.js';
import youtube from '../youtube.png'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-monospace">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={youtube} width="30" height="30" className="d-inline-block align-top" alt="" />
          &nbsp;Youtube
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <div className="text-secondary">
              <div id="account">Your Account: <u>{this.props.account}</u></div>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;