import React, { useState } from 'react'
import amplitude from 'amplitude-js'

export default function DeskSection({ desk }) {
  const { images, productInfo, desc } = desk
  // state for selectedImage in each section
  const [selectedImage, setSelectedImage] = useState(images[0])
  const [expandedRows, setExpandedRows] = useState([])

  const onClickImage = (image) => {
    setSelectedImage(image)
  }

  const toggleRow = (itemId) => {
    const isRowExpanded = expandedRows.includes(itemId)
    if (isRowExpanded) {
      setExpandedRows(expandedRows.filter((row) => row !== itemId))
    } else {
      setExpandedRows([...expandedRows, itemId])
    }
    amplitude
      .getInstance()
      .logEvent('do_action', { action_type: 'product_toggle', action_detail: itemId })
  }

  return (
    <>
      <div className="grid gap-4">
        <div>
          <img
            className={`h-[280px] w-full rounded-lg md:h-[420px] ${
              selectedImage.cover ? 'object-cover' : 'object-contain'
            }`}
            src={selectedImage.src}
            alt={selectedImage.alt}
            draggable="false"
          />
        </div>
        <div className="grid grid-cols-5 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              onClick={() => {
                onClickImage(image)
              }}
              className={`cursor-pointer overflow-hidden rounded-lg border-2 ${
                selectedImage.id === image.id ? 'border-blue-800' : 'border-transparent'
              }`}
            >
              <img
                className={`h-full w-full object-contain ${
                  image.cover ? 'object-cover' : 'object-contain'
                }
                `}
                src={image.src}
                alt={image.alt}
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-6"
        id="accordion-flush"
        data-accordion="collapse"
        data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        data-inactive-classes="text-gray-500 dark:text-gray-400"
      >
        {productInfo.map(({ id, category, src, alt, title, desc }) => (
          <React.Fragment key={id}>
            <div id="accordion-flush-heading-1" onClick={() => toggleRow(id)}>
              <button
                type="button"
                className="flex w-full items-center justify-between border-b border-gray-200 py-5 text-left font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400"
                data-accordion-target="#accordion-flush-body-1"
                aria-expanded="true"
                aria-controls="accordion-flush-body-1"
              >
                <span>{category}</span>
                <svg
                  data-accordion-icon
                  className={`h-6 w-6 shrink-0 ${expandedRows.includes(id) ? 'rotate-180' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              id="accordion-flush-body-1"
              aria-labelledby="accordion-flush-heading-1"
              className={`${expandedRows.includes(id) ? 'block' : 'hidden'} `}
            >
              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 border-b border-gray-200 py-5 dark:border-gray-700 sm:grid-cols-12 lg:gap-x-8">
                <div className="sm:col-span-4 lg:col-span-5">
                  <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg ">
                    <img src={src} alt={alt} className="object-contain object-center" />
                  </div>
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{title}</h2>
                  <section aria-labelledby="information-heading" className="mt-3">
                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>

                    <div className="mt-6">
                      <h4 className="sr-only">Description</h4>

                      <p className="text-sm text-gray-700">{desc}</p>
                    </div>
                  </section>

                  <section aria-labelledby="options-heading" className="mt-6">
                    <form>
                      <div className="mt-6">
                        <button
                          type="submit"
                          className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                        >
                          구매하러 가기
                        </button>
                      </div>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <p className="mt-6">{desc}</p>
    </>
  )
}
