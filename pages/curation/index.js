import { PageSEO } from '@/components/SEO'
import CurationLayoutWrapper from '@/components/layouts/CurationLayout'
import React, { useCallback, useEffect } from 'react'

export default function Curation() {
  return (
    <>
      <PageSEO
        title={'개인별 애플 제품 추천'}
        description={'나에게 딱맞는 애플 제품을 추천해드립니다.'}
      />

      <CurationLayoutWrapper>
        <div className="flex h-full flex-col items-center justify-between py-32">
          <h1 className="text-3xl font-bold text-gray-800">
            나에게 딱 맞는 <br /> 애플제품 찾기
          </h1>

          <div className="mt-12 w-full rounded-full border border-gray-700 bg-black p-3 text-center font-bold text-white">
            시작하기
          </div>
        </div>
      </CurationLayoutWrapper>
    </>
  )
}
