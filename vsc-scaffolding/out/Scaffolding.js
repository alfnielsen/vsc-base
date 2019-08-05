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
            const templateFiles = yield vsc.findFilePaths('**/*.vsc-template.{js,ts}');
            const templates = [];
            for (let filePath of templateFiles) {
                const match = filePath.match(/([\w\-]+)\.vsc\-template\.(ts|js)$/);
                if (match) {
                    const content = yield vsc.getFileContent(filePath);
                    const nameLabelMatch = content.match(/(?:^|\n)\s*\/\/vsc\-template\-name\:([^\n]*)/);
                    const name = nameLabelMatch ? nameLabelMatch[1] : match[1];
                    const type = match[2] === 'ts' ? 'ts' : 'js';
                    templates.push({
                        area: ['Other'],
                        type,
                        name,
                        displayName: name,
                        name_lower: name.toLocaleLowerCase(),
                        path: filePath
                    });
                }
            }
            if (templates.length === 0) {
                vsc.showErrorMessage(`NOTE: vsc-scaffolding didn't find any template files. A template file name can be place anywhere in the project, but it must end with '.vsc-template.js'`);
                return;
            }
            this.setArea(templates);
            templates.sort((a, b) => a.displayName.localeCompare(b.displayName));
            const hasAreas = templates.find(a => a.area[0] !== 'Other');
            let templateName;
            if (hasAreas) {
                const areas = [...new Set(templates.map(s => s.area[0]))];
                const areaSelected = yield vsc.pick(areas);
                const sel = templates.filter(s => s.area[0] === areaSelected);
                templateName = yield vsc.pick(sel.map(s => s.displayName));
            }
            else {
                templateName = yield vsc.pick(templates.map(t => t.name));
            }
            if (!templateName) {
                return;
            }
            // select script from user input
            const selectedTemplate = templates.find(t => t.displayName === templateName);
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
    setArea(scripts) {
        scripts.forEach(s => {
            s.name = s.name.trim();
            s.displayName = s.name.trim();
            if (s.displayName.match('>')) {
                s.area = s.displayName.split('>').map(a => {
                    return a.trim();
                });
                s.displayName = s.area.join(' > ');
            }
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
    // load script and transpile it
    try {
        let scriptFileExport;
        scriptFileExport = yield vsc.tsLoadModule(templatePath);
        const verifiedModule = vsc.verifyModuleMethods(scriptFileExport, ['Template']);
        if (!verifiedModule) {
            return undefined;
        }
        const template = verifiedModule.Template(path, templatePath);
        return template;
    }
    catch (e) {
        vsc.showErrorMessage(e);
    }
    return undefined;
});
//# sourceMappingURL=Scaffolding.js.map