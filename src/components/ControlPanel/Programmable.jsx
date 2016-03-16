import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

import { directions, presets } from '#components/App/constants';

import styles from './ControlPanel.css';

class Programmable extends Component {
  constructor () {
    super();

    this.state = {
      code: '',
      output: '',
      isRunning: false
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

  toggleRunState (isRunning) {
    this.setState({
      isRunning
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
              if (i === 0) {
                this.toggleRunState(true);
              }

              if (i === codeStrings.length - 1) {
                this.toggleRunState(false);
              }

              this.executeCodeString(codeStrings[i]);
            } catch (e) {
              NotificationManager.error(e.message);
            }
          }, 300 * i);
        }
    } else {
      NotificationManager.warning('Enter the code, please');
    }
  }

  fillCodePreset (presetId) {
    const { onReset } = this.props;
    const { code } = this.refs;

    onReset();
    this.clearReport();

    this.setState({
      code: presets[presetId].join('\n')
    });
  }

  renderCodeInput () {
    const { output } = this.state;

    let codeInputProps = {
      ref: 'output',
      type: 'text',
      className: styles.output,
      placeholder: 'Output',
      value: output,
      readOnly: true
    };

    if (output.length) {
      codeInputProps = {
        ...codeInputProps,
        bsStyle: 'success'
      };
    }

    return <Input {...codeInputProps} />;
  }

  renderPresets () {
    return <Row className="form-group">
      <Col xs={12}>
        {
          Object.keys(presets).map((preset, index) => {
            return <Button
              onClick={() => this.fillCodePreset(preset)}
              key={index}
              block
            >{preset}</Button>;
          })
        }
      </Col>
    </Row>;
  }

  handleCodeChange () {
    const { code } = this.refs;
    const codeText = code.getValue();

    this.setState({
      code: codeText
    });
  }

  render () {
    const { code, isRunning } = this.state;

    return <div>
      <Row>
        <Col xs={12}>
          <Input
            ref="code"
            type="textarea"
            className={styles.code}
            value={code}
            placeholder="Input"
            onChange={() => this.handleCodeChange()}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          { this.renderCodeInput() }
        </Col>
      </Row>

      { this.renderPresets() }

      <Row>
        <Col xs={12}>
          <Button
            bsSize="large"
            bsStyle="success"
            onClick={() => this.parseCode()}
            block
            disabled={isRunning}
            >Run</Button>
        </Col>
      </Row>
    </div>;
  }
}

export default Programmable;
