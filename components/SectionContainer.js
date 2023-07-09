import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import { useRouter } from 'next/router'
import MobileNav from './MobileNav'
import { useEffect, useRef, useState } from 'react'

export default function SectionContainer({ children }) {
  const router = useRouter()
  const headerRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight
      setHeaderHeight(height)
    }
  }, [])

  return (
    <>
      <header ref={headerRef} className="fixed top-0 z-20 w-full bg-white">
        <div className="mx-auto  flex max-w-3xl  items-center justify-between py-6 px-4 sm:px-6 md:py-10 xl:max-w-6xl xl:px-0">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div
                  className="mr-3"
                  style={{
                    transform: 'scaleX(-1)',
                  }}
                >
                  <Logo />
                </div>

                <div className="h-6 text-2xl font-semibold leading-6 sm:block">
                  {siteMetadata.headerTitle}
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className={`p-1 font-semibold ${
                    router.pathname.startsWith(link.href)
                      ? 'text-blue-700'
                      : 'text-gray-900 dark:text-gray-100'
                  } sm:p-4`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <MobileNav />
          </div>
        </div>
      </header>
      <div
        className="mx-auto  max-w-3xl px-4 sm:px-6 xl:max-w-6xl xl:px-0"
        style={{
          marginTop: headerHeight + 'px',
        }}
      >
        {children}
      </div>
    </>
  )
}
