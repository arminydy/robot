const PLACE = 'PLACE';
const MOVE = 'MOVE';
const RIGHT = 'RIGHT';
const LEFT = 'LEFT';
const REPORT = 'REPORT';

const NORTH = 'NORTH';
const SOUTH = 'SOUTH';
const EAST = 'EAST';
const WEST = 'WEST';
const ORIENTATIONS = [NORTH, SOUTH, EAST, WEST];

const TABLE_X_DIMENSION_MAX = 5;
const TABLE_Y_DIMENSION_MAX = 5;
const TABLE_X_DIMENSION_MIN = 0;
const TABLE_Y_DIMENSION_MIN = 0;

const ERROR_MESSAGE = {
  'INVALID_INPUT': 'INVALID input, please try PLACE 0,0,NORTH, MOVE, LEFT, RIGHT!',
  'INVALID_MOVE': 'ABORT, the robot will fall down!',
  'REPORT_FAILED': 'Robot is not placed!'
};

module.exports = {
  PLACE, MOVE, RIGHT, LEFT, REPORT,
  TABLE_X_DIMENSION_MAX, TABLE_Y_DIMENSION_MAX,
  TABLE_X_DIMENSION_MIN, TABLE_Y_DIMENSION_MIN,
  ERROR_MESSAGE, ORIENTATIONS,
  NORTH, SOUTH, EAST, WEST
};
