/** vsc-base method
 * @description
 * Insert an import if its not already imported. \
 * It will add it to an existing import that has the same path or add a new import after the last import.
 * @see [tsInsertImport](http://vsc-base.org/#tsInsertImport)
 * @vscType ts
 * @example
 * source = vsc.tsInsertImport(source, 'useCallback', 'react')
 * @returns string
 */
export declare const tsInsertImport: (source: string, importName: string, importPath: string, options?: {
    isDefault?: boolean;
    useDoubleQuotation?: boolean;
    addSemicolon?: boolean;
}) => string;
/** vsc-base method
 * @description
 * Insert/add a member in an enum. \
 * 'value' is optional. \
 * For complex (calculated values) or number values, \
 * set 'addQuotes' to false.
 * Intention will follow the members already defined. \
 * If no members are defined it will use the 'newIntention'
 * LeadingComma will follow the members already defined. \
 * If no members are defined it will use the 'addNewLeadingComma' (default false)
 * @see [tsInsertEnumMember](http://vsc-base.org/#tsInsertEnumMember)
 * @vscType ts
 * @example
 * source = vsc.tsInsertEnumMember(source, enumName, memberName, value)
 * @example
 * source = vsc.tsInsertEnumMember(source, 'foodOptions', 'meat', 'MEAT')
 * // Add number as value
 * source = vsc.tsInsertEnumMember(source, 'numberOptions', 'One', '1', { addQuotes: false })
 * // Add calculated number as value
 * source = vsc.tsInsertEnumMember(source, 'numberOptions', 'Tree', 'One * 3', { addQuotes: false })
 * @returns string
 */
export declare const tsInsertEnumMember: (source: string, enumName: string, memberName: string, value?: string, options?: {
    newIntention?: number;
    addNewLeadingComma?: boolean;
    addQuotes?: boolean;
    useDoubleQuotation?: boolean;
}) => string;
/** vsc-base method
 * @description
 * Insert/add a member in an interface. \
 * Intention will follow the members already defined. \
 * If no members are defined it will use the 'newIntention'
 * Use of semiColon will follow the members already defined. \
 * If no members are defined it will use the 'addNewLeadingSemiColon' (default false)
 * @see [tsAddInterfaceMember](http://vsc-base.org/#tsAddInterfaceMember)
 * @vscType ts
 * @example
 * source = vsc.tsAddInterfaceMember(source, interfaceName, memberName, type)
 * @example
 * // Set type to an string
 * source = vsc.tsAddInterfaceMember(source, 'IFood', 'name', 'string')
 * // Set type to an number list
 * source = vsc.tsAddInterfaceMember(source, 'IFood', 'countTypes', 'number[]')
 * // Set type to an enum
 * source = vsc.tsAddInterfaceMember(source, 'IFood', 'type', 'FooType')
 * @returns string
 */
export declare const tsInsertInterfaceMember: (source: string, interfaceName: string, memberName: string, type: string, options?: {
    newIntention?: number;
    addNewLeadingSemiColon?: boolean;
}) => string;
/** vsc-base method
 * @description
 * Insert/add a key-value pair in an variable object. \
 * Intention will follow the members already defined. \
 * If no members are defined it will use the 'newIntention'
 * Use of trailingComma will follow the members already defined. \
 * If no members are defined it will use the 'addNewTrailingComma' (default false)
 * @see [tsAddVariableObjectProperty](http://vsc-base.org/#tsAddVariableObjectProperty)
 * @vscType ts
 * @example
 * source = vsc.tsAddVariableObjectProperty(source, variableName, key, value)
 * @example
 * // Set type to an string
 * source = vsc.tsAddVariableObjectProperty(source, 'IFood', 'name', 'string')
 * // Set type to an number list
 * source = vsc.tsAddVariableObjectProperty(source, 'IFood', 'countTypes', 'number[]')
 * // Set type to an enum
 * source = vsc.tsAddVariableObjectProperty(source, 'IFood', 'type', 'FooType')
 * @returns string
 */
export declare const tsInsertVariableObjectProperty: (source: string, variableName: string, key: string, value: string, options?: {
    newIntention?: number;
    addNewTrailingComma?: boolean;
}) => string;
