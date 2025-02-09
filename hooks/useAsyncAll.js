import { useReducer, useEffect } from 'react'

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

function useAsyncAll(callback, callbackParams = [], deps = []) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false,
  })

  const fetchData = async (callbackParams = []) => {
    dispatch({ type: 'LOADING' })
    try {
      const result = await Promise.all(callbackParams.map((params) => callback(...params)))
      dispatch({ type: 'SUCCESS', data: result })
    } catch (e) {
      dispatch({ type: 'ERROR', error: e })
    }
  }

  useEffect(() => {
    fetchData(callbackParams)
    // eslint 설정을 다음 줄에서만 비활성화
    // eslint-disable-next-line
  }, deps)

  return [state, fetchData]
}

export default useAsyncAll
