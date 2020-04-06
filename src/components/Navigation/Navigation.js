import React from "react";
import "./Navigation.css";
import Logo from "../Logo/Logo";

const Navigation = ({resetState, onRouteChange, isSignedIn}) => {

  if(isSignedIn){
    return (
      <div className='nav-div'>
        <nav className="nav">
          <Logo />
          <p onClick={ () => resetState(onRouteChange) } className="f3 link dim black underline pa3 pointer"> Sign Out</p>
        </nav>
      </div>
    );
  } else {
    return (
      <div className='nav-div'>
        <nav className="nav">
          <Logo />
         <div className='nav-inner'>
         <p onClick={ () => onRouteChange('home')} className="f3 link dim black underline pa3 pointer"> Try it Out</p>
          {/* <p onClick={ () => onRouteChange('register')} className="f3 link dim black underline pa3 pointer"> Register</p> */}
         </div>
          
        </nav>
      </div>
    );
    
  }
 
};

export default Navigation;
