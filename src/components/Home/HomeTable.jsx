import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HomeRow from './HomeRow';

const HomeTable = ({ homes, onRemoveHome }) => {
  if (homes.length === 0) {
    return null;
  }

  return (
    <Container>
      <Row className="mb-2 font-weight-bold">
        <Col>Name</Col>
        <Col>Description</Col>
        <Col>City</Col>
        <Col>Actions</Col>
      </Row>
      {homes.map(home => (
        <HomeRow key={home.id} home={home} onRemove={onRemoveHome} />
      ))}
    </Container>
  );
};

export default HomeTable;
