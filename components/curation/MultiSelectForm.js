import React, { useCallback, useState } from 'react'
import { classNames } from 'utils/basic'

export default function MultiSelectForm({ moveNextStep, question, setCandidates }) {
  const { id: questionId, question: q, options, importance, desc } = question

  const [selectedOptions, setSelectedOptions] = useState([])

  const onClickOption = useCallback((optionId) => {
    setSelectedOptions((prev) => {
      if (prev.includes(optionId)) {
        return prev.filter((id) => id !== optionId)
      } else {
        return [...prev, optionId]
      }
    })
  }, [])

  const onClickNextStep = useCallback(() => {
    setCandidates((prev) => {
      const newCandidates = prev.map((candidate, index) => {
        const newScore = options.reduce((acc, option) => {
          const { id, score, penalty } = option

          if (selectedOptions.includes(id)) {
            return Number(option.score[index]) * importance + acc
          } else {
            return Number(option.score[index]) * penalty + acc
          }
        }, 0)

        return {
          ...candidate,
          scores: {
            ...candidate.scores,
            [questionId]: newScore,
          },
        }
      })
      return newCandidates
    })
    moveNextStep()
  }, [options, selectedOptions, setCandidates, moveNextStep, questionId, importance])

  return (
    <div className="absolute top-0 right-0 left-0 flex h-full flex-col justify-evenly pt-[100px]">
      <div className="text-center">
        <h3 className=" text-xl font-semibold text-gray-800">
          마지막이에요! <br /> 꼭 들어갔으면 하는 기능을 선택해주세요
        </h3>
        <p className="mt-2 text-base text-gray-500">최대한 반영해볼게요</p>
      </div>

      <div className="w-full space-y-10 py-6">
        {options.map((option, index) => (
          <div
            className={classNames(
              selectedOptions.includes(option.id) ? 'bg-black text-white' : ' bg-white text-black',
              'w-full cursor-pointer rounded-md border border-gray-600 py-2  px-4  font-bold'
            )}
            onClick={() => {
              onClickOption(option.id)
            }}
            key={option.id}
          >
            <span>{option.text}</span>
            <p className="mt-1 text-sm font-normal">{option.desc}</p>
          </div>
        ))}
      </div>

      <div
        className="w-full cursor-pointer  rounded-full bg-black p-3 text-center font-bold text-white"
        onClick={onClickNextStep}
      >
        {selectedOptions.length > 0 ? `${selectedOptions.length}개 선택완료` : '딱히 필요 없어요'}
      </div>
    </div>
  )
}
