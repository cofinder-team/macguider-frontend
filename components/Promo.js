import Link from '@/components/Link'
import amplitude from 'amplitude-js'

export default function Promo({
  imgSrc = 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80',
  title = '구매 가이드',
  desc = '애플 제품의 적절한 구매시기를 알려드립니다.',
  href = '/buyers-guide',
  cta = '더 알아보기',
}) {
  const onClickCta = () => {
    amplitude.getInstance().logEvent(`click_promo_cta_btn`, { promoTitle: title, promoHref: href })
  }

  return (
    <div className="py-12 md:py-16">
      <div className="relative overflow-hidden rounded-lg">
        <div className="absolute inset-0">
          <img
            src={imgSrc}
            alt="promo-buyers-guide"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="relative bg-gray-900 bg-opacity-75 px-6 py-20 sm:px-12  lg:px-16">
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              <span className="block sm:inline">{title}</span>
            </h2>
            <p className="mt-3 text-xl text-white">{desc}</p>
            <Link
              href={href}
              className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
              onClick={onClickCta}
            >
              {cta}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
