import desks from '@/data/desks'
import { useRouter } from 'next/router'

export default function SectionDesk() {
  const router = useRouter()

  const onClickCard = (deskId) => {
    router.push(`/desk/${deskId}`)
  }

  return (
    <section className="mt-md-6 mt-3">
      <div className="space-y-2 pt-6 pb-2">
        <div className="flex items-center">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10">
            오늘의 데스크
          </h1>
          <div className="mx-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            New
          </div>
        </div>

        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          애플 제품과 찰떡궁합인 제품들을 소개합니다
        </p>
      </div>

      <div className="mt-2">
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          {desks.map((desk) => (
            <div
              key={desk.id}
              className="group relative cursor-pointer"
              onClick={() => {
                onClickCard(desk.id)
              }}
            >
              <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={desk.imageSrc}
                  alt={desk.imageAlt}
                  className="object-cover object-center"
                />
                <div
                  className="flex items-end p-4 opacity-0 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <div className="w-full rounded-md bg-white bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                    구경하러 가기
                  </div>
                </div>
              </div>
              <div className="mt-4 text-base font-medium text-gray-900">
                <h3>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {desk.name}
                </h3>
              </div>
              <p className="mt-1 text-sm text-gray-500">{desk.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
