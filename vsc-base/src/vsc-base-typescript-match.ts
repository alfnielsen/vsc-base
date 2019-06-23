import * as ts from 'typescript'

import * as vsc from './vsc-base'

/** vsc-base method
 * @description
 * Find is a direct parsedChild that matches conditions in a callback\
 * See also [tsHasChild](http://vsc-base.org/#tsHasChild) \
 * See also [tsFindGrandChild](http://vsc-base.org/#tsFindGrandChildNode)
 * @see [tsFindChildNode](http://vsc-base.org/#tsFindChildNode)
 * @vscType ts
 * @oneLineEx const childNode = vsc.tsFindChild(node, childNodeTestCallback }) 
 * @ex 
const childNode = vsc.tsFindChild(node, (childNode)=> vsc.tsIdVariable(childNode, {
   name:/^varName$/, 
   isConst: true 
})) 
 * @returns ts.Node | undefined
 */
export const tsFindChild = (node: ts.Node, callback: (child: ts.Node) => boolean): ts.Node | undefined => {
   const children = vsc.tsGetParsedChildren(node);
   for (let index = 0; index < children.length; index++) {
      const child = children[index]
      const found = callback(child)
      if (found) {
         return child
      }
   }
   return undefined;
}

/** vsc-base method
 * @description
 * Test if direct parsedChild that matches conditions in a callback \
 * Using [tsFind](http://vsc-base.org/#tsFind) \
 * See also [tsHasGrandChild](http://vsc-base.org/#tsHasGrandChild)
 * @see [tsHasChild](http://vsc-base.org/#tsHasChild)
 * @vscType ts
 * @oneLineEx const child = vsc.tsHasChild(node, childNodeTestCallback }) 
 * @ex 
const hasChild = vsc.tsHasChild(node, (childNode) => vsc.tsIsVariable(childNode, {
   name:/^varName$/, 
   isConst: true 
})) 
 * @returns boolean
 */
export const tsHasChild = (node: ts.Node, callback: (child: ts.Node) => boolean): boolean => {
   return !!vsc.tsFindChild(node, callback);
}

/** vsc-base method
 * @description
 * Test if it has all children or grandChildren (child's child) that matches conditions in a callback \
 * Using [tsHasChild](http://vsc-base.org/#tsHasChild)
 * @see [tsHasChildren](http://vsc-base.org/#tsHasChildren)
 * @vscType ts
 * @oneLineEx const childNode = vsc.tsHasChildren(node, [childNodeTestCallback1, childNodeTestCallback2])
 * @ex 
// find a variable any where within the parent node, that is a const and has a staring name of: varName
const hasGrandChildNode = vsc.tsHasChildren(node, [
   childNode => vsc.tsIsVariable(childNode, { name:/^varName1/ }),
   childNode => vsc.tsIsVariable(childNode, { name:/^varName2/ }) 
}) 
 * @returns ts.Node | undefined
 */
export const tsHasChildren = (node: ts.Node, callbacks: ((child: ts.Node, depth: number) => boolean)[]): boolean => {
   for (let index = 0; index < callbacks.length; index++) {
      const callback = callbacks[index];
      if (!vsc.tsHasGrandChild(node, callback)) {
         return false
      }
   }
   return true
}



/** vsc-base method
 * @description
 * Find a child or grandChild (child's child) that matches conditions in a callback\
 * @see [tsFindGrandChild](http://vsc-base.org/#tsFindGrandChild)
 * @vscType ts
 * @oneLineEx const childNode = vsc.tsFindGrandChild(node, childNodeTestCallback)
 * @ex 
// find a variable any where within the parent node, that is a const and has a staring name of: varName
const childNode = vsc.tsFindGrandChild(node, (childNode) => vsc.tsIsVariable(childNode, {
   name:/^varName/, 
   isConst: true 
})) 
 * @returns ts.Node | undefined
 */
export const tsFindGrandChild = (node: ts.Node, callback: (child: ts.Node, depth: number) => boolean): ts.Node | undefined => {
   let found: ts.Node | undefined
   const mathChild = (node: ts.Node, depth: number) => {
      if (found) {
         return;
      }
      const children = vsc.tsGetParsedChildren(node);
      for (let index = 0; index < children.length; index++) {
         const child = children[index]
         const result = callback(child, depth)
         if (result) {
            found = child
         } else {
            mathChild(child, depth + 1)
         }
      }
   }
   mathChild(node, 0)
   return found
}

/** vsc-base method
 * @description
 * Test if it has  a child or grandChild (child's child) that matches conditions in a callback \
 * Using [tsFindGrandchild](http://vsc-base.org/#tsFindGrandchild)
 * @see [tsHasGrandChild](http://vsc-base.org/#tsHasGrandChild)
 * @vscType ts
 * @oneLineEx const found = vsc.tsFindGrandChild(node, childNodeTestCallback)
 * @ex 
// find a variable any where within the parent node, that is a const and has a staring name of: varName
const found = vsc.tsHasGrandChild(node, (childNode) => vsc.tsIsVariable(childNode, {
   name:/^varName/, 
   isConst: true 
})) 
 * @returns boolean
 */
