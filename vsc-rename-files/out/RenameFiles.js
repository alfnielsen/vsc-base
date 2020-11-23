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
const vsc = require("vsc-base");
var ReplacerType;
(function (ReplacerType) {
    ReplacerType["FilesAndFolderName"] = "FilesAndFolderName";
    ReplacerType["FolderName"] = "FolderName";
    ReplacerType["FileName"] = "FileName";
})(ReplacerType || (ReplacerType = {}));
class RenameFiles {
    /**
     * The main method that runs the create template output
     */
    rename(selectedPath, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedDir = vsc.getDir(selectedPath);
            const [_, folderName] = vsc.splitPath(selectedDir);
            const state = {
                selectedPath,
                selectedDir,
                setIndexAtEnd: false,
                setIndexAtEndOfFolder: false,
                incSubFolder: true,
                replaceIndex: false,
                replaceIndexForFolders: false,
                resetIndexForFolders: true,
                resetIndexForEachFolder: true,
                addIndexWhenExist: true,
                files: [],
                folders: [],
                useReg: true,
                replacer: {
                    from: folderName,
                    to: "New-Name",
                    appliesTo: ReplacerType.FilesAndFolderName,
                },
            };
            //const folders = getFolders(dir, filePaths)
            const { onCommand, sendSetHTML: set, dispose } = vsc.startWebview(context, {
                title: `Rename files`,
                style: `
            #main { padding: 10px;  }
            .close { position: fixed; top:10px; right: 10px;}
            .from { background: var(--vscode-diffEditor-removedTextBackground); text-decoration: line-through; }
            .to { background: var(--vscode-diffEditor-insertedTextBackground); }
            .line {margin-bottom: 8px;}
            .newNameDiffWrap { margin-left:40px; background: rgba(120,120,120, 0.6); }
            .newNameWrap { padding:2px; margin-left:10px;  }
            .skip { text-decoration: line-through; color: #aaa !important; }
            .error_msg { color: #900; }
            .hrline { margin: 8px 0px; display:block; height: 1px; width: 100%; border-top:1px solid var(--vscode-foreground); }
            .hrsubline { margin: 4px 0px; display:block; height: 1px; width: 100%; border-top:1px dashed var(--vscode-foreground); }
            .settings { padding: 10px; border: 1px solid var(--vscode-foreground); }
            input[type=text] { width: 120px; }
            h3 { margin-bottom: 4px; }
            i { font-size: smaller; }
         `,
                body: `
            <h2>Rename Files</h2>
            <strong>Selected folder:</strong> ${state.selectedDir}<br/>
            <div class='settings'>
               <strong>Settings:</strong><br/>
               ${renderCheckbox("incSubFolder", state.incSubFolder, "Include sub-folders")}<br/>
               ${renderCheckbox("useReg", state.useReg, "Use RegExp<sup>1</sup>")}<br/>
               <div class='hrsubline'>&nbsp;</div>
               Add index ${renderCheckbox("addIndexWhenExist", state.addIndexWhenExist, " when coping to an exiting name")}<br/>
               Replace $index<sup>2</sup>:
               ${renderCheckbox("replaceIndex", state.replaceIndex, " in file name")}
               ${renderCheckbox("replaceIndexForFolders", state.replaceIndexForFolders, " in folder name")}
               <br/>
               Reset the $index:
               ${renderCheckbox("resetIndexForFolders", state.resetIndexForFolders, " for folders")}
               ${renderCheckbox("resetIndexForEachFolder", state.resetIndexForEachFolder, " for each new folder (File names)")}
               <br/>
               Add $index at end of name: 
               ${renderCheckbox("setIndexAtEnd", state.setIndexAtEnd, "For file name")}
               ${renderCheckbox("setIndexAtEndOfFolder", state.setIndexAtEndOfFolder, "For folder name")}
            </div>
            <h3>Replace:</h3>
            <i>- <sup>1</sup>For RegExp: Add \/[gimusy] in end for flags, use $1, $2 ect for captured groups</i><br/>
            <i>- <sup>2</sup>Write $index for adding index number (if setting is added)</i><br/>
            <i>- <sup>3</sup>Write [\\U\\u\\L\\l] for change casing in groups (ex: First upper, rest lower: \\u\\L$1)</i><br/>
            <br/>
            <div id="replacer">
               Replace <input type="text" onKeyup="sendCommand('setReplacerProp',{prop:'from', value:this.value})" 
                     value="${state.replacer.from}" />
                  with <input type="text" onKeyup="sendCommand('setReplacerProp',{prop:'to', value:this.value})" 
                     value="${state.replacer.to}" /> 
                  for 
                  <select onChange="sendCommand('setReplacerProp',{prop:'appliesTo', value:this.value})">
                     <option value="${ReplacerType.FilesAndFolderName}" selected="selected">Files and folders</option>
                     <option value="${ReplacerType.FileName}">Files</option>
                     <option value="${ReplacerType.FolderName}">Folders</option>
                  </select>
                  <br/>
            </div>
            <div class='hrsubline'>&nbsp;</div>
            <div id='main'></div>
            <br/>
            <div id='info'></div>
            <button class='close' onClick="sendCommand('close')">Cancel</button>
         `,
            });
            update(state, set);
            yield onCommand((command, value, resolve) => __awaiter(this, void 0, void 0, function* () {
                switch (command) {
                    case "setProp":
                        //@ts-ignore
                        state[value.prop] = value.value;
                        break;
                    case "setReplacerProp":
                        //@ts-ignore
                        state.replacer[value.prop] = value.value;
                        break;
                    case "apply":
                        yield applyRenaming(state);
                        resolve();
                        break;
                    case "close":
                        resolve();
                        break;
                }
                update(state, set);
            }));
            dispose();
        });
    }
}
exports.default = RenameFiles;
const update = (state, set) => __awaiter(this, void 0, void 0, function* () {
    setStateRegExp(state);
    yield getFoldersAndFiles(state);
    yield set("#main", renderState(state));
});
const renderCheckbox = (prop, value, msg) => `
   <label onClick="sendCommand('setProp', {prop:'${prop}', value: document.getElementById('${prop}').checked})">
   <input id='${prop}' type='checkbox' ${value ? "checked" : ""}/> 
   ${msg}
   </label>
`;
const applyRenaming = (state) => __awaiter(this, void 0, void 0, function* () {
    if (state.files.length) {
        for (const fileObj of state.files) {
            if (!fileObj.alreadyExists) {
                yield vsc.rename(fileObj.from, fileObj.to);
            }
        }
    }
    if (state.folders.length) {
        // sort so long is first to ensure correct rename order
        const sortedFolders = state.folders.sort((a, b) => b.to.length - a.to.length);
        for (const folderObj of sortedFolders) {
            if (!folderObj.alreadyExists) {
                yield vsc.rename(folderObj.from, folderObj.to);
            }
        }
    }
});
const renderState = (state) => {
    let content = `   `;
    content += `
      <h3>Files <i>(${state.files.length} files in total)</i></h3>
      ${state.files.map((file) => renderRenameObj(file)).join("\n")}
      `;
    content += `<br/>
         <h3>Folders <i>(${state.folders.length} folders in total)</i></h3>
         ${state.folders.map((folder) => renderRenameObj(folder)).join("\n")}
      `;
    content += `<br/><br/>
  This will rename: <br/>
   - ${state.folders.length} folder(s) <br/>
   - ${state.files.length} file(s) <br/>
   Total rename: ${state.files.length + state.folders.length}
   <br/>
   <br/>
   `;
    if (state.files.length || state.folders.length) {
        content += `
         <button onClick="sendCommand('apply')">Rename matched files (and folders)</button>
      `;
    }
    return content;
};
const renderRenameObj = (item) => {
    if (item.alreadyExists) {
        return `
      <div class='error_msg'>Rename to existing path! This will be skipped!</div>
      <div class='line skip'>${item.dir}/${item.replaceHtml}</div>
      `;
    }
    return `
      <div class='line'> ${item.dir}/${item.oldName} <span class='newNameDiffWrap'> ${item.replaceHtml} </span> ⇨ <span class='newNameWrap'> ${item.newName}</span></div>
   `;
};
const createRenameObject = (dir, oldName, isFolder, path, state, replacer, index, prevList, toAddIndex) => {
    let newName = replacer.to;
    let replaceHtml = "";
    let found = false;
    let indexUsed = false;
    if ((newName.includes("$index") && state.replaceIndex && !isFolder) ||
        (state.replaceIndexForFolders && isFolder)) {
        newName = newName.replace("$index", "" + index.value);
        indexUsed = true;
    }
    // CircleTower  :M: To  (To, )
    if (state.useReg && replacer.fromRegExp) {
        const match = oldName.match(replacer.fromRegExp);
        if (match) {
            replaceHtml = replaceWithCaseOperations(oldName, replacer.fromRegExp, newName, (replaceText) => `<span class='from'>${vsc.escapeHtml(match[0])}</span><span class='to'>${vsc.escapeHtml(replaceText)}</span>`);
            let nextNewName = replaceWithCaseOperations(oldName, replacer.fromRegExp, newName);
            newName = nextNewName;
            found = true;
        }
    }
    if (!state.useReg) {
        replaceHtml = oldName.replace(replacer.from, `<span class='from'>${vsc.escapeHtml(replacer.from)}</span><span class='to'>${vsc.escapeHtml(newName)}</span>`);
        newName = oldName.replace(replacer.from, newName);
        if (oldName !== newName) {
            found = true;
        }
    }
    if (toAddIndex ||
        (state.setIndexAtEnd && !isFolder) ||
        (state.setIndexAtEndOfFolder && isFolder)) {
        newName += index.value;
        indexUsed = true;
    }
    if (found) {
        let to = vsc.joinPaths(dir, newName);
        if (path[0] === "/" && to[0] !== "/") {
            to = "/" + to;
        }
        let alreadyExists = vsc.doesExists(to) || prevList.some((x) => x.to === to);
        if (alreadyExists && state.addIndexWhenExist) {
            index.value += 1;
            return createRenameObject(dir, oldName, isFolder, path, state, replacer, index, prevList, true);
        }
        if (indexUsed) {
            index.value += 1;
        }
        return {
            path,
            oldName,
            newName,
            dir,
            from: path,
            to,
            alreadyExists,
            index: indexUsed ? index.value : -1,
            replaceHtml,
        };
    }
};
const getFoldersAndFiles = (state) => __awaiter(this, void 0, void 0, function* () {
    const includePath = state.incSubFolder ? "**/*" : "*";
    const allFilePaths = yield vsc.findFilePathsFromBase(state.selectedDir, includePath);
    const allFoldersPaths = getFolders(state.selectedDir, allFilePaths);
    allFoldersPaths.sort();
    let index = { value: 1 };
    const foundFiles = [];
    let lastFolder = "";
    // files
    if (state.replacer.appliesTo !== ReplacerType.FolderName) {
        allFilePaths.forEach((path) => {
            let [dir, oldName] = vsc.splitPath(path);
            const renameObject = createRenameObject(dir, oldName, false, path, state, state.replacer, index, foundFiles);
            if (renameObject) {
                foundFiles.push(renameObject);
            }
            const [folder] = vsc.splitPath(path);
            if (lastFolder !== folder) {
                lastFolder = folder;
                if (state.resetIndexForEachFolder) {
                    index.value = 1;
                }
            }
        });
    }
    if (state.resetIndexForFolders) {
        index.value = 1;
    }
    // folders:
    const foundFolders = [];
    if (state.replacer.appliesTo !== ReplacerType.FileName) {
        allFoldersPaths.forEach((path) => {
            let [dir, oldName] = vsc.splitPath(path);
            const renameObject = createRenameObject(dir, oldName, true, path, state, state.replacer, index, foundFolders);
            if (renameObject) {
                foundFolders.push(renameObject);
            }
        });
    }
    state.files = foundFiles;
    state.folders = foundFolders;
});
const getFolders = (basePath, filePaths) => {
    const baseDir = vsc.getDir(basePath);
    const folderPaths = [baseDir];
    filePaths.forEach((path) => {
        const dirPath = vsc.getDir(path);
        const relPath = vsc.subtractPath(dirPath, baseDir);
        if (!relPath) {
            return;
        }
        const subFolders = relPath.split("/");
        subFolders.reduce((p, c) => {
            p += "/" + c;
            const found = folderPaths.includes(p);
            if (!found) {
                folderPaths.push(p);
            }
            return p;
        }, baseDir);
    });
    return folderPaths;
};
const setStateRegExp = (state) => {
    // Regexp
    if (state.useReg) {
        let regString = state.replacer.from;
        const matchFlags = regString.match(/\/([gimusy]+)$/);
        let flag = "";
        if (matchFlags) {
            regString = regString.replace(/\/([gimusy]+)$/, "");
            flag = matchFlags[1];
        }
        let reg;
        try {
            reg = new RegExp(regString, flag);
            state.replacer.fromRegExp = new RegExp(regString, flag);
        }
        catch (e) { }
    }
    else {
        state.replacer.fromRegExp = undefined;
    }
};
/**
 * From vscode: https://github.com/microsoft/vscode/blob/c332f2de48ff42b069622cb8b78b0ada660447f6/src/vs/workbench/services/search/common/replace.ts
 *
 * replaceWithCaseOperations applies case operations to relevant replacement strings and applies
 * the affected $N arguments. It then passes unaffected $N arguments through to string.replace().
 *
 * \u			=> upper-cases one character in a match.
 * \U			=> upper-cases ALL remaining characters in a match.
 * \l			=> lower-cases one character in a match.
 * \L			=> lower-cases ALL remaining characters in a match.
 *
 * NOTE:
 * Modified to return used replace string
 */
