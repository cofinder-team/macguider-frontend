import CardMac from '@/components/CardMac'
import { PageSEO } from '@/components/SEO'
import mackbookAir13Data from '@/data/macs/macbook-air-13'

const Price = ({ model }) => {
  let modelData

  // 모델명 대문자로 변경 ex) macbook-air-13 -> Macbook Air 13
  let modelTitle = model
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ')

  switch (model) {
    case 'macbook-air-13':
      modelData = mackbookAir13Data
      break
    default:
      modelData = mackbookAir13Data
  }

  return (
    <>
      <PageSEO
        title={`중고 시세 | ${modelTitle}`}
        description={`${modelTitle}의 사양별 중고 시세를 알려드립니다.`}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="py-12">
          <div className="-m-4">
            {modelData.map((d) => (
              <CardMac
                key={d.title}
                title={d.title}
                imgSrc={d.imgSrc}
                href={d.href}
                specs={d.specs}
                options={d.options}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { model } = context.query

  // Perform any data fetching or API calls based on the model parameter

  return {
    props: {
      model,
    },
  }
}

export default Price
