import React from 'react'

import AddLeadingLocalDashAnnotatedCode from './annotations/AddLeadingLocalDashAnnotatedCode'
import AppendLineToActiveDocumentAnnotatedCode from './annotations/AppendLineToActiveDocumentAnnotatedCode'
import AppendToActiveDocumentAnnotatedCode from './annotations/AppendToActiveDocumentAnnotatedCode'
import AppendToDocumentAnnotatedCode from './annotations/AppendToDocumentAnnotatedCode'
import AskAnnotatedCode from './annotations/AskAnnotatedCode'
import AwaitResultAnnotatedCode from './annotations/AwaitResultAnnotatedCode'
import CleanPathAnnotatedCode from './annotations/CleanPathAnnotatedCode'
import CopyAnnotatedCode from './annotations/CopyAnnotatedCode'
import DoesExistsAnnotatedCode from './annotations/DoesExistsAnnotatedCode'
import FindFilePathsAnnotatedCode from './annotations/FindFilePathsAnnotatedCode'
import FindFilePathsFromBaseAnnotatedCode from './annotations/FindFilePathsFromBaseAnnotatedCode'
import FindRelativeFilePathsAnnotatedCode from './annotations/FindRelativeFilePathsAnnotatedCode'
import GetAbsolutePathFromRelatrivePathAnnotatedCode from './annotations/GetAbsolutePathFromRelatrivePathAnnotatedCode'
import GetActiveDocumentAnnotatedCode from './annotations/GetActiveDocumentAnnotatedCode'
import GetActiveDocumentContentAnnotatedCode from './annotations/GetActiveDocumentContentAnnotatedCode'
import GetActiveDocumentPathAnnotatedCode from './annotations/GetActiveDocumentPathAnnotatedCode'
import GetActiveEditorAnnotatedCode from './annotations/GetActiveEditorAnnotatedCode'
import GetConfigAnnotatedCode from './annotations/GetConfigAnnotatedCode'
import GetDirAnnotatedCode from './annotations/GetDirAnnotatedCode'
import GetErrorInfoAnnotatedCode from './annotations/GetErrorInfoAnnotatedCode'
import GetFileContentAnnotatedCode from './annotations/GetFileContentAnnotatedCode'
import GetFullDocumentRangeAnnotatedCode from './annotations/GetFullDocumentRangeAnnotatedCode'
import GetJSONCircularReplacerAnnotatedCode from './annotations/GetJSONCircularReplacerAnnotatedCode'
import GetJsonContentAnnotatedCode from './annotations/GetJsonContentAnnotatedCode'
import GetJsonPartsAnnotatedCode from './annotations/GetJsonPartsAnnotatedCode'
import GetLineStreamReaderAnnotatedCode from './annotations/GetLineStreamReaderAnnotatedCode'
import GetPackageDependenciesAnnotatedCode from './annotations/GetPackageDependenciesAnnotatedCode'
import GetPackageFilePathsAnnotatedCode from './annotations/GetPackageFilePathsAnnotatedCode'
import GetReadStreamAnnotatedCode from './annotations/GetReadStreamAnnotatedCode'
import GetRelativePathAnnotatedCode from './annotations/GetRelativePathAnnotatedCode'
import GetRootPathAnnotatedCode from './annotations/GetRootPathAnnotatedCode'
import GetSubrelativePathFromAbsoluteRootPathAnnotatedCode from './annotations/GetSubrelativePathFromAbsoluteRootPathAnnotatedCode'
import GetTimestampAnnotatedCode from './annotations/GetTimestampAnnotatedCode'
import GetVscDefaultModuleMapAnnotatedCode from './annotations/GetVscDefaultModuleMapAnnotatedCode'
import IsAbsolutePathAnnotatedCode from './annotations/IsAbsolutePathAnnotatedCode'
import IsDirAnnotatedCode from './annotations/IsDirAnnotatedCode'
import IsSubPathAnnotatedCode from './annotations/IsSubPathAnnotatedCode'
import JoinPathsAnnotatedCode from './annotations/JoinPathsAnnotatedCode'
import KeyValueReplacerAnnotatedCode from './annotations/KeyValueReplacerAnnotatedCode'
import MakeDirAnnotatedCode from './annotations/MakeDirAnnotatedCode'
import MaxDepthReplacerAnnotatedCode from './annotations/MaxDepthReplacerAnnotatedCode'
import MoveAnnotatedCode from './annotations/MoveAnnotatedCode'
import ObjectWalkerAnnotatedCode from './annotations/ObjectWalkerAnnotatedCode'
import PathAsUnixAnnotatedCode from './annotations/PathAsUnixAnnotatedCode'
import PickAnnotatedCode from './annotations/PickAnnotatedCode'
import SaveActiveDocumentAnnotatedCode from './annotations/SaveActiveDocumentAnnotatedCode'
import SaveAllAnnotatedCode from './annotations/SaveAllAnnotatedCode'
import SaveFileContentAnnotatedCode from './annotations/SaveFileContentAnnotatedCode'
import ScaffoldTemplateAnnotatedCode from './annotations/ScaffoldTemplateAnnotatedCode'
import SetActiveDocumentContentAnnotatedCode from './annotations/SetActiveDocumentContentAnnotatedCode'
import SharedPathAnnotatedCode from './annotations/SharedPathAnnotatedCode'
import ShowErrorMessageAnnotatedCode from './annotations/ShowErrorMessageAnnotatedCode'
import ShowMessageAnnotatedCode from './annotations/ShowMessageAnnotatedCode'
import SleepAnnotatedCode from './annotations/SleepAnnotatedCode'
import SplitPathAnnotatedCode from './annotations/SplitPathAnnotatedCode'
import SubtractPathAnnotatedCode from './annotations/SubtractPathAnnotatedCode'
import ToCamelCaseAnnotatedCode from './annotations/ToCamelCaseAnnotatedCode'
import ToJSONStringAnnotatedCode from './annotations/ToJSONStringAnnotatedCode'
import ToKebabCaseAnnotatedCode from './annotations/ToKebabCaseAnnotatedCode'
import ToPascalCaseAnnotatedCode from './annotations/ToPascalCaseAnnotatedCode'
import ToSnakeCaseAnnotatedCode from './annotations/ToSnakeCaseAnnotatedCode'
import TrimDashesAnnotatedCode from './annotations/TrimDashesAnnotatedCode'
import TrimLeadingDashAnnotatedCode from './annotations/TrimLeadingDashAnnotatedCode'
import TsCreateNodeVisitorAnnotatedCode from './annotations/TsCreateNodeVisitorAnnotatedCode'
import TsCreateRemoveNodesTransformerAnnotatedCode from './annotations/TsCreateRemoveNodesTransformerAnnotatedCode'
import TsCreateSourceFileAnnotatedCode from './annotations/TsCreateSourceFileAnnotatedCode'
import TsCreateTransformerAnnotatedCode from './annotations/TsCreateTransformerAnnotatedCode'
import TsDefaultCompilerOptionsAnnotatedCode from './annotations/TsDefaultCompilerOptionsAnnotatedCode'
import TsGetParsedChildrenAnnotatedCode from './annotations/TsGetParsedChildrenAnnotatedCode'
import TsLoadModuleAnnotatedCode from './annotations/TsLoadModuleAnnotatedCode'
import TsLoadModuleSourceCodeAnnotatedCode from './annotations/TsLoadModuleSourceCodeAnnotatedCode'
import TsRewriteTranpiledCodeWithVscBaseModulesAnnotatedCode from './annotations/TsRewriteTranpiledCodeWithVscBaseModulesAnnotatedCode'
import TsTransformAnnotatedCode from './annotations/TsTransformAnnotatedCode'
import TsTransformNodeAnnotatedCode from './annotations/TsTransformNodeAnnotatedCode'
import TsTranspileAnnotatedCode from './annotations/TsTranspileAnnotatedCode'
import VarifyModuleMethodsAnnotatedCode from './annotations/VarifyModuleMethodsAnnotatedCode'
interface AllAnnotationsProps {
   activeMethod: string
}

