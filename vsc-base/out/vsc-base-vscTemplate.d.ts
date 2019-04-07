/**
 * VscTemplate types
 */
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
