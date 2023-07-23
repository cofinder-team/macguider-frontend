import { useReducer, useEffect, useState } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      }
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      }
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

function useAsync(callback, callbackParams = [], deps = [], preventFirstFetch = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false,
  })
  const [isInitialMount, setIsInitialMount] = useState(preventFirstFetch)

  const fetchData = async (callbackParams = []) => {
    dispatch({ type: 'LOADING' })
    try {
      const data = await callback(...callbackParams)
      dispatch({ type: 'SUCCESS', data })
    } catch (e) {
      dispatch({ type: 'ERROR', error: e })
    }
  }

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false)
      return
    }

    fetchData(callbackParams)
    // eslint 설정을 다음 줄에서만 비활성화
    // eslint-disable-next-line
  }, deps)

  return [state, fetchData]
}

export default useAsync
