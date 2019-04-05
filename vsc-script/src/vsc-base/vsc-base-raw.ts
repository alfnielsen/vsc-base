/**
 * Transform an absolute path from root, to a sub-relative path.
 * @param path
 * @param rootPath
 * @param absolutePathFromRoot
 * @dependencyInternal splitPath, subtractPath, addLeadingLocalDash
 * @see http://vsc-base.org/#getSubrelativePathFromAbsoluteRootPath
 * @returns string
 * @test
 */
export const getSubrelativePathFromAbsoluteRootPath = (
   path: string,
   absolutePathFromRoot: string,
   rootPath: string
): string => {
   const [sourceDirPath] = splitPath(path)
   let sourceDirPathFromRoot = subtractPath(sourceDirPath, rootPath)
   sourceDirPathFromRoot = sourceDirPathFromRoot + '/'
   let absolutePathFromSourceDir = subtractPath(
      absolutePathFromRoot,
      sourceDirPathFromRoot
   )
   if (absolutePathFromSourceDir !== absolutePathFromRoot) {
      absolutePathFromSourceDir = addLeadingLocalDash(absolutePathFromSourceDir)
   }
   return absolutePathFromSourceDir
}

/**
 * Add './' to start of path
 * @param path
 * @see http://vsc-base.org/#addLeadingLocalDash
 * @returns string
 */
export const addLeadingLocalDash = (path: string): string => {
   return './' + path
}

/**
 * Format a string from camel-case to kebab-case. Commonly used to define css class names. (SomeName => some-name)
 * @param str
 * @see http://vsc-base.org/#camalcaseToKebabcase
 * @returns string
 */
