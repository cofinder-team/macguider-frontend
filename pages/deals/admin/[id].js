import { useCallback, useEffect, useState } from 'react'
import { convertDealFromRaw, getDealRaw, getItems } from 'utils/deals'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

export default function DealAdmin({ id }) {
  const [dealRaw, setDealRaw] = useState()
  const [items, setItems] = useState([])

  useEffect(() => {
    getItems()
      .then((data) => {
        setItems(data)
      })
      .catch()
  }, [])

  useEffect(() => {
    getDealRaw(id)
      .then((data) => {
        setDealRaw(data)
      })
      .catch((e) => {
        console.log(e)
        if (e?.response?.status === 400) {
          window.alert('이미 처리되었습니다.')
          window.open('about:blank', '_self')
        }
      })
  }, [id])

  const models = [
    { id: 1, model: 'Mac Mini', alias: 'Mini' },
    { id: 2, model: 'MacBook Air', alias: 'Air' },
    { id: 3, model: 'MacBook Pro 13', alias: 'Pro13' },
    { id: 4, model: 'MacBook Pro 14', alias: 'Pro14' },
    { id: 5, model: 'MacBook Pro 16', alias: 'Pro16' },
    { id: 6, model: 'iPad Mini', alias: 'Mini' },
    { id: 7, model: 'iPad', alias: 'Normal' },
    { id: 8, model: 'iPad Air', alias: 'Air' },
    { id: 9, model: 'iPad Pro 11', alias: 'Pro11' },
    { id: 10, model: 'iPad Pro 12.9', alias: 'Pro12.9' },
  ]

  const onClickSelect = useCallback(
    (payload) => {
      convertDealFromRaw(id, payload).then(() => {
        window.alert('성공적으로 처리되었습니다.')
        window.open('about:blank', '_self')
      })
    },
    [id]
  )

  return (
    <>
      {dealRaw && items && (
        <div className="w-full md:flex">
          <div className="w-full md:w-1/2 md:px-2">
            <ul className="divide-y divide-gray-200">
              {Object.entries(
                ((item) => ({
                  model: models.find((m) => m.id === item?.model)?.model,
                  ...item?.details,
                  unused: dealRaw?.unused,
                  price: dealRaw?.price?.toLocaleString(),
                }))(
                  items.find((item) => item?.type === dealRaw?.type && item?.id === dealRaw?.itemId)
                )
              ).map(([k, v]) => (
                <li className="py-1" key={k}>
                  <div className="flex content-center justify-between">
                    <div className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {k}
                    </div>
                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                      {v?.toString()}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <iframe
              src={dealRaw.url?.replace('s://c', 's://m.c')}
              sandbox="allow-scripts allow-same-origin"
              className="h-[720px] w-full py-2"
            />
          </div>
          <div className="w-full md:w-1/2 md:px-2">
            <div className="flex justify-between py-1">
              <a>현재 분류 정보 그대로 사용해서 매물 추가하기</a>
              <div
                className="inline-flex cursor-pointer items-center px-2 py-0.5 text-xs font-semibold text-white"
                style={{
                  backgroundColor: 'green',
                }}
                onClick={() => {
                  onClickSelect({ valid: true })
                }}
              >
                등록
                <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
              </div>
            </div>
            <div className="flex justify-between py-1">
              <a>이 거래 게시물을 매물로 사용하지 않기</a>
              <div
                className="inline-flex cursor-pointer items-center px-2 py-0.5 text-xs font-semibold text-white"
                style={{
                  backgroundColor: 'red',
                }}
                onClick={() => {
                  onClickSelect({ valid: false })
                }}
              >
                제거
                <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
              </div>
            </div>
            <div className="flex justify-between py-1"></div>
            {items
              .filter((item) => item.type === dealRaw.type)
              .map((item) => (
                <div key={item?.id} className="flex justify-between py-1">
                  {Object.entries({
                    model: models.find((m) => m.id === item?.model)?.alias,
                    ...item.details,
                  }).map(([k, v]) => (
                    <a key={k} className="mx-1 w-16">
                      {v?.toString()}
                    </a>
                  ))}
                  {[
                    { text: '미개봉', unused: true },
                    { text: 'S급', unused: false },
                  ].map(({ text, unused }) => (
                    <div
                      key={unused}
                      className="inline-flex cursor-pointer items-center px-2 py-0.5 text-xs font-semibold text-white"
                      style={{
                        backgroundColor: 'black',
                      }}
                      onClick={() => {
                        onClickSelect({ valid: true, type: item.type, itemId: item.id, unused })
                      }}
                    >
                      {text}
                      <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query

  return {
    props: {
      id,
    },
  }
}
