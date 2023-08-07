import { PageSEO } from '@/components/SEO'
import Loading from '@/components/curation/Loading'
import MultiSelectForm from '@/components/curation/MultiSelectForm'
import ProgressBar from '@/components/curation/ProgressBar'
import SingleSelectForm from '@/components/curation/SingleSelectForm'
import CurationLayoutWrapper from '@/components/layouts/CurationLayout'
import optionsIpad from '@/data/options/ipad'
import amplitudeTrack from '@/lib/amplitude/track'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'

const questions = [
  {
    id: 'q1',
    type: 'single',
    question: '<strong style="background: lime">예산</strong>은 얼마인가요?',
    options: [
      {
        id: 1,
        text: '50만원 이하',
        score: '500050000000555555555000000000000000000000000000000000000000000000000000',
      },
      {
        id: 2,
        text: '100만원 이하',
        score: '555555555555111111113333550055005500550055005000000000000000000000000000',
      },
      {
        id: 3,
        text: '150만원 이하',
        score: '555511115555000000000000000000005555555555555555000000005555555555555555',
      },
      {
        id: 4,
        text: '유동적이에요',
        score: '555555555555111111113333550055005500550055005000000000000000000000000000',
      },
    ],
    importance: 10, // 가중치
  },
  {
    id: 'q2',
    type: 'single',
    question: '어떤 <strong style="background: lime">용도</strong>로 사용하실 건가요?',
    desc: '주로 사용하실 용도를 골라주세요',
    options: [
      {
        id: 5,
        text: '유튜브, 넷플릭스 등 컨텐츠 감상',
        score: '333333333333333333333333333333333333333333333333333333333333333333333333',
        icon: '🎬',
      },
      {
        id: 6,
        text: '다이어리, 필기, 인강',
        score: '333355555555111111111111555555555555555555555555555555555555555555555555',
        icon: '📝',
      },
      {
        id: 7,
        text: '드로잉, 사진 및 영상 편집',
        score: '111133333333000000000000555555555555555555555555555555555555555555555555',
        icon: '🎨',
      },
      {
        id: 8,
        text: '모바일 게임',
        score: '555555555555222222223333555555555555555555555555222222222222222222222222',
        icon: '🎮',
      },
    ],
    importance: 1, // 가중치
  },
  {
    id: 'q3',
    type: 'single',
    question: '<strong style="background: lime">필기감</strong>은 얼마나 중요하신가요?',
    desc: '선이 펜을 빨리 따라오면 필기감이 좋은 편이에요',
    options: [
      {
        id: 9,
        text: '중요해요',
        score: '222244444444000000000000555555555555555555555555555555555555555555555555',
      },
      {
        id: 10,
        text: '써지기만 하면 돼요',
        score: '444455555555444444444444333333333333333333333333333333333333333333333333',
      },
      {
        id: 11,
        text: '필기할 일이 없어요',
        score: '555544444444333333333333222222222222222222222222222222222222222222222222',
      },
      {
        id: 12,
        text: '잘 모르겠어요',
        score: '444455555555444444444444333333333333333333333333333333333333333333333333',
      },
    ],
    importance: 1, // 가중치
  },
  {
    id: 'q4',
    type: 'single',
    question: '<strong style="background: lime">저장공간</strong>은 얼마나 필요하신가요?',
    desc: '쓰고 있는 핸드폰의 저장 용량을 참고하면 좋아요.',
    options: [
      {
        id: 13,
        text: '64GB 이하',
        score: '505050505050010150505050500050005000500050005000500050005000500050005000',
        desc: '일상적인 작업에는 전혀 문제 없어요.',
      },
      {
        id: 14,
        text: '128GB 이하',
        score: '050505050505050505050505510051005100510051005100510051005100510051005100',
        desc: '일상적인 작업에는 전혀 문제 없어요.',
      },
      {
        id: 15,
        text: '256GB 이하',
        score: '050505050505050505050505051005100510051005100510051005100510051005100510',
        desc: '4K 초고화질 영화 25편, 고사양 게임 5개 정도',
      },
      {
        id: 16,
        text: '512GB 이상',
        score: '010101010101010101010101005300530053005300530053005300530053005300530053',
        desc: '4K 초고화질 영화 50편, 고사양 게임 10개 정도',
      },
    ],
    importance: 2, // 가중치
  },
  {
    id: 'q5',
    type: 'multiple',
    question: '꼭 들어갔으면 하는 기능을 선택해주세요',
    desc: '최대한 반영해볼게요.',
    options: [
      {
        id: 17,
        text: '셀룰러 데이터 사용',
        desc: 'Wi-Fi 또는 핫스팟 없이도 인터넷을 사용할 수 있어요.',
        score: '005500550055005500550055000055550000555500005555000055550000555500005555',
        penalty: -2, // 해당 옵션을 선택하지 않으면 점수를 깎음
      },
      {
        id: 18,
        text: 'Face ID',
        desc: '지문 없이 얼굴로 잠금을 해제할 수 있어요',
        score: '000000000000000000000000555555555555555555555555555555555555555555555555',
        penalty: 0,
      },
      {
        id: 19,
        text: '2세대 Apple Pencil과 호환',
        desc: '아이패드에 착 달라붙여 충전할 수 있어요',
        score: '555555555555000000000000555555555555555555555555555555555555555555555555',
        penalty: 0,
      },
    ],
    importance: 2, // 가중치
  },
]

