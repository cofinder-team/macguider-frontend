import Card from '@/components/Card'
import CardMac from '@/components/CardMac'
import mackbookAir13Data from '@/data/macs/macbook-air-13'
import MacsLayout from '@/layouts/MacsLayout'

export default function MacbookAir13() {
  return (
    <>
      <MacsLayout seoTitle="Macbook Air 13">
        {mackbookAir13Data.map((d) => (
          <CardMac
            key={d.title}
            title={d.title}
            imgSrc={d.imgSrc}
            href={d.href}
            specs={d.specs}
            options={d.options}
          />
        ))}
      </MacsLayout>
    </>
  )
}
