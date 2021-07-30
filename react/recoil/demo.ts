import { Atom, Selector, Stateful, useRecoilState, useRecoilValue } from "./index"

const demoAtom = Atom.createAtom({
  key: Symbol("demoAtom"),
  default: {
    nickname: "zhourengui",
    age: 25
  }
})

const demoSelector = Selector.createSelector({
  key: Symbol("demoSelector"),
  get: ({ get }) => {
    console.error(get(demoAtom))
  }
})

const demoValue = useRecoilValue(demoAtom)

const [demoState, setDemoState] = useRecoilState(demoAtom)

const otherValue = useRecoilValue(demoSelector)

// const [] = useRecoilState(demoSelector) // error
