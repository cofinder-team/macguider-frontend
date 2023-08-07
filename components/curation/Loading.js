import Loader from '@/components/Loader'
import React from 'react'

export default function Loading() {
  return (
    <div className="flex h-full flex-col items-center justify-center py-32">
      <Loader size="xl" />
      <div className="mt-4 text-base font-normal">최적의 아이패드를 찾는 중...</div>
    </div>
  )
}
