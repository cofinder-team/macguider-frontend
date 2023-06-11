import StickyBanner from './StickyBanner'

export default function SectionContainer({ children }) {
  return (
    <>
      <StickyBanner />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-6xl xl:px-0">{children}</div>
    </>
  )
}
