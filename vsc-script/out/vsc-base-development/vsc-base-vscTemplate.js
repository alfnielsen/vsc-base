"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vsc = __importStar(require("./vsc-base"));
/** vsc-base method
 * @description
 * Recursive function that goes through a template tree
 * @see [scaffoldTemplate](http://vsc-base.org/#scaffoldTemplate)
 * @param path Full path to where the TemplateItem (file/folder) should be created
 * @param userInputs An object with user inputs {[key: string]: string}
 * @param templateItem An TemplateItem (folde/file)
 * @dependencyInternal makeDir, saveFileContent
 * @vscType System
 * @example
 * await vsc.scaffoldTemplate(path, template)
 * @returns Promise<void>
 */
exports.scaffoldTemplate = (path, templateItem, userInputs = {}) => __awaiter(this, void 0, void 0, function* () {
    switch (templateItem.type) {
        case 'folder': {
            let name = templateItem.name;
            if (typeof name === 'function') {
                name = name.call(null, userInputs);
            }
            const folderPath = path + '/' + name;
            yield vsc.makeDir(folderPath);
            if (!templateItem.children) {
                break;
            }
            templateItem.children.forEach((childItem) => __awaiter(this, void 0, void 0, function* () {
                vsc.scaffoldTemplate(folderPath, childItem, userInputs);
            }));
            break;
        }
        case 'file': {
            let name = templateItem.name;
            if (typeof name === 'function') {
                name = name.call(null, userInputs);
            }
            const filePath = path + '/' + name;
            let content = templateItem.content;
            if (typeof content === 'function') {
                content = content.call(null, userInputs);
            }
            yield vsc.saveFileContent(filePath, content);
        }
    }
});
//# sourceMappingURL=vsc-base-vscTemplate.js.map