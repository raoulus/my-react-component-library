import {combineReducers} from 'redux';
import component from 'reducers/component';
import color from 'reducers/color';

export default combineReducers({
  component,
  color
});
