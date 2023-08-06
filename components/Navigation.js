import { useRouter } from 'next/router'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import MobileNav from './MobileNav'

const Navigation = () => {
  const router = useRouter()
  return (
    <div className="flex items-center text-base leading-5">
      <div className="hidden xl:block">
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
  )
}

export default Navigation
