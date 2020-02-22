const _ = require('lodash');

const CONSTANTS = require('../constants');
const InputValidation = require('./InputValidation');
const inputValidation = new InputValidation();

module.exports = class Application {
  runCommand(robot, userInput) {
    let trimedInput =  userInput.toString().trim().toUpperCase();
    let input = trimedInput.split(' ');
    switch(input[0]) {
        case CONSTANTS.PLACE:
          return this.processPlaceRobot(robot, input[1]);
        case CONSTANTS.MOVE:
          return this.processMove(robot);
        case CONSTANTS.LEFT:
          return this.rotateLeft(robot);
        case CONSTANTS.RIGHT:
          return this.rotateRight(robot);
        case CONSTANTS.REPORT:
          return this.report(robot);
        default:
          return this.createResult(false, CONSTANTS.ERROR_MESSAGE.INVALID_INPUT);
    }
  }

  report(robot){
    if(!_.isNil(robot.positionX) && !_.isNil(robot.positionY) && robot.orientation) {
      return this.createResult(true, `REPORT: Robot is located at ${robot.positionX}, ${robot.positionY}, ${robot.orientation}`);
    } else {
      return this.createResult(false, CONSTANTS.ERROR_MESSAGE.REPORT_FAILED);
    }
  }

  processPlaceRobot(robot, input) {
    let [inputX, inputY, inputF] = input.split(',');
    if(!_.isNil(inputX) && !_.isNil(inputY) && inputF) {
      inputX = _.toNumber(inputX, null);
      inputY = _.toNumber(inputY, null);

      inputF = inputF.toUpperCase();
      if(inputValidation.placeValidation(inputX, inputY,inputF)) {
        robot.placeRobot(inputX,inputY,inputF);
        return this.createResult(true);
      }
    }
    return this.createResult(false, CONSTANTS.ERROR_MESSAGE.INVALID_INPUT);
  }

  processMove(robot) {
    const currentX = robot.positionX;
    const currentY = robot.positionY;
    const currentOrientation = robot.orientation;
    let nextX = currentX;
    let nextY = currentY;
    switch(currentOrientation) {
      case CONSTANTS.NORTH:
        nextY = nextY+1;
        break;
      case CONSTANTS.SOUTH:
        nextY = nextY-1;
        break;
      case CONSTANTS.EAST:
        nextX = nextX+1;
        break;
      case CONSTANTS.WEST:
        nextX = nextX-1;
        break;
    }
    if(inputValidation.moveValidation(nextX, nextY)){
      robot.move(nextX, nextY);
      return this.createResult(true);
    } else {
      return this.createResult(false, CONSTANTS.ERROR_MESSAGE.INVALID_MOVE);
    }
  }

  rotateLeft(robot) {
    const currentOrientation = robot.orientation;
    let newOrientation = null;

    switch (currentOrientation) {
      case 'NORTH':
        newOrientation = CONSTANTS.WEST;
        break;
      case 'SOUTH':
        newOrientation = CONSTANTS.EAST;
        break;
      case 'EAST':
        newOrientation = CONSTANTS.NORTH;
        break;
      case 'WEST':
        newOrientation = CONSTANTS.SOUTH;
        break;
    }

    robot.setOrientation(newOrientation);
    return this.createResult(true);
  }

  rotateRight(robot) {
    const currentOrientation = robot.orientation;
    let newOrientation = null;

    switch (currentOrientation) {
      case 'NORTH':
        newOrientation = CONSTANTS.EAST;
        break;
      case 'SOUTH':
        newOrientation = CONSTANTS.WEST;
        break;
      case 'EAST':
        newOrientation = CONSTANTS.SOUTH;
        break;
      case 'WEST':
        newOrientation = CONSTANTS.NORTH;
        break;
    }
    robot.setOrientation(newOrientation);
    return this.createResult(true);
  }

  createResult(isSuccess, message){
    return {success: isSuccess, message};
  }
};