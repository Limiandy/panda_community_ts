import combineRouters from 'koa-combine-routers'
import requireContext from '@/utils/require-context'
import path from 'path'

const modPath = path.resolve(__dirname, 'modules')
const moduleFiles = requireContext(modPath,  /\.ts$/)
const modules = moduleFiles.keys().reduce((items, path) => {
  const value = moduleFiles(path)
  items.push(value.default as never)
  return items
}, [])

export default combineRouters(modules)
