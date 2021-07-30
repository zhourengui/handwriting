import { useEffect, useState } from "react";
import Stateful from "./Stateful";

export default function useRecoilValue<T>(value: Stateful<T>) {
  const [, updateState] = useState({})

  useEffect(() => {
    const { disconnect } = value.subscribe(() => updateState({}))
    return () => disconnect()
  }, [value])

  return value.shapshot()
}