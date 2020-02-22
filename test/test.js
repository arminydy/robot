const chai = require('chai');
const expect = chai.expect;

const CONSTANTS = require('../constants');
const Application = require('../src/Application');
const Robot = require('../src/Robot');
const application = new Application();

describe('INPUT TEST', () => {
  const robot = new Robot();

  it('Return error message if input is invalid', () => {
    const result = application.runCommand(robot,'WRONG COMMAND');
    expect(result.success).to.deep.equal(false);
    expect(result.message).to.deep.equal(CONSTANTS.ERROR_MESSAGE.INVALID_INPUT);
  });

  it('Valid input commands', () => {
    const result = application.runCommand(robot, 'PLACE 1,2,NORTH');
    expect(result.success).to.deep.equal(true);
  });

  it('Place robot in 0x0 dimention to make sure it passes all the if else conditions for 0 being a number and not false', () => {
    const result = application.runCommand(robot, 'PLACE 0,0,NORTH');
    expect(result.success).to.deep.equal(true);
  });
});

describe('PLACE', () => {
  const validInput = 'PLACE 3,5,NORTH';
  const invalidInput = 'PLACE a,2,NORTH';
  it('Valid PLACE command', async () => {
    const robot = new Robot();
    const result = await application.runCommand(robot, validInput);

    const expectedRobot = new Robot(3,5,CONSTANTS.NORTH);
    expect(robot).to.deep.equal(expectedRobot);
    expect(result.success).to.deep.equal(true);

  });

  it('Invalid PLACE command', () => {
    const robot = new Robot();
    const result = application.runCommand(robot, invalidInput);
    expect(result.success).to.deep.equal(false);
    expect(result.message).to.deep.equal(CONSTANTS.ERROR_MESSAGE.INVALID_INPUT);
  });

  it('Invalid X position', () => {
    const invalidXPosition = 'PLACE 8,2,NORTH';
    const robot = new Robot();
    const result = application.runCommand(robot, invalidXPosition);
    expect(result.success).to.deep.equal(false);
    expect(result.message).to.deep.equal(CONSTANTS.ERROR_MESSAGE.INVALID_INPUT);
  });

  it('Invalid X position', () => {
    const invalidXPosition = 'PLACE -1,2,NORTH';
    const robot = new Robot();
    const result = application.runCommand(robot, invalidXPosition);
    expect(result.success).to.deep.equal(false);
    expect(result.message).to.deep.equal(CONSTANTS.ERROR_MESSAGE.INVALID_INPUT);
  });

  it('Invalid Y position', () => {
    const invalidXPosition = 'PLACE 2,9,NORTH';
    const robot = new Robot();
    const result = application.runCommand(robot, invalidXPosition);
    expect(result.success).to.deep.equal(false);
    expect(result.message).to.deep.equal(CONSTANTS.ERROR_MESSAGE.INVALID_INPUT);
  });

  it('Invalid Y position', () => {
    const invalidXPosition = 'PLACE 2,-9,NORTH';
    const robot = new Robot();
    const result = application.runCommand(robot, invalidXPosition);
    expect(result.success).to.deep.equal(false);
    expect(result.message).to.deep.equal(CONSTANTS.ERROR_MESSAGE.INVALID_INPUT);
  });

  it('Invalid orientation position', () => {
    const invalidXPosition = 'PLACE 2,2,b';
    const robot = new Robot();
    const result = application.runCommand(robot, invalidXPosition);
    expect(result.success).to.deep.equal(false);
    expect(result.message).to.deep.equal(CONSTANTS.ERROR_MESSAGE.INVALID_INPUT);
  });
});


describe('MOVE', () => {
  it('MOVE command will move the robot which is place on the table one unit forward', () => {
    const robotPosition = new Robot(3, 2, CONSTANTS.NORTH);
    const newPosition = new Robot(3, 3, CONSTANTS.NORTH);
    const result = application.runCommand(robotPosition, CONSTANTS.MOVE);

    expect(robotPosition).to.deep.equal(newPosition);
    expect(result.success).to.deep.equal(true);
  });

  it('Invalid MOVE command move the robot outside of the table X dimention', () => {
    const robotCurrentPosition = new Robot(5, 1, CONSTANTS.EAST);
    const robotNewInvalidtPosition = application.runCommand(robotCurrentPosition, CONSTANTS.MOVE);

    expect(robotNewInvalidtPosition.success).to.deep.equal(false);
    expect(robotNewInvalidtPosition.message).to.deep.equal(CONSTANTS.ERROR_MESSAGE.INVALID_MOVE);
  });

  it('Invalid MOVE command move the robot outside of the table Y dimention', () => {
    const robotCurrentPosition = new Robot(1, 5, CONSTANTS.NORTH);
    const robotNewInvalidtPosition = application.runCommand(robotCurrentPosition, CONSTANTS.MOVE);

    expect(robotNewInvalidtPosition.success).to.deep.equal(false);
    expect(robotNewInvalidtPosition.message).to.deep.equal(CONSTANTS.ERROR_MESSAGE.INVALID_MOVE);
  });
});

describe('ROTATION to LEFT', () => {
  it('LEFT command will rotate the robot to its LEFT side', () => {
    const robotPosition = new Robot(3, 2, CONSTANTS.NORTH);
    const newPosition = new Robot(3, 2, CONSTANTS.WEST);
    const result = application.runCommand(robotPosition, CONSTANTS.LEFT);

    expect(robotPosition).to.deep.equal(newPosition);
    expect(result.success).to.deep.equal(true);
  });
});

describe('ROTATION to RIGHT', () => {
  it('LEFT command will rotate the robot to its RIGHT side', () => {
    const robotPosition = new Robot(3, 2, CONSTANTS.NORTH);
    const newPosition = new Robot(3, 2, CONSTANTS.EAST);
    const result = application.runCommand(robotPosition, CONSTANTS.RIGHT);

    expect(robotPosition).to.deep.equal(newPosition);
    expect(result.success).to.deep.equal(true);
  });
});

describe('REPORT command', () => {
  it('REPORT will display the result xPosition, yPosition and orientation', () => {
    const robotPosition = new Robot(3, 2, CONSTANTS.NORTH);
    const result = application.runCommand(robotPosition, CONSTANTS.REPORT);
    expect(result.success).to.deep.equal(true);
  });

  it('REPORT will throw error if the result xPosition, yPosition and orientation are not set', () => {
    const invalidReport = new Robot();
    const result = application.runCommand(invalidReport, CONSTANTS.REPORT);
    expect(result.success).to.deep.equal(false);
    expect(result.message).to.deep.equal(CONSTANTS.ERROR_MESSAGE.REPORT_FAILED);
  });
});