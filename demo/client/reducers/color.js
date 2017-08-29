import {COLORS_LOADED} from 'actions/color-actions';

const initialState = {
  colors: ''
};

export default function contractReducer(state = initialState, action) {
  if (action.type === COLORS_LOADED) {
    return {
      ...state,
      colors: action.colors
    };
  }

  return state;
}
