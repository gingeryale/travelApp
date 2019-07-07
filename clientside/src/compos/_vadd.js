import React, { Component } from 'react';
import { Button } from 'reactstrap';


class V_Add extends Component {

  render() {
	return (
	  <div className="App d-flex flex-column h-100 d-flex flex-column h-100">
		<h1>Add New Category</h1>
  		<p>category name:  <input type="text" name="name" onChange={this.handleChange.bind(this)}/></p>
  
<Button color="warning" onClick={this.sendData.bind(this)}>Add</Button>
	
	  </div>
	);
  }

  handleChange(e){
  	this.setState({[e.target.name]: e.target.value})
  }


async sendData(){
	const responseData = await fetch(`http://localhost:3000/api/vacations/`, {
		method:'post',
		headers: {
			'Accept':'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(this.state)
	});
	const content = await responseData.json();
	this.props.refresh();
	this.props.history.push('/all');
	console.log(content);
  }
}

export default V_Add;
