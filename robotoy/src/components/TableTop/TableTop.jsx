import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { directions } from 'components/App/constants';
import styles from './TableTop.css';

const TableUnit = ({ active, direction }) => {
  const unitCN = cn({
    [styles.unit]: true,
    [styles.unit_active]: active === true,
    [styles.unit_dir_n]: active && direction === 'NORTH',
    [styles.unit_dir_s]: active && direction === 'SOUTH',
    [styles.unit_dir_e]: active && direction === 'EAST',
    [styles.unit_dir_w]: active && direction === 'WEST'
  });

  return <div className={unitCN}></div>;
};

TableUnit.propTypes = {
  direction: PropTypes.oneOf([
    directions.NORTH,
    directions.SOUTH,
    directions.EAST,
    directions.WEST
  ]).isRequired,
  active: PropTypes.bool.isRequired
};

class TableTop extends Component {
  static propTypes = {
    position: PropTypes.object.isRequired,
    direction: PropTypes.oneOf([
      directions.NORTH,
      directions.SOUTH,
      directions.EAST,
      directions.WEST
    ]).isRequired,
    isPlaced: PropTypes.bool.isRequired
  }

  renderUnit (i) {
    const x = i % 5;
    const y = Math.floor(i / 5);
    const { position, direction, isPlaced } = this.props;
    const isActive = isPlaced && (position.x === x && position.y === y);

    return <TableUnit key={i} active={isActive} direction={direction} />;
  }

  render () {
    const units = [];

    for (let i = 24; i > -1; i--) {
      units.push(this.renderUnit(i));
    }

    return <div className={styles.root}>
      {units}
    </div>;
  }
}

export default TableTop;
