import { useCallback, useEffect, useState } from 'react'
import { reportDeal, getDeal, getDealOrigin } from 'utils/deals'
import { getAuthUser } from 'utils/user'
import { getItems } from 'utils/item'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from 'react-query'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'

export default function DealReport({ id }: { id: number }) {
  const [cookies, _setCookie, _removeCookie] = useCookies<'refreshToken', { refreshToken: string }>(
    ['refreshToken']
  )
  const refreshToken = cookies['refreshToken']
  const { data: accessToken } = useQuery<string>('accessToken')

  const router = useRouter()
  const [user, setUser] = useState<AuthUser>()

  const [deal, setDeal] = useState<DealOriginResponse>()
  const [items, setItems] = useState<ItemResponse[]>()

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
      getDealOrigin(id)
        .then((data) => {
          setDeal(data)
        })
        .catch((e: AxiosError) => {
          console.log(e)
          if (e?.response?.status === 400) {
            window.alert('접근할 수 없는 정보입니다.')
            window.open('about:blank', '_self')
          }
        })
    }
  }, [id, user])

  const extractTypeDetails = useCallback(
    (details: ItemDetailsResponse): Omit<ItemDetailsResponse, 'year' | 'releasedAt' | 'colors'> => {
      if (!details) {
        return {}
      }

      const { year, releasedAt, colors, ...rest } = details
      return rest
    },
    []
  )

  const onClickSelect = useCallback(
    (payload: DealManageRequest): void => {
      reportDeal(id, payload)
        .then(() => {
          window.alert('성공적으로 처리되었습니다.')
          location.reload()
        })
        .catch((e) => {
          console.log(e)
        })
    },
    [id]
  )

  return (
    <>
      {deal && items && (
        <div className="w-full md:flex">
          <div className="w-full md:w-1/2 md:px-2">
            <ul className="divide-y divide-gray-200">
              {Object.entries({
                source: deal?.source,
                model: deal?.item?.model?.name,
                ...extractTypeDetails(deal?.item?.details),
                unused: deal?.unused,
                sold: deal?.sold,
                price: deal?.price?.toLocaleString(),
                average: deal?.tradePrice?.average?.toLocaleString(),
              }).map(([k, v]) => (
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
              <div>{deal?.title}</div>
              <div style={{ color: 'blue' }}>
                <a href={deal?.url}>[Link]</a>
              </div>
            </div>
            <div
              className="px-2 py-2"
              style={{ whiteSpace: 'break-spaces', backgroundColor: '#eeeeee' }}
            >
              {deal?.content}
            </div>
          </div>
          <div className="w-full md:w-1/2 md:px-2">
            <div className="flex justify-between py-1 font-semibold">
              매물 상태
              <a className="font-bold" style={{ color: deal?.pending ? 'red' : 'green' }}>
                {`[ ${deal?.pending ? '등록 대기' : '등록 완료'} ]`}
              </a>
            </div>
            <div className="flex justify-between py-1 font-semibold">
              <a>현재 상태 그대로 매물에 등록</a>
              <div
                className="inline-flex cursor-pointer items-center px-2 py-0.5 text-xs font-semibold"
                style={{ backgroundColor: 'lightgreen' }}
                onClick={() => {
                  onClickSelect({ remove: false })
                }}
              >
                매물 등록
                <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
              </div>
            </div>
            <div className="flex justify-between py-1 font-semibold">
              <a>목록에서 매물 제거</a>
              <div
                className="inline-flex cursor-pointer items-center px-2 py-0.5 text-xs font-semibold"
                style={{ backgroundColor: 'lightpink' }}
                onClick={() => {
                  onClickSelect({ remove: true })
                }}
              >
                매물 제거
                <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
              </div>
            </div>
            {[
              { unused: true, text: '미개봉' },
              { unused: false, text: 'S급' },
            ]
              .filter((option) => option.unused !== deal?.unused)
              .map((option) => (
                <div
                  key={option.unused.toString()}
                  className="flex justify-between py-1 font-semibold"
                >
                  <a>{`미개봉 여부 변경 [변경 후: '${option.text}' 상태]`}</a>
                  <div
                    className="inline-flex cursor-pointer items-center px-2 py-0.5 text-xs font-semibold"
                    style={{ backgroundColor: 'lightblue' }}
                    onClick={() => {
                      onClickSelect({ remove: false, unused: option.unused })
                    }}
                  >
                    상태 변경
                    <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
                  </div>
                </div>
              ))}
            {[
              { sold: true, text: '판매완료' },
              { sold: false, text: '판매중' },
            ]
              .filter((option) => option.sold !== deal?.sold)
              .map((option) => (
                <div
                  key={option.sold.toString()}
                  className="flex justify-between py-1 font-semibold"
                >
                  <a>{`판매완료 여부 변경 [변경 후: '${option.text}' 상태]`}</a>
                  <div
                    className="inline-flex cursor-pointer items-center px-2 py-0.5 text-xs font-semibold"
                    style={{ backgroundColor: 'lightblue' }}
                    onClick={() => {
                      onClickSelect({ remove: false, sold: option.sold })
                    }}
                  >
                    상태 변경
                    <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
                  </div>
                </div>
              ))}
            <div className="flex justify-between py-1 font-semibold">
              <a>가격 직접 입력해서 변경</a>
              <div
                className="inline-flex cursor-pointer items-center px-2 py-0.5 text-xs font-semibold"
                style={{ backgroundColor: 'lightblue' }}
                onClick={() => {
                  onClickSelect({
                    remove: false,
                    price: parseInt(prompt('변경할 가격을 입력해주세요.') ?? ''),
                  })
                }}
              >
                {`가격 변경`}
                <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
              </div>
            </div>
            {items
              .filter((item) => item.type === deal?.item?.type)
              .map((item) => (
                <div
                  key={item?.id}
                  className={
                    (item.id === deal?.item?.id ? 'font-semibold text-[blue] ' : '') +
                    'flex justify-between py-1'
                  }
                >
                  {Object.entries({
                    model: item?.model?.name.replace(/(Mac\w*|iPad|iPhone)\s/, ''),
                    ...extractTypeDetails(item?.details),
                  }).map(([k, v]) => (
                    <a key={k} className="mx-1 w-16">
                      {v?.toString()}
                    </a>
                  ))}
                  <div
                    className="inline-flex cursor-pointer items-center px-2 py-0.5 text-xs font-semibold text-black"
                    style={{ backgroundColor: 'lightgray' }}
                    onClick={() => {
                      onClickSelect({ remove: false, type: item?.type, itemId: item?.id })
                    }}
                  >
                    옵션 변경
                    <FontAwesomeIcon className="ml-1" icon={faChevronRight} />
                  </div>
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
