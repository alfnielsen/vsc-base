import * as vsc from './vsc-base'

/** vsc-base method
 * @description 
 * Transform an absolute path from root, to a sub-relative path.
 * @see [getSubrelativePathFromAbsoluteRootPath](http://vsc-base.org/#getSubrelativePathFromAbsoluteRootPath)
 * @param path
 * @param rootPath
 * @param absolutePathFromRoot
 * @vscType Raw
 * @dependencyInternal splitPath, subtractPath, addLeadingLocalDash
 * @oneLineEx const subrelativePath = vsc.getSubrelativePathFromAbsoluteRootPath(path, absolutePathFromRoot, rootPath)
 * @testPrinterArgument
{
   path: 'c:/root/module/file.ts',
   absolutePathFromRoot: 'module/submodule/file2',
   rootPath: 'c:/root'
}
 * @testPrinter (args, setResult) => {
   const res = vsc.getSubrelativePathFromAbsoluteRootPath(args.path, args.absolutePathFromRoot, args.rootPath)
   setResult(res)
}
 * @returns string
 */
export const getSubrelativePathFromAbsoluteRootPath = (
   path: string,
   absolutePathFromRoot: string,
   rootPath: string
): string => {
   const [sourceDirPath] = vsc.splitPath(path)
   let sourceDirPathFromRoot = vsc.subtractPath(sourceDirPath, rootPath)
   sourceDirPathFromRoot = sourceDirPathFromRoot + '/'
   let absolutePathFromSourceDir = vsc.subtractPath(
      absolutePathFromRoot,
      sourceDirPathFromRoot
   )
   if (absolutePathFromSourceDir !== absolutePathFromRoot) {
      absolutePathFromSourceDir = vsc.addLeadingLocalDash(absolutePathFromSourceDir)
   }
   return absolutePathFromSourceDir
}

/** vsc-base method
 * @description 
 * Add './' to start of path
 * @see [addLeadingLocalDash](http://vsc-base.org/#addLeadingLocalDash)
 * @param path
 * @vscType Raw
 * @oneLineEx const path = vsc.addLeadingLocalDash(path)
 * @testPrinterArgument
{
   path: 'file.ts',
}
 * @testPrinter (args, setResult) => {
   const res = vsc.addLeadingLocalDash(args.path)
   setResult(res)
}
 * @returns string
 */
export const addLeadingLocalDash = (path: string): string => {
   return './' + path
}



/** vsc-base method
 * @description 
 * Format a string from camel-case to kebab-case \
 * Commonly used to define css class names. \
 * Ex: 'SomeName' => 'some-name', 'Some_Other.name' => 'some-other-name'
 * @see [toKebabCase](http://vsc-base.org/#toKebabCase)
 * @param str
 * @vscType Raw
 * @testPrinterArgument 
{
   str: 'SomeName'
}
 * @testPrinter (args, printResult) => {
   const result = vsc.toKebabCase(args.str)
   printResult(result)
 }
 * @oneLineEx const cssName = vsc.toKebabCase(inputName)
 * @returns string
 */
export const toKebabCase = (str: string): string =>
   str[0].toLowerCase() +
   str.substr(1)
      .replace(/([A-Z])/g, (_match, chr) => `-${chr.toLowerCase()}`)
      .replace(/[^a-zA-Z]+(.)/g, (_match, chr) => `-${chr.toLowerCase()}`)

/** vsc-base method
 * @description 
 * Format a string from camel-case to snake-case \
 * Ex: 'SomeName' => 'some_name', 'Some_Other.name' => 'some_other_name'
 * @see [toSnakeCase](http://vsc-base.org/#toSnakeCase)
 * @param str
 * @param uppercase
 * @vscType Raw
 * @testPrinterArgument 
{
   str: 'SomeName',
   upperCase: 'false'
}
 * @testPrinter (args, printResult) => {
   const result = vsc.toSnakeCase(args.str, args.upperCase!=='false')
   printResult(result)
 }
 * @oneLineEx const cssName = vsc.toSnakeCase(inputName)
 * @returns string
 */
