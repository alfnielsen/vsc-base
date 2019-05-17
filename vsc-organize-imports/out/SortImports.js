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
function SortImports(basePath, content, emptyLinesAfterGlobalImports, emptyLinesAfterAbsoluteImports, emptyLinesLocalImports, emptyLinesAfterImports, orderSpecifiers, orderSpecifiersAsSingleLine) {
    return __awaiter(this, void 0, void 0, function* () {
        // Find first non imports: (exclude 'use strict' and sourceFile')
        const sourceFile = vsc.tsCreateSourceFile(content);
        const children = vsc.tsGetParsedChildren(sourceFile);
        const firstNode = children.find(node => !ts.isImportDeclaration(node)
            && !(ts.isExpressionStatement(node) && node.expression.getText() === 'use strict'));
        const _imports = children.filter(node => ts.isImportDeclaration(node) && (!firstNode || node.pos < firstNode.pos));
        //Find first node that is not in import
        const imports = mapImports(content, _imports);
        if (!imports) {
            return Promise.resolve(undefined);
        }
        //find last import
        const firstImport = imports[0];
        const lastImport = imports[imports.length - 1];
        if (orderSpecifiers) {
            sortNamedImports(imports, orderSpecifiersAsSingleLine);
        }
        const newImportContent = yield organizeImports(imports, basePath, emptyLinesAfterGlobalImports, emptyLinesAfterAbsoluteImports, emptyLinesLocalImports, emptyLinesAfterImports);
        let contentToFirst;
        let end = lastImport.node.end;
        end += content.substr(end).match(/[\n\s]*/)[0].length;
        vsc.insertAt(newImportContent, firstImport.node.pos, end);
    });
}
exports.SortImports = SortImports;
const sortNamedImports = (imports, orderSpecifiersAsSingleLine) => {
    imports.map(imp => {
        if (imp.specifiers) {
            imp.specifiers.sort((a, b) => a.name.localeCompare(b.name));
            if (orderSpecifiersAsSingleLine) {
                const specifierContent = imp.specifiers.map(s => s.fullString).join(', ');
                imp.fullString = imp.fullString.replace(/\{[^}]+\}/, '{ ' + specifierContent + ' }');
            }
            else {
                const specifierContent = imp.specifiers.map(s => s.fullString).join(',\n  ');
                imp.fullString = imp.fullString.replace(/\{[^}]+\}/, '{\n  ' + specifierContent + '\n}');
            }
        }
    });
};
const organizeImports = (imports, basePath, emptyLinesAfterGlobalImports, emptyLinesAfterAbsoluteImports, emptyLinesLocalImports, emptyLinesAfterImports) => __awaiter(this, void 0, void 0, function* () {
    const moduleExtensionRegExp = /\.([tj]sx?)+$/;
    const localRegExp = /^\./;
    const groups = {
        localImports: [],
        absoluteImports: [],
        directImports: [],
        globalImports: [],
    };
    //split into global / local
    imports.forEach(_import => {
        if (localRegExp.test(_import.path)) {
            groups.localImports.push(_import);
            return;
        }
        const fullPath = vsc.joinPaths(basePath, _import.path);
        if (moduleExtensionRegExp.test(_import.path) && vsc.doesExists(fullPath)) {
            groups.absoluteImports.push(_import);
            return;
        }
        if (vsc.doesExists(fullPath + '.ts') ||
            vsc.doesExists(fullPath + '.tsx') ||
            vsc.doesExists(fullPath + '.js') ||
            vsc.doesExists(fullPath + '.jsx')) {
            groups.absoluteImports.push(_import);
            return;
        }
        if (!_import.node.importClause) {
            groups.directImports.push(_import);
            return;
        }
        groups.globalImports.push(_import);
    });
    const defaultMapping = [
        { groups: ['globalImports'], emptyLinesAfterGroup: emptyLinesAfterGlobalImports },
        { groups: ['absoluteImports'], emptyLinesAfterGroup: emptyLinesAfterAbsoluteImports },
        { groups: ['localImports'], emptyLinesAfterGroup: emptyLinesLocalImports },
        { groups: ['directImports'], emptyLinesAfterGroup: 0 },
    ];
    let newImportContent = "";
    defaultMapping.forEach((groupOptions, index) => {
        let group = [];
        groupOptions.groups.forEach(groupName => {
            group = [...groups[groupName]];
        });
        if (group.length === 0) {
            return;
        }
        // sort
        group.sort((a, b) => a.path.localeCompare(b.path));
        // join and add
        newImportContent += group.map(imp => imp.fullString).join('\n') + '\n';
        // add spaces
        for (let space = 0; space < groupOptions.emptyLinesAfterGroup; space++) {
            newImportContent += '\n';
        }
    });
    newImportContent = newImportContent.trim() + '\n';
    for (let lines = 0; lines < emptyLinesAfterImports; lines++) {
        newImportContent += '\n';
    }
    return newImportContent;
});
const mapImports = (content, _imports) => {
    // All imports before first statement, mapped with import path
    // Map with name?, fullString, and named imports info
    const imports = _imports.map((node, index) => {
        const importNode = node;
        let name = '';
        const fullString = content
            .substring(index === 0 ? node.pos : _imports[index - 1].end + 1, node.end)
            .trim();
        let specifiers = [];
        const importClause = importNode.importClause;
        //named imports (specifiers)
        if (importClause) {
            if (importClause.name) {
                name = importClause.name.getText();
            }
            if (importClause.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
                specifiers = importClause.namedBindings.elements.map(e => ({
                    fullString: e.getText().trim(),
                    node: e,
                    name: e.name.getText()
                }));
            }
        }
        return ({
            name,
            specifiers,
            fullString,
            node: importNode,
            path: importNode.moduleSpecifier
                .getText()
                .replace(/^['"]|['"]$/g, ''),
        });
    });
    return imports;
};
//# sourceMappingURL=SortImports.js.map