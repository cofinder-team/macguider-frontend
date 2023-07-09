import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import Image from 'next/image'
import optionsMac from '@/data/options/mac'
import { useState } from 'react'
import { useScreenSize } from 'hooks/useScreenSize'
import 'react-loading-skeleton/dist/skeleton.css'
import NewsletterForm from '@/components/NewsletterForm'
import amplitudeTrack from '@/lib/amplitude/track'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import optionsIpad from '@/data/options/ipad'
import SectionDesk from '@/components/section/desk'
import Feedback from '@/components/Feedback'

const leftColumnOffsetY = 150

const PricesLayout = ({ currentItem, currentModel, currentOption, children }, ref) => {
  const container = useRef(null)
  const leftColumn = useRef(null)
  const newsletterRef = useRef(null)
  const [fixedElementWidth, setFixedElementWidth] = useState(0)
  const { sm, md, lg } = useScreenSize()

  const { id: currentItemId } = currentItem
  const { imgSrc, title, specs } = currentModel

  const onClickUploadDesk = useCallback(() => {
    amplitudeTrack('click_upload_desk')
    window.open('https://tally.so/r/w54A6v', '_blank')
  }, [])

  const scrollToNewsletterForm = () => {
    if (newsletterRef.current) {
      newsletterRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  useEffect(() => {
    let lastScrollTop = 0

    const handleScroll = () => {
      if (container.current && leftColumn.current) {
        let st = window.pageYOffset || document.documentElement.scrollTop

        if (st > lastScrollTop) {
          // when scroll down
          if (
            leftColumn.current.getBoundingClientRect().bottom >=
            container.current.getBoundingClientRect().bottom
          ) {
            leftColumn.current.classList.add('md:absolute', 'md:bottom-0')
            leftColumn.current.classList.remove('md:fixed', `md:top-[${leftColumnOffsetY}px]`)
          } else {
            leftColumn.current.classList.add('md:fixed', `md:top-[${leftColumnOffsetY}px]`)
            leftColumn.current.classList.remove('md:absolute', 'md:bottom-0')
          }
        } else {
          // when scroll up
          if (
            leftColumn.current.getBoundingClientRect().top >= leftColumnOffsetY &&
            leftColumn.current.getBoundingClientRect().bottom ===
              container.current.getBoundingClientRect().bottom
          ) {
            leftColumn.current.classList.add('md:fixed', `md:top-[${leftColumnOffsetY}px]`)
            leftColumn.current.classList.remove('md:absolute', 'md:bottom-0')
          }
        }
        lastScrollTop = st <= 0 ? 0 : st
      }
    }

    const updateFixedElementWidth = () => {
      const isMobile = window.innerWidth <= 768

      if (leftColumn.current && leftColumn.current.parentNode) {
        if (isMobile) {
          const parentWidth = leftColumn.current.parentNode.offsetWidth
          setFixedElementWidth(parentWidth)
        } else {
          const parentWidth = leftColumn.current.parentNode.offsetWidth
          const newWidth = parentWidth * 0.5 // Set to 50% of parent width

          setFixedElementWidth(newWidth)
        }
      }
    }

    updateFixedElementWidth()
    window.addEventListener('resize', updateFixedElementWidth)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', updateFixedElementWidth)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useImperativeHandle(ref, () => ({
    scrollToNewsletterForm,
  }))

  return (
    <>
      <div ref={container} className="container relative md:pt-6">
        <div
          ref={leftColumn}
          className={`md:fixed md:top-[${leftColumnOffsetY}px] `}
          style={{
            // 처음 마운트시 fixedElementWidth가 0이므로 visibility를 hidden으로 설정
            width: fixedElementWidth,
            visibility: fixedElementWidth ? 'visible' : 'hidden',
          }}
        >
          <Image
            alt={`${specs.year} ${title}`}
            src={imgSrc}
            width={576}
            height={306}
            priority="true"
            objectFit="contain"
            objectPosition="center"
          />

          {md && (
            <div className="mt-2 flex justify-center xl:px-10">
              <Feedback currentItem={currentItem} currentOption={currentOption} />
            </div>
          )}
        </div>

        <div className="ml-auto flex-grow md:w-1/2 md:px-3">{children}</div>
      </div>

      <div className="mt-12 border-t py-10 md:mt-24 ">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">다른 제품 둘러보기</h2>

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 xl:gap-x-8">
          {optionsMac
            .concat(optionsIpad)
            .filter((device) => device.id !== currentItemId)
            .slice(0, 8)
            .map((device) => (
              <div key={device.id} className="group relative">
                <div className=" w-full overflow-hidden rounded-md  bg-white ">
                  <Image
                    objectFit="contain"
                    objectPosition="center"
                    width="544"
                    height="306"
                    src={device.imgSrc}
                    alt={device.model}
                  />
                </div>
                <div className="mt-2 flex justify-center md:mt-4 lg:justify-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      <a href={device.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {device.model}
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-5 border-t py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">오늘의 데스크</h2>
          <button
            onClick={onClickUploadDesk}
            className="flex items-center rounded-lg bg-gray-800 px-3 py-2 text-sm font-medium text-white  focus:outline-none focus:ring-4 focus:ring-gray-300 "
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="ml-2 inline-block">데스크 올리기</span>
          </button>
        </div>

        <SectionDesk />
      </div>

      <div className="mt-12 flex items-center justify-center">
        <NewsletterForm ref={newsletterRef} />
      </div>
    </>
  )
}

export default forwardRef(PricesLayout)
