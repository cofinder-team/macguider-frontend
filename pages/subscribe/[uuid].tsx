import { useScreenSize } from 'hooks/useScreenSize'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { sendSubscribeByUuid } from 'utils/user'

export default function Alert({ uuid }: { uuid: string }) {
  const router = useRouter()
  const { md } = useScreenSize()

  useEffect(() => {
    if (uuid) {
      sendSubscribeByUuid(uuid)
        .then(() => {
          alert('구독이 완료되었어요!\nMacGuider의 최신 업데이트 소식을 가장 빠르게 알려드릴게요.')
        })
        .catch(() => {
          alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
        })
        .finally(() => {
          router.push('/')
        })
    }
  })

  return <></>
}

export async function getServerSideProps(context) {
  const { uuid } = context.query

  return {
    props: { uuid },
  }
}
