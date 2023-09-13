export interface HeaderNavLink {
  href: string
  title: string
  exact: boolean
}

const headerNavLinks: HeaderNavLink[] = [
  { href: '/', title: '시세 정보', exact: true },
  { href: '/deals', title: '중고 핫딜', exact: false },
  { href: '/buyers-guide', title: '구매 가이드', exact: false },
  { href: '/desk', title: '오늘의 데스크', exact: false },
  { href: '/my', title: '마이페이지', exact: false },
]

export default headerNavLinks
