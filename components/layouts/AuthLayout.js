export default function AuthLayout({ children }) {
  return (
    <div className="h-[100dvh]">
      <main className="h-full">{children}</main>
    </div>
  )
}
