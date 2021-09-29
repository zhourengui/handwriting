const contextStack = [];

function useStateFunc(defaultState) {
  const conetxt = contextStack[contextStack.length - 1];
  const { states, nu } = conetxt;
  function setState(newState) {
    states[nu] = newState;
    console.log(states);
  }
  if (!states[nu]) {
    states[nu] = defaultState;
  }

  return [states[nu], setState];
}

function withUseState(func) {
  let states = {},
    nu = 0;
  return (...args) => {
    contextStack.push({ nu: nu++, states });
    const result = func(...args);
    contextStack.pop();
    return result;
  };
}

const useState = withUseState(useStateFunc);

const [count, setCount] = useState(0);
const [count1, setCount1] = useState(1);
