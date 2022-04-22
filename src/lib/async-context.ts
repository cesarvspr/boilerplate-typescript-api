import {AsyncLocalStorage} from 'async_hooks'

const context = new AsyncLocalStorage() as any

export default context
