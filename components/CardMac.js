import Image from './Image'
import Link from './Link'

const CardMac = ({ title, imgSrc, href, specs, options }) => {
  return (
    <div className="md w-full p-4">
      <div className="rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
        <div className={`${imgSrc && 'h-full'}  flex overflow-hidden `}>
          {imgSrc &&
            (href ? (
              <Link className="w-1/5" href={href} aria-label={`Link to ${title}`}>
                <Image
                  alt={title}
                  src={imgSrc}
                  className="object-cover object-center md:h-36 lg:h-48"
                  width={544}
                  height={306}
                />
              </Link>
            ) : (
              <Image
                alt={title}
                src={imgSrc}
                className="object-cover object-center md:h-36 lg:h-48"
                width={544}
                height={306}
              />
            ))}
          <div className="grow p-6">
            <h2 className="text-lg font-bold leading-8 tracking-tight">
              {href ? (
                <Link href={href} aria-label={`Link to ${title}`}>
                  {title}
                </Link>
              ) : (
                title
              )}
            </h2>
            <p>{specs.cpu}</p>
          </div>
        </div>

        <div className="flex flex-wrap">
          {options.map((option, index) => (
            <button
              key={index}
              className={`ml-1 mb-1 rounded border border-gray-100 bg-transparent px-2 py-1 text-sm font-medium  hover:border-transparent hover:bg-blue-500 hover:text-white`}
            >
              <p>램 {option.ram},</p>
              <p>SSD {option.ssd}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardMac
