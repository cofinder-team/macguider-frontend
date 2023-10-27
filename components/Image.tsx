import NextImage from 'next/image'

const Image = ({
  src,
  width,
  height,
  quality,
  format,
  ...rest
}: {
  src: string
  width?: number
  height?: number
  quality?: number
  format?: string
  [key: string]: any
}) => {
  const base = process.env.NEXT_PUBLIC_IMAGE_BASE

  const params: string = new URLSearchParams(
    Object.entries({ w: width, h: height, q: quality, f: format })
      .filter(([_, value]) => value)
      .map(([key, value]) => [key, value?.toString() || ''])
  ).toString()

  const url = `${
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.[a-z]{3,4}$/.test(src)
      ? `${base}/${src}`
      : src
  }?${params}`

  return <NextImage src={url} width={width} height={height} quality={100} {...rest} />
}

export default Image
