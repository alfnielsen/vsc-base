import * as fs from 'fs-extra'
import * as path from 'path'
import * as vscode from 'vscode'

/**
 * Save file
 * @param path
 * @param content
 */
export const saveFileContent = async (path: string, content: string) => await fs.writeFile(path, content)
/**
 * Get file source
 * @param path
 */
export const getFileContent = async (path: string) => await fs.readFile(path, 'utf8')

/**
 * Save All files
 */
export const saveAll = async () => {
	await vscode.workspace.saveAll(false)
}

/**
 * Get a list off all files in project the matches a glob pattern
 * @param include
 * @param exclude
 * @param maxResults
 * @param token
 */
export const getFiles = async (
	include: vscode.GlobPattern,
	exclude: vscode.GlobPattern = '**/node_modules/**',
	maxResults = 100000,
	token?: vscode.CancellationToken
) => {
	return await vscode.workspace.findFiles(include, exclude, maxResults, token)
}

export const showMessage = (message: string) => vscode.window.showInformationMessage(message)
export const showErrorMessage = (message: string) => vscode.window.showErrorMessage(message)

/**
 * Reaplve all '\\'  with '/'
 * @param path
 */
export const pathAsUnix = (path: string): string => {
	return path.replace(/\\/g, '/')
}

/**
 * Get project root path
 * @param uri
 */
export const getRootPath = (uri: vscode.Uri): string => {
	const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri)
	if (!workspaceFolder) {
		throw new Error('getRootPath was called with uri not within the root!')
	}
	const path = workspaceFolder.uri.fsPath
	pathAsUnix(path)
	return path
}

/**
 * Get fs stats
 * @param path
 */
export const getPathStats = async (path: string) => await fs.stat(path)

/**
 * Test is a path is directory
 * @param path
 */
export const isDir = (path: string) => fs.statSync(path).isDirectory()

/**
 * Does the folder/file exist
 * @param path string
 */
export const doesExists = (path: string): boolean => {
	return fs.existsSync(path)
}

/**
 * Get the folder path from a file path
 * @param filePath string
 */
export const getDirFromPath = (filePath: string) => {
	let dir = path.dirname(filePath)
	dir = pathAsUnix(dir)
	return dir
}

/**
 * Get the folder path from a file path
 * @param path string
 */
export const splitPath = (path: string) => {
	const dir = getDirFromPath(path)
	const splits = path.split('/')
	const name = splits[splits.length - 1]
	return [dir, name]
}

/**
 * Remove parent-path from a path
 * @param path
 * @param rootPath
 */
export const subtractPath = (path: string, rootPath: string) => {
	return path.replace(rootPath, '')
}

/**
 * Remove '/' from start of path
 * @param path
 */
export const trimLeadingDash = (path: string) => {
	return path.replace(/^\//, '')
}

/**
 * Remove './' from start of path
 * @param path
 */
export const trimLeadingLocalDash = (path: string) => {
	return path.replace(/^\.\//, '')
}

/**
 * Remove './' from start of path
 * @param path
 */
export const addLeadingLocalDash = (path: string) => {
	return './' + path
}

/**
 * Get real path.
 * This cleans path and test for path where file extension is not written (ES6 import dont need file extension)
 * Return system safe path (no '\\')
 * @param path
 * @param addedExtensions ES6 import can omit the file extension. This will test agains a list of endings. (The resolve will still not contain the extension)
 */
export const realPath = (path: string, addedExtensions: string[] = ['js', 'jsx', 'ts', 'tsx']) => {
	let realPath: string | undefined
	try {
		realPath = fs.realpathSync(path)
		realPath = pathAsUnix(realPath)
		return realPath
	} catch (e) {}
	for (let i = 0; i < addedExtensions.length; i++) {
		const ext = addedExtensions[i]
		try {
			realPath = fs.realpathSync(path + ext)
			realPath = realPath.substring(0, realPath.length - ext.length)
			realPath = pathAsUnix(realPath)
			return realPath
		} catch (e) {}
	}
	return undefined
}

/**
 * Get path from root
 * @param path File from where the relative path begins
 * @param pathRelatriveToPath The relative path
 * @param rootPath The root path
 */
export const relatrivePathToAbsolutePath = (path: string, pathRelatriveToPath: string, rootPath: string) => {
	pathRelatriveToPath = trimLeadingDash(pathRelatriveToPath)
	let dir = getDirFromPath(path)
	if (dir[dir.length - 1] !== '/') {
		dir += '/'
	}
	const relativePath = dir + pathRelatriveToPath
	let cleanRelativePath = realPath(relativePath)
	if (cleanRelativePath === undefined) {
		return pathRelatriveToPath
	}
	let absolutePathToRelative = subtractPath(cleanRelativePath, rootPath)
	absolutePathToRelative = trimLeadingDash(absolutePathToRelative)
	return absolutePathToRelative
}
/**
 * Get vscode project config
 */
export const getConfig = function getConfig<T>(projectName: string, property: string, defaultValue: T): T {
	return vscode.workspace.getConfiguration(projectName).get<T>(property, defaultValue)
}

/**
 * Test is a path is directory
 * @param path
 */
export const ask = async (question: string, devaultValue: string) =>
	await vscode.window.showInputBox({
		prompt: question,
		value: devaultValue
	})
