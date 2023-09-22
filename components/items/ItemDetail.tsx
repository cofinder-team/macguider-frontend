export const ItemDetail = ({
  item,
  mainClass,
  detailClass,
}: {
  item: ItemResponse
  mainClass?: string
  detailClass?: string
}) => {
  return item.type === 'M' ? (
    <>
      <p className={mainClass}>{`${item.model.name} ${(item as MacItemResponse).details.chip}`}</p>
      <p className={detailClass}>
        {`CPU ${(item as MacItemResponse).details.cpu}코어, GPU ${
          (item as MacItemResponse).details.gpu
        }코어, RAM ${(item as MacItemResponse).details.ram}GB, SSD ${
          (item as MacItemResponse).details.ssd
        }`}
      </p>
    </>
  ) : item.type === 'P' ? (
    <>
      <p className={mainClass}>
        {`${(item as IpadItemResponse).model.name} ${(item as IpadItemResponse).details.gen}세대`}
      </p>
      <p>
        {`${(item as IpadItemResponse).details.cellular ? 'Wi-Fi + Cellular' : 'Wi-Fi'}, ${
          (item as IpadItemResponse).details.storage
        }`}
      </p>
    </>
  ) : (
    <>
      <p>
        {`${(item as IphoneItemResponse).model.name} ${
          (item as IphoneItemResponse).details.modelSuffix
        }`}
        <br />
        {`${(item as IphoneItemResponse).details.storage}`}
      </p>
    </>
  )
}
