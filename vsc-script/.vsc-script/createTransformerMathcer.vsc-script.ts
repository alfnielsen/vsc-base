import * as vsc from 'vsc-base'
import * as ts from 'typescript'

/**
 * This test script try to use tranformers to strongly type collect dependencies and other part of vsc methods.
 * 
 * This dont seem do-able. ex export is 'flag' on varible statement, so all we actaully need to know something about every type element,
 * and the point was not to!!!
 */

let log = '';

export async function run(_path: string) {
   vsc.showMessage('Start transformer test')
   const basePrefix = 'xxxVSCxxx'
   // Need to be precise size for all types: (10 + 2*xxx = 16) // todo hash code instead??
   const parentTypePrefixVariableDeclarartion = 'xxxVARIABLEXXXxxx'
   const parentTypePrefixParamter = 'xxxPARAMETERXXxxx'
   // Need to be precise size for all types: (10 + 2*xxx = 16) // todo hash code instead??
   const commandType = 'xxxAnyNameXXXxxx'


   const VariableName = `${basePrefix}${parentTypePrefixVariableDeclarartion}AnyName`
   const ParamaterName = `${basePrefix}${parentTypePrefixParamter}AnyName`
   const AnyStatements = `${basePrefix}${parentTypePrefixParamter}AnyStatements`
   const Argugment = `${basePrefix}AnyArgugment`
   const oneOf = (s) => { }
   // Source file content
   const matcher = `eport const ${ParamaterName} = (${ParamaterName}) => {
      ${AnyStatements}
      return any
   }`;
   const sf = vsc.tsCreateSourceFile(matcher);
   const theMather = [];
   const visitor = vsc.tsCreateNodeVisitor((node) => {
      // Setup root data
      if (ts.isSourceFile(node)) {
         theMather.push({
            node,
            root: true,
            children: []
         })
         return
      }
      // Setup data
      const nodeParent = node.parent
      const itemParent = theMather.find(item => item.node === nodeParent)
      /**
       * NOTE: still missing 'export' because its 'flag' on another element
       */
      const theMatherItem = {
         node,
         text: node.getText().replace(/\n[\s\S]*/, '(...)'),
         kind: node.kind,
         kindString: ts.SyntaxKind[node.kind],
         parent: itemParent,
         ignoreChildren: false,
         ignoreChildrenOfTypes: [],
         ignoreChildrenOfStringTypes: [],
         matchText: true,
         children: []
      }
      if (itemParent) {
         itemParent.children.push(theMatherItem)
      }
      // find statements:
      log += `Kind: ${ts.SyntaxKind[node.kind]}\t\t\t${node.getText().replace(/\n[\s\S]+/, '(...)')}\n`
      if (ts.isIdentifier(node)) {
         let identifierText = node.getText();
         if (identifierText.indexOf(basePrefix) === 0) {
            identifierText = identifierText.substr(basePrefix.length);
            const parentTypeMatcher = identifierText.substr(0, parentTypePrefixVariableDeclarartion.length);
            identifierText = identifierText.substr(parentTypePrefixVariableDeclarartion.length);
            const command = identifierText.substr(0, commandType.length);
            if (parentTypeMatcher === 'xxxVARIABLEXXXxxx') {
               if (!ts.isVariableDeclaration(node.parent)) {
                  log += 'Parent was not a variable as describe in tsTransformMatcher.';
               } else {
                  // Can be nay variable name
                  theMatherItem.matchText = false;
               }
            }
            if (parentTypeMatcher === 'xxxPARAMETERXXxxx') {
               const paramater = node.parent
               if (!ts.isParameter(paramater)) {
                  log += 'Parent was not a parameters as describe in tsTransformMatcher.';
                  //throw new Error('Parent was not an variable as describe in tsTransformer mather. see documention for correct mather!')
               }
               if (!ts.isFunctionLike(paramater.parent)) {
                  log += 'Params is not for function like!!';
               }
               const functionLike = paramater.parent as ts.FunctionLikeDeclaration;
               if (itemParent.parent.node !== functionLike) {
                  log += '\n  NOOOOOOOO  \n';
                  //log += `Last is not this parent!!!!\n${paramater.parent.getText()}\n${itemParent.node.geText()}\n`;
               } else {
                  theMatherItem.ignoreChildrenOfTypes.push(ts.SyntaxKind.Parameter)
                  theMatherItem.ignoreChildrenOfStringTypes.push(ts.SyntaxKind[ts.SyntaxKind.Parameter])
               }
            }
         }
      }
      theMather.push(theMatherItem)
   })
   vsc.tsTransform(matcher, [visitor])

   const cleanTheMather = theMather.map(i => {
      i.node = vsc.maxDepthReplacer(i.node, 1);
      i.node = keyValueReplacer(i.node, 'node.parent', '..parent');
      i.node = keyValueReplacer(i.node, 'node.parent', '..parent');
      return i;
   })
   log += '\n*\/\n\/\/-----------------------\nconst scf = ' + vsc.toJSONString(cleanTheMather) + '\n\n/*'


   // Add result to log
   log = ` 
/* 
${log}
*/
`
   // Add log to end of open document
   vsc.appendLineToActiveDocument(log);
   // tranforms arrowFunction with one return statement to lambda function
}

