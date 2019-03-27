/// <reference types="vscode" />
declare const _default: {
    ask: (question: string, defaultValue: string) => Promise<string | undefined>;
    doesExists: (path: string) => boolean;
    findFilePaths: (include: import("vscode").GlobPattern, exclude?: import("vscode").GlobPattern, maxResults?: number) => Promise<string[]>;
    getActiveOpenPath: () => string | undefined;
    getConfig: <T>(projectName: string, property: string, defaultValue: T) => T;
    getFileContent: (path: string) => Promise<string>;
    getPackageDependencies: () => Promise<{
        dependencies: {
            [key: string]: string;
        }[];
        devDependencies: {
            [key: string]: string;
        }[];
    }>;
    getRootPath: (uri: import("vscode").Uri) => string | undefined;
    isDir: (path: string) => boolean;
    move: (path: string, newPath: string) => Promise<void>;
    saveAll: () => Promise<void>;
    saveFileContent: (path: string, content: string) => Promise<void>;
    showErrorMessage: (message: string) => Promise<void>;
    showMessage: (message: string) => Promise<void>;
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
export default _default;
