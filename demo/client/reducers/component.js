import {
  COMPONENTS_LOADING,
  COMPONENTS_LOADED,
  COMPONENT_LOADING,
  COMPONENT_LOADED
} from 'actions/component-actions';

const initialState = {
  components: []
};

export default function contractReducer(state = initialState, action) {
  if (action.type === COMPONENTS_LOADING) {
    return {
      ...state,
      components: []
    };
  }

  if (action.type === COMPONENTS_LOADED) {
    return {
      ...state,
      components: action.components
    };
  }

  if (action.type === COMPONENT_LOADING) {
    return {
      ...state,
      componentIsLoading: true
    };
  }

  if (action.type === COMPONENT_LOADED) {
    return {
      ...state,
      component: action.component,
      componentIsLoading: false
    };
  }

  return state;
}
