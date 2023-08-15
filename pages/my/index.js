import { useCallback, useEffect, useMemo, useRef } from 'react'
import { axiosInstanceV2 } from '@/lib/axios'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import amplitudeTrack from '@/lib/amplitude/track'
import { PageSEO } from '@/components/SEO'
import Link from '@/components/Link'
import Logo from '@/data/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { logout } from 'utils/auth'
import { Base64 } from 'js-base64'
import { deleteAlert, getAlert } from 'utils/alert'
import HotdealAlert from '@/components/modal/HotdealAlert'

const ads = [
  {
    id: 1,
    title: '내게 딱맞는 iPad 찾기 ',
    icon: '🔎',
    link: '/curation',
  },
  {
    id: 2,
    title: '이런 기능 추가해주세요!',
    icon: '💌',
    link: 'https://tally.so/r/mYRpxz',
  },
]

export default function MyPage() {
  const modalRef = useRef(null)
  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken'])
  const { data: accessToken } = useQuery('accessToken', () => {})
  const refreshToken = cookies['refreshToken']
  const router = useRouter()
  const isUserLoggedIn = !!(refreshToken && accessToken)

  useEffect(() => {
    amplitudeTrack('enter_page_my')
  }, [])

  const {
    isLoading: loadingAlert,
    error: errorAlert,
    data: alertData = [],
    refetch: refetchAlert,
  } = useQuery('alert', () => getAlert(), {
    staleTime: 0,
    enabled: isUserLoggedIn,
  })

  if (errorAlert) {
    alert('에러가 발생했습니다.')
  }

  const userEmail = useMemo(() => {
    if (!accessToken || !refreshToken) {
      return null
    }

    const decoded = Base64.decode(refreshToken)
    const emailRegex = /(?<=email":").*?(?=")/
    const email = decoded.match(emailRegex)[0]

    return email
  }, [accessToken, refreshToken])

  const onClickLogout = useCallback(async () => {
    amplitudeTrack('click_logout_my_page')
    await logout()
    removeCookie('refreshToken')
    router.replace('/')
  }, [])

  const onClickLogin = useCallback(() => {
    amplitudeTrack('click_login_my_page')
  }, [])

  const onClickAddAlert = useCallback(() => {
    amplitudeTrack('click_add_alert_my_page')

    if (modalRef.current) {
      modalRef.current.setOpen(true)
    }
  }, [])

  const onClickDeleteAlert = useCallback(async (alertId) => {
    amplitudeTrack('click_delete_alert_my_page')

    await deleteAlert(alertId)
    await refetchAlert()
  }, [])

  const onClickAd = useCallback((ad) => {
    amplitudeTrack('click_ad_my_page', {
      adId: ad.id,
      adTitle: ad.title,
      adLink: ad.link,
    })
  }, [])

  return (
    <>
      <PageSEO title={'마이페이지'} />

      <section className="mx-auto max-w-md pb-6">
        <h1 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10">
          마이페이지
        </h1>

        <div className="mt-6 border-b-8 border-gray-200 py-3 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex w-2/3 items-center">
              <div className="rounded-full bg-gray-200 p-2 text-xs">
                <Logo className="" />
              </div>

              <div className="ml-2 truncate">
                {isUserLoggedIn ? (
                  <span className="text-sm">{userEmail}</span>
                ) : (
                  <span className="font-semibold">로그인이 필요합니다.</span>
                )}
              </div>
            </div>
            <div>
              {isUserLoggedIn ? (
                <button
                  onClick={onClickLogout}
                  className="rounded-full border border-black bg-white px-4 py-2 text-sm font-bold text-black"
                >
                  로그아웃
                </button>
              ) : (
                <Link
                  onClick={onClickLogin}
                  href="/login"
                  className="rounded-full bg-gray-900 px-4 py-2 text-sm font-bold text-white "
                >
                  로그인
                </Link>
              )}
            </div>
          </div>
        </div>

        {isUserLoggedIn && (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">받고 있는 키워드 알림</h3>

              <div className="cursor-pointer p-2 text-sm" onClick={onClickAddAlert}>
                <FontAwesomeIcon icon={faPlus} className="mr-1" />
                추가
              </div>
            </div>

            {alertData.length > 0 ? (
              <ul role="list" className="divide-y divide-gray-200">
                {alertData.map((alert) => (
                  <li
                    key={alert.id}
                    className="flex cursor-pointer items-center justify-between py-3"
                  >
                    <div>
                      <div className="font-medium">{alert.item.model.name}</div>
                      <div className="text-xs">{alert.unused ? '미개봉' : '개봉'}</div>
                    </div>
                    <div className="p-2" onClick={() => onClickDeleteAlert(alert.id)}>
                      <FontAwesomeIcon icon={faXmark} />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex h-32 items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-500">등록된 키워드가 없습니다.</div>
                  <button
                    onClick={onClickAddAlert}
                    className="mt-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-bold text-white "
                  >
                    추가하기
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-3">
          <ul role="list" className="divide-y divide-gray-200">
            {ads.map((ad) => (
              <li key={ad.id} className="cursor-pointer py-4">
                <Link
                  href={ad.link}
                  onClick={() => {
                    onClickAd(ad)
                  }}
                >
                  <span>{ad.icon}</span>
                  <span className="ml-3 inline-block">{ad.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HotdealAlert ref={modalRef} onApply={refetchAlert} />
    </>
  )
}
