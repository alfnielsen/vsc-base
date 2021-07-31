"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldTemplate = void 0;
const vsc = require("./vsc-base");
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
const scaffoldTemplate = (path, templateItem, userInputs = {}) => __awaiter(void 0, void 0, void 0, function* () {
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
            templateItem.children.forEach((childItem) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.scaffoldTemplate = scaffoldTemplate;
//# sourceMappingURL=vsc-base-vscTemplate.js.map