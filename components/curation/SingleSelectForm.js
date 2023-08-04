import React, { useCallback, useEffect, useState } from 'react'

export default function SingleSelectForm({ moveNextStep, question, setCandidates }) {
  const { id: questionId, question: q, options, importance, desc } = question
  const onClickOption = useCallback(
    (optionId) => {
      const selectedOption = options.find((option) => option.id === optionId)
      const { score } = selectedOption

      setCandidates((prev) => {
        const newCandidates = prev.map((candidate, index) => {
          return {
            ...candidate,
            scores: {
              ...candidate.scores,
              [questionId]: Number(score[index]) * importance,
            },
          }
        })
        return newCandidates
      })
      moveNextStep()
    },
    [options, setCandidates, moveNextStep, questionId, importance]
  )

  return (
    <div className="absolute top-0 right-0 left-0 flex h-full flex-col justify-evenly pt-[100px]">
      <div className="text-center">
        <h3 className=" text-xl font-semibold text-gray-800">{q}</h3>
        {desc && <p className="mt-2 text-base text-gray-500">사용가능한 예산을 선택해주세요.</p>}
      </div>

      <div className="w-full space-y-10 py-6">
        {options.map((option, index) => (
          <div
            className="w-full cursor-pointer rounded-full border border-gray-700 bg-black p-4 text-center font-medium text-white"
            onClick={() => onClickOption(option.id)}
            key={option.id}
          >
            {option.text}
          </div>
        ))}
      </div>
    </div>
  )
}
