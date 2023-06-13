import GA from './GoogleAnalytics'
import siteMetadata from '@/data/siteMetadata'
import Amplitude from './Amplitude'

const isProduction = process.env.NODE_ENV === 'production'

const Analytics = () => {
  return <>{isProduction && <Amplitude />}</>
}

export default Analytics
