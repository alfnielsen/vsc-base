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
const SortImports_1 = require("./SortImports");
class OrganizeImports {
    getConfig(property, defaultValue) {
        return vsc.getConfig('vscOrganizeImports', property, defaultValue);
    }
    run(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uri) {
                return;
            }
            const content = vsc.getDocumentContent();
            if (!content) {
                return;
            }
            const path = uri.path;
            //load settings:
            const orderSpecifiers = this.getConfig('orderSpecifiers', false);
            const orderSpecifiersAsSingleLine = this.getConfig('orderSpecifiersAsSingleLine', false);
            const baseUrl = this.getConfig('baseUrl', 'src');
            const emptyLinesAfterGlobalImports = this.getConfig('emptyLinesAfterGlobalImports', 0);
            const emptyLinesAfterAbsoluteImports = this.getConfig('emptyLinesAfterAbsoluteImports', 0);
            const emptyLinesLocalImports = this.getConfig('emptyLinesLocalImports', 0);
            const emptyLinesAfterImports = this.getConfig('emptyLinesAfterImports', 1);
            const rootPath = vsc.getRootPath(path);
            if (!rootPath) {
                return;
            }
            const basePath = vsc.joinPaths(rootPath, baseUrl);
            yield SortImports_1.SortImports(basePath, content, emptyLinesAfterGlobalImports, emptyLinesAfterAbsoluteImports, emptyLinesLocalImports, emptyLinesAfterImports, orderSpecifiers, orderSpecifiersAsSingleLine);
        });
    }
}
exports.default = OrganizeImports;
//# sourceMappingURL=OrganizeImports.js.map