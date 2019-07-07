import React, { Component } from 'react';
import Vacation from './Vacation';
import { Container, Row,CardColumns  } from 'reactstrap';

class V_All extends Component {

  render() {
	return (
		<Container>
       <h1>All Vacations</h1>
	 <div className="main-content-container container-fluid h-100">
		<Row>
		<CardColumns>
		{ 
		this.props.allVacaProps.map(v=> <Vacation vac={v} key={v.id} />
			)
	}
	 </CardColumns>
	
	  </Row>
	  </div>
	  </Container>
	  
	);
  }



}

export default V_All;
