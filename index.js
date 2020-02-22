const stdin = process.openStdin();
const Application = require('./src/Application');

const application = new Application();

const Robot = require('./src/Robot');
const robot = new Robot();

console.log('Place me on the table? e.g. PLACE 1,1,EAST');
stdin.addListener('data', function (userInput) {
  const result = application.runCommand(robot, userInput);
  if(result.message){
    console.log(result.message);
  }
});