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
      moveNextStep({
        type: 'single',
        quesitonId: questionId,
        answerId: optionId,
      })
    },
    [options, setCandidates, moveNextStep, questionId, importance]
  )

  return (
    <div className="pt-[100px]">
      <div>
        <h3
          className="text-xl font-extrabold text-gray-800"
          dangerouslySetInnerHTML={{ __html: q }}
        ></h3>
        {desc && <p className="mt-2 font-semibold">{desc}</p>}
      </div>

      <div className="w-full space-y-3 py-6">
        {options.map((option, index) => (
          <div
            className="w-full cursor-pointer rounded-md  bg-white py-6 px-4 text-center font-semibold"
            onClick={() => onClickOption(option.id)}
            key={option.id}
          >
            {option.icon && <div>{option.icon}</div>}

            <span className="font-sbold">{option.text}</span>

            {option.desc && <div className="font-medium text-gray-500">{option.desc}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
