import { useState, useEffect } from "react"

type UseFetch<T> = [
  response: T | undefined | null,
  error: Error | undefined | null,
  isLoading: boolean
]

export default function useFetch<T>(callback: () => Promise<T>): UseFetch<T> {
  const [response, setResponse] = useState<T | undefined | null>()
  const [error, setError] = useState<Error | undefined | null>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const abortController = new AbortController()
    callback()
      .then((res) => {
        setResponse(res)
      })
      .catch((error: Error) => {
        if (error.name === "AbortError") return
        setError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })

    return () => {
      abortController.abort()
    }
  }, [callback])

  return [response, error, isLoading]
}
