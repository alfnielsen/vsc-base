//vsc-script-name: WebView Test > Search files in project
import * as ts from "typescript"
import * as vsc from "vsc-base"
import * as vscode from "vscode"

export async function run(path: string, context: vscode.ExtensionContext) {
   var rootPath = vsc.getRootPath(path);
   let allFilePaths = await vsc.findFilePaths('**\/*.{js,jsx,ts,tsx}')
   allFilePaths = allFilePaths.slice(0, 1500);
   const appController = new AppController(rootPath);
   await appController.generateFileMap(allFilePaths);
   //webview
   const { onCommand, sendSetHTML: set, dispose } = vsc.startWebview(context, {
      title: "App Controller",
      script: `
         </script>
         <script
  src="https://code.jquery.com/jquery-3.5.1.min.js"
  integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
  crossorigin="anonymous">
      `,
      style: `
         .foldername{ font-weight: bold; }
         .a { cursor: pointer; }
         .g { color: #393; }
         .foldername_div{ display: none; margin:10px; }
         .foldername_name{ color: #66f; font-weight: bold; cursor: pointer; }
         .filename{ font-weight: bold; }
         .filename_div{ display: none; margin:10px; }
         .filename_name{ color: #090; font-weight: bold; cursor: pointer; }
      `,
      body: `
         files: ${allFilePaths.length}<br/>
         files: ${appController.files.length}<br/>
         folders: ${appController.folders.length}<br/>
         <h2>Root</h2>
         ${appController.printRoot()}
         <h2>File tree</h2>
         ${appController.rootFolder.print()}
         <br><br>
         <div id='info'>info</div>
      `
   })
   // ${appController.folders.map(f => f.appPath).join("<br/>")}
   //      <button onClick="sendCommand('show','1')">Show '1'</button>

   await onCommand(async (command, value, resolve) => {
      switch (command) {
         case "show":
            vsc.showMessage(value)
            break
         case "open":
            vsc.open(value, 2)
            break
         case "end":
            resolve()
            break
         case "search":
            const files = await vsc.findFilePaths(value)
            set("#info", "" + files.length)
            break
      }
   })
   dispose()
   vsc.showMessage("Script Done!")
}

export class AppController {
   constructor(
      public rootPath: string,
      public folders: FolderObject[] = [],
      public files: FileObject[] = [],
      public rootFolder: FolderObject = new FolderObject('_ROOT_', rootPath, '')
   ) {
      this.folders.push(this.rootFolder);
   }

   printRoot() {
      const roots = this.files.filter(f => f.imported.length === 0)
      return `
         Number of roots: ${ roots.length}<hr/>
         ${roots.map(f => `
            ${f.name} (${f.appPath})<br/>
         `)}
      `
   }

   async generateFileMap(filePaths: string[]) {
      for (let filePath of filePaths) {
         // file structure
         var appPath = vsc.subtractPath(filePath, this.rootPath);
         const folderObject = this.generateFolders(appPath);
         filePath = vsc.trimLeadingDash(filePath);
         const name = filePath.replace(/^.*\/([^\/]+)$/, '$1');
         const fileObject = new FileObject(name, filePath, appPath, folderObject);
         folderObject.files.push(fileObject);
         this.files.push(fileObject);
         // file content
      }
      // map imports to fileObjects
      for (const file of this.files) {
         const source = await vsc.getFileContent(file.absolutePaths);
         const importPaths = this.getImports(file, source);
         file.imports = importPaths;
         // for (const _import of file.imports) {
         //    let filePath = this.getRealFile(file, _import.filePath)
         //    if (filePath) {
         //       let fileObject = this.files.find(f => f.absolutePaths === filePath);
         //       if (fileObject) {
         //          _import.fileObject = fileObject;
         //       }
         //    }
         // }
      }

   }

   getRealFile(file: FileObject, filePath: string, ) {
      var basePath = filePath
      var absPath = vsc.joinPaths(this.rootPath, filePath);
      var relPath = vsc.joinPaths(file.folder.absolutePaths, filePath);
      var optionalPaths = [
         basePath, absPath, relPath
      ]
      for (var i = 0; i < optionalPaths.length; i++) {
         const baseFilePath = optionalPaths[i]
         const realPath = this.testFileEndings(baseFilePath);
         if (realPath) {
            return realPath;
         }
      }
   }

   testFileEndings(baseFilePath: string) {
      var endings = [".js", ".ts", ".jsx", ".tsx"];
      for (var i = 0; i < endings.length; i++) {
         const filePath = vsc.cleanPath(baseFilePath + endings[i])
         if (vsc.doesExists(filePath)) {
            return filePath;
         }
      }
   }

