import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class U_Add extends Component {

  render() {
	return (
		<div className="app">
			<h1>Add Vacation</h1>
		<Form>
        <FormGroup>
          <Label for="destination">Destination</Label>
          <input name="destination" onChange={this.handleChange.bind(this)} placeholder="name"/>
        </FormGroup>
		<FormGroup>
          <Label for="prep">Description</Label>
		  <input name="desc" onChange={this.handleChange.bind(this)} placeholder="desc"/>
        </FormGroup>
		<FormGroup>
			<Label for="price">Price</Label>
			<input name="price" onChange={this.handleChange.bind(this)} placeholder="price"/>
		</FormGroup>
		<FormGroup>
          <Label for="img">Vacation Image</Label>
          <Input type="text" name="img" placeholder="image" onChange={this.handleChange.bind(this)}/>
        </FormGroup>
		<FormGroup>
          <Label for="img">Vacation Start Date</Label>
		  <input type="date" name="checkin" onChange={this.handleChange.bind(this)} placeholder="check-in"/>
        </FormGroup>
		<FormGroup>
          <Label for="img">Vacation End Date</Label>
		  <input type="date" name="checkout" onChange={this.handleChange.bind(this)} placeholder="check-out"/>
        </FormGroup>
		
		<Button color="warning" onClick={this.sendData.bind(this)}>Add</Button>
		</Form>
  		
		</div>
	);
  }

  handleChange(e){
  	this.setState({[e.target.name]: e.target.value})
  }


async sendData(){
	const responseData = await fetch(`http://localhost:3000/api/vacations`, {
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

export default U_Add;
