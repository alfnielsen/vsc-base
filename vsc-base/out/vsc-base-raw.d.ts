import * as vsc from './vsc-base';
/** vsc-base method
 * @description
 * Transform an absolute path from root, to a sub-relative path.
 * @see http://vsc-base.org/#getSubrelativePathFromAbsoluteRootPath
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
export declare const getSubrelativePathFromAbsoluteRootPath: (path: string, absolutePathFromRoot: string, rootPath: string) => string;
/** vsc-base method
 * @description
 * Add './' to start of path
 * @see http://vsc-base.org/#addLeadingLocalDash
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
export declare const addLeadingLocalDash: (path: string) => string;
/** vsc-base method
 * @description
 * Format a string from camel-case to kebab-case \
 * Commonly used to define css class names. \
 * Ex: 'SomeName' => 'some-name', 'Some_Other.name' => 'some-other-name'
 * @see http://vsc-base.org/#toKebabCase
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
export declare const toKebabCase: (str: string) => string;
/** vsc-base method
 * @description
 * Format a string from camel-case to snake-case \
 * Ex: 'SomeName' => 'some_name', 'Some_Other.name' => 'some_other_name'
 * @see http://vsc-base.org/#toSnakeCase
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
export declare const toSnakeCase: (str: string, upperCase?: boolean) => string;
/** vsc-base method
 * @description
 * Format a string to camal-case. \
 * Commonly used to define js/ts variable names. \
 * Ex: 'Some-Name' => 'someName', 'some_name' => 'someName', 'some.name' => 'someName' \
 * All non word seperators will be removed and the word charector after will be transforms to upper case.
 * @see http://vsc-base.org/#toCamelCase
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
export declare const toCamelCase: (str: string) => string;
/** vsc-base method
 * @description
 * Format a string to camal-case. Commonly used to define js/ts variable names. \
 * Ex: 'Some-Name' => 'SomeName', 'some_name' => 'SomeName', 'some.name' => 'SomeName' \
 * All non word seperators will be removed and the word charector after will be transforms to upper case
 * @see http://vsc-base.org/#toPascalCase
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
export declare const toPascalCase: (str: string) => string;
/** vsc-base method
 * @description
 * Get clean path. \
 * Ex: 'folder/../folder/file' => 'folder/file', 'folder/./file' => 'file'
 * @see http://vsc-base.org/#cleanPath
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
export declare const cleanPath: (path: string) => string;
/** vsc-base method
 * @description
 * Get part of a json object.
 * @see http://vsc-base.org/#getJsonParts
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
export declare const getJsonParts: <TStructure = any>(json: {
    [name: string]: unknown;
}, keyPath: string) => TStructure | undefined;
/** vsc-base method
 * @description
 * Does path start with charactor [a-zA-Z@] \
 * (not '/' or './' or '../')
 * @see http://vsc-base.org/#isAbsolutePath
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
export declare const isAbsolutePath: (path: string, startWithRegExp?: RegExp) => boolean;
/** vsc-base method
 * @description
 * Does subpath start with parentPath
 * @see http://vsc-base.org/#isSubPath
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
export declare const isSubPath: (subPath: string, parentPath: string) => boolean;
/** vsc-base method
 * @description
 * Joins to paths.
 * @see http://vsc-base.org/#joinPaths
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
export declare const joinPaths: (path1: string, path2: string) => string;
/** vsc-base method
 * @description
 * Reaplve all '\\'  with '/' \
 * (Convert all path this way to make them system safe - wotk both on unix/linux/mac and windows)
 * @see http://vsc-base.org/#pathAsUnix
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
export declare const pathAsUnix: (path: string) => string;
/** vsc-base method
 * @description
 * Generate relative path between two paths.
 * @see http://vsc-base.org/#getRelativePath
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
export declare const getRelativePath: (fromPath: string, toPath: string) => string;
/** vsc-base method
 * @description
 * Transform a relative path to an abspolute path.
 * @see http://vsc-base.org/#getAbsolutePathFromRelatrivePath
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
export declare const getAbsolutePathFromRelatrivePath: (path: string, pathRelatriveToPath: string, rootPath: string) => string;
/** vsc-base method
 * @description
 * Return the path that are shared. \
 * (Return '' if no path are shared).
 * @see http://vsc-base.org/#sharedPath
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
export declare const sharedPath: (path1: string, path2: string) => string;
/** vsc-base method
 * @description
 * await wrap for setTimeout. \
 * Mostly used for debug asyc.
 * @see http://vsc-base.org/#sleep
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
export declare const sleep: (ms: number) => Promise<void>;
/** vsc-base method
 * @description
 * Split filePath into dir and file
 * @see http://vsc-base.org/#splitPath
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
export declare const splitPath: (path: string) => [string, string];
/** vsc-base method
 * @description
 * Remove parent-path from a path
 * @see http://vsc-base.org/#subtractPath
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
export declare const subtractPath: (path: string, parentPath: string, trimDashes?: boolean) => string;
/** vsc-base method
 * @description
 * Remove '/' from start and end of path
 * @see http://vsc-base.org/#trimDashes
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
export declare const trimDashes: (path: string) => string;
/** vsc-base method
 * @description
 * Remove '/' from start of path
 * @see http://vsc-base.org/#trimLeadingDash
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
export declare const trimLeadingDash: (path: string) => string;
/** vsc-base method
 * @description
 * Test if it an error. \
 * Return type (if one of es6 basic error type) return stack
 * @see http://vsc-base.org/#getErrorInfo
 * @param e error
 * @vscType Raw
 * @oneLineEx const info = vsc.getErrorInfo(e)
 * @returns \{ isError: boolean; type: string; stack: string; message: string; \}
 */
