const { PageSEO } = require('@/components/SEO')
const siteMetadata = require('@/data/siteMetadata')

export default function MacsLayout({ seoTitle, children }) {
  return (
    <>
      <PageSEO title={`시세 | ${seoTitle}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="py-12">
          <div className="-m-4">{children}</div>
        </div>
      </div>
    </>
  )
}
