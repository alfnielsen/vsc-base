/**
 * export methods
 */
declare const vsc: {
    absolutePathToSubRalative: (path: string, absolutePathFromRoot: string, rootPath: string) => string;
    addLeadingLocalDash: (path: string) => string;
    camalcaseToKebabcase: (str: string) => string;
    cleanPath: (path: string) => string;
    getJsonParts: (json: {
        [name: string]: any;
    }, keyPath: string) => any;
    isAbsolutePath: (path: string, startWithRegExp?: RegExp) => boolean;
    isSubPath: (subPath: string, parentPath: string) => boolean;
    relatrivePath: (fromPath: string, toPath: string) => string;
    pathAsUnix: (path: string) => string;
    relatrivePathToAbsolutePath: (path: string, pathRelatriveToPath: string, rootPath: string) => string;
    sharedPath: (path1: string, path2: string) => string;
    sleep: (ms: number) => Promise<void>;
    splitPath: (path: string) => [string, string];
    subtractPath: (path: string, parentPath: string, trimDashes?: boolean) => string;
    toCamelcase: (str: string) => string;
    trimDashes: (path: string) => string;
    trimLeadingDash: (path: string) => string;
};
export default vsc;
