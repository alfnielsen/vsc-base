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
function SortImports(path, content, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Find first non imports: (exclude 'use strict' and sourceFile')
        const sourceFile = vsc.tsCreateSourceFile(content);
        const children = vsc.tsGetParsedChildren(sourceFile);
        const firstNode = children.find(node => {
            if (ts.isExpressionStatement(node)) {
                const text = node.expression.getText();
                return (text !== "'use strict'" && text !== '"use strict"');
            }
            return !ts.isImportDeclaration(node);
        });
        const _imports = children.filter(node => ts.isImportDeclaration(node) && (!firstNode || node.pos < firstNode.pos));
        //Find first node that is not in import
        const imports = mapImports(content, _imports, options);
        if (!imports) {
            return Promise.resolve(undefined);
        }
        //find last import
        const firstImport = imports[0];
        const lastImport = imports[imports.length - 1];
        const fillDir = vsc.getDir(path);
        const newImportContent = yield organizeImports(fillDir, imports, options);
        let end = lastImport.node.end;
        end += content.substr(end).match(/[\n\s]*/)[0].length;
        vsc.insertAt(newImportContent, firstImport.pos.start, end);
    });
}
exports.SortImports = SortImports;
const sortNamedImports = (specifiers, fullString, orderSpecifiersAsSingleLine) => {
    specifiers.sort((a, b) => a.name.localeCompare(b.name));
    if (orderSpecifiersAsSingleLine) {
        const specifierContent = specifiers.map(s => s.fullString).join(', ');
        fullString = fullString.replace(/\{[^}]+\}/, '{ ' + specifierContent + ' }');
    }
    else {
        const specifierContent = specifiers.map(s => s.fullString).join(',\n  ');
        fullString = fullString.replace(/\{[^}]+\}/, '{\n  ' + specifierContent + '\n}');
    }
    return fullString;
};
const organizeImports = (fillDir, imports, options) => __awaiter(this, void 0, void 0, function* () {
    const relativeRegExp = /^\./;
    const groups = {
        //locals (absolute)
        absoluteDirect: [],
        absolute: [],
        //local (relative)
        relativeDirect: [],
        relative: [],
        //globals
        globalDirect: [],
        global: [],
    };
    //split into global / local
    imports.forEach(_import => {
        let fullPath = '';
        const relative = relativeRegExp.test(_import.path);
        if (relative) {
            fullPath = vsc.joinPaths(fillDir, _import.path);
        }
        else {
            fullPath = vsc.joinPaths(options.basePath, _import.path);
        }
        //base groups settings:
        let local = vsc.doesExists(fullPath);
        if (!local &&
            vsc.doesExists(fullPath + '.ts') ||
            vsc.doesExists(fullPath + '.tsx') ||
            vsc.doesExists(fullPath + '.js') ||
            vsc.doesExists(fullPath + '.jsx')) {
            local = true;
        }
        const direct = !_import.node.importClause;
        // const hasDefault = !!_import.name
        // const hasNamed = _import.specifiers.length > 0
        // const nameSpace = _import.node.importClause && _import.node.importClause.namedBindings && ts.isNamespaceImport(_import.node.importClause.namedBindings)
        if (local && relative) {
            if (direct) {
                groups.relativeDirect.push(_import);
            }
            else {
                groups.relative.push(_import);
            }
        }
        else if (local) {
            if (direct) {
                groups.absoluteDirect.push(_import);
            }
            else {
                groups.absolute.push(_import);
            }
        }
        else {
            if (direct) {
                groups.globalDirect.push(_import);
            }
            else {
                groups.global.push(_import);
            }
        }
    });
    const defaultMapping = options.groups;
    let newImportContent = "";
    defaultMapping.forEach((groupOptions, index) => {
        let group = [];
        groupOptions.groups.forEach(groupName => {
            group = [...group, ...groups[groupName]];
        });
        if (group.length === 0) {
            if (groupOptions.emptyLines) {
                newImportContent = addEmptyLines(newImportContent, options);
            }
            return;
        }
        // sort
        if (groupOptions.sortBy === 'path') {
            group.sort((a, b) => a.path.localeCompare(b.path));
        }
        else if (groupOptions.sortBy === 'name') {
            group.sort((a, b) => a.sortName.localeCompare(b.sortName));
        }
        else {
            group.sort((a, b) => a.node.getText().localeCompare(b.node.getText()));
        }
        // join and add
        newImportContent += group.map(imp => imp.fullString).join('\n') + '\n';
        if (groupOptions.emptyLines) {
            newImportContent = addEmptyLines(newImportContent, options);
        }
    });
    newImportContent = newImportContent.trim() + '\n';
    for (let lines = 0; lines < options.emptyLinesAfterImports; lines++) {
        newImportContent += '\n';
    }
    return newImportContent;
});
const addEmptyLines = (newImportContent, options) => {
    if (!newImportContent.match(/\n\n$/)) {
        // add spaces
        for (let space = 0; space < options.emptyLinesBetweenFilledGroups; space++) {
            newImportContent = newImportContent + '\n';
        }
    }
    return newImportContent;
};
const mapImports = (content, _imports, options) => {
    // All imports before first statement, mapped with import path
    // Map with name?, fullString, and named imports info
    const imports = _imports.map((node, index) => {
        let name = '', sortName = '';
        const path = node.moduleSpecifier
            .getText()
            .replace(/^['"]|['"]$/g, '');
        let importFullString = content
            .substring(index === 0 ? node.pos : _imports[index - 1].end + 1, node.end)
            .trim();
        let specifiers = [];
        const importClause = node.importClause;
        //named imports (specifiers)
        if (importClause) {
            if (importClause.name) {
                name = importClause.name.getText();
                sortName = name;
            }
            if (importClause.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
                specifiers = importClause.namedBindings.elements.map(e => ({
                    fullString: e.getText().trim(),
                    node: e,
                    name: e.name.getText()
                }));
                if (options.orderSpecifiers) {
                    importFullString = sortNamedImports(specifiers, importFullString, options.orderSpecifiersAsSingleLine);
                }
                sortName = sortName + specifiers.map(s => s.name).join();
            }
            else if (importClause.namedBindings && ts.isNamespaceImport(importClause.namedBindings)) {
                sortName = importClause.namedBindings.name.getText();
            }
        }
        else {
            sortName = "___" + path;
        }
        const pos = vsc.createVscodeRangeAndPosition(content, node.pos, node.end);
        return ({
            name,
            sortName,
            pos,
            specifiers,
            fullString: importFullString,
            node: node,
            path,
        });
    });
    return imports;
};
//# sourceMappingURL=SortImports.js.map