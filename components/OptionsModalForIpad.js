import { forwardRef, Fragment, useCallback, useEffect, useImperativeHandle, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

function OptionsModalForIpad({ currentItem, currentModel, currentOption, onApply }, ref) {
  const [open, setOpen] = useState(false)

  const { id: itemId, data: currentItemData } = currentItem
  const { title, specs: currentModelSpecs, options: currentModelOptions } = currentModel
  const {
    id: optionId,
    connectivity: currentOptionConnectivity,
    ssd: currentOptionSsd,
  } = currentOption

  const [currentCpuOption, setCurrentCpuOption] = useState(currentModelSpecs.cpu)
  const [currentSsdOption, setCurrentSsdOption] = useState(currentOptionSsd)
  const [currentConnectivityOption, setCurrentConnectivityOption] =
    useState(currentOptionConnectivity)

  const cpuOptions = [...new Set(currentItemData.map(({ specs }) => specs.cpu))]
  const ssdOptions = [
    ...new Set(currentItemData.flatMap(({ options }) => options.flatMap(({ ssd }) => ssd))),
  ]
  const connectivityOptions = [
    ...new Set(
      currentItemData.flatMap(({ options }) => options.flatMap(({ connectivity }) => connectivity))
    ),
  ]

  const availableSsdOptions = ssdOptions.filter((ssdOption) =>
    currentItemData.some(
      ({ specs, options }) =>
        specs.cpu === currentCpuOption && options.some(({ ssd }) => ssd === ssdOption)
    )
  )

  const availableConnectivityOptions = connectivityOptions.filter((connectivityOption) =>
    currentItemData.some(
      ({ specs, options }) =>
        specs.cpu === currentCpuOption &&
        options.some(({ connectivity }) => connectivity === connectivityOption)
    )
  )

  const isValidOption =
    availableSsdOptions.includes(currentSsdOption) &&
    availableConnectivityOptions.includes(currentConnectivityOption)

  const onClickCpuOption = useCallback((cpuOption) => {
    setCurrentCpuOption(cpuOption)
  }, [])

  const onClickSsdOption = useCallback(
    (ssdOption) => {
      if (availableSsdOptions.includes(ssdOption)) {
        setCurrentSsdOption(ssdOption)
      }
    },
    [availableSsdOptions]
  )

  const onClickConnectivityOption = useCallback(
    (connectivityOption) => {
      if (availableConnectivityOptions.includes(connectivityOption)) {
        setCurrentConnectivityOption(connectivityOption)
      }
    },
    [availableConnectivityOptions]
  )

  const findOptionId = useCallback(() => {
    const selectedModel = currentItemData.find(({ specs, options }) => {
      return (
        specs.cpu === currentCpuOption &&
        options.some(
          ({ ssd, connectivity }) =>
            ssd === currentSsdOption && connectivity === currentConnectivityOption
        )
      )
    })

    if (selectedModel) {
      const selectedOption = selectedModel.options.find(
        ({ ssd, connectivity }) =>
          ssd === currentSsdOption && connectivity === currentConnectivityOption
      )

      if (selectedOption) {
        const { id: selectedOptionId } = selectedOption
        onApply(selectedOptionId)
      }
    }
  }, [currentCpuOption, currentSsdOption, currentItemData, onApply, currentConnectivityOption])

  const initializeOptions = useCallback(() => {
    setCurrentCpuOption(currentModelSpecs.cpu)
    setCurrentSsdOption(currentOptionSsd)
    setCurrentConnectivityOption(currentOptionConnectivity)
  }, [currentModelSpecs, currentOptionSsd, currentOptionConnectivity])

  const onClickApply = useCallback(() => {
    if (isValidOption) {
      setOpen(false)
      findOptionId()
    }
  }, [findOptionId, isValidOption])

  useImperativeHandle(ref, () => ({
    setOpen: (isOpen) => setOpen(isOpen),
    initializeOptions: () => initializeOptions(),
  }))

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
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
              <Dialog.Panel className="relative w-full transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none "
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-3">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-base font-semibold leading-6 text-gray-900"
                  >
                    옵션 선택
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="mt-5">
                      <p className="text-md  text-gray-900 ">CPU 모델명</p>

                      <ul className="mt-1 flex flex-wrap items-center">
                        {cpuOptions.map((cpuOption) => (
                          <li
                            className="w-fit pb-2 pr-1"
                            key={cpuOption}
                            onClick={() => {
                              onClickCpuOption(cpuOption)
                            }}
                          >
                            <button
                              type="button"
                              className={`rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
                                cpuOption === currentCpuOption &&
                                'bg-blue-700 text-white ring-blue-700 hover:bg-blue-900'
                              }`}
                            >
                              {cpuOption}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-3">
                      <p className="text-md  text-gray-900 ">저장용량</p>

                      <ul className="mt-1 flex flex-wrap items-center">
                        {ssdOptions.map((ssdOption) => (
                          <li
                            key={ssdOption}
                            className="w-fit pb-2 pr-1"
                            onClick={() => {
                              onClickSsdOption(ssdOption)
                            }}
                          >
                            <button
                              type="button"
                              className={`rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
                                availableSsdOptions.includes(ssdOption)
                                  ? ssdOption === currentSsdOption &&
                                    'bg-blue-700 text-white ring-blue-700 hover:bg-blue-900'
                                  : `cursor-not-allowed bg-gray-100 text-gray-400 ring-gray-100 hover:bg-gray-100 hover:text-gray-400 hover:ring-gray-100`
                              }`}
                            >
                              {ssdOption}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-3">
                      <p className="text-md  text-gray-900 ">연결성</p>

                      <ul className="mt-1 flex flex-wrap items-center">
                        {connectivityOptions.map((connectivityOption) => (
                          <li
                            className="w-fit pb-2 pr-1"
                            key={connectivityOption}
                            onClick={() => {
                              onClickConnectivityOption(connectivityOption)
                            }}
                          >
                            <button
                              type="button"
                              className={`rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
                                availableConnectivityOptions.includes(connectivityOption)
                                  ? connectivityOption === currentConnectivityOption &&
                                    'bg-blue-700 text-white ring-blue-700 hover:bg-blue-900'
                                  : `cursor-not-allowed bg-gray-100 text-gray-400 ring-gray-100 hover:bg-gray-100 hover:text-gray-400 hover:ring-gray-100`
                              }`}
                            >
                              {connectivityOption === 'wifi' ? 'Wi-Fi' : 'Wi-Fi + Cellular'}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-center sm:mt-6">
                  <button
                    type="button"
                    className={`text-md flex w-full max-w-md justify-center rounded-md px-3 py-2 font-semibold text-white shadow-sm  ${
                      isValidOption
                        ? 'bg-blue-700 hover:bg-blue-900'
                        : 'cursor-not-allowed bg-gray-300 text-gray-400'
                    }`}
                    onClick={onClickApply}
                  >
                    적용하기
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

export default forwardRef(OptionsModalForIpad)
