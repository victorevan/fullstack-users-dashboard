/* eslint-disable no-console */

const logger = store => next => (action) => {
  console.group(action.type);
  console.log('The action: ', action);
  const returnValue = next(action);
  console.log('The new state: ', store.getState());
  console.groupEnd();
  return returnValue;
};

/* eslint-enable no-console */

export default logger;
