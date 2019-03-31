import React from  'react';
import AskAnnotatedCode from 'methodAnnotationSystem/AskAnnotatedCode';
import DoesExistsAnnotatedCode from 'methodAnnotationSystem/DoesExistsAnnotatedCode';
import FindFilePathsAnnotatedCode from 'methodAnnotationSystem/FindFilePathsAnnotatedCode';
import GetActiveOpenPathAnnotatedCode from 'methodAnnotationSystem/GetActiveOpenPathAnnotatedCode';
import GetConfigAnnotatedCode from 'methodAnnotationSystem/GetConfigAnnotatedCode';
import GetFileContentAnnotatedCode from 'methodAnnotationSystem/GetFileContentAnnotatedCode';
import GetPackageDependenciesAnnotatedCode from 'methodAnnotationSystem/GetPackageDependenciesAnnotatedCode';
import GetRootPathAnnotatedCode from 'methodAnnotationSystem/GetRootPathAnnotatedCode';
import IsDirAnnotatedCode from 'methodAnnotationSystem/IsDirAnnotatedCode';
import MoveAnnotatedCode from 'methodAnnotationSystem/MoveAnnotatedCode';
import SaveAllAnnotatedCode from 'methodAnnotationSystem/SaveAllAnnotatedCode';
import SaveFileContentAnnotatedCode from 'methodAnnotationSystem/SaveFileContentAnnotatedCode';
import ShowErrorMessageAnnotatedCode from 'methodAnnotationSystem/ShowErrorMessageAnnotatedCode';
import ShowMessageAnnotatedCode from 'methodAnnotationSystem/ShowMessageAnnotatedCode';
import MakeDirAnnotatedCode from 'methodAnnotationSystem/MakeDirAnnotatedCode';

const SystemDocs = () => (
	<>
		<AskAnnotatedCode />
		<DoesExistsAnnotatedCode />
		<FindFilePathsAnnotatedCode />
		<GetActiveOpenPathAnnotatedCode />
		<GetConfigAnnotatedCode />
		<GetFileContentAnnotatedCode />
		<GetPackageDependenciesAnnotatedCode />
		<GetRootPathAnnotatedCode />
		<IsDirAnnotatedCode />
		<MoveAnnotatedCode />
		<SaveAllAnnotatedCode />
		<SaveFileContentAnnotatedCode />
		<ShowErrorMessageAnnotatedCode />
		<ShowMessageAnnotatedCode />
		<MakeDirAnnotatedCode />
	</>
)

export default SystemDocs