const AllAnnotations = ({ activeMethod }: AllAnnotationsProps) => 
  <>
      <AddLeadingLocalDashAnnotatedCode open={activeMethod === 'addLeadingLocalDash'} />
      <AppendLineToActiveDocumentAnnotatedCode open={activeMethod === 'appendLineToActiveDocument'} />
      <AppendToActiveDocumentAnnotatedCode open={activeMethod === 'appendToActiveDocument'} />
      <AppendToDocumentAnnotatedCode open={activeMethod === 'appendToDocument'} />
      <AskAnnotatedCode open={activeMethod === 'ask'} />
      <AwaitResultAnnotatedCode open={activeMethod === 'awaitResult'} />
      <CleanPathAnnotatedCode open={activeMethod === 'cleanPath'} />
      <CopyAnnotatedCode open={activeMethod === 'copy'} />
      <DoesExistsAnnotatedCode open={activeMethod === 'doesExists'} />
      <FindFilePathsAnnotatedCode open={activeMethod === 'findFilePaths'} />
      <FindFilePathsFromBaseAnnotatedCode open={activeMethod === 'findFilePathsFromBase'} />
      <FindRelativeFilePathsAnnotatedCode open={activeMethod === 'findRelativeFilePaths'} />
      <GetAbsolutePathFromRelatrivePathAnnotatedCode open={activeMethod === 'getAbsolutePathFromRelatrivePath'} />
      <GetActiveDocumentAnnotatedCode open={activeMethod === 'getActiveDocument'} />
      <GetActiveDocumentContentAnnotatedCode open={activeMethod === 'getActiveDocumentContent'} />
      <GetActiveDocumentPathAnnotatedCode open={activeMethod === 'getActiveDocumentPath'} />
      <GetActiveEditorAnnotatedCode open={activeMethod === 'getActiveEditor'} />
      <GetConfigAnnotatedCode open={activeMethod === 'getConfig'} />
      <GetDirAnnotatedCode open={activeMethod === 'getDir'} />
      <GetErrorInfoAnnotatedCode open={activeMethod === 'getErrorInfo'} />
      <GetFileContentAnnotatedCode open={activeMethod === 'getFileContent'} />
      <GetFullDocumentRangeAnnotatedCode open={activeMethod === 'getFullDocumentRange'} />
      <GetJSONCircularReplacerAnnotatedCode open={activeMethod === 'getJSONCircularReplacer'} />
      <GetJsonContentAnnotatedCode open={activeMethod === 'getJsonContent'} />
      <GetJsonPartsAnnotatedCode open={activeMethod === 'getJsonParts'} />
      <GetLineStreamReaderAnnotatedCode open={activeMethod === 'getLineStreamReader'} />
      <GetPackageDependenciesAnnotatedCode open={activeMethod === 'getPackageDependencies'} />
      <GetPackageFilePathsAnnotatedCode open={activeMethod === 'getPackageFilePaths'} />
      <GetReadStreamAnnotatedCode open={activeMethod === 'getReadStream'} />
      <GetRelativePathAnnotatedCode open={activeMethod === 'getRelativePath'} />
      <GetRootPathAnnotatedCode open={activeMethod === 'getRootPath'} />
      <GetSubrelativePathFromAbsoluteRootPathAnnotatedCode open={activeMethod === 'getSubrelativePathFromAbsoluteRootPath'} />
      <GetTimestampAnnotatedCode open={activeMethod === 'getTimestamp'} />
      <GetVscDefaultModuleMapAnnotatedCode open={activeMethod === 'getVscDefaultModuleMap'} />
      <IsAbsolutePathAnnotatedCode open={activeMethod === 'isAbsolutePath'} />
      <IsDirAnnotatedCode open={activeMethod === 'isDir'} />
      <IsSubPathAnnotatedCode open={activeMethod === 'isSubPath'} />
      <JoinPathsAnnotatedCode open={activeMethod === 'joinPaths'} />
      <KeyValueReplacerAnnotatedCode open={activeMethod === 'keyValueReplacer'} />
      <MakeDirAnnotatedCode open={activeMethod === 'makeDir'} />
      <MaxDepthReplacerAnnotatedCode open={activeMethod === 'maxDepthReplacer'} />
      <MoveAnnotatedCode open={activeMethod === 'move'} />
      <ObjectWalkerAnnotatedCode open={activeMethod === 'objectWalker'} />
      <PathAsUnixAnnotatedCode open={activeMethod === 'pathAsUnix'} />
      <PickAnnotatedCode open={activeMethod === 'pick'} />
      <SaveActiveDocumentAnnotatedCode open={activeMethod === 'saveActiveDocument'} />
      <SaveAllAnnotatedCode open={activeMethod === 'saveAll'} />
      <SaveFileContentAnnotatedCode open={activeMethod === 'saveFileContent'} />
      <ScaffoldTemplateAnnotatedCode open={activeMethod === 'scaffoldTemplate'} />
      <SetActiveDocumentContentAnnotatedCode open={activeMethod === 'setActiveDocumentContent'} />
      <SharedPathAnnotatedCode open={activeMethod === 'sharedPath'} />
      <ShowErrorMessageAnnotatedCode open={activeMethod === 'showErrorMessage'} />
      <ShowMessageAnnotatedCode open={activeMethod === 'showMessage'} />
      <SleepAnnotatedCode open={activeMethod === 'sleep'} />
      <SplitPathAnnotatedCode open={activeMethod === 'splitPath'} />
      <SubtractPathAnnotatedCode open={activeMethod === 'subtractPath'} />
      <ToCamelCaseAnnotatedCode open={activeMethod === 'toCamelCase'} />
      <ToJSONStringAnnotatedCode open={activeMethod === 'toJSONString'} />
      <ToKebabCaseAnnotatedCode open={activeMethod === 'toKebabCase'} />
      <ToPascalCaseAnnotatedCode open={activeMethod === 'toPascalCase'} />
      <ToSnakeCaseAnnotatedCode open={activeMethod === 'toSnakeCase'} />
      <TrimDashesAnnotatedCode open={activeMethod === 'trimDashes'} />
      <TrimLeadingDashAnnotatedCode open={activeMethod === 'trimLeadingDash'} />
      <TsCreateNodeVisitorAnnotatedCode open={activeMethod === 'tsCreateNodeVisitor'} />
      <TsCreateRemoveNodesTransformerAnnotatedCode open={activeMethod === 'tsCreateRemoveNodesTransformer'} />
      <TsCreateSourceFileAnnotatedCode open={activeMethod === 'tsCreateSourceFile'} />
      <TsCreateTransformerAnnotatedCode open={activeMethod === 'tsCreateTransformer'} />
      <TsDefaultCompilerOptionsAnnotatedCode open={activeMethod === 'TsDefaultCompilerOptions'} />
      <TsGetParsedChildrenAnnotatedCode open={activeMethod === 'tsGetParsedChildren'} />
      <TsLoadModuleAnnotatedCode open={activeMethod === 'tsLoadModule'} />
      <TsLoadModuleSourceCodeAnnotatedCode open={activeMethod === 'tsLoadModuleSourceCode'} />
      <TsRewriteTranpiledCodeWithVscBaseModulesAnnotatedCode open={activeMethod === 'tsRewriteTranpiledCodeWithVscBaseModules'} />
      <TsTransformAnnotatedCode open={activeMethod === 'tsTransform'} />
      <TsTransformNodeAnnotatedCode open={activeMethod === 'tsTransformNode'} />
      <TsTranspileAnnotatedCode open={activeMethod === 'tsTranspile'} />
      <VarifyModuleMethodsAnnotatedCode open={activeMethod === 'varifyModuleMethods'} />
  </>

export default AllAnnotations