export const toSnakeCase = (str: string, upperCase = false): string => {
   str = str[0].toLowerCase() +
      str.substr(1)
         .replace(/([A-Z])/g, (_match, chr) => `_${chr.toLowerCase()}`)
         .replace(/[^a-zA-Z]+(.)/g, (_match, chr) => `_${chr.toLowerCase()}`)
   if (upperCase) {
      str = str.toUpperCase()
   }
   return str
}


/** vsc-base method
 * @description 
 * Format a string to camal-case. \
 * Commonly used to define js/ts variable names. \
 * Ex: 'Some-Name' => 'someName', 'some_name' => 'someName', 'some.name' => 'someName' \
 * All non word seperators will be removed and the word charector after will be transforms to upper case.
 * @see [toCamelCase](http://vsc-base.org/#toCamelCase)
 * @param str
 * @vscType Raw
 * @testPrinterArgument 
{
   str: 'Some-name'
}
 * @testPrinter (args, printResult) => {
   const result = vsc.toCamelCase(args.str)
   printResult(result)
}
 * @oneLineEx const name = vsc.toCamelCase(inputName)
 * @returns string
 */
export const toCamelCase = (str: string): string =>
   str[0].toLowerCase() +
   str.substr(1)
      .replace(/[^a-zA-Z]+(.)/g, (_match, chr) => chr.toUpperCase())

/** vsc-base method
 * @description 
 * Format a string to camal-case. Commonly used to define js/ts variable names. \
 * Ex: 'Some-Name' => 'SomeName', 'some_name' => 'SomeName', 'some.name' => 'SomeName' \
 * All non word seperators will be removed and the word charector after will be transforms to upper case
 * @see [toPascalCase](http://vsc-base.org/#toPascalCase)
 * @param str
 * @vscType Raw
 * @testPrinterArgument 
{
   str: 'some-name'
}
 * @testPrinter (args, printResult) => {
   const result = vsc.toPascalCase(args.str)
   printResult(result)
}
 * @oneLineEx const name = vsc.toPascalCase(inputName)
 * @returns string
 */
export const toPascalCase = (str: string): string =>
   str[0].toUpperCase() +
   str.substr(1).replace(/[^a-zA-Z]+(.)/g, (_match, chr) => chr.toUpperCase())


/** vsc-base method
 * @description 
 * Get clean path. \
 * Ex: 'folder/../folder/file' => 'folder/file', 'folder/./file' => 'file'
 * @see [cleanPath](http://vsc-base.org/#cleanPath)
 * @param path
 * @vscType Raw
 * @testPrinterArgument 
{
   path: 'folder/../folder/file'
}
 * @testPrinter (args, printResult) => {
   const result = vsc.cleanPath(args.path)
   printResult(result)
}
 * @oneLineEx const newPath = vsc.cleanPath(concatenatedPath)
 * @returns string
 */
