import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {this.props.appName.toLowerCase()}
          </Link>
        </div>
      </nav>
    );
  }
}

export default Header;
