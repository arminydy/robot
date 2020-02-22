const CONSTANTS = require('../constants');
const _ = require('lodash');

module.exports = class Robot {
  constructor(positionX, positionY, orientation) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.orientation = orientation;
  }

  placeRobot(inputX,inputY,inputF) {
    if (!_.isNil(inputX) && !_.isNil(inputY) && !_.isNil(inputF) ) {
      this.setPositionX(inputX);
      this.setPositionY(inputY);
      this.setOrientation(inputF);
      return true;
    } else {
      return false;
    }
  }

  setPositionX(inputX) {
    this.positionX = inputX;
  }

  setPositionY(inputY) {
    this.positionY = inputY;
  }

  move(inputX, inputY) {
    this.setPositionX(inputX);
    this.setPositionY(inputY);
  }

  setOrientation(orientation) {
    switch (orientation) {
      case 'NORTH':
        this.orientation = CONSTANTS.NORTH;
        break;
      case 'SOUTH':
        this.orientation = CONSTANTS.SOUTH;
        break;
      case 'EAST':
        this.orientation = CONSTANTS.EAST;
        break;
      case 'WEST':
        this.orientation = CONSTANTS.WEST;
        break;
      default:
        return false;
    }
    return true;
  }
};