export const cleanPath = (path: string): string => {
   path = path.replace(/\/.\//g, '/')
   const reg = /\b\w+\/\.\.\//
   while (reg.test(path)) {
      path = path.replace(reg, '')
   }
   return path
}

/** vsc-base method
 * @description 
 * Get part of a json object.
 * @see [getJsonParts](http://vsc-base.org/#getJsonParts)
 * @param json
 * @param keyPath Ex sub.sub.name >> {sub:{sub:{name:'Foo'}}} >> Foo
 * @vscType Raw
 * @oneLineEx const startScript = vsc.getJsonParts(packageJson, 'scripts.start')
 * @testPrinterArgument
{
   json: '{ "a": { "t": true, "o": { "n": 12 }, "b": "b"  }}',
   keyPath: 'a.o.n',
}
 * @testPrinter (args, setResult) => {
    try{
       const json = JSON.parse(args.json)
       const res = vsc.getJsonParts(json, args.keyPath)
       const resString = JSON.stringify(res)
       setResult(resString)
    }catch(e){
       setResult(''+e)
    }
}
 * @returns any
 */
export const getJsonParts = <TStructure = any>(
   json: { [name: string]: unknown },
   keyPath: string
): TStructure | undefined => {
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

/** vsc-base method
 * @description 
 * Does path start with charactor [a-zA-Z@] \
 * (not '/' or './' or '../')
 * @see [isAbsolutePath](http://vsc-base.org/#isAbsolutePath)
 * @param path
 * @param startWithRegExp? If your project defines another definition of absolute path then overwrite this.
 * @vscType Raw
 * @oneLineEx const isAbsolutePath = vsc.isAbsolutePath(path)
 * @testPrinterArgument
{
   path: 'some/path/to/file.ts'
}
 * @testPrinter (args, setResult) => {
   const res = vsc.isAbsolutePath(args.path)
   setResult(res?'true':'false')
}
 * @returns boolean
 */
export const isAbsolutePath = (
   path: string,
   startWithRegExp = /^[a-zA-Z@]/
): boolean => {
   return startWithRegExp.test(path)
}

/** vsc-base method
 * @description 
 * Does subpath start with parentPath
 * @see [isSubPath](http://vsc-base.org/#isSubPath)
 * @param path
 * @param parentPath
 * @dependencyInternal trimDashes
 * @vscType Raw
 * @oneLineEx const isSubPath = vsc.isSubPath(path)
 * @testPrinterArgument
{
   subPath: 'c:/root/area/module1/file.ts',
   parentPath: 'c:/root/area'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.isSubPath(args.subPath, args.parentPath)
   setResult(res?'true':'false')
}
 * @returns boolean
 */
export const isSubPath = (subPath: string, parentPath: string): boolean => {
   parentPath = vsc.trimDashes(parentPath)
   const result = subPath.indexOf(parentPath + '/') === 0
   return result
}

/** vsc-base method
 * @description 
 * Joins to paths.
 * @see [joinPaths](http://vsc-base.org/#joinPaths)
 * @param path1
 * @param path2
 * @dependencyInternal trimDashes
 * @vscType Raw
 * @oneLineEx const newPath = vsc.joinPaths(path1, path2)
 * @testPrinterArgument
{
   path1: 'root/area/',
   path2: '/module2/file.ts'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.joinPaths(args.path1, args.path2)
     setResult(res)
}
 * @returns string
 */
export const joinPaths = (path1: string, path2: string): string => {
   path1 = vsc.trimDashes(path1)
   path2 = vsc.trimDashes(path2)
   const result = path1 + '/' + path2
   return result
}

/** vsc-base method
 * @description 
 * Reaplve all '\\'  with '/' \
 * (Convert all path this way to make them system safe - wotk both on unix/linux/mac and windows)
 * @see [pathAsUnix](http://vsc-base.org/#pathAsUnix)
 * @param path
 * @vscType Raw
 * @oneLineEx const safePath = vsc.pathAsUnix(path)
 * @testPrinterArgument
{
   path: 'root\area\module1\file.ts'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.pathAsUnix(args.path)
     setResult(res)
}
 * @returns string
 */
export const pathAsUnix = (path: string): string => {
   return path.replace(/\\/g, '/')
}

/** vsc-base method
 * @description 
 * Generate relative path between two paths.
 * @see [getRelativePath](http://vsc-base.org/#getRelativePath)
 * @param fromPath
 * @param toPath
 * @vscType Raw
 * @oneLineEx const relativePath = vsc.getRelativePath(fromPath, toPath)
 * @testPrinterArgument
 { 
    fromPath: 'c:/somefolder/sub1/sub2/someFile.js',
    toPath: 'c:/somefolder/other/someFile.js'
 }
 * @testPrinter (args, printResult) => {
   const relativePath = vsc.getRelativePath(args.fromPath, args.toPath)
   printResult(relativePath)
}
 * @dependencyInternal sharedPath, splitPath, subtractPath
 * @returns string
 */
export const getRelativePath = (fromPath: string, toPath: string): string => {
   const _sharedPath = vsc.sharedPath(fromPath, toPath)
   const [fromDir] = vsc.splitPath(fromPath)
   const [toDir] = vsc.splitPath(toPath)
   const fromPathDownToShared = vsc.subtractPath(fromDir, _sharedPath)
   let toPathDownToShared = vsc.subtractPath(toDir, _sharedPath)
   const backPath = fromPathDownToShared
      .split(/\//)
      .map(_ => '../')
      .join('')
   const relativePath = backPath + toPathDownToShared
   return relativePath
}


/** vsc-base method
 * @description 
 * Transform a relative path to an abspolute path.
 * @see [getAbsolutePathFromRelatrivePath](http://vsc-base.org/#getAbsolutePathFromRelatrivePath)
 * @param path File from where the relative path begins
 * @param pathRelatriveToPath The relative path
 * @param rootPath The root path
 * @param realPathTest Test if the real  The root path
 * @vscType Raw
 * @dependencyInternal isAbsolutePath, splitPath, cleanPath, subtractPath, trimLeadingDash
 * @oneLineEx const absolutePath = vsc.getAbsolutePathFromRelatrivePath(path, pathRelatriveToPath, rootPath)
 * @testPrinterArgument
{
   path: 'c:/root/area/module1/file.ts',
   pathRelatriveToPath: '../module2/file2.ts',
   rootPath: 'c:/root'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.getAbsolutePathFromRelatrivePath(args.path, args.pathRelatriveToPath, args.rootPath)
     setResult(res)
}
 * @returns string
 */
export const getAbsolutePathFromRelatrivePath = (
   path: string,
   pathRelatriveToPath: string,
   rootPath: string
): string => {
   if (vsc.isAbsolutePath(pathRelatriveToPath)) {
      return pathRelatriveToPath
   }
   let [dir] = vsc.splitPath(path)
   dir += '/'
   const relativePath = dir + pathRelatriveToPath
   let cleanRelativePath = vsc.cleanPath(relativePath)
   let absolutePathToRelative = vsc.subtractPath(cleanRelativePath, rootPath)
   absolutePathToRelative = vsc.trimLeadingDash(absolutePathToRelative)
   return absolutePathToRelative
}

/** vsc-base method
 * @description 
 * Return the path that are shared. \
 * (Return '' if no path are shared).
 * @see [sharedPath](http://vsc-base.org/#sharedPath)
 * @param path1
 * @param path2
 * @vscType Raw
 * @oneLineEx const sharedPath = vsc.sharedPath(path1, path2)
 * @testPrinterArgument
{
   path1: 'root/area/module1/file1.ts',
   path2: 'root/area/module2/file2.ts'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.sharedPath(args.path1, args.path2)
     setResult(res)
}
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
   const sharedPath = shared.join('/')
   return sharedPath
}

/** vsc-base method
 * @description 
 * await wrap for setTimeout. \
 * Mostly used for debug asyc.
 * @see [sleep](http://vsc-base.org/#sleep)
 * @param ms
 * @oneLineEx await vsc.sleep(2000)
 * @vscType Raw
 * @async
 * @testPrinterArgument
{
   ms: '2000'
}
 * @testPrinter (args, setResult) => {
    setResult('Start sleep...'+args.ms)
    const ms = parseInt(args.ms)
    vsc.sleep(ms).then(()=>{
      setResult('Done sleeping')
    })
}
 * @returns Promise<void>
 */
export const sleep = async (ms: number): Promise<void> => {
   return new Promise(resolve => setTimeout(resolve, ms))
}

/** vsc-base method
 * @description 
 * Split filePath into dir and file
 * @see [splitPath](http://vsc-base.org/#splitPath)
 * @param path
 * @dependencyInternal pathAsUnix
 * @vscType Raw
 * @oneLineEx const [dir, file] = vsc.splitPath(filePath)
 * @testPrinterArgument
{
   path: 'root/area/module/file1.ts'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.splitPath(args.path)
     setResult(JSON.stringify(res))
}
 * @returns [string, string]
 */
export const splitPath = (path: string): [string, string] => {
   path = vsc.pathAsUnix(path)
   const splits = path.split('/')
   const name = splits.pop() || ''
   const dir = splits.join('/')
   return [dir, name]
}

/** vsc-base method
 * @description 
 * Remove parent-path from a path
 * @see [subtractPath](http://vsc-base.org/#subtractPath)
 * @param path
 * @param parentPath
 * @param trimDashes default true
 * @dependencyInternal trimDashes
 * @vscType Raw
 * @oneLineEx const newPath = vsc.subtractPath(path, parentPath)
 * @testPrinterArgument
{
   path: 'root/area/module/file1.ts',
   parentPath: 'root/area',
   trimDashes: 'true'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.subtractPath(args.path, args.parentPath, args.trimDashes==='true')
     setResult(res)
}
 * @returns string
 */
export const subtractPath = (
   path: string,
   parentPath: string,
   trimDashes = true
): string => {
   const regexp = new RegExp(`^${parentPath}`)
   let newPath = path.replace(regexp, '')
   if (trimDashes) {
      newPath = vsc.trimDashes(newPath)
   }
   return newPath
}

/** vsc-base method
 * @description 
 * Remove '/' from start and end of path
 * @see [trimDashes](http://vsc-base.org/#trimDashes)
 * @param path
 * @vscType Raw
 * @oneLineEx const path = vsc.trimDashes(foundPath)
 * @testPrinterArgument
{
   path: '/root/area/module/'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.trimDashes(args.path)
     setResult(res)
}
 * @returns string
 */
export const trimDashes = (path: string): string => {
   return path.replace(/(^\/|\/$)/g, '')
}

/** vsc-base method
 * @description 
 * Remove '/' from start of path
 * @see [trimLeadingDash](http://vsc-base.org/#trimLeadingDash)
 * @param path
 * @vscType Raw
 * @oneLineEx const path = vsc.trimLeadingDash(foundPath)
 * @testPrinterArgument
{
   path: '/root/area/module1/file1.ts'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.trimLeadingDash(args.path)
     setResult(res)
}
 * @returns string
 */
export const trimLeadingDash = (path: string): string => {
   return path.replace(/^\//, '')
}
/** vsc-base method
 * @description 
 * Test if it an error. \
 * Return type (if one of es6 basic error type) return stack
 * @see [getErrorInfo](http://vsc-base.org/#getErrorInfo)
 * @param e error
 * @vscType Raw
 * @oneLineEx const info = vsc.getErrorInfo(e)
 * @returns \{ isError: boolean; type: string; stack: string; message: string; \}
 */
export const getErrorInfo = (e: any): {
   isError: boolean;
   type: string;
   stack: string;
   message: string;
} => {
   let info = { isError: false, type: '', stack: '', message: '' }
   if (e instanceof Error) {
      info.isError = true
      info.stack = e.stack || ''
      info.message = e.message
   } else if (typeof e === 'string') {
      info.message = e
   }
   if (e instanceof EvalError) {
      info.type = "EvalError"
   }
   if (e instanceof RangeError) {
      info.type = "RangeError"
   }
   if (e instanceof ReferenceError) {
      info.type = "ReferenceError"
   }
   if (e instanceof SyntaxError) {
      info.type = "SyntaxError"
   }
   if (e instanceof TypeError) {
      info.type = "TypeError"
   }
   if (e instanceof URIError) {
      info.type = "URIError"
   }
   return info
}

/** vsc-base method
 * @description 
 * return ISO timestamp
 * @see [getTimestamp](http://vsc-base.org/#getTimestamp)
 * @vscType Raw
 * @oneLineEx const timestamp = vsc.getTimestamp()
 * @testPrinterArgument
{
   trigger: 'write any!'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.getTimestamp()
     setResult(res)
}
 * @returns string
 */
export const getTimestamp = (): string => {
   return new Date().toISOString()
}

/** vsc-base method
 * @description 
 * Provide a circular safe JSON.stringify replacer. \
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#Examples
 * @see [getJSONCircularReplacer](http://vsc-base.org/#getJSONCircularReplacer)
 * @vscType Raw
 * @debugTool Primary a debugging method.
 * @oneLineEx const objString = JSON.stringify(someObject, vsc.getJSONCircularReplacer(), 2);
 * @returns (_key: string, value: unknown) => unknown
 */
export const getJSONCircularReplacer = (): (_key: string, value: unknown) => unknown => {
   const seen = new WeakSet();
   return (_key: string, value: unknown) => {
      if (typeof value === "object" && value !== null) {
         if (seen.has(value)) {
            return '[vsc: circular reference]'; // Write out that this is a Circular Reference.
         }
         seen.add(value);
      }
      return value;
   }
}

/** vsc-base method
 * @description 
 * Stringify an object. \
 * Uses JSON.stringify and the circular ref safe replacer (see vsc.getJSONCircularReplacer)
 * @see [toJSONString](http://vsc-base.org/#toJSONString)
 * @param obj 
 * @param replacer 
 * @param space 
 * @vscType Raw
 * @debugTool Primary a debugging method.
 * @oneLineEx const objString = vsc.toJSONString(someObject);
 * @returns string
 */
export const toJSONString = (obj: any, replacer = vsc.getJSONCircularReplacer(), space = 2, maxDepth: number = -1): string => {
   if (maxDepth >= 0) {
      let maxDepthObj = vsc.maxDepthReplacer(obj, maxDepth);
      return JSON.stringify(maxDepthObj, replacer, space)
   }
   return JSON.stringify(obj, replacer, space)
}


/** vsc-base method
 * @description 
 * Clone an JSON Object (any type) with max depth. \
 * This method goes through the object structure and replace children that goes deeper then the max Depth
 * @see [maxDepthReplacer](http://vsc-base.org/#maxDepthReplacer)
 * @param obj 
 * @param maxDepth 
 * @param currentLevel 
 * @debugTool Primary a debugging method.
 * @vscType Raw
 * @oneLineEx const newObj = vsc.maxDepthReplacer(obj, 3);
 * @testPrinterArgument
{
   obj: '{"a":{"b":{"c":{"d":12}}}}',
   maxDepth: '2'
}
 * @testPrinter (args, setResult) => {
    try{
       const json = JSON.parse(args.obj)
       const maxDepth = parseInt(args.maxDepth)
       const res = vsc.maxDepthReplacer(json, maxDepth)
       const resString = JSON.stringify(res)
       setResult(resString)
    }catch(e){
       setResult(''+e)
    }
}
 * @returns string
 */
export const maxDepthReplacer = (obj: unknown, maxDepth: number): any => {
   const walkedObj = vsc.objectWalker(obj, (state) => {
      if (state.depth >= maxDepth) {
         state.replace(
            Array.isArray(state.ancestors[0])
               ? `[vsc: maxDepth ${maxDepth} reached - Array]`
               : `[vsc: maxDepth ${maxDepth} reached - Object]`
         )
      }
   })
   return walkedObj
}

/** vsc-base method
 * @description 
 * Clone an JSON Object (any type) and reaplce all properties with the given name with a new value. \
 * This method goes through the object structure and replace children that has the given name/key
 * @see [keyValueReplacer](http://vsc-base.org/#keyValueReplacer)
 * @param obj 
 * @param maxDepth 
 * @param currentLevel 
 * @debugTool Primary a debugging method.
 * @vscType Raw
 * @oneLineEx const newObj = vsc.keyValueReplacer(obj, key, newValue);
 * @testPrinterArgument
{
   obj: '{"a":{"b":{"c":{"d":12}}}}',
   key: 'c',
   value: 'foo'
}
 * @testPrinter (args, setResult) => {
    try{
       const json = JSON.parse(args.obj)
       const res = vsc.keyValueReplacer(json, args.key, args.value)
       const resString = JSON.stringify(res)
       setResult(resString)
    }catch(e){
       setResult(''+e)
    }
}
 * @returns string
 */
export const keyValueReplacer = (obj: unknown, key: string, newValue: any): any => {
   const walkedObj = vsc.objectWalker(obj, (state) => {
      if (state.key === key) {
         state.replace(newValue)
      }
   })
   return walkedObj
}


/** vsc-base method
 * @description 
 * Clone an JSON Object (any type) going trought is entire tree structure. \
 * This method goes through the object structure, and call the given callback on esh child (and granchild). \
 * The call back can replace each child or stop the iteration. \
 * See [maxDepthReplacer](http://vsc-base.org/#maxDepthReplacer) and [keyValueReplacer](http://vsc-base.org/#keyValueReplacer) \
 * they both use the objectWalker.
 * @see [objectWalker](http://vsc-base.org/#objectWalker)
 * @param obj 
 * @param maxDepth 
 * @param currentLevel 
 * @debugTool Primary a debugging method.
 * @vscType Raw
 * @oneLineEx const newObj = vsc.objectWalker(obj, walkerCallback);
 * @testPrinterArgument
{
   obj: '{"a":{"b1":{"c1":12},"b2":{ "c2":{"c3":9}}}}'
}
 * @testPrinter (args, setResult) => {
    try{
       const json = JSON.parse(args.obj)
      let longestAncestorList = 0;
      let ancestorKeysString: (string|number)[] = [];
      vsc.objectWalker(json,(state)=>{
         if(longestAncestorList<state.depth){
            longestAncestorList = state.depth
            ancestorKeysString = [state.key, ...state.ancestorKeys]
         }
      })
       setResult(<>{ancestorKeysString.join('.')}<br/>{'reverse:'}<br/>{ancestorKeysString.reverse().join('.')}</>)
    }catch(e){
       setResult(''+e)
    }
}
 * @ex
// try this walker out in the tester
const json = {"a":{"b1":{"c1":12},"b2":{ "c2":{"c3":9}}}}
let longestAncestorList = 0;
let ancestorKeysString: (string|number)[] = [];
vsc.objectWalker(json,(state)=>{
   if(longestAncestorList<state.depth){
      longestAncestorList = state.depth
      ancestorKeysString = [state.key, ...state.ancestorKeys]
   }
})

// log: ancestorKeysList.join('.') + '\nreverse:\n' + ancestorKeysString.reverse().join('.');
 * @returns string
 */
export const objectWalker = (obj: any, callback: ObjectWalkerCallback): any => {
   let stopFlag = false
   const stop = () => {
      stopFlag = true;
   }
   const objectWalkerRecursive = (obj: any, key: string | number, depth: number, ancestors: any[], ancestorKeys: (string | number)[]): any => {
      if (stopFlag) { return obj }
      let doReplace = false, replaceValue: any
      const callbackState = {
         obj,
         key,
         replace: (val: any) => {
            replaceValue = val
            doReplace = true
         },
         stop,
         depth,
         ancestors,
         ancestorKeys
      }
      callback(callbackState)
      if (doReplace) {
         return replaceValue
      }
      if (stopFlag) { return obj }
      if (Array.isArray(obj)) {
         obj.map((child, index) => {
            const nextAncestorsList = [obj, ...ancestors]
            const nextAncestorKeyList = [...ancestorKeys]
            if (depth !== 0) {
               nextAncestorKeyList.unshift(key)
            }
            const restult = objectWalkerRecursive(child, index, depth + 1, nextAncestorsList, nextAncestorKeyList)
            return restult
         })
      }
      if (typeof obj === "object" && obj !== null) {
         for (const [currentKey, child] of Object.entries(obj)) {
            const nextAncestorsList = [obj, ...ancestors]
            const nextAncestorKeyList = [...ancestorKeys]
            if (depth !== 0) {
               nextAncestorKeyList.unshift(key)
            }
            const restult = objectWalkerRecursive(child, currentKey, depth + 1, nextAncestorsList, nextAncestorKeyList)
            obj[currentKey] = restult
         }
      }
      return obj
   }
   objectWalkerRecursive(obj, '', 0, [], [])
   return obj
}

interface ObjectWalkerCallbackState {
   /**
    * The current child. (Any type)
    */
   obj: any,
   /**
    * The key for this child (a string if its in an object, a number if its in a list)
    */
   key: string | number,
   /**
    * The depth is how many step down an ancestor tree the iteration currently is in.
    */
   depth: number,
   /**
    * List with the ancestors (object or array)
    */
   ancestors: (object | Array<any>)[],
   /**
    * List with the ancestors keys (string for object, number for array item)
    */
   ancestorKeys: (string | number)[]
   /**
    * Replace the current child in parent object/array
    */
   replace: (val: any) => void,
   /**
    * Stop the recursive iteration in the walker. \ 
    * Everything stops after calling this method. \
    * The return object (which is copying itself from the original method), \
    * will only be fill with properties until the point of the stop call.
    */
   stop: () => void,
}
export type ObjectWalkerCallback = (state: ObjectWalkerCallbackState) => void