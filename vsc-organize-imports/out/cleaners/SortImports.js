"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const vsc = require("vsc-base");
function SortImports(content, spaceBetweenImportGroups) {
    return __awaiter(this, void 0, void 0, function* () {
        //Find first node that is not in import
        const imports = mapImports(content);
        if (!imports) {
            return;
        }
        //find last import
        const lastImport = imports.sort((a, b) => b.pos.end - a.pos.end)[0];
        //sort
        imports.sort((a, b) => a.path.localeCompare(b.path));
        const newImportContent = yield organizeImports(imports, spaceBetweenImportGroups);
        yield vsc.insertAt(newImportContent, 0, lastImport.pos.end);
    });
}
exports.SortImports = SortImports;
const organizeImports = (imports, spaceBetweenImportGroups) => __awaiter(this, void 0, void 0, function* () {
    // load dependencies to specifi global imports
    const [dependencies, devDependencies] = yield vsc.getPackageDependencies();
    const dependencyNames = Object.keys(Object.assign({}, dependencies, devDependencies));
    //split into global / local
    const globalImports = [];
    const absoluteImports = [];
    const localImports = [];
    imports.forEach(_import => {
        const global = !!dependencyNames.find(name => {
            return name.indexOf(_import.path) === 0;
        });
        const local = /^\./.test(_import.path);
        if (global) {
            globalImports.push(_import);
        }
        else if (local) {
            localImports.push(_import);
        }
        else {
            absoluteImports.push(_import);
        }
    });
    //organize in gruops with spaces between
    const newImportContent = globalImports.map(imp => imp.fullString).join('\n') +
        !spaceBetweenImportGroups ? '' : (globalImports.length > 0 && absoluteImports.length > 0 ? '\n\n' : '') +
        absoluteImports.map(imp => imp.fullString).join('\n') +
        !spaceBetweenImportGroups ? '' : ((globalImports.length > 0 || absoluteImports.length > 0) &&
        localImports.length > 0
        ? '\n\n'
        : '') +
        localImports.map(imp => imp.fullString).join('\n');
    return newImportContent;
});
const mapImports = (content) => {
    const [, firstPos] = vsc.tsFindNodePositionFromContent(content, node => !ts.isSourceFile(node) && !ts.isImportDeclaration(node));
    // All imports before first statement, mapped with import path
    const importPos = vsc.tsFindAllNodePositionsFromContent(content, node => ts.isImportDeclaration(node) && (!firstPos || node.end < firstPos.start));
    const imports = importPos.map(([node, pos], index) => ({
        node: node,
        pos,
        unsed: true,
        path: node.moduleSpecifier
            .getText()
            .replace(/^['"]|['"]$/g, ''),
        fullString: content
            .substring(index === 0 ? pos.start : importPos[index - 1][1].end + 1, pos.end)
            .trim(),
    }));
    return imports;
};
//# sourceMappingURL=SortImports.js.map