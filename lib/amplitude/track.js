import { track } from '@amplitude/analytics-browser'
const amplitudeTrack = (eventInput, eventProperties, eventOptions) => {
  const isProduction = () => process.env.NODE_ENV === 'production'
  if (isProduction()) {
    track(eventInput, eventProperties, eventOptions)
  } else {
    const properties = JSON.stringify(eventProperties ?? {})
    const options = JSON.stringify(eventOptions ?? {})
    console.log(
      `[Amplitude Event Track] ${eventInput}\nproperties: ${properties}\noptions: ${options}`
    )
  }
}
export default amplitudeTrack
