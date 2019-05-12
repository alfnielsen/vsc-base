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
const vscode = require("vscode");
function SortImports(content, spaceBetweenImportGroups, orderSpecifiers, orderSpecifiersAsSingleLine) {
    return __awaiter(this, void 0, void 0, function* () {
        //Find first node that is not in import
        const imports = mapImports(content);
        if (!imports) {
            return Promise.resolve(undefined);
        }
        //find last import
        const firstImport = imports.sort((a, b) => a.pos.end - b.pos.end)[0];
        const lastImport = imports[imports.length - 1];
        //sort
        imports.sort((a, b) => a.path.localeCompare(b.path));
        //TODO: sort specifiers (maybe)
        if (orderSpecifiers) {
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
        }
        const newImportContent = yield organizeImports(imports, spaceBetweenImportGroups);
        //await vsc.insertAt(newImportContent, firstImport.pos.start, lastImport.pos.end)
        //todo redo this and use insertAt (when vsc-base use the same reaplce)
        const range = new vscode.Range(firstImport.pos.startPosition, lastImport.pos.endPosition);
        const edits = [];
        edits.push(vscode.TextEdit.replace(range, newImportContent));
        const workspaceEdit = new vscode.WorkspaceEdit();
        workspaceEdit.set(vscode.window.activeTextEditor.document.uri, edits);
        vscode.workspace.applyEdit(workspaceEdit);
    });
}
exports.SortImports = SortImports;
const organizeImports = (imports, spaceBetweenImportGroups) => __awaiter(this, void 0, void 0, function* () {
    // load dependencies to specify global imports
    const [dependencies, devDependencies] = yield vsc.getPackageDependencies();
    const dependencyNames = Object.keys(Object.assign({}, dependencies, devDependencies));
    //split into global / local
    const globalImports = [];
    const absoluteImports = [];
    const localImports = [];
    const directImports = [];
    imports.forEach(_import => {
        const global = !!dependencyNames.find(name => {
            return name.indexOf(_import.path) === 0;
        });
        const local = /^\./.test(_import.path);
        if (!_import.node.importClause) {
            directImports.push(_import);
        }
        else if (global) {
            globalImports.push(_import);
        }
        else if (local) {
            localImports.push(_import);
        }
        else {
            absoluteImports.push(_import);
        }
    });
    const addNewLine = () => {
        if (newImportContent.length > 0) {
            newImportContent += '\n';
            if (spaceBetweenImportGroups) {
                newImportContent += '\n';
            }
        }
    };
    //organize in groups with spaces between
    let newImportContent = "";
    if (globalImports.length > 0) {
        newImportContent += globalImports.map(imp => imp.fullString).join('\n');
    }
    if (absoluteImports.length > 0) {
        addNewLine();
        newImportContent += absoluteImports.map(imp => imp.fullString).join('\n');
    }
    if (localImports.length > 0) {
        addNewLine();
        newImportContent += localImports.map(imp => imp.fullString).join('\n');
    }
    if (directImports.length > 0) {
        addNewLine();
        newImportContent += directImports.map(imp => imp.fullString).join('\n');
    }
    return newImportContent;
});
const mapImports = (content) => {
    const [, firstPos] = vsc.tsFindNodePositionFromContent(content, node => !ts.isSourceFile(node)
        && !ts.isImportDeclaration(node)
        && !(ts.isExpressionStatement(node) && node.expression.getText() === 'use strict'));
    // All imports before first statement, mapped with import path
    const importPos = vsc.tsFindAllNodePositionsFromContent(content, node => ts.isImportDeclaration(node) && (!firstPos || node.end < firstPos.start));
    const imports = importPos.map(([node, pos], index) => {
        const importNode = node;
        let name = '';
        const fullString = content
            .substring(index === 0 ? pos.start : importPos[index - 1][1].end + 1, pos.end)
            .trim();
        let specifiers = [];
        const importClause = importNode.importClause;
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
            pos,
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