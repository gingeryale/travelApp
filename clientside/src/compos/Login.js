import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component {
  state={
    nameArr:[],
    visible:false
  }

  render() {
	return (
		<div className="app">
            <h1>Login</h1>
            <Form>
        <FormGroup>
          <Label for="login">Username</Label>
          <input name="name" onChange={this.handleChange.bind(this)} placeholder="username"/>
        </FormGroup>
		<FormGroup>
          <Label for="password">Password</Label>
          <input type="password" name="pass" onChange={this.handleChange.bind(this)} placeholder="password"/>        </FormGroup>
		<Button color="info" onClick={this.props.sendLogin.bind(null, this.state)}>Enter</Button>
		</Form>
        <br />
        <hr />
        <br />
			<h3>Register</h3>
		<Form>
        <FormGroup>
          <Label for="fname">First name</Label>
          <input name="fname" onChange={this.handleChange.bind(this)} placeholder="firstname" required/>
        </FormGroup>
        <FormGroup>
          <Label for="lname">Last Name</Label>
          <input name="lname" onChange={this.handleChange.bind(this)} placeholder="lastname" required/>
        </FormGroup>
        <FormGroup>
          <Label for="login">Username</Label>
          <input name="name" required  onChange={this.handleChange.bind(this)} 
          onBlur={this.once.bind(this)}
          placeholder="username"/>
        </FormGroup>
        <span hidden={!this.state.showErr} className="err err_taken">username is not available</span>
		<FormGroup>
          <Label for="password">Password</Label>
          <input type="password" name="pass" onChange={this.handleChange.bind(this)} placeholder="password" required/>
        </FormGroup>
        <Button color="info" disabled={!this.state.disabledState}
        onClick={this.sendRegister.bind(this, this.state)}>Register</Button>
        <span className="err err_empty" hidden={!this.state.visible}>Error: Detected empty form fields</span>
		</Form>
		</div>
	);
  }

  handleChange(e){
  	this.setState({[e.target.name]: e.target.value})
  }

  async once()
  {
      let r = await fetch('http://localhost:3000/api/users/check');
      let data = await r.json();
      this.setState({ nameArr: data }); 
      console.log(this.state);
      let regname = this.state.name;
      let dbArr = this.state.nameArr;
      let result = dbArr.filter(el => el.user_name == regname);
      if(result.length > 0){
        this.setState({disabledState:false});
        this.setState({showErr:true});
      } else {
        this.setState({disabledState:true});
        this.setState({showErr:false});
      }
  }

  

async sendRegister(ev){
  ev = ev.target.value;
  if((!ev.fname) || (!ev.lname) || (!ev.name) || (!ev.pass) ||
(ev.fname=="") || (ev.lname=="") || (ev.name=="") || (ev.pass==""))
{
  alert ("Error: All fields required");
  this.setState({disabledState:false});
  this.setState({visible:true});
  return;
} else {
  this.setState({disabledState:true});
  this.setState({visible:false});
  
  const responseData = await fetch(`http://localhost:3000/api/users/register`, {
		method:'post',
		headers: {
			'Accept':'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(this.state)
	});
	const content = await responseData.json();
	console.log(content);
  }


}
}

export default Login;
