import {get} from 'utils/rest';

export const COMPONENTS_LOADING = 'COMPONENTS_LOADING';
export const COMPONENTS_LOADED = 'COMPONENTS_LOADED';

export const COMPONENT_LOADING = 'COMPONENT_LOADING';
export const COMPONENT_LOADED = 'COMPONENT_LOADED';

export function getComponents() {
  return (dispatch) => {
    dispatch({
      type: COMPONENTS_LOADING
    });
    get('/api/components')
    .then((data) =>
      dispatch({
        type: COMPONENTS_LOADED,
        components: data
      })
    );
  };
}

export function getComponent(name) {
  return (dispatch) => {
    dispatch({
      type: COMPONENT_LOADING
    });
    get(`/api/components/${name}`)
    .then((data) =>
      dispatch({
        type: COMPONENT_LOADED,
        component: data
      })
    );
  };
}
