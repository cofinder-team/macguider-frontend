import {
  ForwardedRef,
  Fragment,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useQuery } from 'react-query'
import { getItems } from 'utils/item'
import { classNames, deepEqual } from 'utils/basic'
import amplitudeTrack from '@/lib/amplitude/track'

interface Props {
  modelId: number
  modelType: ModelType
  itemId: number
  onApply: (item: ItemResponse) => void
}

interface VisibleOption {
  label: string
  key: string
  value: {
    value: unknown
    option: string
  }[]
  availableOptions: unknown[]
}

const macKeys: string[] = ['chip', 'cpu', 'gpu', 'ram', 'ssd']
const ipadKeys: string[] = ['chip', 'storage', 'cellular']
const iphoneKeys: string[] = ['modelSuffix', 'storage']

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
    case 'RESET_OPTIONS':
      return {
        ...action.payload,
      }
    default:
      throw new Error()
  }
}

function SelectOptionsModal(
  { modelId, modelType, itemId, onApply = async () => {} }: Props,
  ref: any
) {
  // 모달 열기/닫기
  const [open, setOpen] = useState(false)

  // fetch Items
  const {
    isLoading,
    error,
    data: items = [],
  } = useQuery(['items', modelType, modelId], () => getItems(modelType, modelId))

  if (error) {
    alert('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.')
  }

  // 현재 선택된 아이템 옵션들
  const [currentOptions, dispatch] = useReducer(reducer, {})

  useEffect(() => {
    const currentItem = items.find((item) => item.id === itemId)

    if (currentItem) {
      const targetKeys = modelType === 'M' ? macKeys : modelType === 'P' ? ipadKeys : iphoneKeys

      // extract only keys of macKeys from currentItem.details
      const options = Object.keys(currentItem.details)
        .filter((key) => targetKeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = currentItem.details[key]
          return obj
        }, {})

      dispatch({
        type: 'SET_OPTIONS',
        options,
      })
    }
  }, [itemId, items, modelType])

  const macItems = items as MacItemResponse[]
  const ipadItems = items as IpadItemResponse[]
  const iphoneItems = items as IphoneItemResponse[]

  // Mac과 관련된 옵션들
  // chip 과 cpu 를 합쳐서 chipCore 로 표시
  const chipCoreOptions = useMemo(
    () => [...new Set(macItems.map((item) => `${item.details.chip} ${item.details.cpu}`))],
    [macItems]
  )
  const gpuOptions = useMemo(
    () => [...new Set(macItems.map((item) => item.details.gpu))],
    [macItems]
  )
  const ramOptions = useMemo(
    () => [...new Set(macItems.map((item) => item.details.ram))],
    [macItems]
  )
  const ssdOptions = useMemo(
    () => [...new Set(macItems.map((item) => item.details.ssd))],
    [macItems]
  )

  // iPad와 관련된 옵션들
  const chipOptions = useMemo(
    () => [...new Set(ipadItems.map((item) => item.details.chip))],
    [ipadItems]
  )

  const cellularOptions = useMemo(
    () => [...new Set(ipadItems.map((item) => item.details.cellular))],
    [ipadItems]
  )
  const storageOptions = useMemo(
    () => [...new Set(ipadItems.map((item) => item.details.storage))],
    [ipadItems]
  )

  // iPhone와 관련된 옵션들
  const modelSuffixOptions = useMemo(
    () => [...new Set(iphoneItems.map((item) => item.details.modelSuffix))],
    [iphoneItems]
  )

  // 현재 선택된 CPU에서 선택 가능한 맥 옵션들
  // Mac 옵션
  const availableChipCoreOptions = useMemo(() => chipCoreOptions, [chipCoreOptions])

  const availableGpuOptions = useMemo(
    () =>
      gpuOptions.filter((gpuOption) =>
        macItems.some(
          ({ details }) =>
            details.cpu === currentOptions.cpu &&
            details.chip === currentOptions.chip &&
            details.gpu === gpuOption
        )
      ),
    [macItems, gpuOptions, currentOptions]
  )

  const availableSsdOptions = useMemo(
    () =>
      ssdOptions.filter((ssdOption) =>
        macItems.some(
          ({ details }) =>
            details.cpu === currentOptions.cpu &&
            details.chip === currentOptions.chip &&
            details.ssd === ssdOption
        )
      ),
    [macItems, ssdOptions, currentOptions]
  )

  const availableRamOptions = useMemo(
    () =>
      ramOptions.filter((ramOption) =>
        macItems.some(
          ({ details }) =>
            details.cpu === currentOptions.cpu &&
            details.chip === currentOptions.chip &&
            details.ram === ramOption
        )
      ),
    [macItems, ramOptions, currentOptions]
  )

  // iPad 옵션
  const availableChipOptions = useMemo(
    () =>
      chipOptions.filter((chipOption) =>
        ipadItems.some(({ details }) => details.chip === chipOption)
      ),
    [ipadItems, chipOptions]
  )

  const availableStorageOptions = useMemo(
    () =>
      storageOptions.filter((storageOption) =>
        ipadItems.some(
          ({ details }) => details.chip === currentOptions.chip && details.storage === storageOption
        )
      ),
    [ipadItems, storageOptions, currentOptions]
  )

  const availableConnectivityOptions = useMemo(
    () =>
      cellularOptions.filter((cellularOption) =>
        ipadItems.some(
          ({ details }) =>
            details.chip === currentOptions.chip && details.cellular === cellularOption
        )
      ),
    [ipadItems, cellularOptions, currentOptions]
  )

  // iPhone 옵션
  const availableModelSuffixOptions = useMemo(
    () =>
      modelSuffixOptions.filter((modelSuffixOption) =>
        iphoneItems.some(({ details }) => details.modelSuffix === modelSuffixOption)
      ),
    [iphoneItems, modelSuffixOptions]
  )

  const macOptions: VisibleOption[] = [
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

  const ipadOptions: VisibleOption[] = [
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

  const iphoneOptions: VisibleOption[] = [
    {
      label: '모델',
      key: 'modelSuffix',
      value: modelSuffixOptions.map((option) => ({
        value: option,
        option: option,
      })),
      availableOptions: availableModelSuffixOptions,
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
  ]

  const handleModelOptionChange = useCallback(
    (key, value) => {
      amplitudeTrack('click_select_alert_option', {
        type: modelType,
        id: modelId,
        option: key,
        value,
      })

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
    [modelType, modelId]
  )

  const validItem = useMemo(() => {
    const selectedItem = items.find(({ details }) =>
      deepEqual(details, currentOptions, Object.keys(currentOptions))
    )

    return selectedItem
  }, [items, currentOptions])

  const onClickApply = useCallback(async () => {
    if (validItem) {
      amplitudeTrack('click_apply_alert', {
        type: modelType,
        id: modelId,
      })

      setOpen(false)

      onApply(validItem)
    }
  }, [validItem, modelType, modelId, onApply])

  const closeModal = useCallback(() => {
    amplitudeTrack('click_close_alert_modal')

    setOpen(false)
  }, [])

  useImperativeHandle(ref, () => ({
    setOpen: (isOpen: boolean) => setOpen(isOpen),
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

                <div className="mt-2">
                  {(modelType === 'M'
                    ? macOptions
                    : modelType === 'P'
                    ? ipadOptions
                    : iphoneOptions
                  ).map((option) => (
                    <div className="mt-3" key={option.label}>
                      <p className="text-md  text-gray-900 ">{option.label}</p>
                      <ul className="mt-1 flex flex-wrap items-center">
                        {option.value.map((candidate, candidateIndex) => (
                          <li
                            key={candidateIndex}
                            className="w-fit pb-2 pr-1"
                            onClick={() => {
                              handleModelOptionChange(option.key, candidate.value)
                            }}
                          >
                            <button
                              type="button"
                              className={`rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                                option.availableOptions?.includes(candidate.value)
                                  ? (candidate.value === currentOptions[option.key] ||
                                      (option.key === 'chip,cpu' &&
                                        currentOptions['chip'] ===
                                          (candidate.value as string).split(' ')[0] &&
                                        currentOptions['cpu'] ==
                                          (candidate.value as string).split(' ')[1])) &&
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
                    className={classNames(
                      validItem
                        ? ' bg-black text-white'
                        : 'cursor-not-allowed bg-gray-300 text-gray-400 ring-gray-300',
                      'text-md flex w-full max-w-md flex-[3] justify-center  rounded-md px-3 py-2 font-bold'
                    )}
                    onClick={onClickApply}
                  >
                    선택하기
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default forwardRef(SelectOptionsModal)
