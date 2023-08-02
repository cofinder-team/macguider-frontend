import NewsletterForm from '@/components/NewsletterForm'
import { PageSEO } from '@/components/SEO'
import ProgressBar from '@/components/curation/ProgressBar'
import CurationLayoutWrapper from '@/components/layouts/CurationLayout'
import {
  faChevronDown,
  faCircleCheck,
  faCircleChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useState } from 'react'

export default function Curation() {
  return (
    <>
      <PageSEO
        title={'개인별 애플 제품 추천'}
        description={'나에게 딱맞는 애플 제품을 추천해드립니다.'}
      />

      <section className="mt-md-6 mt-3 pb-6">
        <h1 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10">
          나에게 가장 적합한 아이패드는...
        </h1>

        <div className="space-y-8 divide-y-[1px] divide-gray-200">
          <div className="pt-8">
            <div className="flex space-x-3">
              <div className=" w-[120px]">
                <img
                  className="aspect-1 object-contain object-center"
                  src="/static/images/ipads/ipad-mini-2019.jpeg"
                  alt="아이패드 미니 2019"
                />
              </div>

              <div className="flex-1">
                <div className="font-bold text-blue-500">1위</div>
                <div className="font-semibold text-gray-800">iPad Pro 12.9 2022(4세대)</div>
                <div className="mt-2 flex flex-wrap items-center">
                  <span className="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    512GB
                  </span>
                  <span className="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    WiFi
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2 rounded-md bg-gray-100 p-3 text-sm">
              <div className="font-semibold">MacGuider 두줄평</div>

              <ul className="mt-2 space-y-2">
                <li className="space-x-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
                  <span>최고의 성능, 최고의 가격</span>
                </li>
                <li className="space-x-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
                  <span>아이패드로 하는 작업으로 돈을 번다면 추천</span>
                </li>
              </ul>
            </div>

            <div className="mt-3">
              <div className="text-sm font-semibold text-gray-900">상세정보</div>

              <div className="relative overflow-hidden">
                <ul className="mt-2 space-y-2">
                  <li className="border-b border-gray-100 px-2 pb-2 text-sm">
                    <div className="flex items-center justify-between text-gray-900">
                      <div>저장공간</div>
                      <div className="font-normal">512GB</div>
                    </div>

                    <p className="mt-1 text-base text-gray-500">3시간 영화 가능</p>
                  </li>
                  <li className="border-b border-gray-100 px-2 pb-2 text-sm">
                    <div className="flex items-center justify-between text-gray-900">
                      <div>저장공간</div>
                      <div className="font-normal">512GB</div>
                    </div>

                    <p className="mt-1 text-base text-gray-500">3시간 영화 가능</p>
                  </li>
                </ul>

                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0  flex h-2/3 items-center justify-center bg-gradient-to-t from-white opacity-90"
                >
                  <span className="relative text-center text-base text-black">
                    상세정보 더보기
                    <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center space-x-3 text-center">
              <div className="w-1/4 rounded-lg border border-black bg-white p-4">공유</div>
              <div className="flex-1 rounded-lg bg-black p-4 font-bold text-white">
                120,000원 부터~
              </div>
            </div>
          </div>
          <div className="pt-8">
            <div className="flex space-x-3">
              <div className=" w-[120px]">
                <img
                  className="aspect-1 object-contain object-center"
                  src="/static/images/ipads/ipad-mini-2019.jpeg"
                  alt="아이패드 미니 2019"
                />
              </div>

              <div className="flex-1">
                <div className="font-bold text-blue-500">1위</div>
                <div className="font-semibold text-gray-800">iPad Pro 12.9 2022(4세대)</div>
                <div className="mt-2 flex flex-wrap items-center">
                  <span className="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    512GB
                  </span>
                  <span className="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    WiFi
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2 rounded-md bg-gray-100 p-3 text-sm">
              <div className="font-semibold">MacGuider 두줄평</div>

              <ul className="mt-2 space-y-2">
                <li className="space-x-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
                  <span>최고의 성능, 최고의 가격</span>
                </li>
                <li className="space-x-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
                  <span>아이패드로 하는 작업으로 돈을 번다면 추천</span>
                </li>
              </ul>
            </div>

            <div className="mt-3">
              <div className="text-sm font-semibold text-gray-900">상세정보</div>

              <div className="relative overflow-hidden">
                <ul className="mt-2 space-y-2">
                  <li className="border-b border-gray-100 px-2 pb-2 text-sm">
                    <div className="flex items-center justify-between text-gray-900">
                      <div>저장공간</div>
                      <div className="font-normal">512GB</div>
                    </div>

                    <p className="mt-1 text-base text-gray-500">3시간 영화 가능</p>
                  </li>
                  <li className="border-b border-gray-100 px-2 pb-2 text-sm">
                    <div className="flex items-center justify-between text-gray-900">
                      <div>저장공간</div>
                      <div className="font-normal">512GB</div>
                    </div>

                    <p className="mt-1 text-base text-gray-500">3시간 영화 가능</p>
                  </li>
                </ul>

                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0  flex h-2/3 items-center justify-center bg-gradient-to-t from-white opacity-90"
                >
                  <span className="relative text-center text-base text-black">
                    상세정보 더보기
                    <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center space-x-3 text-center">
              <div className="w-1/4 rounded-lg border border-black bg-white p-4">공유</div>
              <div className="flex-1 rounded-lg bg-black p-4 font-bold text-white">
                120,000원 부터~
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-12 flex items-center justify-center">
        <NewsletterForm />
      </div>
    </>
  )
}
