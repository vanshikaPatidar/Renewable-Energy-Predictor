// mapActions.js
export const setFilters = (filters) => ({
  type: 'SET_FILTERS',
  payload: filters,
});

export const setPredictedLocation = (location) => ({
  type: 'SET_PREDICTED_LOCATION',
  payload: location,
});
