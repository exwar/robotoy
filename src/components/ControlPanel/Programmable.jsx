import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

import { directions } from '#components/App/constants';

import styles from './ControlPanel.css'

class Programmable extends Component {
  constructor () {
    super();

    this.state = {
      output: ''
    };
  }

  reportState () {
    const { position, direction } = this.props;
    const output = `${position.x},${position.y},${direction}`;

    this.setState({
      output
    });
  }

  clearReport () {
    this.setState({
      output: ''
    });
  }

  executeCodeString (string) {
    const { isPlaced, onReset, onPlaceCoordsDispatch, onRotationDispatch, onMoveDispatch } = this.props;

    const commands = {
      PLACE: new RegExp(`^PLACE (-?\\d)\\,(-?\\d)\\,(${directions.NORTH}|${directions.SOUTH}|${directions.EAST}|${directions.WEST})$`),
      MOVE: /^MOVE$/i,
      LEFT: /^LEFT$/i,
      RIGHT: /^RIGHT$/i,
      REPORT: /^REPORT$/i
    };

    const parsedString = string.trim().toUpperCase();

    const stringCommand = Object.keys(commands).filter((command) => {
      return commands[command].test(parsedString);
    });

    if (stringCommand[0]) {
      if (!isPlaced && stringCommand[0] !== 'PLACE') {
        throw new Error(`RoboToy is not placed yet`);
      }

      switch (stringCommand[0]) {
        case 'PLACE':
          const placeMatch = parsedString.match(commands['PLACE']).slice(1);

          onPlaceCoordsDispatch.apply(this, placeMatch);
          break;
        case 'LEFT':
          onRotationDispatch(-1);
          break;
        case 'RIGHT':
          onRotationDispatch(1);
          break;
        case 'MOVE':
          onMoveDispatch();
          break;
        case 'REPORT':
          this.reportState();
          break;
        default:
          break;
      }
    } else {
      throw new Error(`Invalid command or command format: ${parsedString}`);
    }
  }

  parseCode () {
    const { onReset } = this.props;
    const { code } = this.refs;
    const codeText = code.getValue().trim();

    onReset();
    this.clearReport();

    if (codeText) {
      let codeStrings = codeText.split('\n');


        for (let i = 0; i < codeStrings.length; i++) {
            setTimeout(() => {
              try {
                this.executeCodeString(codeStrings[i])
              } catch (e) {
                NotificationManager.error(e.message)
              }
            }, 300 * i);
        }
    } else {
      NotificationManager.warning('Enter the code, please')
    }
  }

  render () {
    const { output } = this.state;

    return <div>
      <Row>
        <Col xs={12}>
          <Input
            ref="code"
            type="textarea"
            className={styles.code}
            placeholder="Input"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Input
            bsStyle={output.length ? 'success' : 'default'}
            ref="output"
            type="text"
            className={styles.output}
            placeholder="Output"
            value={output}
            readOnly
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Button
            bsSize="large"
            bsStyle="success"
            onClick={() => this.parseCode()}
            block
            >
            Run
          </Button>
        </Col>
      </Row>
    </div>
  }
}

export default Programmable;