export const tsHasGrandChild = (node: ts.Node, callback: (child: ts.Node, depth: number) => boolean): boolean => {
   return !!vsc.tsFindGrandChild(node, callback);
}

/** vsc-base method
 * @description
 * Test if it has all Children or grandChildren (child's child) that matches conditions in a callback \
 * Using [tsFindGrandchild](http://vsc-base.org/#tsFindGrandchild)
 * @see [tsHasGrandChildren](http://vsc-base.org/#tsHasGrandChildren)
 * @vscType ts
 * @oneLineEx const found = vsc.tsHasGrandChildren(node, [childNodeTestCallback1, childNodeTestCallback2])
 * @ex 
// find a variable any where within the parent node, that is a const and has a staring name of: varName
const found = vsc.tsHasGrandChildren(node, [
   childNode => return vsc.tsIsVariable(childNode, { name:/^varName1/ }),
   childNode => return vsc.tsIsVariable(childNode, { name:/^varName2/ }) 
}) 
 * @returns boolean
 */
export const tsHasGrandChildren = (node: ts.Node, callbacks: ((child: ts.Node, depth: number) => boolean)[]): boolean => {
   for (let index = 0; index < callbacks.length; index++) {
      const callback = callbacks[index];
      if (!vsc.tsHasGrandChild(node, callback)) {
         return false
      }
   }
   return true
}

/** vsc-base method
 * @description
 * Find a parent or ancestor (parent's parent) that matches conditions in a callback
 * @see [tsFindAncestor](http://vsc-base.org/#tsFindAncestor)
 * @vscType ts
 * @oneLineEx const ancestor = vsc.tsFindAncestor(node, ancestorNodeTestCallback)
 * @ex 
// find a function with name 'someCaller'
const ancestor = vsc.tsFindAncestor(node, (childNode) => vsc.tsIsFunction(childNode, {
   name:/^someCaller$/
})) 
 * @returns ts.Node | undefined
 */
export const tsFindAncestor = (node: ts.Node, callback: (ancestor: ts.Node, depth: number) => boolean): ts.Node | undefined => {
   let ancestor = node.parent, depth = 0
   while (ancestor) {
      depth += 1;
      const found = callback(ancestor, depth)
      if (found) {
         return ancestor
      }
      ancestor = ancestor.parent
   }
   return undefined
}

/** vsc-base method
 * @description
 * Test if it has a parent or ancestor (parent's parent) that matches conditions in a callback \
 * Using [tsFindAncestor](http://vsc-base.org/#tsFindAncestor)
 * @see [tsHasAncestor](http://vsc-base.org/#tsHasAncestor)
 * @vscType ts
 * @oneLineEx const hasAncestor = vsc.tsHasAncestor(node, ancestorNodeTestCallback)
 * @ex 
// find a function with name 'someCaller'
const hasAncestor = vsc.tsHasAncestor(node, (childNode) => vsc.tsIsFunction(childNode, {
   name:/^someCaller$/
})) 
 * @returns boolean
 */
export const tsHasAncestor = (node: ts.Node, callback: (ancestor: ts.Node, depth: number) => boolean): boolean => {
   return !!vsc.tsFindAncestor(node, callback)
}

/** vsc-base method
 * @description
 * Test is it has all ancestors (parent's parent) that matches conditions in a callback \
 * Using [tsFindAncestor](http://vsc-base.org/#tsFindAncestor)
 * @see [tsHasAncestors](http://vsc-base.org/#tsHasAncestors)
 * @vscType ts
 * @oneLineEx const hasAncestor = vsc.tsHasAncestor(node, ancestorNodeTestCallback)
 * @ex 
// find a function with name 'someCaller'
const hasAncestor = vsc.tsHasAncestor(node, (childNode) => vsc.tsIsFunction(childNode, {
   name:/^someCaller$/
})) 
 * @returns boolean
 */
export const tsHasAncestors = (node: ts.Node, callbacks: ((ancestor: ts.Node, depth: number) => boolean)[]): boolean => {
   for (let index = 0; index < callbacks.length; index++) {
      const callback = callbacks[index];
      if (!vsc.tsHasAncestor(node, callback)) {
         return false
      }
   }
   return true
}


/** vsc-base method
 * @description
 * Test is a node is a object property (node: ts.PropertyAssignment) \
 * Optional test for its name with a string or regexp. \
 * Optional test for tsHasAncestor and hasGrandChild \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * Optional value can be tested against a string, a number (with a string, number or regexp). \
 * See [tsIsValue](http://vsc-base.org/#tsIsValue) 
 * @see [tsMatchObjectProperty](http://vsc-base.org/#tsMatchObjectProperty)
 * @vscType ts
 * @oneLineEx const objNode = vsc.tsMatchObjectProperty(node, options)
 * @ex 
const objNode = vsc.tsMatchObjectProperty(node, { name: /^keyName$/ })
 * @returns ts.PropertyAssignment | undefined
 */
