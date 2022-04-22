export const DecorateAll = (
  decorator: (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => void,
  options: {exclude?: string[]; deep?: boolean} = {}
) => {
  return (target: any): void => {
    let descriptors = Object.getOwnPropertyDescriptors(target.prototype)

    if (options.deep) {
      let base = Object.getPrototypeOf(target)
      while (base.prototype) {
        const baseDescriptors = Object.getOwnPropertyDescriptors(base.prototype)
        descriptors = {...baseDescriptors, ...descriptors}
        base = Object.getPrototypeOf(base)
      }
    }

    for (const [propName, descriptor] of Object.entries(descriptors)) {
      const isMethod = typeof descriptor.value == 'function' && propName != 'constructor'

      if (options.exclude?.includes(propName)) {
        continue
      }

      if (!isMethod) {
        continue
      }

      decorator(target, propName, descriptor)
      Object.defineProperty(target.prototype, propName, descriptor)
    }
  }
}
