import desks from '@/data/desks'
import { useRouter } from 'next/router'

export default function SectionDesk() {
  const router = useRouter()

  const onClickCard = (deskId) => {
    router.push(`/desk/${deskId}`)
  }

  return (
    <section>
      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 xl:gap-x-8">
        {desks.map((desk) => (
          <div
            key={desk.id}
            className="group relative cursor-pointer"
            onClick={() => {
              onClickCard(desk.id)
            }}
          >
            <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
              <img src={desk.imageSrc} alt={desk.imageAlt} className="object-cover object-center" />
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
    </section>
  )
}
