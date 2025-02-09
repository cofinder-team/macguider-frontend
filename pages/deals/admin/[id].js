import { useCallback, useEffect, useState } from 'react'
import { convertDealFromRaw, getDealRaw, getItems, getItemPrice } from 'utils/deals'
import { getAuthUser } from 'utils/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from 'react-query'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

export default function DealAdmin({ id }) {
  const [cookies, _setCookie, _removeCookie] = useCookies(['refreshToken'])
  const refreshToken = cookies['refreshToken']
  const { data: accessToken } = useQuery('accessToken', () => {})

  const router = useRouter()
  const [user, setUser] = useState()

  const [dealRaw, setDealRaw] = useState()
  const [itemPrice, setItemPrice] = useState()
  const [items, setItems] = useState([])

  useEffect(() => {
    if (!refreshToken) {
      router.push('/login')
    }
  }, [router, refreshToken])

  useEffect(() => {
    if (accessToken) {
      getAuthUser()
        .then((user) => {
          if (user.role === 'ADMIN') {
            setUser(user)
          } else {
            router.push('/login')
          }
        })
        .catch(() => {
          router.push('/login')
        })
    }
  }, [router, accessToken])

  useEffect(() => {
    getItems()
      .then((data) => {
        setItems(data)
      })
      .catch()
  }, [])

  useEffect(() => {
    if (user) {
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
    }
  }, [id, user])

  useEffect(() => {
    if (!dealRaw) return
    const { type, itemId, unused } = dealRaw
    if (!type || !itemId) return
    getItemPrice(type, itemId, unused)
      .then((itemPrice) => {
        setItemPrice(itemPrice)
      })
      .catch()
  }, [dealRaw])

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
                  model: item?.model?.name,
                  ...item?.details,
                  unused: dealRaw?.unused,
                  price: dealRaw?.price?.toLocaleString(),
                  average: itemPrice?.average?.toLocaleString(),
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
            <div className="py-2"></div>
            <div
              className="flex justify-between px-2 py-2 font-semibold"
              style={{ backgroundColor: '#eeeeee' }}
            >
              <div>{dealRaw?.title}</div>
              <div style={{ color: 'blue' }}>
                <a href={dealRaw?.url}>[Link]</a>
              </div>
            </div>
            <div
              className="px-2 py-2"
              style={{ whiteSpace: 'break-spaces', backgroundColor: '#eeeeee' }}
            >
              {dealRaw?.content}
            </div>
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
                <div
                  key={item?.id}
                  className={
                    (item.id === dealRaw?.itemId ? 'font-semibold text-[blue] ' : '') +
                    'flex justify-between py-1'
                  }
                >
                  {Object.entries({
                    model: item?.model?.name.replace(/(Mac\w*\s)|(iPad\s)/, ''),
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
