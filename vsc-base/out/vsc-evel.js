"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const vscode = require("vscode");
const ts = require("typescript");
const vsc = require("./vsc-base");
/**
 * eval in correct content where vsc exists!
 * @param code
 * @private
 */
const evalWithVscEndExport = (code) => {
    const libs = { fs, vscode, ts, vsc };
    const wrapExports = `_exports = (function (vsc){var exports = {};${code};return exports})(vsc);`;
    let _exports = {};
    try {
        eval(wrapExports);
    }
    catch (e) {
        throw e; // retrhow
    }
    return _exports;
};
exports.default = evalWithVscEndExport;
//# sourceMappingURL=vsc-evel.js.map