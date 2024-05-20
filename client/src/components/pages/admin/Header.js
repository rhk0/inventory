import {React} from "react";
import {  BsJustify } from "react-icons/bs";
import "./Admin.css";


function Header({ OpenSidebar }) {

  return (
    <header style={{backgroundColor:" #1c216e"}} className="header">
      <div className="menu-icon">
        <BsJustify className="icon text-white" onClick={OpenSidebar} />
       
      </div>

      <div className="header-left">
        
      </div>

      <div className="header-right ml-1">
      
        <img
          className="w-10 h-10 rounded-full bg-white"
          alt="head"
          src="/api/v1/staff/getPhoto/6603d66fe12133df05660980"
        />
        {/* <button onClick={toggleButton}>{isOn ? "On" : "Off"}</button> */}
      </div>
 
    </header>
  );
}

export default Header;
