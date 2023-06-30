import desks from '@/data/desks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// redirect to a random desk
export default function RandomDesk() {
  const router = useRouter()
  const randomDeskId = desks[Math.floor(Math.random() * desks.length)].id

  useEffect(() => {
    router.push(`/desk/${randomDeskId}`)
  }, [router, randomDeskId])

  return <div />
}
