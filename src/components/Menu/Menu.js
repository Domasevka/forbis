import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css'

class Menu extends Component {
  render(){
    return(
      <div>
        <Link to="/" className='menu__link'>Currencies</Link>
        <Link to="/analysis" className='menu__link'>Analysis</Link>
      </div>

    )
  }
}
export default hot(Menu);