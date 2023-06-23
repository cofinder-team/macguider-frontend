import Image from 'next/image'
import { useScreenSize } from 'hooks/useScreenSize'
import useAsync from 'hooks/useAsync'
import axiosInstance from '@/lib/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-loading-skeleton/dist/skeleton.css'
import { useCallback, useState } from 'react'
import amplitude from 'amplitude-js'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import Skeleton from 'react-loading-skeleton'
import GuideExpandedRow from './GuideExpandedRow'

async function getPrices(itemId = 1, optionId = 1, unopened = false) {
  const response = await axiosInstance.get(`/item/${itemId}/option/${optionId}`, {
    params: {
      unopened,
    },
  })
  return response.data
}

const purchaseTiming = {
  good: {
    color: '#22C55E',
    text: '추천',
  },
  normal: {
    color: '#EAB308',
    text: '주의',
  },
  bad: {
    color: '#EF4444',
    text: '보류',
  },
}

const GuideBriefRow = ({ itemId, releasedDateHistory, model, data, desc, href, price }) => {
  const { md, sm } = useScreenSize()
  const optionId = data[0].options[0].id
  const [state, refetch] = useAsync(getPrices, [itemId, optionId], [])
  const { loading, data: fetchedData, error } = state
  const [expandedRows, setExpandedRows] = useState([])

  const toggleRow = (itemId) => {
    const isRowExpanded = expandedRows.includes(itemId)
    if (isRowExpanded) {
      setExpandedRows(expandedRows.filter((row) => row !== itemId))
    } else {
      setExpandedRows([...expandedRows, itemId])
    }
    amplitude
      .getInstance()
      .logEvent('do_action', { action_type: 'guide_toggle', action_detail: itemId })
  }

  const getAverageReleaseCycle = useCallback(() => {
    const releaseCycles = []
    for (let i = 0; i < releasedDateHistory.length - 1; i++) {
      // convert YYYY-MM-DD string to Date object
      const date1 = new Date(...releasedDateHistory[i].split('-'))
      const date2 = new Date(...releasedDateHistory[i + 1].split('-'))
      const diffTime = Math.abs(date2 - date1)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      releaseCycles.push(diffDays)
    }

    const averageReleaseCycle = Math.round(
      releaseCycles.reduce((a, b) => a + b, 0) / releaseCycles.length
    )

    return averageReleaseCycle
  }, [])

  const getLatestReleaseDate = useCallback(() => {
    const latestReleaseDate = releasedDateHistory[0]

    // convert YYYY-MM-DD string to locale string
    const [year, month, day] = latestReleaseDate.split('-')
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString()
  }, [])

  const getPurchaseTiming = useCallback(() => {
    const latestReleaseDate = releasedDateHistory[0]
    const averageReleaseCycle = getAverageReleaseCycle(releasedDateHistory)
    const today = new Date()
    const [year, month, day] = latestReleaseDate.split('-')
    const date = new Date(year, month - 1, day)
    const diffTime = Math.abs(today - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays > averageReleaseCycle * 0.85) {
      return purchaseTiming.bad
    } else if (diffDays > averageReleaseCycle * 0.6) {
      return purchaseTiming.normal
    } else {
      return purchaseTiming.good
    }
  }, [])

  const getUsedPurchaseTiming = useCallback(() => {
    const latestUsedPrice = fetchedData.data.slice(-1)[0].mid
    const timing = getPurchaseTiming()

    console.log(latestUsedPrice, price)
    console.log(timing)

    if (latestUsedPrice < price * 0.75) {
      return purchaseTiming.good
    } else if (latestUsedPrice < price * 0.85 && timing !== purchaseTiming.bad) {
      return purchaseTiming.normal
    } else {
      return purchaseTiming.bad
    }
  }, [fetchedData, price, getPurchaseTiming])

  return (
    <>
      <tr
        onClick={() => toggleRow(itemId)}
        className="cursor-pointer border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
      >
        <td className="px-3 py-4 md:table-cell md:px-6">
          <FontAwesomeIcon icon={expandedRows.includes(itemId) ? faChevronUp : faChevronDown} />
        </td>
        <th
          scope="row"
          className="flex items-center whitespace-nowrap px-3 py-3 text-gray-900 dark:text-white md:px-6 md:py-4"
        >
          <img className="hidden h-10 w-10 md:block" src={data[0].imgSrc} alt={model} />
          <div className="md:pl-3">
            <div className="text-base font-semibold">{model}</div>
          </div>
        </th>
        <td
          className="hidden px-3 py-3 sm:table-cell md:px-6 md:py-4"
          style={{ wordBreak: 'keep-all' }}
        >
          {getLatestReleaseDate()}
        </td>
        <td
          className="hidden px-3  py-3 sm:table-cell md:px-6 md:py-4"
          style={{ wordBreak: 'keep-all' }}
        >
          {getAverageReleaseCycle()}일
        </td>
        <td className="px-3 py-3 md:px-6 md:py-4">
          <div className="flex  items-center">
            <div
              className="mr-2 h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: getPurchaseTiming().color,
              }}
            ></div>
            <span>{getPurchaseTiming().text}</span>
          </div>
        </td>
        <td className="px-3 py-3 md:px-6 md:py-4">
          <div className="flex  items-center">
            {loading || !fetchedData ? (
              <Skeleton width={md ? '5rem' : '3rem'} borderRadius="0.5rem" />
            ) : (
              <div style={{ width: md ? '5rem' : '3rem' }}>
                <div
                  className="mr-2 h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: getUsedPurchaseTiming().color,
                  }}
                ></div>
                <span>{getUsedPurchaseTiming().text}</span>
              </div>
            )}
          </div>
        </td>
      </tr>
      {expandedRows.includes(itemId) && (
        <GuideExpandedRow
          name={model}
          itemId={itemId}
          optionId={optionId}
          itemDesc={desc}
          href={href}
          imgSrc={data[0].imgSrc}
          latestReleaseDate={releasedDateHistory[0]}
          averageReleaseCycle={getAverageReleaseCycle()}
          purchaseTiming={getPurchaseTiming()}
          fetchedData={fetchedData}
          loading={loading}
          price={price}
        />
      )}
    </>
  )
}

export default GuideBriefRow
