import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const HomeRow = ({ home, onRemove }) => {
  return (
    <Row className="mb-3">
      <Col>{home.name}</Col>
      <Col>{home.description}</Col>
      <Col>{home.city}</Col>
      <Col>
        <Button variant="outline-danger" size="sm" onClick={() => onRemove(home.id)}>
          <i className="bi bi-trash"></i>
        </Button>
      </Col>
    </Row>
  );
};
export default HomeRow;