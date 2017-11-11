import {Stage} from 'react-konva';
import React from 'react';
import ObstructionSortRocks from './Obstructions/ObstructionSortRocks.js';

export default class ChallengeObstructionContainer extends React.Component {


  getObstacle(challengeName) { //add case for each additional obstacle (and import it)
    let obstacle;
    switch (challengeName) {
      case "sortRocks":
        obstacle = <ObstructionSortRocks description={this.props.description} attempt={this.props.attempt}/>
        break;
      default:
        console.log('default obstacle');
        break;
    };
    return obstacle;
  };

  render() {
    const obstacle = this.getObstacle(this.props.challenge);
    return (
      <div className='obstacle-container'>
        <Stage width={window.innerWidth - 600} height={800}>
          {obstacle}
        </Stage>
      </div>
    );
  };
};