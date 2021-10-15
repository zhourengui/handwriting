function bindActionCreator(actionCreator, dispatch) {
  return function (...args) {
    return dispatch(actionCreator(...args));
  };
}

export default function bindActionCreators(actionCreators, dispatch) {
  let boundActionCreators = {};
  for (const key in actionCreators) {
    if (Object.hasOwnProperty.call(actionCreators, key)) {
      boundActionCreators[key] = bindActionCreator(
        actionCreators[key],
        dispatch
      );
    }
  }

  return boundActionCreators;
}
