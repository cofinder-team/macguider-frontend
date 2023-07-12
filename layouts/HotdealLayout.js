import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { useScreenSize } from 'hooks/useScreenSize'
import NewsletterForm from '@/components/NewsletterForm'
import amplitudeTrack from '@/lib/amplitude/track'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import SectionDesk from '@/components/section/desk'
import Feedback from '@/components/Feedback'
import optionsMac from '@/data/options/mac'
import optionsIpad from '@/data/options/ipad'

const leftColumnOffsetY = 112

const HotdealLayout = ({ leftCol, rightCol }, ref) => {
  const container = useRef(null)
  const leftColumn = useRef(null)
  const newsletterRef = useRef(null)
  const [fixedElementWidth, setFixedElementWidth] = useState(0)
  const { sm, md, lg } = useScreenSize()
  const [timeRemaining, setTimeRemaining] = useState(null)

  const onClickOtherItem = useCallback((item) => {
    amplitudeTrack('click_view_other_product', {
      itemId: item.id,
    })
  }, [])

  const scrollToNewsletterForm = () => {
    if (newsletterRef.current) {
      newsletterRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const getTimeLeftUntilNextDeal = () => {
    // calculate time left until next day 10am in local time
    const now = new Date()
    const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 0, 0)
    const timeLeft = nextDay.getTime() - now.getTime()

    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60))
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000)
    const hoursLeftString = hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft
    const minutesLeftString = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft
    const secondsLeftString = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft
    return `${hoursLeftString}:${minutesLeftString}:${secondsLeftString}`
  }

  useEffect(() => {
    let lastScrollTop = 0

    const handleScroll = () => {
      const isMobile = window.innerWidth <= 768

      if (!isMobile && container.current && leftColumn.current) {
        let st = window.pageYOffset || document.documentElement.scrollTop

        if (st > lastScrollTop) {
          // when scroll down
          if (
            leftColumn.current.getBoundingClientRect().bottom >=
            container.current.getBoundingClientRect().bottom
          ) {
            leftColumn.current.style.position = 'absolute'
            leftColumn.current.style.bottom = '0'
            leftColumn.current.style.top = 'auto'
          } else {
            leftColumn.current.style.position = 'fixed'
            leftColumn.current.style.top = `${leftColumnOffsetY}px`
            leftColumn.current.style.bottom = 'auto'
          }
        } else {
          // when scroll up
          if (
            leftColumn.current.getBoundingClientRect().top >= leftColumnOffsetY &&
            leftColumn.current.getBoundingClientRect().bottom ===
              container.current.getBoundingClientRect().bottom
          ) {
            // change the style of left column by changing style without changing class names
            leftColumn.current.style.position = 'fixed'
            leftColumn.current.style.top = `${leftColumnOffsetY}px`
            leftColumn.current.style.bottom = 'auto'
          }
        }
        lastScrollTop = st <= 0 ? 0 : st
      }
    }

    const handleResize = () => {
      const isMobile = window.innerWidth <= 768

      if (leftColumn.current && leftColumn.current.parentNode) {
        const parentWidth = leftColumn.current.parentNode.offsetWidth
        if (isMobile) {
          leftColumn.current.style.position = 'static'
          leftColumn.current.style.top = 'auto'
          leftColumn.current.style.bottom = 'auto'
          setFixedElementWidth(parentWidth)
        } else {
          const newWidth = parentWidth * 0.5 // Set to 50% of parent width
          leftColumn.current.style.position = 'fixed'
          leftColumn.current.style.top = `${leftColumnOffsetY}px`
          setFixedElementWidth(newWidth)
        }
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date()
      const targetTime = new Date(now)
      targetTime.setDate(targetTime.getDate() + 1)
      targetTime.setHours(10, 0, 0, 0) // Set target time to next day at 10:00 AM

      const difference = targetTime - now

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / (1000 * 60)) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeRemaining(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`
      )
    }

    const timer = setInterval(calculateTimeRemaining, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useImperativeHandle(ref, () => ({
    scrollToNewsletterForm,
  }))

  return (
    <>
      <div ref={container} className="container relative">
        <div
          ref={leftColumn}
          className="md:fixed md:px-5"
          style={{
            width: fixedElementWidth,
            visibility: fixedElementWidth ? 'visible' : 'hidden',
          }}
        >
          <div className="overflow-hidden rounded-lg md:shadow-lg">
            {leftCol}

            <div className=" flex items-center justify-center bg-black p-3  text-white">
              <span className="font-bold"> 다음 핫딜까지 &nbsp; {timeRemaining}</span>
              &nbsp; 남음
            </div>

            <div className=" bg-white py-8 ">
              <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  <h2 className="inline text-2xl sm:block">매일 중고핫딜 소식을 받고 싶다면?</h2>{' '}
                </div>
                <form className="mt-3 max-w-md">
                  <div className="flex gap-x-4">
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="이메일을 입력하세요"
                    />
                    <button
                      type="submit"
                      className="flex-none rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      미리 알림받기
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-auto flex-grow md:w-1/2 md:px-3">{rightCol}</div>
      </div>
      {!md && (
        <div className=" bg-white py-8 ">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <h2 className="inline text-2xl sm:block">매일 중고핫딜 소식을 받고 싶다면?</h2>{' '}
            </div>
            <form className="mt-3 max-w-md">
              <div className="flex gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="이메일을 입력하세요"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  미리 알림받기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6 border-t py-10 md:mt-12">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          적정 중고 시세를 알려드려요
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 xl:gap-x-8">
          {optionsMac
            .slice(0, 4)
            .concat(optionsIpad)
            .slice(0, 8)
            .map((item) => (
              <div key={item.id} className="group relative" onClick={() => onClickOtherItem(item)}>
                <div className=" w-full overflow-hidden rounded-md  bg-white ">
                  <Image
                    objectFit="contain"
                    objectPosition="center"
                    width="544"
                    height="306"
                    src={item.imgSrc}
                    alt={item.model}
                  />
                </div>
                <div className="mt-2 flex justify-center md:mt-4 lg:justify-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {/* <a href={item.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {item.model}
                      </a> */}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default forwardRef(HotdealLayout)
