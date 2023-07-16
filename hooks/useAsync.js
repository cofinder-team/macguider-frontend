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

function useAsync(callback, callbackParams = [], deps = []) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false,
  })

  const fetchData = async (callbackParams = []) => {
    const startTime = performance.now()

    dispatch({ type: 'LOADING' })
    try {
      const data = await callback(...callbackParams)
      const endTime = performance.now()
      const duration = endTime - startTime
      console.log('Time taken for API fetching:', duration, 'milliseconds')
      dispatch({ type: 'SUCCESS', data })
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

export default useAsync
