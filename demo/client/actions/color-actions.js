import {get} from 'utils/rest';

export const COLORS_LOADED = 'COLORS_LOADED';

export function getColors() {
  return (dispatch) => {
    get('/api/colors')
    .then((data) =>
      dispatch({
        type: COLORS_LOADED,
        colors: data
      })
    );
  };
}
