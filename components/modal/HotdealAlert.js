import {
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useQuery } from 'react-query'
import { getItem } from 'utils/item'
import { classNames, deepEqual, removeDuplicates } from 'utils/basic'
import { createAlert } from 'utils/alert'

function reducer(state, action) {
  switch (action.type) {
    case 'SET_OPTIONS':
      return {
        ...action.options,
      }
    case 'SET_OPTION':
      return {
        ...state,
        ...action.payload,
      }
    case 'RESET_ALL':
      return {}
    default:
      throw new Error()
  }
}

function HotdealAlert({ modelId, modelType, onApply = async () => {} }, ref) {
  // 모달 열기/닫기
  const [open, setOpen] = useState(false)

  // 현재 단계
  const startStep = modelId ? 1 : 0
  const [currentStep, setCurrentStep] = useState(startStep)

  const { isLoading, error, data: items = [] } = useQuery('item', () => getItem())

  if (error) {
    alert('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.')
  }

  // 모델 선택
  const [selectedModel, setSelectedModel] = useState({
    type: null,
    id: null,
  })
  // 현재 선택된 옵션들
  const [currentOptions, dispatch] = useReducer(reducer, {})

  useEffect(() => {
    // 해당 모델의 가장 기본형으로 옵션을 초기화
    const defaultItem = items.find((item) => item.model.id === selectedModel.id)

    if (defaultItem) {
      dispatch({
        type: 'SET_OPTIONS',
        options: defaultItem.details,
      })
    }
  }, [items, selectedModel.id])

  useEffect(() => {
    setSelectedModel({
      type: modelType,
      id: modelId,
    })

    setCurrentStep(startStep)
  }, [modelId, modelType])

  // 전체 모델 종류
  const modelOptions = useMemo(() => {
    // M: Mac, P: iPad, W: Watch, A: AirPods, I: iPhone
    const models = items
      .filter((item) => item.type === 'M' || item.type === 'P')
      .map((item) => ({ ...item.model, type: item.type }))

    return removeDuplicates(models, 'id')
  }, [items])

  // 같은 모델 ID를 가진 아이템들
  const candidateItems = useMemo(() => {
    return items.filter((item) => item.model.id === selectedModel.id)
  }, [items, selectedModel])

  // Mac과 관련된 옵션들
  // chip 과 cpu 를 합쳐서 chipCore 로 표시
  const chipCoreOptions = useMemo(
    () => [...new Set(candidateItems.map((item) => `${item.details.chip} ${item.details.cpu}`))],
    [candidateItems]
  )
  const gpuOptions = useMemo(
    () => [...new Set(candidateItems.map((item) => item.details.gpu))],
    [candidateItems]
  )
  const ramOptions = useMemo(
    () => [...new Set(candidateItems.map((item) => item.details.ram))],
    [candidateItems]
  )
  const ssdOptions = useMemo(
    () => [...new Set(candidateItems.map((item) => item.details.ssd))],
    [candidateItems]
  )

  // iPad와 관련된 옵션들
  const chipOptions = useMemo(
    () => [...new Set(candidateItems.map((item) => item.details.chip))],
    [candidateItems]
  )

  const cellularOptions = useMemo(
    () => [...new Set(candidateItems.map((item) => item.details.cellular))],
    [candidateItems]
  )
  const storageOptions = useMemo(
    () => [...new Set(candidateItems.map((item) => item.details.storage))],
    [candidateItems]
  )

  // 현재 선택된 CPU에서 선택 가능한 맥 옵션들
  // Mac 옵션
  const availableChipCoreOptions = useMemo(() => chipCoreOptions, [chipCoreOptions])

  const availableGpuOptions = useMemo(
    () =>
      gpuOptions.filter((gpuOption) =>
        candidateItems.some(
          ({ details }) =>
            details.cpu === currentOptions.cpu &&
            details.chip === currentOptions.chip &&
            details.gpu === gpuOption
        )
      ),
    [candidateItems, gpuOptions, currentOptions]
  )

  const availableSsdOptions = useMemo(
    () =>
      ssdOptions.filter((ssdOption) =>
        candidateItems.some(
          ({ details }) =>
            details.cpu === currentOptions.cpu &&
            details.chip === currentOptions.chip &&
            details.ssd === ssdOption
        )
      ),
    [candidateItems, ssdOptions, currentOptions]
  )

  const availableRamOptions = useMemo(
    () =>
      ramOptions.filter((ramOption) =>
        candidateItems.some(
          ({ details }) =>
            details.cpu === currentOptions.cpu &&
            details.chip === currentOptions.chip &&
            details.ram === ramOption
        )
      ),
    [candidateItems, ramOptions, currentOptions]
  )

  // iPad 옵션
  const availableChipOptions = useMemo(
    () =>
      chipOptions.filter((chipOption) =>
        candidateItems.some(({ details }) => details.chip === chipOption)
      ),
    [candidateItems, chipOptions]
  )

  const availableStorageOptions = useMemo(
    () =>
      storageOptions.filter((storageOption) =>
        candidateItems.some(
          ({ details }) => details.chip === currentOptions.chip && details.storage === storageOption
        )
      ),
    [candidateItems, storageOptions, currentOptions]
  )

  const availableConnectivityOptions = useMemo(
    () =>
      cellularOptions.filter((cellularOption) =>
        candidateItems.some(
          ({ details }) =>
            details.chip === currentOptions.chip && details.cellular === cellularOption
        )
      ),
    [candidateItems, cellularOptions, currentOptions]
  )

  const macOptions = [
    {
      label: 'CPU 모델명',
      key: 'chip,cpu',
      value: chipCoreOptions.map((option) => ({
        value: option,
        option: option + '코어',
      })),
      availableOptions: availableChipCoreOptions,
    },
    {
      label: 'GPU 모델명',
      key: 'gpu',
      value: gpuOptions.map((option) => ({
        value: option,
        option: `${option}코어`,
      })),
      availableOptions: availableGpuOptions,
    },
    {
      label: '저장용량',
      key: 'ssd',
      value: ssdOptions.map((option) => ({
        value: option,
        option: option,
      })),
      availableOptions: availableSsdOptions,
    },
    {
      label: 'RAM용량',
      key: 'ram',
      value: ramOptions.map((option) => ({
        value: option,
        option: `${option}GB`,
      })),
      availableOptions: availableRamOptions,
    },
  ]

  const ipadOptions = [
    {
      label: 'CPU 모델명',
      key: 'chip',
      value: chipOptions.map((option) => ({
        value: option,
        option: option,
      })),
      availableOptions: availableChipOptions,
    },
    {
      label: '저장용량',
      key: 'storage',
      value: storageOptions.map((option) => ({
        value: option,
        option: option,
      })),
      availableOptions: availableStorageOptions,
    },
    {
      label: '연결성',
      key: 'cellular',
      value: cellularOptions.map((option) => ({
        value: option,
        option: option ? 'Wi-Fi + Cellular' : 'Wi-Fi',
      })),
      availableOptions: availableConnectivityOptions,
    },
  ]

  // 모델 선택
  const handleModelChange = useCallback(
    (model) => {
      setSelectedModel({
        type: model.type,
        id: model.id,
      })

      setCurrentStep((prev) => prev + 1)
    },
    [setCurrentStep]
  )

  const onClickPrevStep = useCallback(() => {
    setCurrentStep((prev) => prev - 1)
  }, [])

  const handleOptionChange = useCallback(
    (key, value) => {
      if (key === 'chip,cpu') {
        const [chip, cpu] = value.split(' ')

        dispatch({
          type: 'SET_OPTION',
          payload: {
            chip,
            cpu: Number(cpu),
          },
        })
      } else {
        dispatch({
          type: 'SET_OPTION',
          payload: {
            [key]: value,
          },
        })
      }
    },
    [dispatch]
  )

  const initializeOptions = useCallback(() => {
    setCurrentStep(startStep)
  }, [startStep])

  const isValidItem = useMemo(() => {
    const selectedItem = candidateItems.find(({ details }) => deepEqual(details, currentOptions))

    return selectedItem
  }, [candidateItems, currentOptions])

  const onClickApply = useCallback(async () => {
    if (isValidItem) {
      setOpen(false)

      await createAlert(selectedModel.type, isValidItem.id, false)
      await onApply()
    }
  }, [isValidItem])

  const closeModal = useCallback(() => {
    initializeOptions()

    setOpen(false)
  }, [initializeOptions])

  useImperativeHandle(ref, () => ({
    setOpen: (isOpen) => setOpen(isOpen),
    initializeOptions: () => initializeOptions(),
  }))

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className=" relative w-full transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none "
                    onClick={closeModal}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div>
                  {currentStep === 0 && (
                    <>
                      <h2 className="mt-3 font-bold">원하는 제품을 선택해주세요</h2>

                      <div className="mt-5  max-h-80 overflow-scroll">
                        <ul className="divide-y-[1px] divide-gray-200">
                          {modelOptions.map((option) => (
                            <li
                              className="cursor-pointer py-4"
                              key={option.id}
                              onClick={() => {
                                handleModelChange(option)
                              }}
                            >
                              <span className="text-sm font-medium text-gray-900">
                                {option.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                  {currentStep === 1 && (
                    <>
                      <div className="mt-2">
                        {(selectedModel.type === 'M' ? macOptions : ipadOptions).map((option) => (
                          <div className="mt-3" key={option.label}>
                            <p className="text-md  text-gray-900 ">{option.label}</p>
                            <ul className="mt-1 flex flex-wrap items-center">
                              {option.value.map((candidate, candidateIndex) => (
                                <li
                                  key={candidateIndex}
                                  className="w-fit pb-2 pr-1"
                                  onClick={() => {
                                    handleOptionChange(option.key, candidate.value)
                                  }}
                                >
                                  <button
                                    type="button"
                                    className={`rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                                      option.availableOptions?.includes(candidate.value)
                                        ? (candidate.value === currentOptions[option.key] ||
                                            (option.key === 'chip,cpu' &&
                                              currentOptions['chip'] ===
                                                candidate.value.split(' ')[0] &&
                                              currentOptions['cpu'] ==
                                                candidate.value.split(' ')[1])) &&
                                          `bg-black text-white ring-black hover:bg-black hover:text-white hover:ring-black`
                                        : `cursor-not-allowed bg-gray-100 text-gray-400 ring-gray-100 hover:bg-gray-100 hover:text-gray-400 hover:ring-gray-100`
                                    }`}
                                  >
                                    {candidate.option}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center space-x-2 sm:mt-6">
                        <button
                          type="button"
                          className="text-md flex w-full max-w-md flex-[1] justify-center  rounded-md bg-gray-300 px-3 py-2 text-white"
                          onClick={onClickPrevStep}
                        >
                          뒤로가기
                        </button>
                        <button
                          type="button"
                          className={classNames(
                            isValidItem
                              ? ' bg-black text-white'
                              : 'cursor-not-allowed bg-gray-300 text-gray-400 ring-gray-300',
                            'text-md flex w-full max-w-md flex-[3] justify-center  rounded-md px-3 py-2 font-bold'
                          )}
                          onClick={onClickApply}
                        >
                          알림받기
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default forwardRef(HotdealAlert)
