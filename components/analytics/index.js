import GA from './GoogleAnalytics'
import siteMetadata from '@/data/siteMetadata'

const isProduction = process.env.NODE_ENV === 'production'

const Analytics = () => {
  return <>{isProduction && <Analytics />}</>
}

export default Analytics
