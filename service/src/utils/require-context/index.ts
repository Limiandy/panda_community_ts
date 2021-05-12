import dir from 'node-dir'
import path from 'path'

export interface Context {
  (key: string): any
  resolve(key): string
  keys(): Array<string>
}

function requireContext(
  directory: string,
  regExp?: RegExp
): Context {
  let basePath: string = directory

  if (directory[0] === '.') {
    basePath = path.join(__dirname, directory)
  } else if (!path.isAbsolute(directory)) {
    basePath = require.resolve(directory)
  }

  const keys: Array<string> = dir
    .files(basePath, { sync: true })
    .filter((file) => file.match(regExp || /\.(json|js|ts)$/))
    .map((file) => path.join('.', file.slice(basePath.length + 1)))

  const context = (key: string): any => require(context.resolve(key))

  context.resolve = (key: string): string => path.join(directory, key)

  context.keys = (): Array<string> => keys

  return context as Context
}

export default requireContext
