import React, { Component } from 'react';
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import Home from './Home';
import Addrec from './Addrec';
import Allrec from './Allrec';
import AddCat from './AddCat';
import NoMatch from './NoMatch';

import {Link} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';


export class Navigation extends Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return (
        <Router>

        
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">vacations</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink to="/home">Home</NavLink>
                    
                </NavItem>
                <NavItem><NavLink to="/addvacation">Add Vacation</NavLink></NavItem>
              </Nav>
            </Collapse>
          </Navbar>


          <Switch>
              <Route  exact path='/' render={(props) => <Home {...props} recs={this.state.categories}  cats={this.state.categories}/>}/>
              <Route  exact path='/addvacation'  render={(props) => <Addrec {...props} cats={this.state.categories} />}/>
              <Route  exact path='/all'  render={(props) => <Allrec {...props} recs={this.state.categories} />}/>
              <Route  exact path='/addcat'  render={(props) => <AddCat {...props} cats={this.state.categories} />}/>
              <Route component={NoMatch} />
              </Switch>
    
        </Router>

      );
    }
  }



  export default Navigation;
