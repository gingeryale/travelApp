import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
	CardTitle, CardSubtitle, Button, Col  } from 'reactstrap';


class Rec extends Component {
  render(){
    return (
      <Col>
      <Card >
        <CardImg top width="100%" src={this.props.vac.img} alt="Card image cap" />
        <CardBody>
        <CardTitle>{this.props.vac.vac_destination} </CardTitle>
        <CardSubtitle>{this.props.vac.vac_desc} </CardSubtitle>
        <CardText><span>{this.props.vac.vac_checkin}</span><span>{this.props.vac.vac_checkout}</span></CardText>
        <CardText>{this.props.vac.vac_desc} Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
        <Button data-id={this.props.r.id} onClick={this.remover.bind(this)} outline>Delete</Button>
        </CardBody>
      </Card>
      </Col>
    );
  }

   async remover(e){ 
    let id = e.target.attributes.getNamedItem('data-id').value;
     console.log(id);
     const responseData = await fetch(`http://localhost:3000/api/vacations/${id}`, {
		method:'delete',
		headers: {
			'Accept':'application/json',
			'Content-Type': 'application/json'
		}
	});
  const content = await responseData.json();
  this.props.refresh();
  }
   

  }

export default Rec;
