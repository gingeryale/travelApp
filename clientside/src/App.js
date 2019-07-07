import React, { Component } from 'react';
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import V_Add from './compos/V_Add';
import V_All from './compos/V_All';
import NoMatch from './compos/NoMatch';
import Home from './compos/Home';
import Login from './compos/Login';
import Footer from './compos/Footer';
import {  Collapse,  Navbar,  NavbarToggler,  NavbarBrand,  Nav,  NavItem,  NavLink,  UncontrolledDropdown,
  DropdownToggle,  DropdownMenu,  DropdownItem } from 'reactstrap';

class App extends Component {  

  state = {
    isLoggedIn: false,
    vacations:[]
  }
  
componentDidMount() {  
 this.refresh();
}

refresh(){
  fetch('http://localhost:3000/api/vacations').then(r=>r.json()).then(data=>{
    this.setState({ vacations:data})
  });
}


  render() {
    if(this.state.isLoggedIn==true){
      return (

        <div className="container-fluid">
        <div className="row">
            <main className="main-content col-lg-12 col-md-12 col-sm-12 p-0">
            <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Vacations</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
              <NavItem>
                  <NavLink href="/all">Vacations</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/addcat">Add Vacation</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Account
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                    <NavLink href="/login">Login</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                    <NavLink href="/addrec">Logout</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
            <Router>
            
            <div className="wrapper my-5 main-content-container container-fluid px-4 d-flex flex-column h-100">
            <Switch>
                <Route  exact path='/' render={(props) => 
                <Home {...props} 
                islogin={this.state.isLoggedIn}
                vacations={this.state.vacations}  
                />} />
  
                <Route  exact path='/addvacation'  render={(props) => 
                <V_Add {...props}
                islogin={this.state.isLoggedIn}
                refresh={this.refresh.bind(this)} 
                refresh={this.refresh.bind(this)}
                />} />
  
                <Route  exact path='/vacations'  render={(props) => 
                <V_All {...props} 
                islogin={this.state.isLoggedIn}
                refresh={this.refresh.bind(this)}
                vacations={this.state.vacations}/>}/>
  
                <Route  exact path='/login'  render={(props) => 
                <Login {...props} 
                sendLogin={this.sendLogin.bind(this)} /> } />

  
                <Route component={NoMatch} />
                </Switch>
              </div>
        
  
               
             
        </Router> 
       
           
               
                <Footer />
            </main>
        </div>
    </div>
      
             
      
      );
    }

    else {
      return(

        

          <div className="container-fluid">
          <div className="row">
              <main className="main-content col-lg-12 col-md-12 col-sm-12 p-0">
              <Navbar color="light" light expand="md">
              <NavbarBrand href="/">Vacations</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="/all">All Vacations</NavLink>
                  </NavItem>
                 
                 
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Account
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                      <NavLink href="/login">Login</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
              <Router>
              
              <div className="wrapper my-5 main-content-container container-fluid px-4 d-flex flex-column h-100">
              <Switch>
                  <Route  exact path='/' render={(props) => 
                  <Home {...props} 
                  recs={this.state.recipes}  
                  cats={this.state.categories}/>}/>
    
                  <Route  exact path='/login'  render={(props) => 
                  <Login {...props}
                  sendLogin={this.sendLogin.bind(this)}/>} />
    
                  <Route component={NoMatch} />
                  </Switch>
                </div>
          
    
                 
               
          </Router> 
         
             
                 
                  <Footer/>
              </main>
          </div>
      </div>
     
               
        
        );
    
    }
   

    }

  
  async sendLogin(userstate){
    const responseData = await fetch(`http://localhost:3000/api/users/login`, {
      method:'post',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userstate)
    });
    const data = await responseData.json();
      if(data.msg=="OK"){
        this.setState({ isLoggedIn: true });
          this.props.history.push('/');
      }else{
        this.props.history.push('/login');
      }
  }
  
}

export default App;