export const camalcaseToKebabcase = (str: string): string =>
   str[0].toLowerCase() +
   str.substr(1).replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`)

/**
 * Get clean path. folder/../folder/file => folder/file, folder/./file => file
 * @param path
 * @see http://vsc-base.org/#cleanPath
 * @returns string
 */
export const cleanPath = (path: string): string => {
   path = path.replace(/\/.\//g, '/')
   const reg = /\/\w+\/\.\.\//
   while (reg.test(path)) {
      path = path.replace(reg, '/')
   }
   return path
}

/**
 * Get part of a json object.
 * @param json
 * @param keyPath Ex sub.sub.name >> {sub:{sub:{name:'Foo'}}} >> Foo
 * @see http://vsc-base.org/#getJsonParts
 * @returns any
 */
export const getJsonParts = (
   json: { [name: string]: any },
   keyPath: string
): any => {
   let current: any = json
   const keySplit = keyPath.split(/\./)
   for (let i = 0; i < keySplit.length; i++) {
      const key = keySplit[i]
      if (current[key] === undefined) {
         return undefined
      }
      current = current[key]
   }
   return current
}

/**
 * Does path start with charactor [a-zA-Z@] (not '/' or './' or '../')
 * @param path
 * @param startWithRegExp? If your project defines another definition of absolute path then overwrite this.
 * @see http://vsc-base.org/#isAbsolutePath
 * @returns boolean
 */
export const isAbsolutePath = (
   path: string,
   startWithRegExp = /^[a-zA-Z@]/
): boolean => {
   return startWithRegExp.test(path)
}

/**
 * Does subpath start with parentPath
 * @param path
 * @param parentPath
 * @dependencyInternal trimDashes
 * @see http://vsc-base.org/#isSubPath
 * @returns boolean
 */
export const isSubPath = (subPath: string, parentPath: string): boolean => {
   parentPath = trimDashes(parentPath)
   const result = subPath.indexOf(parentPath + '/') === 0
   return result
}

/**
 * Joins to paths.
 * @param path1
 * @param path2
 * @dependencyInternal trimDashes
 * @see http://vsc-base.org/#joinPaths
 * @returns string
 */
export const joinPaths = (path1: string, path2: string): string => {
   path1 = trimDashes(path1)
   path2 = trimDashes(path2)
   const result = path1 + '/' + path2
   return result
}

/**
 * Reaplve all '\\'  with '/'
 * @param path
 * @see http://vsc-base.org/#pathAsUnix
 * @returns string
 */
export const pathAsUnix = (path: string): string => {
   return path.replace(/\\/g, '/')
}

/**
 * Generate relative path between two paths.
 * @param fromPath
 * @param toPath
 * @testPrinterArgument 
 { 
    fromPath: 'c:/somefolder/sub1/sub2/someFile.js',
    toPath: 'c:/somefolder/other/someFile.js'
 }
 * @testPrinter
( 
   args = getRelativePath.testArguments, 
   printResult: (str: string) => void
) => {
   const relativePath = getRelativePath(args.fromPath, args.toPath)
   printResult(relativePath)
}
 * @dependencyInternal sharedPath, splitPath, subtractPath
 * @see http://vsc-base.org/#relatrivePath
 * @returns string
 */
export const getRelativePath = (fromPath: string, toPath: string): string => {
   const _sharedPath = sharedPath(fromPath, toPath)
   const [fromDir] = splitPath(fromPath)
   const [toDir] = splitPath(toPath)
   const fromPathDownToShared = subtractPath(fromDir, _sharedPath)
   let toPathDownToShared = subtractPath(toDir, _sharedPath)
   const backPath = fromPathDownToShared
      .split(/\//)
      .map(_ => '../')
      .join('')
   const relativePath = backPath + toPathDownToShared
   return relativePath
}

/**
 * Transform a relative path to an abspolute path.
 * @param path File from where the relative path begins
 * @param pathRelatriveToPath The relative path
 * @param rootPath The root path
 * @param realPathTest Test if the real  The root path
 * @dependencyInternal isAbsolutePath, splitPath, cleanPath, subtractPath, trimLeadingDash
 * @see http://vsc-base.org/#relatrivePathToAbsolutePath
 * @returns string
 */
export const relatrivePathToAbsolutePath = (
   path: string,
   pathRelatriveToPath: string,
   rootPath: string
): string => {
   if (isAbsolutePath(pathRelatriveToPath)) {
      return pathRelatriveToPath
   }
   let [dir] = splitPath(path)
   dir += '/'
   const relativePath = dir + pathRelatriveToPath
   let cleanRelativePath = cleanPath(relativePath)
   let absolutePathToRelative = subtractPath(cleanRelativePath, rootPath)
   absolutePathToRelative = trimLeadingDash(absolutePathToRelative)
   return absolutePathToRelative
}

/**
 * Return the path that are shared. (Return '' if no path are shared).
 * @param path1
 * @param path2
 * @see http://vsc-base.org/#sharedPath
 * @returns string
 */
export const sharedPath = (path1: string, path2: string): string => {
   const path1Parts = path1.split(/\//)
   const path2Parts = path2.split(/\//)
   const shared = []
   for (let i = 0; i < path1Parts.length; i++) {
      if (!path2Parts[i] || path1Parts[i] !== path2Parts[i]) {
         break
      }
      shared.push(path1Parts[i])
   }
   const finalShared = shared.join('/')
   return finalShared
}

/**
 * await wrap for setTimeout. Mostly used for debug asyc.
 * @param ms
 * @see http://vsc-base.org/#sleep
 * @async
 * @returns any
 */
export const sleep = async (ms: number): Promise<void> => {
   return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Split path into dir and file
 * @param path
 * @dependencyInternal pathAsUnix
 * @see http://vsc-base.org/#splitPath
 * @returns [dir, name]
 */
export const splitPath = (path: string): [string, string] => {
   path = pathAsUnix(path)
   const splits = path.split('/')
   const name = splits.pop() || ''
   const dir = splits.join('/')
   return [dir, name]
}

/**
 * Remove parent-path from a path
 * @param path
 * @param parentPath
 * @param trimDashes default true
 * @dependencyInternal trimDashes
 * @see http://vsc-base.org/#subtractPath
 * @returns string
 */
export const subtractPath = (
   path: string,
   parentPath: string,
   _trimDashes = true
): string => {
   const regexp = new RegExp(`^${parentPath}`)
   let newPath = path.replace(regexp, '')
   if (trimDashes) {
      newPath = trimDashes(newPath)
   }
   return newPath
}

/**
 * Format a string to camal-case. Commonly used to define js/ts variable names.
 * (Some-Name => someName, some_name => someName, some.name => someName )
 * All non word seperators will be removed and the word charector after will be transforms to upper case
 * @param str
 * @see http://vsc-base.org/#toCamelcase
 * @returns string
 */
export const toCamelcase = (str: string): string =>
   str[0].toLowerCase() +
   str.substr(1).replace(/[^a-zA-Z]+(.)/g, (_match, chr) => chr.toUpperCase())

/**
 * Remove '/' from start and end of path
 * @param path
 * @see http://vsc-base.org/#trimDashes
 * @returns string
 */
export const trimDashes = (path: string): string => {
   return path.replace(/(^\/|\/$)/g, '')
}

/**
 * Remove '/' from start of path
 * @param path
 * @see http://vsc-base.org/#trimLeadingDash
 * @returns string
 */
export const trimLeadingDash = (path: string): string => {
   return path.replace(/^\//, '')
}
