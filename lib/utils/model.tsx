export const getModelType = (type: ModelType): string => {
  switch (type) {
    case 'M':
      return 'mac'
    case 'P':
      return 'ipad'
    case 'I':
      return 'iphone'
  }
}
