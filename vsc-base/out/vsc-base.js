"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vsc_base_raw_1 = require("./vsc-base-raw");
exports.addLeadingLocalDash = vsc_base_raw_1.addLeadingLocalDash;
exports.cleanPath = vsc_base_raw_1.cleanPath;
exports.getJsonParts = vsc_base_raw_1.getJsonParts;
exports.isAbsolutePath = vsc_base_raw_1.isAbsolutePath;
exports.isSubPath = vsc_base_raw_1.isSubPath;
exports.joinPaths = vsc_base_raw_1.joinPaths;
exports.pathAsUnix = vsc_base_raw_1.pathAsUnix;
exports.getRelativePath = vsc_base_raw_1.getRelativePath;
exports.getSubrelativePathFromAbsoluteRootPath = vsc_base_raw_1.getSubrelativePathFromAbsoluteRootPath;
exports.getAbsolutePathFromRelatrivePath = vsc_base_raw_1.getAbsolutePathFromRelatrivePath;
exports.sharedPath = vsc_base_raw_1.sharedPath;
exports.sleep = vsc_base_raw_1.sleep;
exports.splitPath = vsc_base_raw_1.splitPath;
exports.subtractPath = vsc_base_raw_1.subtractPath;
exports.toKebabCase = vsc_base_raw_1.toKebabCase;
exports.toCamelCase = vsc_base_raw_1.toCamelCase;
exports.toPascalCase = vsc_base_raw_1.toPascalCase;
exports.toSnakeCase = vsc_base_raw_1.toSnakeCase;
exports.trimDashes = vsc_base_raw_1.trimDashes;
exports.trimLeadingDash = vsc_base_raw_1.trimLeadingDash;
exports.getErrorInfo = vsc_base_raw_1.getErrorInfo;
exports.getTimestamp = vsc_base_raw_1.getTimestamp;
exports.getJSONCircularReplacer = vsc_base_raw_1.getJSONCircularReplacer;
exports.toJSONString = vsc_base_raw_1.toJSONString;
exports.maxDepthReplacer = vsc_base_raw_1.maxDepthReplacer;
exports.keyValueReplacer = vsc_base_raw_1.keyValueReplacer;
exports.objectWalker = vsc_base_raw_1.objectWalker;
const vsc_base_vscode_1 = require("./vsc-base-vscode");
exports.ask = vsc_base_vscode_1.ask;
exports.pick = vsc_base_vscode_1.pick;
exports.findFilePaths = vsc_base_vscode_1.findFilePaths;
exports.findFilePathsFromBase = vsc_base_vscode_1.findFilePathsFromBase;
exports.findRelativeFilePaths = vsc_base_vscode_1.findRelativeFilePaths;
exports.getActiveEditor = vsc_base_vscode_1.getActiveEditor;
exports.getActiveDocument = vsc_base_vscode_1.getActiveDocument;
exports.createVscodeRangeAndPosition = vsc_base_vscode_1.createVscodeRangeAndPosition;
exports.createSelection = vsc_base_vscode_1.createSelection;
exports.setSelection = vsc_base_vscode_1.setSelection;
exports.addSelection = vsc_base_vscode_1.addSelection;
exports.setSelectionFromRange = vsc_base_vscode_1.setSelectionFromRange;
exports.addSelectionFromRange = vsc_base_vscode_1.addSelectionFromRange;
exports.newDocument = vsc_base_vscode_1.newDocument;
exports.getActiveTerminal = vsc_base_vscode_1.getActiveTerminal;
exports.writeToTerminal = vsc_base_vscode_1.writeToTerminal;
exports.getDocumentPath = vsc_base_vscode_1.getDocumentPath;
exports.getDocumentContent = vsc_base_vscode_1.getDocumentContent;
exports.setDocumentContent = vsc_base_vscode_1.setDocumentContent;
exports.getFullDocumentRange = vsc_base_vscode_1.getFullDocumentRange;
exports.appendToDocument = vsc_base_vscode_1.appendToDocument;
exports.appendLineToDocument = vsc_base_vscode_1.appendLineToDocument;
exports.prependToDocument = vsc_base_vscode_1.prependToDocument;
exports.prependLineToDocument = vsc_base_vscode_1.prependLineToDocument;
exports.saveDocument = vsc_base_vscode_1.saveDocument;
exports.getRootPath = vsc_base_vscode_1.getRootPath;
exports.saveAll = vsc_base_vscode_1.saveAll;
exports.showErrorMessage = vsc_base_vscode_1.showErrorMessage;
exports.showMessage = vsc_base_vscode_1.showMessage;
const vsc_base_system_1 = require("./vsc-base-system");
exports.getLineStreamReader = vsc_base_system_1.getLineStreamReader;
exports.getReadStream = vsc_base_system_1.getReadStream;
exports.doesExists = vsc_base_system_1.doesExists;
exports.getDir = vsc_base_system_1.getDir;
exports.getFileContent = vsc_base_system_1.getFileContent;
exports.getJsonContent = vsc_base_system_1.getJsonContent;
exports.getConfig = vsc_base_system_1.getConfig;
exports.getPackageFilePaths = vsc_base_system_1.getPackageFilePaths;
exports.getPackageDependencies = vsc_base_system_1.getPackageDependencies;
exports.isDir = vsc_base_system_1.isDir;
exports.makeDir = vsc_base_system_1.makeDir;
exports.move = vsc_base_system_1.move;
exports.copy = vsc_base_system_1.copy;
exports.saveFileContent = vsc_base_system_1.saveFileContent;
exports.execFromPath = vsc_base_system_1.execFromPath;
const vsc_base_typescript_1 = require("./vsc-base-typescript");
exports.getVscDefaultModuleMap = vsc_base_typescript_1.getVscDefaultModuleMap;
exports.varifyModuleMethods = vsc_base_typescript_1.varifyModuleMethods;
exports.awaitResult = vsc_base_typescript_1.awaitResult;
exports.tsTranspile = vsc_base_typescript_1.tsTranspile;
exports.tsLoadModuleSourceCode = vsc_base_typescript_1.tsLoadModuleSourceCode;
exports.tsRewriteTranpiledCodeWithVscBaseModules = vsc_base_typescript_1.tsRewriteTranpiledCodeWithVscBaseModules;
exports.tsLoadModule = vsc_base_typescript_1.tsLoadModule;
exports.TSLoadModuleError = vsc_base_typescript_1.TSLoadModuleError;
exports.tsCreateTransformer = vsc_base_typescript_1.tsCreateTransformer;
exports.tsCreateRemoveNodesTransformer = vsc_base_typescript_1.tsCreateRemoveNodesTransformer;
exports.tsCreateNodeVisitor = vsc_base_typescript_1.tsCreateNodeVisitor;
exports.tsTransform = vsc_base_typescript_1.tsTransform;
exports.tsVisitWithTransformers = vsc_base_typescript_1.tsVisitWithTransformers;
exports.tsTransformNode = vsc_base_typescript_1.tsTransformNode;
exports.TsDefaultCompilerOptions = vsc_base_typescript_1.TsDefaultCompilerOptions;
exports.tsCreateSourceFile = vsc_base_typescript_1.tsCreateSourceFile;
exports.tsGetParsedChildren = vsc_base_typescript_1.tsGetParsedChildren;
exports.tsFindNodePosition = vsc_base_typescript_1.tsFindNodePosition;
exports.tsFindChildNode = vsc_base_typescript_1.tsFindChildNode;
exports.tsFindGrandChildNode = vsc_base_typescript_1.tsFindGrandChildNode;
exports.tsFindAncestor = vsc_base_typescript_1.tsFindAncestor;
exports.tsMatchObjectProperty = vsc_base_typescript_1.tsMatchObjectProperty;
exports.tsMatchFunction = vsc_base_typescript_1.tsMatchFunction;
exports.tsMatchVariable = vsc_base_typescript_1.tsMatchVariable;
const vsc_base_vscTemplate_1 = require("./vsc-base-vscTemplate");
exports.scaffoldTemplate = vsc_base_vscTemplate_1.scaffoldTemplate;
//# sourceMappingURL=vsc-base.js.map