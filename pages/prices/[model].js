import CardMac from '@/components/CardMac'
import { PageSEO } from '@/components/SEO'
import mackbookAir13Data from '@/data/macs/macbook-air-13'
import Image from 'next/image'

const Price = ({ model }) => {
  let modelData

  // 모델명 대문자로 변경 ex) macbook-air-13 -> Macbook Air 13
  let modelTitle = model
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ')

  return (
    <>
      <PageSEO
        title={`중고 시세 | ${modelTitle}`}
        description={`${modelTitle}의 사양별 중고 시세를 알려드립니다.`}
      />

      <div className="container md:py-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3">
            <Image
              alt={'hello'}
              src={'/static/images/time-machine.jpg'}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />

            <ul className="mt-2 mb-8 space-y-1 text-left text-gray-500 dark:text-gray-400">
              <li className="flex items-center space-x-3">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>
                  마지막 데이터 수집일:{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">7일전</span>
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>
                  상태정보:{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    S급, 생활기스 1~2개 정도
                  </span>
                </span>
              </li>
            </ul>
          </div>

          <div className="flex-grow md:px-3">
            <h1 className="text-xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:leading-10 md:text-2xl">
              Apple {modelTitle} ({'12GB' + ', ' + 'SSD ' + '256GB'})
            </h1>

            <div className="max-w-xl">
              <ul className="mt-6 max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                <li className="pb-3 sm:pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        적정가격
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        평균적으로 거래되는 가격
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $320
                    </div>
                  </div>
                </li>

                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        최저가격
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        평균보다 낮은 가격
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $2367
                    </div>
                  </div>
                </li>

                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        최고가격
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        평균보다 높은 가격
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $2367
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-3">
                <div className="w-full max-w-md">
                  <label
                    htmlFor="countries"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    CPU
                  </label>
                  <select
                    id="countries"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  >
                    <option selected value="S급">
                      S급
                    </option>
                    <option value="미개봉">미개봉</option>
                  </select>
                </div>

                <ul className="mt-3 flex w-full  max-w-xl flex-wrap items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                  <li className="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0  md:w-1/2">
                    <div className="flex items-center pl-3">
                      <input
                        id="horizontal-list-radio-license"
                        type="radio"
                        value=""
                        name="list-radio"
                        className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                      />
                      <label
                        htmlFor="horizontal-list-radio-license"
                        className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Driver License{' '}
                      </label>
                    </div>
                  </li>
                  <li className="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0 md:w-1/2">
                    <div className="flex items-center pl-3">
                      <input
                        id="horizontal-list-radio-id"
                        type="radio"
                        value=""
                        name="list-radio"
                        className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                      />
                      <label
                        htmlFor="horizontal-list-radio-id"
                        className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        State ID
                      </label>
                    </div>
                  </li>
                  <li className="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0 md:w-1/2">
                    <div className="flex items-center pl-3">
                      <input
                        id="horizontal-list-radio-id"
                        type="radio"
                        value=""
                        name="list-radio"
                        className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                      />
                      <label
                        htmlFor="horizontal-list-radio-id"
                        className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        State ID
                      </label>
                    </div>
                  </li>
                  <li className="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0 md:w-1/2">
                    <div className="flex items-center pl-3">
                      <input
                        id="horizontal-list-radio-id"
                        type="radio"
                        value=""
                        name="list-radio"
                        className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                      />
                      <label
                        htmlFor="horizontal-list-radio-id"
                        className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        State ID
                      </label>
                    </div>
                  </li>
                  <li className="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0 md:w-1/2">
                    <div className="flex items-center pl-3">
                      <input
                        id="horizontal-list-radio-id"
                        type="radio"
                        value=""
                        name="list-radio"
                        className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                      />
                      <label
                        htmlFor="horizontal-list-radio-id"
                        className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        State ID
                      </label>
                    </div>
                  </li>
                  <li className="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0 md:w-1/2">
                    <div className="flex items-center pl-3">
                      <input
                        id="horizontal-list-radio-id"
                        type="radio"
                        value=""
                        name="list-radio"
                        className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                      />
                      <label
                        htmlFor="horizontal-list-radio-id"
                        className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        State ID
                      </label>
                    </div>
                  </li>
                </ul>

                <div className="grid max-w-md grid-cols-2 gap-2 py-5">
                  <div className="w-full">
                    <label
                      htmlFor="countries"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      제품 상태
                    </label>
                    <select
                      id="countries"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      <option selected value="S급">
                        S급
                      </option>
                      <option value="미개봉">미개봉</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="countries"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      애플케어플러스 가입 여부
                    </label>
                    <select
                      id="countries"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      <option selected value="없음">
                        없음
                      </option>
                      <option value="S급">1년 이상 남음</option>
                      <option value="S급">2년 이상 남음</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { model, year, ram, ssd } = context.query

  return {
    props: {
      model,
    },
  }
}

export default Price