const _caseOpsRegExp = new RegExp(/([^\\]*?)((?:\\[uUlL])+?|)(\$[0-9]+)(.*?)/g);
const replaceWithCaseOperations = (text, regex, simpleString, updateOut = (t) => t) => {
    // Short-circuit the common path.
    var shortCircuitString = updateOut(simpleString);
    if (!/\\[uUlL]/.test(shortCircuitString)) {
        return text.replace(regex, shortCircuitString);
    }
    // Store the values of the search parameters.
    const firstMatch = regex.exec(text);
    if (firstMatch === null) {
        return text.replace(regex, shortCircuitString);
    }
    let patMatch;
    let newReplaceString = "";
    let lastIndex = 0;
    let lastMatch = "";
    // For each annotated $N, perform text processing on the parameters and perform the substitution.
    while ((patMatch = _caseOpsRegExp.exec(simpleString)) !== null) {
        lastIndex = patMatch.index;
        const fullMatch = patMatch[0];
        lastMatch = fullMatch;
        let caseOps = patMatch[2]; // \u, \l\u, etc.
        const money = patMatch[3]; // $1, $2, etc.
        if (!caseOps) {
            newReplaceString += fullMatch;
            continue;
        }
        const replacement = firstMatch[parseInt(money.slice(1))];
        if (!replacement) {
            newReplaceString += fullMatch;
            continue;
        }
        const replacementLen = replacement.length;
        newReplaceString += patMatch[1]; // prefix
        caseOps = caseOps.replace(/\\/g, "");
        let i = 0;
        for (; i < caseOps.length; i++) {
            switch (caseOps[i]) {
                case "U":
                    newReplaceString += replacement.slice(i).toUpperCase();
                    i = replacementLen;
                    break;
                case "u":
                    newReplaceString += replacement[i].toUpperCase();
                    break;
                case "L":
                    newReplaceString += replacement.slice(i).toLowerCase();
                    i = replacementLen;
                    break;
                case "l":
                    newReplaceString += replacement[i].toLowerCase();
                    break;
            }
        }
        // Append any remaining replacement string content not covered by case operations.
        if (i < replacementLen) {
            newReplaceString += replacement.slice(i);
        }
        newReplaceString += patMatch[4]; // suffix
    }
    // Append any remaining trailing content after the final regex match.
    newReplaceString += simpleString.slice(lastIndex + lastMatch.length);
    let newString = updateOut(newReplaceString);
    return text.replace(regex, newString);
};
//# sourceMappingURL=RenameFiles.js.map