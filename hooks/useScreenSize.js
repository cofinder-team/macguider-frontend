import { useMediaQuery } from '@react-hook/media-query'

export const useScreenSize = () => {
  const sm = useMediaQuery('(min-width: 640px)')
  const md = useMediaQuery('(min-width: 768px)')
  const lg = useMediaQuery('(min-width: 1024px)')
  const xl = useMediaQuery('(min-width: 1280px)')

  return {
    sm,
    md,
    lg,
    xl,
  }
}
