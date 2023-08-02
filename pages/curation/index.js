import { PageSEO } from '@/components/SEO'
import Loading from '@/components/curation/Loading'
import MultiSelectForm from '@/components/curation/MultiSelectForm'
import SingleSelectForm from '@/components/curation/SingleSelectForm'
import CurationLayoutWrapper from '@/components/layouts/CurationLayout'
import React, { useCallback, useEffect, useState } from 'react'

export default function Curation() {
  const [currentStep, setCurrentStep] = useState(0)

  const onClickNextStep = useCallback(() => {
    setCurrentStep((prev) => prev + 1)
  }, [])

  const onClickPrevStep = useCallback(() => {
    setCurrentStep((prev) => prev - 1)
  }, [])

  return (
    <>
      <PageSEO
        title={'개인별 애플 제품 추천'}
        description={'나에게 딱맞는 애플 제품을 추천해드립니다.'}
      />

      <CurationLayoutWrapper>
        {currentStep === 0 && (
          <div className="flex h-full flex-col items-center justify-between py-32">
            <h1 className="text-3xl font-bold text-gray-800">
              나에게 딱 맞는 <br /> 애플제품 찾기
            </h1>

            <div
              className="w-full rounded-full  bg-black p-3 text-center font-bold text-white"
              onClick={onClickNextStep}
            >
              시작하기
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <SingleSelectForm onClickNextStep={onClickNextStep} onClickPrevStep={onClickPrevStep} />
        )}

        {currentStep === 2 && (
          <MultiSelectForm onClickNextStep={onClickNextStep} onClickPrevStep={onClickPrevStep} />
        )}

        {currentStep === 3 && <Loading />}
      </CurationLayoutWrapper>
    </>
  )
}
