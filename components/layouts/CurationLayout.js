export default function CurationLayout({ children, bgColor }) {
  return (
    <div style={{ backgroundColor: bgColor }}>
      <div className="mx-auto  h-[100dvh] max-w-3xl px-4 sm:px-6 xl:max-w-6xl xl:px-0">
        <main className="mx-auto h-full max-w-md">{children}</main>
      </div>
    </div>
  )
}
