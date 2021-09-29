import React, { useContext, useState, useEffect, useRef } from "react";
import ReactReduxContext from "./Context";

function connect(
  mapStateToProps = () => ({}),
  mapDispatchToProps = () => ({})
) {
  function propsSelector(getState, dispatch, props) {
    const state = getState();
    const stateProps = mapStateToProps(state);
    const dispatchProps = mapDispatchToProps(dispatch);
    return Object.assign({}, stateProps, dispatchProps, props);
  }
  return function connectHOC(WrapperComponent) {
    return function (props) {
      const { getState, dispatch, subscribe } = useContext(ReactReduxContext);
      const [_, updateState] = useState({});
      const prevProps = useRef(propsSelector(getState, dispatch, props));

      useEffect(() => {
        const unsubscribe = subscribe(() => {
          // 判断两个props是否不变，简单判断
          const nextProps = propsSelector(getState, dispatch, props);
          if (
            !Object.keys(nextProps).every(
              (prop) => nextProps[prop] === prevProps.current[prop]
            )
          ) {
            prevProps.current = nextProps;
            updateState({});
          }
        });
        return () => {
          unsubscribe();
        };
      }, []);

      return <WrapperComponent {...prevProps.current} />;
    };
  };
}

export default connect;
