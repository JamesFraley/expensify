import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";

const checkActive = (match, location) => {
   if(!location) return false;
   const pathname = location.pathname;
   return pathname === "/";
}

//
const HeaderPage = () => (
   <header>
      <h1>Header here!</h1>
      <NavLink to="/"       activeClassName="is-active" isActive={checkActive}> Home   </NavLink><br/>
      <NavLink to="/create" activeClassName="is-active" > Create </NavLink><br/>
      <NavLink to="/help"   activeClassName="is-active" > Help   </NavLink><br/>
   </header>
);

export default HeaderPage;