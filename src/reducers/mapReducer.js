// mapReducer.js
const initialState = {
  filters: {
    resilience: 'all',
    resource: 'all',
    demand: 'all',
  },
  predictedLocation: null,
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_PREDICTED_LOCATION':
      return { ...state, predictedLocation: action.payload };
    default:
      return state;
  }
};

export default mapReducer;
