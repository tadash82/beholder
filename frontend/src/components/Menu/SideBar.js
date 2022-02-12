import React from 'react';
import { Link } from 'react-router-dom';


function SideBar() {

  function getClassName(itemName) {
    return window.location.pathname === itemName ? 'nav-item active' : 'nav-item';
  }

  return (
    <React.Fragment>
      <nav id="sidebarMenu" className="sidebar d-lg-block bg-gray-800 text-white collapse" data-simplebar="true">
        <div className="sidebar-inner px-4 pt-3">
          <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
            <div className="collapse-close d-md-none">
              <a href="#sidebarMenu" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" 
                aria-expanded="true" aria-label="Toggle navigation">
                <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                    clip-rule="evenodd">
                  </path>
                </svg>
              </a>
            </div>
          </div>
          <ul className="nav flex-column pt-3 pt-md-0">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link d-flex align-items-center">
                  <span className="sidebar-icon">
                    <img src='/img/brand/light.svg' height="20" width="20" alt="Volt Logo" />
                  </span>
                  <span className="mt-1 ms-1 sidebar-text">Beholder Menu</span>
                </Link>
              </li>
              <li className={getClassName('/dashboard')}>
                <Link to="/dashboard" className='nav-link'>
                  <span className="sidebar-icon">
                    <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                    </svg>
                  </span>
                  <span className="sidebar-text">Dashboard</span> 
                </Link>  
              </li>
            </ul>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default SideBar;