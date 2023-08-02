import React, { useCallback, useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'

export default function MultiSelectForm({ onClickNextStep, onClickPrevStep }) {
  return (
    <div className="relative h-full pt-[40px]">
      <ProgressBar />

      <div className="absolute top-0 right-0 left-0 flex h-full flex-col justify-evenly pt-[100px]">
        <div className="text-center">
          <h3 className=" text-xl font-semibold text-gray-800">
            마지막이에요! <br /> 꼭 들어갔으면 하는 기능을 선택해주세요
          </h3>
          <p className="mt-2 text-base text-gray-500">최대한 반영해볼게요</p>
        </div>

        <div className="w-full space-y-10 py-6">
          <div
            className="w-full rounded-md border border-gray-600 bg-white py-2 px-4  font-bold text-black"
            onClick={onClickNextStep}
          >
            <span>선택지 1</span>
            <p className="mt-1 text-sm font-normal">안녕하세요 안녕하세요 안녕하세요</p>
          </div>
          <div
            className="w-full rounded-md border border-gray-600 bg-white py-2 px-4  font-bold text-black"
            onClick={onClickNextStep}
          >
            <span>선택지 2</span>
            <p className="mt-1 text-sm font-normal">안녕하세요 안녕하세요 안녕하세요</p>
          </div>
          <div
            className="w-full rounded-md border border-gray-600 bg-white py-2 px-4  font-bold text-black"
            onClick={onClickNextStep}
          >
            <span>선택지 3</span>
            <p className="mt-1 text-sm font-normal">안녕하세요 안녕하세요 안녕하세요</p>
          </div>
        </div>

        <div
          className="w-full rounded-full  bg-black p-3 text-center font-bold text-white"
          onClick={onClickNextStep}
        >
          딱히 없어요
        </div>
      </div>
    </div>
  )
}
