import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import PageHeader from './PageHeader';
import TableTop from './TableTop';
import ControlPanel from './ControlPanel';

export default class App extends Component {
  constructor () {
    super();

    this.state = {
      position: {
        x: 0,
        y: 0
      },
      direction: 'EAST'
    }
  }

  componentDidMount () {
    let id = 0;
    const directions = ['EAST', 'SOUTH', 'WEST', 'NORTH'];

    setInterval(() => {
      this.setState({
        direction: directions[id++]
      });

      if (id > directions.length - 1) id = 0;
    }, 1000);
  }

  render () {
    const { position, direction } = this.state;

    return <Grid>
      <Row>
        <PageHeader />
      </Row>

      <Row>
        <Col md={1} />
        <Col md={5}>
          <TableTop position={position} direction={direction} />
        </Col>
        <Col md={5}>
          <ControlPanel />
        </Col>
        <Col md={1} />
      </Row>
    </Grid>
  }
}