   getImports(fileObject: FileObject, source: string) {
      const reg = /\b(?:import(?:[^"']|\n)*["']([^"']+)["'])|(?:require\([\s\n]*["']([^"']+)["'][\s\n]*\))/g
      const imports: FileImport[] = []
      let match: RegExpExecArray | null;
      while ((match = reg.exec(source)) !== null) {
         const pathMatch = match[1] || match[2]
         const path = this.getRealFile(fileObject, pathMatch);
         const fi = new FileImport(pathMatch, path)
         const lines = source.substring(0, match.index).split(/\n/)
         const lineNum = lines.length
         const linePos = lines[lines.length - 1].length
         fi.line = lineNum;
         fi.position = linePos;
         fi.exist = !!path;
         if (path) {
            let importFileObject = this.files.find(f => f.absolutePaths === path);
            if (importFileObject) {
               fi.fileObject = importFileObject;
               importFileObject.imported.push(fileObject)
            }
         }
         imports.push(fi);
      }
      return imports;
   }

   ttt: string = '';
   generateFolders(appPath: string) {
      const folderStrings = appPath.split(/\//);
      folderStrings.pop();
      // this.ttt += "<br/>\n";
      // this.ttt += ">>> appPath: " + appPath + " <br/>\n";
      let fs = '', psf = ''
      let folderObj: FolderObject = this.rootFolder;
      folderStrings.forEach(cfs => {
         fs += "/" + cfs;
         let me = this.folders.find(f => f.appPath === fs);
         // * fs is the previous folder in this iteration *
         // this.ttt += " ((( <br/>";
         // this.ttt += " # Part: " + cfs + " # <br/> ))) ";
         if (!me) {
            var appPath = vsc.joinPaths(this.rootPath, fs);
            folderObj.parent = folderObj;
            folderObj = new FolderObject(cfs, appPath, fs, folderObj);
            folderObj.parent.folders.push(folderObj);
            // this.ttt += " # NEW FOLDER <br/> ";
            // this.ttt += " # Name:" + folderObj.name + " #<br/> ";
            // this.ttt += " # abs:" + folderObj.absolutePaths + " #<br/> ";
            // this.ttt += " # appPath:" + folderObj.appPath + " #<br/> ";
            this.folders.push(folderObj);
         } else {
            folderObj = me;
         }
         // * add last to avoid last (the file part) *
         psf = fs;

      })
      return folderObj;
   }
}

export class FolderObject {
   constructor(
      public name: string,
      public absolutePaths: string,
      public appPath: string,
      public parent?: FolderObject,
      public folders: FolderObject[] = [],
      public files: FileObject[] = []
   ) { }

   print() {
      let pid = this.appPath.replace(/[^\w]/g, "_")
      let s = `<div class='foldername'>
      <span onclick='$("#root_${pid}").toggle()'>
         <span class='foldername_name'>${this.name}</span> (folders: <span class='g'>${this.folders.length}</span> files: <span class='g'>${this.files.length}</span>)
      </span>
         <div id='root_${pid}' class='foldername_div'>
      `;

      // s += `${prependLines}--- Files (${this.files.length}) ---<br/>`
      s += this.files.map(file => {
         return file.print()
      }).join("\n");
      // s += `${prependLines}--- Folders (${this.folders.length}) ---<br/>`
      s += this.folders.map(folder => {
         return `${folder.print()}`
      }).join("\n");
      s += "</div>";
      s += "</div>";
      return s;
   }
}

export class FileObject {
   constructor(
      public name: string,
      public absolutePaths: string,
      public appPath: string,
      public folder: FolderObject,
      public imports: FileImport[] = [],
      public imported: FileObject[] = [],
   ) { }

   print() {
      let pid = this.appPath.replace(/[^\w]/g, "_")
      let s = `<div class='filename'>
         <span onclick='$("#root_${pid}").toggle()'>
            <span class='filename_name'>${this.name}</span> 
            (imports: <span class='g'>${this.imports.length}</span>)
         </span>
         (<a onclick="sendCommand('open','${this.absolutePaths}')">Open</a>)
         <div id='root_${pid}' class='filename_div'>
      `;

      // s += `${prependLines}--- Files (${this.files.length}) ---<br/>`
      s += this.imports.map(imp => {
         return `<div class='fileimport'>${imp.line}: ${imp.filePath} (${imp.exist ? 'found!' : ''}) </div>`
      }).join("\n");
      s += "</div>";
      s += "</div>";
      return s;
   }
}

export class FileImport {
   constructor(
      public filePath: string,
      public realPath?: string,
      public fileObject?: FileObject,
      public variables: FileImportVariable[] = [],
      public line = 0,
      public position = 0,
      public exist = true,
   ) { }
}

export class FileImportVariable {
   name: string
   path: string
   alias?: string
   isNameSpaceImport: boolean
}
