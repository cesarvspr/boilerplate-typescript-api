import {Model} from 'sequelize-typescript'

const metadataKey = Symbol('JsonIgnore')

// eslint-disable-next-line @typescript-eslint/ban-types
export function JsonIgnore(): (target: object, propertyKey: string) => void {
  return registerProperty
}

// eslint-disable-next-line @typescript-eslint/ban-types
function registerProperty(target: object, propertyKey: string): void {
  if (Reflect.getMetadata) {
    let properties: string[] = Reflect.getMetadata(metadataKey, target)

    if (properties) {
      properties.push(propertyKey)
    } else {
      properties = [propertyKey]
      Reflect.defineMetadata(metadataKey, properties, target)
    }
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
function getFilteredProperties(origin: object): object {
  const properties: string[] = Reflect.getMetadata(metadataKey, origin)
  const result: any = {}

  properties.forEach(key => (result[key] = origin[key]))

  return result
}

export default class BaseModel<T> extends Model<T> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  toJSON(): object {
    const ignoredFields = getFilteredProperties(this)

    const attributes = Object.assign({}, this.get())

    for (const a of Object.keys(ignoredFields)) {
      delete attributes[a]
    }

    return attributes
  }

  protected get protectedAttributes(): string[] {
    return []
  }
}
