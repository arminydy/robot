const _ = require('lodash');
const CONSTANT = require('../constants');

module.exports =  class InputValidation{
  placeValidation (inputX,inputY,inputF) {
    if (!this.isPositionXValid(inputX) || !this.isPositionYValid(inputY)) {
      return false;
    }

    if(!_.includes(CONSTANT.ORIENTATIONS, inputF)) {
        return false;
      }
    return true;
  }

  moveValidation(inputX, inputY){
    if (!this.isPositionXValid(inputX) || !this.isPositionYValid(inputY)) {
      return false;
    }
    return true;
  }

  isPositionXValid(inputX){
    return (!_.isNaN(inputX)
            && _.toNumber(inputX) >= CONSTANT.TABLE_X_DIMENSION_MIN
            && _.toNumber(inputX) <= CONSTANT.TABLE_X_DIMENSION_MAX);
  }
  isPositionYValid(inputY){
    return (!_.isNaN(inputY)
            && _.toNumber(inputY) >= CONSTANT.TABLE_Y_DIMENSION_MIN
            && _.toNumber(inputY) <= CONSTANT.TABLE_Y_DIMENSION_MAX);
  }
};