const initialCandidates = optionsIpad.flatMap((model) =>
  model.data.flatMap(({ options }) =>
    options.map(({ id }) => {
      const scores = {}
      questions.forEach((question) => {
        scores[question.id] = 0
      })

      return {
        modelId: model.id,
        itemId: id,
        type: 'P',
        scores,
      }
    })
  )
)

const totalSteps = [
  {
    type: 'cover',
  },
  ...questions.map((question) => ({
    type: 'question',
    qId: question.id,
  })),
  {
    type: 'loading',
  },
]

export default function Curation() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const currentStep = totalSteps[currentStepIndex]
  const currentQuestion =
    currentStep.type === 'question' && questions.find((q) => q.id === currentStep.qId)

  const [candiates, setCandidates] = useState(initialCandidates)
  const router = useRouter()

  useEffect(() => {
    amplitudeTrack('enter_curation_main')
  }, [])

  useEffect(() => {
    if (currentStep.type === 'loading') {
      const timeout = Math.floor(Math.random() * 1000) + 1500
      const selectedCandidates = candiates
        .sort((a, b) => {
          const aScore = Object.values(a.scores).reduce((acc, cur) => acc + cur, 0)
          const bScore = Object.values(b.scores).reduce((acc, cur) => acc + cur, 0)

          if (aScore === bScore) {
            if (a.modelId === b.modelId) {
              // 최신 모델 순으로 정렬
              return b.itemId - a.itemId
            }
          }

          return bScore - aScore
        })
        .slice(0, 5)

      setTimeout(() => {
        // route to result page
        router.push({
          pathname: '/curation/result',
          query: {
            selected: selectedCandidates
              .map((candidate) => `${candidate.modelId},${candidate.itemId}`)
              .join(','),
          },
        })
      }, timeout)
    }
  }, [currentStep])

  const moveNextStep = useCallback(
    (info) => {
      setCurrentStepIndex((prev) => prev + 1)
      amplitudeTrack('move_next_step', {
        currentStep: currentStepIndex,
        ...info,
      })
    },
    [currentStepIndex]
  )

  const movePrevStep = useCallback(() => {
    setCurrentStepIndex((prev) => prev - 1)
    amplitudeTrack('move_prev_step', {
      currentStep: currentStepIndex,
    })
  }, [currentStepIndex])

  return (
    <>
      <PageSEO
        title={'개인별 애플 제품 추천'}
        description={'나에게 딱맞는 애플 제품을 추천해드립니다.'}
      />

      <CurationLayoutWrapper bgColor={currentStep.type === 'cover' ? '#fff' : '#F5F5F7'}>
        {currentStep.type === 'cover' && (
          <div className="flex h-full flex-col items-center justify-center py-10">
            <div className="flex items-center">
              <img src="/static/images/ipads/ipad-air-2022.jpeg" className="-ml-36" width={240} />

              <h1 className="text-4xl font-bold leading-11 text-gray-800">
                내게 딱 맞는 <br /> <span className="bg-[lime]">iPad 찾기.</span>
                <br />
              </h1>
            </div>

            <div
              className="mt-40 w-full cursor-pointer rounded-md bg-black p-3 text-center font-bold text-white"
              onClick={() => {
                moveNextStep({
                  type: 'start',
                })
              }}
            >
              시작하기
            </div>
          </div>
        )}

        {currentQuestion && (
          <div className="relative h-full pt-[40px]">
            <ProgressBar
              totalSteps={questions.length}
              currentStepIndex={currentStepIndex}
              movePrevStep={movePrevStep}
            />

            {currentQuestion.type === 'single' ? (
              <SingleSelectForm
                moveNextStep={moveNextStep}
                question={currentQuestion}
                setCandidates={setCandidates}
              />
            ) : (
              <MultiSelectForm
                moveNextStep={moveNextStep}
                question={currentQuestion}
                setCandidates={setCandidates}
              />
            )}
          </div>
        )}

        {currentStep.type === 'loading' && <Loading />}
      </CurationLayoutWrapper>
    </>
  )
}
