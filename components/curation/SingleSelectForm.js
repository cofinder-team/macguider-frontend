import React, { useCallback, useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'

export default function SingleSelectForm({ onClickNextStep, onClickPrevStep }) {
  return (
    <div className="relative h-full pt-[40px]">
      <ProgressBar />

      <div className="absolute top-0 right-0 left-0 flex h-full flex-col justify-evenly pt-[100px]">
        <div className="text-center">
          <h3 className=" text-xl font-semibold text-gray-800">예산은 얼마인가요?</h3>
          <p className="mt-2 text-base text-gray-500">사용가능한 예산을 선택해주세요.</p>
        </div>

        <div className="w-full space-y-10 py-6">
          <div
            className="w-full rounded-full border border-gray-700 bg-black p-4 text-center font-bold text-white"
            onClick={onClickNextStep}
          >
            선택지 1
          </div>
          <div className="w-full rounded-full border border-gray-700 bg-black p-4 text-center font-bold text-white">
            선택지 2
          </div>
          <div className="w-full rounded-full border border-gray-700 bg-black p-4 text-center font-bold text-white">
            선택지 3
          </div>
          <div className="w-full rounded-full border border-gray-700 bg-black p-4 text-center font-bold text-white">
            선택지 4
          </div>
        </div>
      </div>
    </div>
  )
}
