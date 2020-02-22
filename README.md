# Toy Robot

### Description

- The application is a simulation of a toy robot moving on a square tabletop,
  of dimensions 5 units x 5 units.
- There are no other obstructions on the table surface.
- The robot is free to roam around the surface of the table, but must be
  prevented from falling to destruction. Any movement that would result in the
  robot falling from the table must be prevented, however further valid
  movement commands must still be allowed.

## Instalation

```
$ npm install
```

## Test

```
$ npm test
```

## Usage

```
$ npm start
```

## Commands:

1)PLACE: PLACE will put the toy robot on the table in position X,Y and facing NORTH,
SOUTH, EAST or WEST

2)MOVE: will move the toy robot one unit forward in the direction it is
currently facing.

3)LEFT and RIGHT: will rotate the robot 90 degrees in the specified direction
without changing the position of the robot.

4)REPORT: will announce the X,Y and F of the robot. This can be in any form,
but standard output is sufficient.

### Example 1

    PLACE 0,0,NORTH
    MOVE
    REPORT

Expected output:

    0,1,NORTH

### Example 2

    PLACE 1,2,EAST
    MOVE
    MOVE
    LEFT
    MOVE
    REPORT

Expected output

    3,3,NORTH
