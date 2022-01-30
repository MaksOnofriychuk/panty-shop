const GET_PANTIES = "GET_PANTIES";
const GET_PANTY = "GET_PANTY";
const FETCH_MORE_PANTIES = "FETCH_MORE_PANTIES";

const initialState = {
  panties: [],
  panty: null,
  visibleProductCount: 6,
  loading: true,
};

export default function pantiesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PANTIES:
      return {
        ...state,
        panties: action.payload,
        loading: false,
      };

    case GET_PANTY:
      return {
        ...state,
        panty: action.payload,
      };

    case FETCH_MORE_PANTIES:
      return {
        ...state,
        visibleProductCount: state.visibleProductCount + action.payload,
      };

    default:
      return state;
  }
}

export const getPanties = (panties) => ({
  type: GET_PANTIES,
  payload: panties,
});

export const getPanty = (payload) => ({
  type: GET_PANTY,
  payload,
});

export const fetchMorePanties = (number) => ({
  type: FETCH_MORE_PANTIES,
  payload: number,
});

export const fetchPanties = () => {
  return (dispatch) => {
    fetch("/api/panties")
      .then((res) => res.json())
      .then((data) => dispatch(getPanties(data)));
  };
};

export const fetchPantyById = (pantyId) => {
  return (dispatch) => {
    fetch(`/api/panty/${pantyId}`)
      .then((res) => res.json())
      .then((data) => dispatch(getPanty(data)));
  };
};
