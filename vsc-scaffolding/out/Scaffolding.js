'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vsc = require("vsc-base");
const vscode = require("vscode");
class Scaffolding {
    /**
     * The main method that runs the create template output
     */
    createTemplate(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uri) {
                vsc.showErrorMessage('vsc Scaffolding most be run by right-clicking a file or folder!');
                return;
            }
            const path = vsc.pathAsUnix(uri.fsPath);
            let dir = vsc.getDir(path);
            /**
             * Collect all project templates:
             * This scans all files for .vsc-template.js to make a list of templates
             * @todo Maybe move this code, so it do not scan all file every times it run
             */
            const templatefiles = yield vsc.findFilePaths('**/*.vsc-template.{js,ts}');
            const templates = [];
            templatefiles.forEach(filePath => {
                const match = filePath.match(/([\w\-]+)\.vsc\-template\.([jt]s)$/);
                if (match) {
                    const name = match[1];
                    const type = match[2];
                    templates.push({
                        name,
                        type,
                        name_lower: name.toLocaleLowerCase(),
                        path: filePath
                    });
                }
            });
            if (templates.length === 0) {
                vsc.showErrorMessage(`NOTE: vsc-scaffolding didn't find any template files. A template file name can be place anywhere in the project, but it must end with '.vsc-template.js'`);
                return;
            }
            const templateName = yield vsc.pick(templates.map(t => t.name));
            if (!templateName) {
                return;
            }
            const templateName_lower = templateName.toLocaleLowerCase();
            const selectedTemplate = templates.find(t => t.name_lower === templateName_lower);
            if (!selectedTemplate) {
                vsc.showErrorMessage(`NOTE: vsc-scaffolding didn't find your template '${templateName}'. The template must be in a file called '${templateName}.vsc-template.js'`);
                return;
            }
            //
            //template: Template,
            let template;
            if (selectedTemplate.type === 'js') {
                template = yield getJsTemplate(selectedTemplate.path);
            }
            else if (selectedTemplate.type === 'ts') {
                template = yield getTsTemplate(selectedTemplate.path, path);
                if (!template) {
                    return;
                }
                template = (yield vsc.awaitResult(template));
            }
            else {
                return;
            }
            const userInputs = {};
            // Get User Inputs (For some unknown reason .foreach dont work... So we use normal for loop)
            for (let i = 0; i < template.userInputs.length; i++) {
                const item = template.userInputs[i];
                const userResponse = yield vsc.ask(item.title, item.defaultValue);
                if (!userResponse) {
                    return;
                }
                userInputs[item.argumentName] = userResponse;
            }
            // await template.userInputs.forEach(async (item: UserInput) => { })
            // Recursive create files and folder
            yield template.template.forEach((item) => __awaiter(this, void 0, void 0, function* () {
                yield vsc.scaffoldTemplate(dir, item, userInputs);
            }));
            vscode.window.showInformationMessage('Template output was created.');
        });
    }
}
exports.default = Scaffolding;
const getJsTemplate = (path) => __awaiter(this, void 0, void 0, function* () {
    const templateFile = yield vsc.getFileContent(path);
    const templateCompiledFunction = eval(templateFile);
    const template = templateCompiledFunction();
    return template;
});
const getTsTemplate = (templatePath, path) => __awaiter(this, void 0, void 0, function* () {
    // load script and tranpile it
    try {
        let scriptFileExport;
        scriptFileExport = yield vsc.tsLoadModule(templatePath);
        const varifiedModule = vsc.varifyModuleMethods(scriptFileExport, ['Template']);
        if (!varifiedModule) {
            return undefined;
        }
        const template = varifiedModule.Template(path, templatePath);
        return template;
    }
    catch (e) {
        vsc.showErrorMessage(e);
    }
    return undefined;
});
//# sourceMappingURL=Scaffolding.js.map