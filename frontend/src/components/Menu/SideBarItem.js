import React from "react";
import { Link } from 'react-router-dom';

/**
 * props:
 * - to: endereço do link
 * - text: texto do item
 * - onClick: um callback de cliock (quando necessário)
 * - children: tag SVG
 * @param {*} props 
 */

function SideBarItem(props){
  function getClassName(itemName) {
    return window.location.pathname === itemName ? 'nav-item active' : 'nav-item';
  }

  return (
    <li className={getClassName(props.to)}>
      <Link to={props.to} className='nav-link' onClick={props.onClick}>
        <span className="sidebar-icon">
          {props.children}
        </span>
        <span className="sidebar-text">{props.text}</span> 
      </Link>  
    </li>
  ); 
}

export default SideBarItem;