import Image from './Image'
import Link from './Link'

const ModelCard = ({ title, imgSrc, href }) => (
  <div className="md p-4 md:w-1/2 xl:w-1/4" style={{ maxWidth: '544px' }}>
    <div
      className={`${
        imgSrc && 'h-full'
      }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700 `}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-contain object-center md:h-36 lg:h-48"
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
      <div className="p-3">
        <h2 className="mb-2 text-xl font-bold leading-8 tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        {href && (
          <Link
            href={href}
            className="inline-flex items-center rounded-lg  border border-blue-700 bg-white px-3 py-2 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-white dark:bg-transparent dark:text-white dark:hover:border-blue-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            aria-label={`Link to ${title}`}
          >
            가격 알아보기 &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default ModelCard