export declare const getErrorInfo: (e: any) => {
    isError: boolean;
    type: string;
    stack: string;
    message: string;
};
/** vsc-base method
 * @description
 * return ISO timestamp
 * @see http://vsc-base.org/#getTimestamp
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
export declare const getTimestamp: () => string;
/** vsc-base method
 * @description
 * Provide a circular safe JSON.stringify replacer. \
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#Examples
 * @see http://vsc-base.org/#getJSONCircularReplacer
 * @vscType Raw
 * @debugTool Primary a debugging method.
 * @oneLineEx const objString = JSON.stringify(someObject, vsc.getJSONCircularReplacer(), 2);
 * @returns (_key: string, value: unknown) => unknown
 */
export declare const getJSONCircularReplacer: () => (_key: string, value: unknown) => unknown;
/** vsc-base method
 * @description
 * Stringify an object. \
 * Uses JSON.stringify and the circular ref safe replacer (see vsc.getJSONCircularReplacer)
 * @see http://vsc-base.org/#toJSONString
 * @param obj
 * @param replacer
 * @param space
 * @vscType Raw
 * @debugTool Primary a debugging method.
 * @oneLineEx const objString = vsc.toJSONString(someObject);
 * @returns string
 */
export declare const toJSONString: (obj: any, replacer?: (_key: string, value: unknown) => unknown, space?: number, maxDepth?: number) => string;
/** vsc-base method
 * @description
 * Clone an JSON Object (any type) with max depth. \
 * This method goes through the object structure and replace children that goes deeper then the max Depth
 * @see http://vsc-base.org/#maxDepthReplacer
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
export declare const maxDepthReplacer: (obj: unknown, maxDepth: number) => any;
/** vsc-base method
 * @description
 * Clone an JSON Object (any type) and reaplce all properties with the given name with a new value. \
 * This method goes through the object structure and replace children that has the given name/key
 * @see http://vsc-base.org/#keyValueReplacer
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
export declare const keyValueReplacer: (obj: unknown, key: string, newValue: any) => any;
/** vsc-base method
 * @description
 * Clone an JSON Object (any type) going trought is entire tree structure. \
 * This method goes through the object structure, and call the given callback on esh child (and granchild). \
 * The call back can replace each child or stop the iteration. \
 * See http://vsc-base.org/#maxDepthReplacer and http://vsc-base.org/#keyValueReplacer \
 * they both use the objectWalker.
 * @see http://vsc-base.org/#objectWalker
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
export declare const objectWalker: (obj: any, callback: vsc.ObjectWalkerCallback) => any;
interface ObjectWalkerCallbackState {
    /**
     * The currectn chil. (Any type)
     */
    obj: any;
    /**
     * The key for this child (a string if its in an object, a number if its in a list)
     */
    key: string | number;
    /**
     * The depth is how many step down an ansestor tree the iteration curently is in.
     */
    depth: number;
    /**
     * List with the ancestors (object or array)
     */
    ancestors: (object | Array<any>)[];
    /**
     * List with the ancestors keys (string for object, number for array item)
     */
    ancestorKeys: (string | number)[];
    /**
     * Replace the current child in parent object/array
     */
    replace: (val: any) => void;
    /**
     * Stop the recursive iteration in the walker. \
     * Everything stops after calling this method. \
     * The return object (which is copying itself from the original method), \
     * will only be fill with properties until the point of the stop call.
     */
    stop: () => void;
}
export declare type ObjectWalkerCallback = (state: ObjectWalkerCallbackState) => void;
export {};
