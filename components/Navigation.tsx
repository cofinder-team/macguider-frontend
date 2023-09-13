import { useRouter } from 'next/router'
import Link from './Link'
import headerNavLinks, { HeaderNavLink } from '@/data/headerNavLinks'
import MobileNav from './MobileNav'
import { useCallback } from 'react'

const Navigation = () => {
  const router = useRouter()

  const isCurrentCategory = useCallback(
    (link: HeaderNavLink) => {
      if (router.pathname.startsWith('/prices') && link.href === '/') {
        return true
      }

      if (link.exact) {
        return router.pathname === link.href
      }

      return router.pathname.startsWith(link.href)
    },
    [router.pathname]
  )

  return (
    <div className="flex items-center text-base leading-5">
      <div className="hidden xl:block">
        {headerNavLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className={`p-1 font-semibold ${
              isCurrentCategory(link) ? 'text-black' : 'text-gray-500'
            } sm:p-4`}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <MobileNav />
    </div>
  )
}

export default Navigation