const keyValueReplacer = (obj: unknown, key: string, newValue: any): any => {
   if (Array.isArray(obj)) {
      return obj.map(child => keyValueReplacer(child, key, newValue))
   }
   if (typeof obj === "object" && obj !== null) {
      const children: any = {}
      for (const [curretnKey, value] of Object.entries(obj)) {
         if (curretnKey === key) {
            children[curretnKey] = newValue
         } else {
            children[curretnKey] = keyValueReplacer(value, key, newValue + 1)
         }
      }
      return children;
   }
   return obj
}


/* 
Kind: ExpressionStatement			eport
Kind: Identifier			eport
Kind: VariableStatement			const xxxVSCxxxxxxPARAMETERXXxxxAnyName = (xxxVSCxxxxxxPARAMETERXXxxxAnyName) => {(...)
Kind: VariableDeclarationList			const xxxVSCxxxxxxPARAMETERXXxxxAnyName = (xxxVSCxxxxxxPARAMETERXXxxxAnyName) => {(...)
Kind: VariableDeclaration			xxxVSCxxxxxxPARAMETERXXxxxAnyName = (xxxVSCxxxxxxPARAMETERXXxxxAnyName) => {(...)
Kind: Identifier			xxxVSCxxxxxxPARAMETERXXxxxAnyName
Parent was not a parameters as describe in tsTransformMatcher.Params is not for function like!!Kind: ArrowFunction			(xxxVSCxxxxxxPARAMETERXXxxxAnyName) => {(...)
Kind: Parameter			xxxVSCxxxxxxPARAMETERXXxxxAnyName
Kind: Identifier			xxxVSCxxxxxxPARAMETERXXxxxAnyName
Kind: EqualsGreaterThanToken			=>
Kind: Block			{(...)
Kind: ExpressionStatement			xxxVSCxxxxxxPARAMETERXXxxxAnyStatements
Kind: Identifier			xxxVSCxxxxxxPARAMETERXXxxxAnyStatements
Parent was not a parameters as describe in tsTransformMatcher.Params is not for function like!!Kind: ReturnStatement			return any
Kind: Identifier			any

*/
//-----------------------
const scf = [
   {
      "node": {
         "pos": 0,
         "end": 156,
         "flags": 0,
         "modifierFlagsCache": 536870912,
         "transformFlags": 537165968,
         "kind": 284,
         "text": "eport const xxxVSCxxxxxxPARAMETERXXxxxAnyName = (xxxVSCxxxxxxPARAMETERXXxxxAnyName) => {\n      xxxVSCxxxxxxPARAMETERXXxxxAnyStatements\n      return any\n   }",
         "bindDiagnostics": [],
         "languageVersion": 2,
         "fileName": "sourcefile_1555567536936",
         "languageVariant": 0,
         "isDeclarationFile": false,
         "scriptKind": 3,
         "pragmas": {},
         "referencedFiles": [],
         "typeReferenceDirectives": [],
         "libReferenceDirectives": [],
         "amdDependencies": [],
         "hasNoDefaultLib": false,
         "statements": [
            "[vsc: maxDepth 1 reached - Object]",
            "[vsc: maxDepth 1 reached - Object]"
         ],
         "endOfFileToken": {
            "pos": 156,
            "end": 156,
            "flags": 0,
            "modifierFlagsCache": 0,
            "transformFlags": 0,
            "parent": "[vsc: maxDepth 1 reached - Object]",
            "kind": 1
         },
         "nodeCount": 17,
         "identifierCount": 5,
         "identifiers": {},
         "parseDiagnostics": [
            "[vsc: maxDepth 1 reached - Object]"
         ],
         "lineMap": [
            0,
            89,
            135,
            152
         ]
      },
      "root": true,
      "children": [
         {
            "node": {
               "pos": 0,
               "end": 5,
               "flags": 32768,
               "modifierFlagsCache": 536870912,
               "transformFlags": 536870912,
               "parent": {
                  "pos": 0,
                  "end": 156,
                  "flags": 0,
                  "modifierFlagsCache": 536870912,
                  "transformFlags": 537165968,
                  "kind": 284,
                  "text": "eport const xxxVSCxxxxxxPARAMETERXXxxxAnyName = (xxxVSCxxxxxxPARAMETERXXxxxAnyName) => {\n      xxxVSCxxxxxxPARAMETERXXxxxAnyStatements\n      return any\n   }",
                  "bindDiagnostics": "[vsc: maxDepth 1 reached - Array]",
                  "languageVersion": 2,
                  "fileName": "sourcefile_1555567536936",
                  "languageVariant": 0,
                  "isDeclarationFile": false,
                  "scriptKind": 3,
                  "pragmas": "[vsc: maxDepth 1 reached - Object]",
                  "referencedFiles": "[vsc: maxDepth 1 reached - Array]",
                  "typeReferenceDirectives": "[vsc: maxDepth 1 reached - Array]",
                  "libReferenceDirectives": "[vsc: maxDepth 1 reached - Array]",
                  "amdDependencies": "[vsc: maxDepth 1 reached - Array]",
                  "hasNoDefaultLib": false,
                  "statements": "[vsc: maxDepth 1 reached - Array]",
                  "endOfFileToken": "[vsc: maxDepth 1 reached - Object]",
                  "nodeCount": 17,
                  "identifierCount": 5,
                  "identifiers": "[vsc: maxDepth 1 reached - Object]",
                  "parseDiagnostics": "[vsc: maxDepth 1 reached - Array]",
                  "lineMap": "[vsc: maxDepth 1 reached - Array]"
               },
               "kind": 221,
               "expression": {
                  "pos": 0,
                  "end": 5,
                  "flags": 0,
                  "modifierFlagsCache": 536870912,
                  "transformFlags": 536870912,
                  "parent": "[vsc: maxDepth 1 reached - Object]",
                  "escapedText": "eport"
               }
            },
            "text": "eport",
            "kind": 221,
            "kindString": "ExpressionStatement",
            "parent": "[vsc: circular reference]",
            "ignoreChildren": false,
            "ignoreChildrenOfTypes": [],
            "ignoreChildrenOfStringTypes": [],
            "matchText": true,
            "children": [
               {
                  "node": {
                     "pos": 0,
                     "end": 5,
                     "flags": 0,
                     "modifierFlagsCache": 536870912,
                     "transformFlags": 536870912,
                     "parent": {
                        "pos": 0,
                        "end": 5,
                        "flags": 32768,
                        "modifierFlagsCache": 536870912,
                        "transformFlags": 536870912,
                        "parent": "[vsc: maxDepth 1 reached - Object]",
                        "kind": 221,
                        "expression": "[vsc: maxDepth 1 reached - Object]"
                     },
                     "escapedText": "eport"
                  },
                  "text": "eport",
                  "kind": 72,
                  "kindString": "Identifier",
                  "parent": "[vsc: circular reference]",
                  "ignoreChildren": false,
                  "ignoreChildrenOfTypes": [],
                  "ignoreChildrenOfStringTypes": [],
                  "matchText": true,
                  "children": []
               }
            ]
         },
         {
            "node": {
               "pos": 5,
               "end": 156,
               "flags": 0,
               "modifierFlagsCache": 536870912,
               "transformFlags": 537165968,
               "parent": {
                  "pos": 0,
                  "end": 156,
                  "flags": 0,
                  "modifierFlagsCache": 536870912,
                  "transformFlags": 537165968,
                  "kind": 284,
                  "text": "eport const xxxVSCxxxxxxPARAMETERXXxxxAnyName = (xxxVSCxxxxxxPARAMETERXXxxxAnyName) => {\n      xxxVSCxxxxxxPARAMETERXXxxxAnyStatements\n      return any\n   }",
                  "bindDiagnostics": "[vsc: maxDepth 1 reached - Array]",
                  "languageVersion": 2,
                  "fileName": "sourcefile_1555567536936",
                  "languageVariant": 0,
                  "isDeclarationFile": false,
                  "scriptKind": 3,
                  "pragmas": "[vsc: maxDepth 1 reached - Object]",
                  "referencedFiles": "[vsc: maxDepth 1 reached - Array]",
                  "typeReferenceDirectives": "[vsc: maxDepth 1 reached - Array]",
                  "libReferenceDirectives": "[vsc: maxDepth 1 reached - Array]",
                  "amdDependencies": "[vsc: maxDepth 1 reached - Array]",
                  "hasNoDefaultLib": false,
                  "statements": "[vsc: maxDepth 1 reached - Array]",
                  "endOfFileToken": "[vsc: maxDepth 1 reached - Object]",
                  "nodeCount": 17,
                  "identifierCount": 5,
                  "identifiers": "[vsc: maxDepth 1 reached - Object]",
                  "parseDiagnostics": "[vsc: maxDepth 1 reached - Array]",
                  "lineMap": "[vsc: maxDepth 1 reached - Array]"
               },
               "kind": 219,
               "declarationList": {
                  "pos": 5,
                  "end": 156,
                  "flags": 2,
                  "modifierFlagsCache": 536870912,
                  "transformFlags": 537231504,
                  "parent": "[vsc: maxDepth 1 reached - Object]",
                  "kind": 238,
                  "declarations": "[vsc: maxDepth 1 reached - Array]"
               }
            },
            "text": "const xxxVSCxxxxxxPARAMETERXXxxxAnyName = (xxxVSCxxxxxxPARAMETERXXxxxAnyName) => {(...)",
            "kind": 219,
            "kindString": "VariableStatement",
            "parent": "[vsc: circular reference]",
            "ignoreChildren": false,
            "ignoreChildrenOfTypes": [],
            "ignoreChildrenOfStringTypes": [],
            "matchText": true,
            "children": [
               {
                  "node": {
                     "pos": 5,
                     "end": 156,
                     "flags": 2,
                     "modifierFlagsCache": 536870912,
                     "transformFlags": 537231504,
                     "parent": {
                        "pos": 5,
                        "end": 156,
                        "flags": 0,
                        "modifierFlagsCache": 536870912,
                        "transformFlags": 537165968,
                        "parent": "[vsc: maxDepth 1 reached - Object]",
                        "kind": 219,
                        "declarationList": "[vsc: maxDepth 1 reached - Object]"
                     },
                     "kind": 238,
                     "declarations": [
                        "[vsc: maxDepth 1 reached - Object]"
                     ]
                  },
                  "text": "const xxxVSCxxxxxxPARAMETERXXxxxAnyName = (xxxVSCxxxxxxPARAMETERXXxxxAnyName) => {(...)",
                  "kind": 238,
                  "kindString": "VariableDeclarationList",
                  "parent": "[vsc: circular reference]",
                  "ignoreChildren": false,
                  "ignoreChildrenOfTypes": [],
                  "ignoreChildrenOfStringTypes": [],
                  "matchText": true,
                  "children": [
                     {
                        "node": {
                           "pos": 11,
                           "end": 156,
                           "flags": 0,
                           "modifierFlagsCache": 536870912,
                           "transformFlags": 536936592,
                           "parent": {
                              "pos": 5,
                              "end": 156,
                              "flags": 2,
                              "modifierFlagsCache": 536870912,
                              "transformFlags": 537231504,
                              "parent": "[vsc: maxDepth 1 reached - Object]",
                              "kind": 238,
                              "declarations": "[vsc: maxDepth 1 reached - Array]"
                           },
                           "kind": 237,
                           "name": {
                              "pos": 11,
                              "end": 45,
                              "flags": 0,
                              "modifierFlagsCache": 536870912,
                              "transformFlags": 536870912,
                              "parent": "[vsc: maxDepth 1 reached - Object]",
                              "escapedText": "xxxVSCxxxxxxPARAMETERXXxxxAnyName"
                           },
                           "initializer": {
                              "pos": 47,
                              "end": 156,
                              "flags": 0,
                              "modifierFlagsCache": 536870912,
                              "transformFlags": 537133200,
                              "parent": "[vsc: maxDepth 1 reached - Object]",
                              "kind": 197,
                              "parameters": "[vsc: maxDepth 1 reached - Array]",
                              "equalsGreaterThanToken": "[vsc: maxDepth 1 reached - Object]",
                              "body": "[vsc: maxDepth 1 reached - Object]"
                           }
                        },
                        "text": "xxxVSCxxxxxxPARAMETERXXxxxAnyName = (xxxVSCxxxxxxPARAMETERXXxxxAnyName) => {(...)",
                        "kind": 237,
                        "kindString": "VariableDeclaration",
                        "parent": "[vsc: circular reference]",
                        "ignoreChildren": false,
                        "ignoreChildrenOfTypes": [],
                        "ignoreChildrenOfStringTypes": [],
                        "matchText": true,
                        "children": [
                           {
                              "node": {
                                 "pos": 11,
                                 "end": 45,
                                 "flags": 0,
                                 "modifierFlagsCache": 536870912,
                                 "transformFlags": 536870912,
                                 "parent": {
                                    "pos": 11,
                                    "end": 156,
                                    "flags": 0,
                                    "modifierFlagsCache": 536870912,
                                    "transformFlags": 536936592,
                                    "parent": "[vsc: maxDepth 1 reached - Object]",
                                    "kind": 237,
                                    "name": "[vsc: maxDepth 1 reached - Object]",
                                    "initializer": "[vsc: maxDepth 1 reached - Object]"
                                 },
                                 "escapedText": "xxxVSCxxxxxxPARAMETERXXxxxAnyName"
                              },
                              "text": "xxxVSCxxxxxxPARAMETERXXxxxAnyName",
                              "kind": 72,
                              "kindString": "Identifier",
                              "parent": "[vsc: circular reference]",
                              "ignoreChildren": false,
                              "ignoreChildrenOfTypes": [
                                 151
                              ],
                              "ignoreChildrenOfStringTypes": [
                                 "Parameter"
                              ],
                              "matchText": true,
                              "children": []
                           },
                           {
                              "node": {
                                 "pos": 47,
                                 "end": 156,
                                 "flags": 0,
                                 "modifierFlagsCache": 536870912,
                                 "transformFlags": 537133200,
                                 "parent": {
                                    "pos": 11,
                                    "end": 156,
                                    "flags": 0,
                                    "modifierFlagsCache": 536870912,
                                    "transformFlags": 536936592,
                                    "parent": "[vsc: maxDepth 1 reached - Object]",
                                    "kind": 237,
                                    "name": "[vsc: maxDepth 1 reached - Object]",
                                    "initializer": "[vsc: maxDepth 1 reached - Object]"
                                 },
                                 "kind": 197,
                                 "parameters": [
                                    "[vsc: maxDepth 1 reached - Object]"
                                 ],
                                 "equalsGreaterThanToken": {
                                    "pos": 83,
                                    "end": 86,
                                    "flags": 0,
                                    "modifierFlagsCache": 536870912,
                                    "transformFlags": 536870912,
                                    "parent": "[vsc: maxDepth 1 reached - Object]",
                                    "kind": 37
                                 },
                                 "body": {
                                    "pos": 86,
                                    "end": 156,
                                    "flags": 0,
                                    "modifierFlagsCache": 536870912,
                                    "transformFlags": 537133072,
                                    "parent": "[vsc: maxDepth 1 reached - Object]",
                                    "kind": 218,
                                    "multiLine": true,
                                    "statements": "[vsc: maxDepth 1 reached - Array]"
                                 }
                              },
                              "text": "(xxxVSCxxxxxxPARAMETERXXxxxAnyName) => {(...)",
                              "kind": 197,
                              "kindString": "ArrowFunction",
                              "parent": "[vsc: circular reference]",
                              "ignoreChildren": false,
                              "ignoreChildrenOfTypes": [],
                              "ignoreChildrenOfStringTypes": [],
                              "matchText": true,
                              "children": [
                                 {
                                    "node": {
                                       "pos": 49,
                                       "end": 82,
                                       "flags": 0,
                                       "modifierFlagsCache": 536870912,
                                       "transformFlags": 536870912,
                                       "parent": {
                                          "pos": 47,
                                          "end": 156,
                                          "flags": 0,
                                          "modifierFlagsCache": 536870912,
                                          "transformFlags": 537133200,
                                          "parent": "[vsc: maxDepth 1 reached - Object]",
                                          "kind": 197,
                                          "parameters": "[vsc: maxDepth 1 reached - Array]",
                                          "equalsGreaterThanToken": "[vsc: maxDepth 1 reached - Object]",
                                          "body": "[vsc: maxDepth 1 reached - Object]"
                                       },
                                       "kind": 151,
                                       "name": {
                                          "pos": 49,
                                          "end": 82,
                                          "flags": 0,
                                          "modifierFlagsCache": 536870912,
                                          "transformFlags": 536870912,
                                          "parent": "[vsc: maxDepth 1 reached - Object]",
                                          "escapedText": "xxxVSCxxxxxxPARAMETERXXxxxAnyName"
                                       }
                                    },
                                    "text": "xxxVSCxxxxxxPARAMETERXXxxxAnyName",
                                    "kind": 151,
                                    "kindString": "Parameter",
                                    "parent": "[vsc: circular reference]",
                                    "ignoreChildren": false,
                                    "ignoreChildrenOfTypes": [],
                                    "ignoreChildrenOfStringTypes": [],
                                    "matchText": true,
                                    "children": [
                                       {
                                          "node": {
                                             "pos": 49,
                                             "end": 82,
                                             "flags": 0,
                                             "modifierFlagsCache": 536870912,
                                             "transformFlags": 536870912,
                                             "parent": {
                                                "pos": 49,
                                                "end": 82,
                                                "flags": 0,
                                                "modifierFlagsCache": 536870912,
                                                "transformFlags": 536870912,
                                                "parent": "[vsc: maxDepth 1 reached - Object]",
                                                "kind": 151,
                                                "name": "[vsc: maxDepth 1 reached - Object]"
                                             },
                                             "escapedText": "xxxVSCxxxxxxPARAMETERXXxxxAnyName"
                                          },
                                          "text": "xxxVSCxxxxxxPARAMETERXXxxxAnyName",
                                          "kind": 72,
                                          "kindString": "Identifier",
                                          "parent": "[vsc: circular reference]",
                                          "ignoreChildren": false,
                                          "ignoreChildrenOfTypes": [
                                             151
                                          ],
                                          "ignoreChildrenOfStringTypes": [
                                             "Parameter"
                                          ],
                                          "matchText": true,
                                          "children": []
                                       }
                                    ]
                                 },
                                 {
                                    "node": {
                                       "pos": 83,
                                       "end": 86,
                                       "flags": 0,
                                       "modifierFlagsCache": 536870912,
                                       "transformFlags": 536870912,
                                       "parent": {
                                          "pos": 47,
                                          "end": 156,
                                          "flags": 0,
                                          "modifierFlagsCache": 536870912,
                                          "transformFlags": 537133200,
                                          "parent": "[vsc: maxDepth 1 reached - Object]",
                                          "kind": 197,
                                          "parameters": "[vsc: maxDepth 1 reached - Array]",
                                          "equalsGreaterThanToken": "[vsc: maxDepth 1 reached - Object]",
                                          "body": "[vsc: maxDepth 1 reached - Object]"
                                       },
                                       "kind": 37
                                    },
                                    "text": "=>",
                                    "kind": 37,
                                    "kindString": "EqualsGreaterThanToken",
                                    "parent": "[vsc: circular reference]",
                                    "ignoreChildren": false,
                                    "ignoreChildrenOfTypes": [],
                                    "ignoreChildrenOfStringTypes": [],
                                    "matchText": true,
                                    "children": []
                                 },
                                 {
                                    "node": {
                                       "pos": 86,
                                       "end": 156,
                                       "flags": 0,
                                       "modifierFlagsCache": 536870912,
                                       "transformFlags": 537133072,
                                       "parent": {
                                          "pos": 47,
                                          "end": 156,
                                          "flags": 0,
                                          "modifierFlagsCache": 536870912,
                                          "transformFlags": 537133200,
                                          "parent": "[vsc: maxDepth 1 reached - Object]",
                                          "kind": 197,
                                          "parameters": "[vsc: maxDepth 1 reached - Array]",
                                          "equalsGreaterThanToken": "[vsc: maxDepth 1 reached - Object]",
                                          "body": "[vsc: maxDepth 1 reached - Object]"
                                       },
                                       "kind": 218,
                                       "multiLine": true,
                                       "statements": [
                                          "[vsc: maxDepth 1 reached - Object]",
                                          "[vsc: maxDepth 1 reached - Object]"
                                       ]
                                    },
                                    "text": "{(...)",
                                    "kind": 218,
                                    "kindString": "Block",
                                    "parent": "[vsc: circular reference]",
                                    "ignoreChildren": false,
                                    "ignoreChildrenOfTypes": [],
                                    "ignoreChildrenOfStringTypes": [],
                                    "matchText": true,
                                    "children": [
                                       {
                                          "node": {
                                             "pos": 88,
                                             "end": 134,
                                             "flags": 0,
                                             "modifierFlagsCache": 536870912,
                                             "transformFlags": 536870912,
                                             "parent": {
                                                "pos": 86,
                                                "end": 156,
                                                "flags": 0,
                                                "modifierFlagsCache": 536870912,
                                                "transformFlags": 537133072,
                                                "parent": "[vsc: maxDepth 1 reached - Object]",
                                                "kind": 218,
                                                "multiLine": true,
                                                "statements": "[vsc: maxDepth 1 reached - Array]"
                                             },
                                             "kind": 221,
                                             "expression": {
                                                "pos": 88,
                                                "end": 134,
                                                "flags": 0,
                                                "modifierFlagsCache": 536870912,
                                                "transformFlags": 536870912,
                                                "parent": "[vsc: maxDepth 1 reached - Object]",
                                                "escapedText": "xxxVSCxxxxxxPARAMETERXXxxxAnyStatements"
                                             }
                                          },
                                          "text": "xxxVSCxxxxxxPARAMETERXXxxxAnyStatements",
                                          "kind": 221,
                                          "kindString": "ExpressionStatement",
                                          "parent": "[vsc: circular reference]",
                                          "ignoreChildren": false,
                                          "ignoreChildrenOfTypes": [],
                                          "ignoreChildrenOfStringTypes": [],
                                          "matchText": true,
                                          "children": [
                                             {
                                                "node": {
                                                   "pos": 88,
                                                   "end": 134,
                                                   "flags": 0,
                                                   "modifierFlagsCache": 536870912,
                                                   "transformFlags": 536870912,
                                                   "parent": {
                                                      "pos": 88,
                                                      "end": 134,
                                                      "flags": 0,
                                                      "modifierFlagsCache": 536870912,
                                                      "transformFlags": 536870912,
                                                      "parent": "[vsc: maxDepth 1 reached - Object]",
                                                      "kind": 221,
                                                      "expression": "[vsc: maxDepth 1 reached - Object]"
                                                   },
                                                   "escapedText": "xxxVSCxxxxxxPARAMETERXXxxxAnyStatements"
                                                },
                                                "text": "xxxVSCxxxxxxPARAMETERXXxxxAnyStatements",
                                                "kind": 72,
                                                "kindString": "Identifier",
                                                "parent": "[vsc: circular reference]",
                                                "ignoreChildren": false,
                                                "ignoreChildrenOfTypes": [
                                                   151
                                                ],
                                                "ignoreChildrenOfStringTypes": [
                                                   "Parameter"
                                                ],
                                                "matchText": true,
                                                "children": []
                                             }
                                          ]
                                       },
                                       {
                                          "node": {
                                             "pos": 134,
                                             "end": 151,
                                             "flags": 0,
                                             "modifierFlagsCache": 536870912,
                                             "transformFlags": 537133072,
                                             "parent": {
                                                "pos": 86,
                                                "end": 156,
                                                "flags": 0,
                                                "modifierFlagsCache": 536870912,
                                                "transformFlags": 537133072,
                                                "parent": "[vsc: maxDepth 1 reached - Object]",
                                                "kind": 218,
                                                "multiLine": true,
                                                "statements": "[vsc: maxDepth 1 reached - Array]"
                                             },
                                             "kind": 230,
                                             "expression": {
                                                "pos": 147,
                                                "end": 151,
                                                "flags": 0,
                                                "modifierFlagsCache": 536870912,
                                                "transformFlags": 536870912,
                                                "parent": "[vsc: maxDepth 1 reached - Object]",
                                                "originalKeywordKind": 120,
                                                "escapedText": "any"
                                             }
                                          },
                                          "text": "return any",
                                          "kind": 230,
                                          "kindString": "ReturnStatement",
                                          "parent": "[vsc: circular reference]",
                                          "ignoreChildren": false,
                                          "ignoreChildrenOfTypes": [],
                                          "ignoreChildrenOfStringTypes": [],
                                          "matchText": true,
                                          "children": [
                                             {
                                                "node": {
                                                   "pos": 147,
                                                   "end": 151,
                                                   "flags": 0,
                                                   "modifierFlagsCache": 536870912,
                                                   "transformFlags": 536870912,
                                                   "parent": {
                                                      "pos": 134,
                                                      "end": 151,
                                                      "flags": 0,
                                                      "modifierFlagsCache": 536870912,
                                                      "transformFlags": 537133072,
                                                      "parent": "[vsc: maxDepth 1 reached - Object]",
                                                      "kind": 230,
                                                      "expression": "[vsc: maxDepth 1 reached - Object]"
                                                   },
                                                   "originalKeywordKind": 120,
                                                   "escapedText": "any"
                                                },
                                                "text": "any",
                                                "kind": 72,
                                                "kindString": "Identifier",
                                                "parent": "[vsc: circular reference]",
                                                "ignoreChildren": false,
                                                "ignoreChildrenOfTypes": [],
                                                "ignoreChildrenOfStringTypes": [],
                                                "matchText": true,
                                                "children": []
                                             }
                                          ]
                                       }
                                    ]
                                 }
                              ]
                           }
                        ]
                     }
                  ]
               }
            ]
         }
      ]
   },
   "[vsc: circular reference]",
   "[vsc: circular reference]",
   "[vsc: circular reference]",
   "[vsc: circular reference]",
   "[vsc: circular reference]",
   "[vsc: circular reference]",
   "[vsc: circular reference]",
   "[vsc: circular reference]",
   "[vsc: circular reference]",
   "[vsc: circular reference]",
   "[vsc: circular reference]",
   "[vsc: circular reference]",
   "[vsc: circular reference]",
   "[vsc: circular reference]",
   "[vsc: circular reference]"
]

/*
*/