export const tsMatchObjectProperty: (node: ts.Node | undefined, options?: {
   name?: RegExp | string
   value?: (RegExp | string | number | boolean | null)
   variableName?: RegExp | string
   parentObjectPropertyName?: RegExp | string
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => ts.PropertyAssignment | undefined = (node, options) => {
   if (!node || !ts.isPropertyAssignment(node)) { return }
   if (!options) {
      return node
   }
   const {
      variableName,
      parentObjectPropertyName,
   } = options
   if (!vsc.tsIsNode(node, options)) {
      return
   }
   if (variableName !== undefined) {
      const variable = node.parent.parent;
      if (!vsc.tsIsVariable(variable, { name: variableName })) {
         return
      }
   }
   if (parentObjectPropertyName !== undefined) {
      const parentObjectProperty = node.parent.parent;
      if (!vsc.tsIsObjectProperty(parentObjectProperty, { name: variableName })) {
         return
      }
   }
   return node
}

/** vsc-base method
 * @description
 * Test if a node is a function \
 * (node: ts.isArrowFunction, ts.isFunctionExpression or ts.isFunctionDeclaration) \
 * Optional test for its name with a string or regexp. \
 * (For ArrowFunction's and FunctionExpression's it will test for a variable declaration that points to the function) \
 * Optional test for tsHasAncestor and hasGrandChild \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * @see [tsMatchFunction](http://vsc-base.org/#tsMatchFunction)
 * @vscType ts
 * @oneLineEx const funcNone = vsc.tsMatchFunction(node, options)
 * @ex 
const funcNone = vsc.tsMatchFunction(node, { name: /^myCaller$/ })
 * @returns ts.ArrowFunction | ts.FunctionExpression | ts.FunctionDeclaration | undefined
 */
export const tsMatchFunction: (node: ts.Node | undefined, options?: {
   name?: RegExp | string,
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => ts.ArrowFunction | ts.FunctionExpression | ts.FunctionDeclaration | undefined = (node, options) => {
   if (!node || !(ts.isArrowFunction(node) || ts.isFunctionExpression(node) || ts.isFunctionDeclaration(node))) {
      return
   }
   if (!options) {
      return node
   }
   const { name } = options
   delete options.name //leave name
   if (!vsc.tsIsNode(node, options)) {
      return
   }
   if (name !== undefined) {
      let funcName: string | undefined
      if ((ts.isArrowFunction(node) || ts.isFunctionExpression(node)) && ts.isVariableDeclaration(node.parent)) {
         funcName = node.parent.name.getText()
      }
      if (ts.isFunctionDeclaration(node) && node.name) {
         funcName = node.name.getText()
      }
      if (!funcName) {
         return
      }
      if (name instanceof RegExp && !name.test(funcName)) { return }
      if (typeof name === 'string' && name !== funcName) { return }
   }

   return node
}


/** vsc-base method
 * @description
 * Test is a node is a variable declaration (node: ts.VariableDeclaration) \
 * Optional test for its name with a string or regexp, \
 * Optional test if its a const, let or var. \
 * Optional test for tsHasAncestor and hasGrandChild \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * Optional value can be tested against a string, a number (with a string, number or regexp). \
 * See [tsIsValue](http://vsc-base.org/#tsIsValue) 
 * @see [tsMatchVariable](http://vsc-base.org/#tsMatchVariable)
 * @vscType ts
 * @oneLineEx const varNode = vsc.tsMatchVariable(node, options)
 * @ex 
const varNode = vsc.tsMatchVariable(node, { name: /^myCaller$/ })
 * @returns ts.VariableDeclaration | undefined
 */
export const tsMatchVariable: (node: ts.Node | undefined, options?: {
   name?: RegExp | string
   value?: (RegExp | string | number | boolean | null)
   isConst?: boolean
   isLet?: boolean
   isVar?: boolean,
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => ts.VariableDeclaration | undefined = (node, options) => {
   if (!node || !ts.isVariableDeclaration(node)) { return }
   if (!options) {
      return node
   }
   const {
      isConst,
      isLet,
      isVar,
   } = options
   if (!vsc.tsIsNode(node, options)) {
      return
   }
   if (isConst !== undefined && (!node.parent || isConst !== (node.parent.flags === 2))) { return }
   if (isLet !== undefined && (!node.parent || isLet !== (node.parent.flags === 1))) { return }
   if (isVar !== undefined && (!node.parent || isVar !== (node.parent.flags === 0))) { return }
   return node
}


/** vsc-base method
 * @description
 * Test is a node is a identifier (node: ts.Identifier) \
 * Optional test for its name with a string or regexp, \
 * Optional test for tsHasAncestor and hasGrandChild \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * @see [tsMatchIdentifier](http://vsc-base.org/#tsMatchIdentifier)
 * @vscType ts
 * @oneLineEx const identifierNode = vsc.tsMatchIdentifier(node, options)
 * @ex 
const identifierNode = vsc.tsMatchIdentifier(node, { name: /^myCaller$/ })
 * @returns ts.Identifier | undefined
 */
export const tsMatchIdentifier: (node: ts.Node | undefined, options?: {
   name?: RegExp | string
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
}) => ts.Identifier | undefined = (node, options) => {
   if (!node || !ts.isIdentifier(node)) { return }
   if (!options) {
      return node
   }
   const { name } = options
   if (name) {
      if (name instanceof RegExp && !name.test(node.getText())) { return }
      if (typeof name === 'string' && name !== node.getText()) { return }

   }
   delete options.name // leave name
   if (!vsc.tsIsNode(node, options)) {
      return
   }
   return node
}

/** vsc-base method
 * @description
 * Test is a node is an interface (node: ts.InterfaceDeclaration) \
 * and optional test for its name with a string or regexp. \
 * Optional test for hasAncestor and hasGrandchild. \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * @see [tsMatchEnum](http://vsc-base.org/#tsMatchEnum)
 * @vscType ts
 * @oneLineEx const interfaceNode = vsc.tsMatchInterface(node, options)
 * @ex 
const interfaceNode = vsc.tsMatchInterface(node, { name: /^myCaller$/ })
 * @returns ts.EnumDeclaration | undefined
 */
export const tsMatchInterface: (node: ts.Node | undefined, options?: {
   name?: RegExp | string
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => ts.InterfaceDeclaration | undefined = (node, options) => {
   if (!node || !ts.isInterfaceDeclaration(node)) { return }
   if (!options) {
      return node
   }
   if (!vsc.tsIsNode(node, options)) {
      return
   }
   return node
}

/** vsc-base method
 * @description
 * Test is a node is an type reference (node: ts.TypeReferenceNode) \
 * and optional test for its name with a string or regexp. \
 * Optional test for hasAncestor and hasGrandchild. \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * @see [tsMatchEnum](http://vsc-base.org/#tsMatchEnum)
 * @vscType ts
 * @oneLineEx const typeRefNode = vsc.tsMatchTypeRef(node, options)
 * @ex 
const typeRefNode = vsc.tsMatchTypeRef(node, { name: /^myCaller$/ })
 * @returns ts.TypeReferenceNode | undefined
 */
export const tsMatchTypeRef: (node: ts.Node | undefined, options?: {
   name?: RegExp | string
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => ts.TypeReferenceNode | undefined = (node, options) => {
   if (!node || !ts.isTypeReferenceNode(node)) { return }
   if (!options) {
      return node
   }
   const { name } = options
   if (name instanceof RegExp && !name.test(node.typeName.getText())) { return }
   if (typeof name === 'string' && name !== node.typeName.getText()) { return }
   delete options.name //leave name
   if (!vsc.tsIsNode(node, options)) {
      return
   }
   return node
}

/** vsc-base method
 * @description
 * Test is a node is an enum  declaration (node: ts.EnumDeclaration) \
 * and optional test for its name with a string or regexp. \
 * Optional test for hasAncestor and hasGrandchild. \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * @see [tsMatchEnum](http://vsc-base.org/#tsMatchEnum)
 * @vscType ts
 * @oneLineEx const enumNode = vsc.tsMatchEnum(node, options)
 * @ex 
const enumNode = vsc.tsMatchEnum(node, { name: /^myCaller$/ })
 * @returns ts.EnumDeclaration | undefined
 */
export const tsMatchEnum: (node: ts.Node | undefined, options?: {
   name?: RegExp | string
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => ts.EnumDeclaration | undefined = (node, options) => {
   if (!node || !ts.isEnumDeclaration(node)) { return }
   if (!options) {
      return node
   }
   if (!vsc.tsIsNode(node, options)) {
      return
   }
   return node
}

/** vsc-base method
 * @description
 * Test is a node is a enum member (node: ts.EnumMember) \
 * and optional test for its name, the enum' name (its parent) \
 * it value, hasAncestor and hasGrandchild \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * @see [tsMatchEnumMember](http://vsc-base.org/#tsMatchEnumMember)
 * @vscType ts
 * @oneLineEx const enumMemberNode = vsc.tsMatchEnumMember(node, options)
 * @ex 
const enumMemberNode = vsc.tsMatchEnumMember(node, { name: /^myCaller$/ })
 * @returns ts.EnumMember | undefined
 */
export const tsMatchEnumMember: (node: ts.Node | undefined, options?: {
   name?: RegExp | string
   value?: (RegExp | string | number | boolean | null)
   enumName?: RegExp | string,
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => ts.EnumMember | undefined = (node, options) => {
   if (!node || !ts.isEnumMember(node)) {
      return
   }
   if (!options) {
      return node
   }
   const { enumName } = options
   if (!vsc.tsIsNode(node, options)) {
      return
   }
   if (enumName) {
      const parentEnumName = node.parent.name
      if (enumName instanceof RegExp && !enumName.test(parentEnumName.getText())) { return }
      if (typeof enumName === 'string' && enumName !== parentEnumName.getText()) { return }
   }
   return node
}

/** vsc-base method
 * @description
 * Test is a node is a call expression (node: ts.CallExpression) \
 * and optional test for its name, and arguments.\
 * it's value, hasAncestor and hasGrandchild \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * @see [tsMatchCall](http://vsc-base.org/#tsMatchCall)
 * @vscType ts
 * @oneLineEx const callNode = vsc.tsMatchCall(node, options)
 * @ex 
const callNode = vsc.tsMatchCall(node, { name: /^myCaller$/ })
 * @returns ts.CallExpression | undefined
 */
export const tsMatchCall: (node: ts.Node | undefined, options?: {
   name?: RegExp | string
   hasArgument?: (parent: ts.Node) => boolean
   hasArguments?: ((parent: ts.Node) => boolean)[]
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => ts.CallExpression | undefined = (node, options) => {
   if (!node || !ts.isCallExpression(node)) {
      return
   }
   if (!options) {
      return node
   }
   const { name, hasArgument, hasArguments } = options
   delete options.name //leave name
   if (!vsc.tsIsNode(node, options)) {
      return
   }
   if (name) {
      const callName = node.expression.getText()
      if (name instanceof RegExp && !name.test(callName)) { return }
      if (typeof name === 'string' && name !== callName) { return }
   }
   if (hasArgument && !node.arguments.some(arg => hasArgument(arg))) {
      return
   }
   if (hasArguments && !hasArguments.every(_hasArgument => {
      return node.arguments.some(arg => _hasArgument(arg));
   })) {
      return
   }
   return node
}

/** vsc-base method
 * @description
 * Test is a node is a call expression (node: ts.CallExpression) \
 * and optional test for its name, and arguments.\
 * it's value, hasAncestor and hasGrandchild \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * @see [tsIsCall](http://vsc-base.org/#tsIsCall)
 * @vscType ts
 * @oneLineEx const isCall = vsc.tsIsCall(node, options)
 * @ex 
const isCall = vsc.tsMatchCall(node, { name: /^myCaller$/ })
 * @returns boolean
 */
export const tsIsCall: (node: ts.Node | undefined, options?: {
   name?: RegExp | string
   hasArgument?: (parent: ts.Node) => boolean
   hasArguments?: ((parent: ts.Node) => boolean)[]
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => {
   return !!vsc.tsMatchCall(node, options)
}



/** vsc-base method
 * @description
 * Test is a node is an import declaration (node: ts.ImportDeclaration) \
 * and optional test for its default ímport name ( import x from '' )
 * hasSpecifiers ( import names in brakes: import &#123; x &#125; from '').\
 * or nameSpace import name: ( import * as namespace from '' ) \
 * or path for matching the source path. \
 * or direct import which has no import names ( import form '' )
 * Note: An alias in a specifier is its name: ( import &#123; some as x &#125; from '' ).
 * @see [tsMatchImport](http://vsc-base.org/#tsMatchImport)
 * @vscType ts
 * @oneLineEx const _import = vsc.tsMatchCall(node, options)
 * @ex 
const aReactImport = vsc.tsMatchImport(node, { path: /react/ })
 * @returns ts.ImportDeclaration | undefined
 */
export const tsMatchImport: (node: ts.Node | undefined, options?: {
   path?: RegExp | string
   direct?: boolean,
   defaultName?: RegExp | string
   nameSpace?: RegExp | string
   hasSpecifiersName?: RegExp | string
   hasSpecifiers?: (elements: ts.NodeArray<ts.ImportSpecifier>) => boolean
}) => ts.ImportDeclaration | undefined = (node, options) => {
   if (!node || !ts.isImportDeclaration(node)) {
      return
   }
   if (!options) {
      return node
   }
   const { direct, defaultName, path, nameSpace, hasSpecifiersName, hasSpecifiers } = options

   if (direct !== undefined) {
      if (node.importClause && direct === false) { return }
      if (!node.importClause && direct === true) { return }
   }

   if (path !== undefined) {
      if (!node.moduleSpecifier) { return }
      const text = node.moduleSpecifier.getText()
      if (path instanceof RegExp && !path.test(text)) { return }
      if (typeof path === 'string' && path !== text) { return }
   }

   if (defaultName !== undefined) {
      if (!node.importClause || !node.importClause.name) { return }
      const name = node.importClause.name.getText()
      if (defaultName instanceof RegExp && !defaultName.test(name)) { return }
      if (typeof defaultName === 'string' && defaultName !== name) { return }
   }

   if (nameSpace !== undefined) {
      if (
         !node.importClause ||
         !node.importClause.namedBindings ||
         !ts.isNamespaceImport(node.importClause.namedBindings)
      ) { return }
      const name = node.importClause.namedBindings.name.getText()
      if (nameSpace instanceof RegExp && !nameSpace.test(name)) { return }
      if (typeof nameSpace === 'string' && nameSpace !== name) { return }
   }

   if (hasSpecifiersName !== undefined) {
      if (
         !node.importClause ||
         !node.importClause.namedBindings ||
         !ts.isNamedImports(node.importClause.namedBindings)
      ) { return }
      const found = node.importClause.namedBindings.elements.some(el => {
         const name = el.name.getText()
         if (hasSpecifiersName instanceof RegExp && hasSpecifiersName.test(name)) { return true }
         if (typeof hasSpecifiersName === 'string' && hasSpecifiersName === name) { return true }
         return false
      })
      if (!found) {
         return
      }
   }

   if (hasSpecifiers !== undefined) {
      if (
         !node.importClause ||
         !node.importClause.namedBindings ||
         !ts.isNamedImports(node.importClause.namedBindings) ||
         !hasSpecifiers(node.importClause.namedBindings.elements)
      ) { return }
   }

   return node
}

/** vsc-base method
 * @description
 * Test is a node is an import declaration (node: ts.ImportDeclaration) \
 * and optional test for its default ímport name ( import x from '' )
 * hasSpecifiers ( import names in brakes: import &#123; x &#125; from '').\
 * or nameSpace import name: ( import * as namespace from '' ) \
 * or path for matching the source path. \
 * or direct import which has no import names ( import form '' )
 * Note: An alias in a specifier is its name: ( import &#123; some as x &#125; from '' ).
 * See also [tsMatchImport](http://vsc-base.org/#tsMatchImport)
 * @see [tsIsImport](http://vsc-base.org/#tsIsImport)
 * @vscType ts
 * @oneLineEx const isImport = vsc.tsIsImport(node, options)
 * @ex 
const isImport = vsc.tsIsImport(node, { path: /react/ })
 * @returns boolean
 */
export const tsIsImport: (node: ts.Node | undefined, options?: {
   path?: RegExp | string
   direct: boolean,
   defaultName?: RegExp | string
   nameSpace?: RegExp | string
   hasSpecifiersName?: RegExp | string
}) => boolean = (node, options) => {
   return !!vsc.tsMatchImport(node, options)
}




/** vsc-base method
 * @description
 * Test is a node is a object property (node: ts.PropertyAssignment) \
 * Uses [tsMatchObjectProperty](http://vsc-base.org/#tsMatchObjectProperty)
 * @see [tsIsObjectProperty](http://vsc-base.org/#tsIsObjectProperty)
 * @vscType ts
 * @oneLineEx const isObjNode = vsc.tsIsObjectProperty(node, options)
 * @ex 
const isObjNode = vsc.tsIsObjectProperty(node, { name: /^keyName$/ })
 * @returns boolean
 */
export const tsIsObjectProperty: (node: ts.Node | undefined, options?: {
   name?: RegExp | string
   value?: (RegExp | string | number | boolean | null)
   variableName?: RegExp | string
   parentObjectPropertyName?: RegExp | string
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => {
   return !!vsc.tsMatchObjectProperty(node, options)
}

/** vsc-base method
 * @description
 * Test if a node is a function \
 * (node: ts.isArrowFunction, ts.isFunctionExpression or ts.isFunctionDeclaration) \
 * Uses [tsMatchFunction](http://vsc-base.org/#tsMatchFunction)
 * @see [tsIsFunction](http://vsc-base.org/#tsIsFunction)
 * @vscType ts
 * @oneLineEx const isFunctionNone = vsc.tsIsFunction(node, options)
 * @ex 
const isFunctionNone = vsc.tsIsFunction(node, { name: /^myCaller$/ })
 * @returns boolean
 */
export const tsIsFunction: (node: ts.Node | undefined, options?: {
   name?: RegExp | string,
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => {
   return !!tsMatchFunction(node, options)
}


/** vsc-base method
 * @description
 * Test is a node is a variable declaration (node: ts.VariableDeclaration) \
 * Uses [tsMatchVariable](http://vsc-base.org/#tsMatchVariable)
 * @see [tsIsVariable](http://vsc-base.org/#tsIsVariable)
 * @vscType ts
 * @oneLineEx const isVariableNode = vsc.tsIsVariable(node, options)
 * @ex 
const isVariableNode = vsc.tsIsVariable(node, { name: /^myCaller$/ })
 * @returns boolean
 */
export const tsIsVariable: (node: ts.Node | undefined, options?: {
   name?: RegExp | string
   value?: (RegExp | string | number | boolean | null)
   isConst?: boolean
   isLet?: boolean
   isVar?: boolean,
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => {
   return !!vsc.tsMatchVariable(node, options)
}


/** vsc-base method
 * @description
 * Test is a node is a variable declaration (node: ts.VariableDeclaration) \
 * Uses [tsMatchIdentifier](http://vsc-base.org/#tsMatchIdentifier)
 * @see [tsIsIdentifier](http://vsc-base.org/#tsIsIdentifier)
 * @vscType ts
 * @oneLineEx const isIdentifierNode = vsc.tsIsIdentifier(node, options)
 * @ex 
const isIdentifierNode = vsc.tsIsIdentifier(node, { name: /^myCaller$/ })
 * @returns boolean
 */
export const tsIsIdentifier: (node: ts.Node | undefined, options?: {
   name?: RegExp | string
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => {
   return !!vsc.tsMatchIdentifier(node, options)
}

/** vsc-base method
 * @description
 * Test is a node is an interface (node: ts.InterfaceDeclaration) \
 * Uses [tsMatchInterface](http://vsc-base.org/#tsMatchInterface)
 * @see [tsIsEnum](http://vsc-base.org/#tsIsEnum)
 * @vscType ts
 * @oneLineEx const isInterfaceNode = vsc.tsIsInterface(node, options)
 * @ex 
const isInterfaceNode = vsc.tsIsInterface(node, { name: /^myCaller$/ })
 * @returns boolean
 */
export const tsIsInterface: (node: ts.Node | undefined, options?: {
   name?: RegExp | string
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => {
   return !!vsc.tsMatchInterface(node, options)
}

/** vsc-base method
 * @description
 * Test is a node is an type reference (node: ts.TypeReferenceNode) \
 * Uses [tsMatchTypeRef](http://vsc-base.org/#tsMatchTypeRef)
 * @see [tsIsEnum](http://vsc-base.org/#tsIsEnum)
 * @vscType ts
 * @oneLineEx const isTypeRefNode = vsc.tsIsTypeRef(node, options)
 * @ex 
const isTypeRefNode = vsc.tsIsTypeRef(node, { name: /^myCaller$/ })
 * @returns boolean
 */
export const tsIsTypeRef: (node: ts.Node | undefined, options?: {
   name?: RegExp | string
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => {
   return !!vsc.tsMatchTypeRef(node, options)
}

/** vsc-base method
 * @description
 * Test is a node is an enum  declaration (node: ts.EnumDeclaration) \
 * Uses [tsMatchEnum](http://vsc-base.org/#tsMatchEnum)
 * @see [tsIsEnum](http://vsc-base.org/#tsIsEnum)
 * @vscType ts
 * @oneLineEx const isEnumNode = vsc.tsIsEnum(node, options)
 * @ex 
const isEnumNode = vsc.tsIsEnum(node, { name: /^myCaller$/ })
 * @returns boolean
 */
export const tsIsEnum: (node: ts.Node | undefined, options?: {
   name?: RegExp | string
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => {
   return !!vsc.tsMatchEnum(node, options)
}

/** vsc-base method
 * @description
 * Test is a node is a enum member (node: ts.EnumMember) \
 * Uses [tsMatchEnumMember](http://vsc-base.org/#tsMatchEnumMember)
 * @see [tsIsEnumMember](http://vsc-base.org/#tsIsEnumMember)
 * @vscType ts
 * @oneLineEx const isEnumMember = vsc.tsIsEnumMember(node, options)
 * @ex 
const isEnumMember = vsc.tsIsEnumMember(node, { name: /^myCaller$/ })
 * @returns boolean
 */
export const tsIsEnumMember: (node: ts.Node | undefined, options?: {
   name?: RegExp | string
   value?: (RegExp | string | number | boolean | null)
   enumName?: RegExp | string,
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => {
   return !!vsc.tsMatchEnumMember(node, options)
}




/** vsc-base method
 * @description
 * Base test for node properties. \
 * Optional test for its name with a string or regexp. \
 * (return false for node that don't have name property)\
 * Optional test for tsHasAncestor and hasGrandChild \
 * See [tsHasAncestor](http://vsc-base.org/#tsHasAncestor), [tsHasAncestors](http://vsc-base.org/#tsHasAncestors), [hasGrandChild](http://vsc-base.org/#hasGrandChild) and [hasGrandChildren](http://vsc-base.org/#hasGrandChildren) \
 * Optional value can be tested against a string, a number (with a string, number or regexp). \
 * (return false for node that don't have initializer)\
 * See [tsIsValue](http://vsc-base.org/#tsIsValue) \
 * @see [tsIsNode](http://vsc-base.org/#tsIsNode)
 * @vscType ts
 * @oneLineEx const found = vsc.tsIsNode(node, options)
 * @ex 
const found = vsc.tsIsNode(node, { name: /^keyName$/ })
 * @returns boolean
 */
export const tsIsNode: (node: ts.Node | undefined, options?: {
   name?: RegExp | string
   value?: (RegExp | string | number | boolean | null)
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => {
   if (!node) { return false }
   if (!options) {
      return true
   }
   const {
      name,
      value,
      hasParent,
      hasAncestor,
      hasGrandChild,
      hasAncestors,
      hasGrandChildren
   } = options
   const nameNode = (node as any).name as ts.Node
   if (name !== undefined) {
      if (!nameNode) {
         return false
      }
      if (name instanceof RegExp && !name.test(nameNode.getText())) { return false }
      if (typeof name === 'string' && name !== nameNode.getText()) { return false }
   }
   const initializerNode = (node as any).initializer as ts.Node
   if (value !== undefined && (!initializerNode || !vsc.tsIsValue(initializerNode, value))) {
      return false
   }
   if (hasParent && !hasParent(node.parent)) {
      return false
   }
   if (hasAncestor && !vsc.tsHasAncestor(node, hasAncestor)) {
      return false
   }
   if (hasAncestors && !vsc.tsHasAncestors(node, hasAncestors)) {
      return false
   }
   if (hasGrandChild && !vsc.tsHasGrandChild(node, hasGrandChild)) {
      return false
   }
   if (hasGrandChildren && !vsc.tsHasGrandChildren(node, hasGrandChildren)) {
      return false
   }
   return true
}

/** vsc-base method
 * @description
 * Test if node is an value: string expression, number expression or boolean (true or false) \
 * and match the value: true, false, a number, a string, \
 * A RegExp can be applied for string/number search. \
 * Optional test hasAncestor. \
 * See [tsHasAncestor](http://vsc-base.org/#tsHasAncestor) and [tsHasAncestors](http://vsc-base.org/#tsHasAncestors)
 * @see [tsIsValue](http://vsc-base.org/#tsIsValue)
 * @vscType ts
 * @oneLineEx const found = vsc.tsIsValue(node, value)
 * @ex 
// Found a NumberExpression with value 12
const foundNumberExpression = vsc.tsIsValue(node, 12)
// Found a NumberExpression with value 12, with a parent EnumValue
const foundNumberExpression = vsc.tsIsValue(node, 12, {
   hasParent: parent => vsc.matchEnum(parent)
})
 * @returns boolean
 */
export const tsIsValue: (
   node: ts.Node | undefined,
   value: (RegExp | string | number | boolean | null),
   options?: {
      hasParent: (parent: ts.Node) => boolean
      hasAncestor?: (parent: ts.Node, depth: number) => boolean
      hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   }
) => boolean = (node, matchValue, options) => {
   if (node === undefined) {
      return false
   }
   if (matchValue === null && node.kind !== ts.SyntaxKind.NullKeyword) {
      return false
   }
   if (matchValue === true && node.kind !== ts.SyntaxKind.TrueKeyword) {
      return false
   }
   if (matchValue === false && node.kind !== ts.SyntaxKind.FalseKeyword) {
      return false
   }
   if (
      typeof matchValue === 'string'
      &&
      (!ts.isStringLiteral(node) || matchValue !== node.text)
   ) {
      return false
   }
   //ts' NumericLiteral has prop text that is s string, so we cast the matchValue.
   if (
      typeof matchValue === 'number'
      &&
      (!ts.isNumericLiteral(node) || '' + matchValue !== node.text)
   ) {
      return false
   }
   if (
      matchValue instanceof RegExp
      &&
      (
         !(ts.isNumericLiteral(node) || ts.isStringLiteral(node))
         || !matchValue.test(node.text)
      )
   ) {
      return false
   }
   if (!options) {
      return true
   }
   const {
      hasParent,
      hasAncestor,
      hasAncestors,
   } = options;
   if (hasParent && !hasParent(node.parent)) {
      return false
   }
   if (hasAncestor && !vsc.tsHasAncestor(node, hasAncestor)) {
      return false
   }
   if (hasAncestors && !vsc.tsHasAncestors(node, hasAncestors)) {
      return false
   }
   return true
}


/** vsc-base method
 * @description
 * Base test for node properties. \
 * Optional test for its name with a string or regexp. \
 * (return false for node that don't have name property)\
 * Optional test for tsHasAncestor and hasGrandChild \
 * See [tsHasAncestor](http://vsc-base.org/#tsHasAncestor), [tsHasAncestors](http://vsc-base.org/#tsHasAncestors), [hasGrandChild](http://vsc-base.org/#hasGrandChild) and [hasGrandChildren](http://vsc-base.org/#hasGrandChildren) \
 * Optional value can be tested against a string, a number (with a string, number or regexp). \
 * (return false for node that don't have initializer)\
 * See [tsIsValue](http://vsc-base.org/#tsIsValue) \
 * @see [tsMatchNode](http://vsc-base.org/#tsMatchNode)
 * @vscType ts
 * @oneLineEx const foundNode = vsc.tsMatchNode(node, options)
 * @ex 
const foundNode = vsc.tsMatchNode(node, { name: /^keyName$/ })
 * @returns s.Node | undefined
 */
export const tsMatchNode: (node: ts.Node | undefined, options?: {
   name?: RegExp | string
   value?: (RegExp | string | number | boolean | null)
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => ts.Node | undefined = (node, options) => {
   if (vsc.tsIsNode(node, options)) {
      return node
   }
   return undefined
}

/** vsc-base method
 * @description
 * Test if node is an value: string expression, number expression or boolean (true or false) \
 * and match the value: true, false, a number, a string, \
 * A RegExp can be applied for string/number search. \
 * Optional test hasAncestor. \
 * See [tsHasAncestor](http://vsc-base.org/#tsHasAncestor) and [tsHasAncestors](http://vsc-base.org/#tsHasAncestors)
 * @see [tsMatchValueNode](http://vsc-base.org/#tsMatchValueNode)
 * @vscType ts
 * @oneLineEx const foundNode = vsc.tsMatchValueNode(node, value)
 * @ex 
// Found a NumberExpression with value 12
const foundNode = vsc.tsMatchValueNode(node, 12)
// Found a NumberExpression with value 12, with a parent EnumValue
const foundNode = vsc.tsMatchValueNode(node, 12, {
   hasParent: parent => vsc.matchEnum(parent)
})
 * @returns s.Node | undefined
 */
export const tsMatchValueNode: (
   node: ts.Node | undefined,
   value: (RegExp | string | number | boolean | null),
   options?: {
      hasParent: (parent: ts.Node) => boolean
      hasAncestor?: (parent: ts.Node, depth: number) => boolean
      hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   }
) => ts.Node | undefined = (node, matchValue, options) => {
   if (vsc.tsIsValue(node, matchValue, options)) {
      return node
   }
}
