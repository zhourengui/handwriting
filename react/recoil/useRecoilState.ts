import { useCallback } from "react";
import Atom from "./Atom";
import useRecoilValue from "./useRecoilValue";

function tuplify<T extends any[]>(...args: T) {
  return args
}

export default function useRecoilState<T>(atom: Atom<T>) {
  const value = useRecoilValue(atom)
  return tuplify(value, useCallback((value: T)=> atom.setState(value), [atom]))
}
