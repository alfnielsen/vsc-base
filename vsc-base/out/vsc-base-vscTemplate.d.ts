import * as vsc from './vsc-base';
/**
 * @description
 * Recurvice function that goes through a template tree
 * @see http://vsc-base.org/#scaffoldTemplate
 * @param path Full path to where the TemplateItem (file/folder) should be created
 * @param userInputs An object with user inputs {[key: string]: string}
 * @param templateItem An TemplateItem (folde/file)
 * @dependencyInternal makeDir, saveFileContent
 * @vscType System
 * @oneLineEx await vsc.scaffoldTemplate(path, template)
 * @returns Promise<void>
 */
export declare const scaffoldTemplate: (path: string, templateItem: vsc.vscTemplateItem, userInputs?: vsc.vscUserInputs) => Promise<void>;
export declare type vscTemplate = {
    userInputs: vscUserInput[];
    template: vscTemplateItem[];
};
export declare type vscTemplateItem = vscTemplateFolder | vscTemplateFile;
export declare type vscTemplateFolder = {
    type: 'folder';
    name: vscStringDelegate;
    children?: vscTemplateItem[];
};
export declare type vscTemplateFile = {
    type: 'file';
    name: vscStringDelegate;
    content: vscStringDelegate;
};
export declare type vscUserInput = {
    title: string;
    argumentName: string;
    defaultValue: string;
};
export declare type vscUserInputs = {
    [key: string]: string;
};
export declare type vscStringDelegate = string | ((inputs: vscUserInputs) => string);
