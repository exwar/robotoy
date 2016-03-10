import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import cn from 'classnames';

const TableUnit = ({ active, direction }) => {
  const unitCN = cn({
    'tabletop__unit': true,
    'tabletop__unit_active': active === true,
    'tabletop__unit_dir_n': direction === 'NORTH',
    'tabletop__unit_dir_s': direction === 'SOUTH',
    'tabletop__unit_dir_e': direction === 'EAST',
    'tabletop__unit_dir_w': direction === 'WEST'
  });

  const squareStyle = {

  }

  return <div className={unitCN}>

  </div>
}

class TableTop extends Component {
  renderUnit (i) {
    const x = i % 5;
    const y = Math.floor(i / 5);
    const { position, direction } = this.props;
    const isActive = position.x === x && position.y === y;


    return <TableUnit key={i} active={isActive} direction={direction} />;
  }

  render () {
    const units = [];

    for (let i = 24; i > -1; i--) {
      units.push(this.renderUnit(i));
    }

    return <div className="tabletop">
      {units}
    </div>
  }
}

export default TableTop;
