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
const SortImports_1 = require("./cleaners/SortImports");
class CleanCode {
    constructor() {
        this.formatOnSave = true;
        this.spaceBetweenImportGroups = true;
    }
    getConfig(property, defaultValue) {
        return vsc.getConfig('vscCleanCode', property, defaultValue);
    }
    setup() {
        this.formatOnSave = this.getConfig('formatOnSave', true);
        this.spaceBetweenImportGroups = this.getConfig('spaceBetweenImportGroups', true);
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
            //load settings:
            yield SortImports_1.SortImports(content, this.spaceBetweenImportGroups);
        });
    }
}
exports.default = CleanCode;
//# sourceMappingURL=CleanCode.js.map