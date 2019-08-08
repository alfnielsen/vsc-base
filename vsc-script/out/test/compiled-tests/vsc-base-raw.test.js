"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const vsc = require("../../vsc-base-development/vsc-base");
suite('Raw_addLeadingLocalDash', () => {
    test(' 1', () => {
        const res = vsc.addLeadingLocalDash('file.ts');
        assert.equal(res, './file.ts');
    });
});
suite('Raw_cleanPath', () => {
    test(' 1', () => {
        const res = vsc.cleanPath('/content/sub/./file1.ts');
        assert.equal(res, '/content/sub/file1.ts');
    });
    test(' 2', () => {
        const res = vsc.cleanPath('/content/sub/../file1.ts');
        assert.equal(res, '/content/file1.ts');
    });
    test(' 3', () => {
        const res = vsc.cleanPath('/content/./sub/../file1.ts');
        assert.equal(res, '/content/file1.ts');
    });
});
suite('Raw_getAbsolutePathFromRelativePath', () => {
    test(' 1', () => {
        const res = vsc.getAbsolutePathFromRelativePath('c:/root/area/module1/file.ts', '../module2/file2.ts', 'c:/root');
        assert.equal(res, 'area/module2/file2.ts');
    });
});
suite('Raw_getErrorInfo', () => {
    test(' 1', () => {
        const err = new Error('Error');
        const res = vsc.getErrorInfo(err);
        assert.equal(res.isError, true);
    });
    test(' 2', () => {
        const err = { message: 'error' };
        const res = vsc.getErrorInfo(err);
        assert.equal(res.isError, false);
    });
});
suite('Raw_getJSONCircularReplacer', () => {
    test(' 1', () => {
        const res = vsc.getJSONCircularReplacer();
        assert.equal(typeof res === "function", true);
    });
});
suite('Raw_getJsonParts', () => {
    test(' 1', () => {
        const j = { "a": { "t": true, "o": { "n": 12 }, "b": "b" } };
        const res = vsc.getJsonParts(j, 'a.o.n');
        assert.equal(res, 12);
    });
});
suite('Raw_getRelativePath', () => {
    test(' 1', () => {
        const res = vsc.getRelativePath('c:/folder/sub1/sub2/someFile.js', 'c:/folder/other/someFile.js');
        assert.equal(res, '../../other');
    });
});
suite('Raw_getSubRelativePathFromAbsoluteRootPath', () => {
    test(' 1', () => {
        const res = vsc.getSubRelativePathFromAbsoluteRootPath('c:/root/module/file.ts', 'module/sub-module/file2', 'c:/root');
        assert.equal(res, './sub-module/file2');
    });
});
suite('Raw_getTimestamp', () => {
    test(' 1', () => {
        const res = vsc.getTimestamp();
        assert.equal(/^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}.\d{2,5}Z$/.test(res), true);
    });
});
suite('Raw_isAbsolutePath', () => {
    test(' 1', () => {
        const res = vsc.isAbsolutePath('some/path/to/file.ts');
        assert.equal(res, true);
    });
    test(' 2', () => {
        const res = vsc.isAbsolutePath('./some/path/to/file.ts');
        assert.equal(res, false);
    });
});
suite('Raw_isSubPath', () => {
    test(' 1', () => {
        const res = vsc.isSubPath('c:/root/area/module1/file.ts', 'c:/root/area');
        assert.equal(res, true);
    });
});
suite('Raw_joinPaths', () => {
    test(' 1', () => {
        const res = vsc.joinPaths('root/area/', '/module2/file.ts');
        assert.equal(res, 'root/area/module2/file.ts');
    });
});
suite('Raw_keyValueReplacer', () => {
    test(' 1', () => {
        const j = { "a": { "b": { "c": { "d": 12 } } } };
        const res = vsc.keyValueReplacer(j, 'c', 'foo');
        const resString = JSON.stringify(res);
        assert.equal(resString, '{"a":{"b":{"c":"foo"}}}');
    });
});
suite('Raw_maxDepthReplacer', () => {
    test(' 1', () => {
        const j = { "a": { "b": { "c": { "d": 12 } } } };
        const res = vsc.maxDepthReplacer(j, 2);
        const resString = JSON.stringify(res);
        assert.equal(resString, '{"a":{"b":"[vsc: maxDepth 2 reached - Object]"}}');
    });
});
suite('Raw_objectWalker', () => {
    test(' 1', () => {
        const j = { "a": { "b1": { "c1": 12 }, "b2": { "c2": { "c3": 9 } } } };
        let longestAncestorList = 0;
        let ancestorKeysString = [];
        vsc.objectWalker(j, (state) => {
            if (longestAncestorList < state.depth) {
                longestAncestorList = state.depth;
                ancestorKeysString = [state.key, ...state.ancestorKeys];
            }
        });
        const res = ancestorKeysString.join('.');
        assert.equal(res, 'c3.c2.b2.a');
    });
});
suite('Raw_pathAsUnix', () => {
    test(' 1', () => {
        const res = vsc.pathAsUnix('root\\area\\module1\\file.ts');
        assert.equal(res, 'root/area/module1/file.ts');
    });
});
suite('Raw_sharedPath', () => {
    test(' 1', () => {
        const res = vsc.sharedPath('root/area/module1/file1.ts', 'root/area/module2/file2.ts');
        assert.equal(res, 'root/area');
    });
});
suite('Raw_sleep', () => {
    test(' 1', () => {
        const res = vsc.sleep(3000);
        assert.equal(res instanceof Promise, true);
    });
});
suite('Raw_splitPath', () => {
    test(' 1', () => {
        const res = vsc.splitPath('root/area/module/file1.ts');
        assert.equal(res.length === 2, true);
        assert.equal(res[0], "root/area/module");
        assert.equal(res[1], "file1.ts");
    });
});
suite('Raw_subtractPath', () => {
    test(' 1', () => {
        const res = vsc.subtractPath('root/area/module/file1.ts', 'root/area', true);
        assert.equal(res, 'module/file1.ts');
    });
    test(' 2', () => {
        const res = vsc.subtractPath('root/area/module/file1.ts', 'root/area', false);
        assert.equal(res, '/module/file1.ts');
    });
});
suite('Raw_toCamelCase', () => {
    test(' 1', () => {
        const res = vsc.toCamelCase('Some-name');
        assert.equal(res, 'someName');
    });
    test(' 2', () => {
        const res = vsc.toCamelCase('SomeName');
        assert.equal(res, 'someName');
    });
    test(' 3', () => {
        const res = vsc.toCamelCase('Some_Name');
        assert.equal(res, 'someName');
    });
    test(' 4', () => {
        const res = vsc.toCamelCase('Some.Name');
        assert.equal(res, 'someName');
    });
    test(' 5', () => {
        const res = vsc.toCamelCase('Some Name');
        assert.equal(res, 'someName');
    });
});
suite('Raw_toJSONString', () => {
    test(' 1', () => {
        const j = { h: 2 };
        const res = vsc.toJSONString(j);
        assert.equal(res, '{\n  "h": 2\n}');
    });
});
suite('Raw_toKebabCase', () => {
    test(' 1', () => {
        const res = vsc.toKebabCase('SomeName');
        assert.equal(res, 'some-name');
    });
    test(' 2', () => {
        const res = vsc.toKebabCase('Some Name');
        assert.equal(res, 'some-name');
    });
    test(' 3', () => {
        const res = vsc.toKebabCase('Some.Name');
        assert.equal(res, 'some-name');
    });
    test(' 4', () => {
        const res = vsc.toKebabCase('Some_Name');
        assert.equal(res, 'some-name');
    });
});
suite('Raw_toPascalCase', () => {
    test(' 1', () => {
        const res = vsc.toPascalCase('some-name');
        assert.equal(res, 'SomeName');
    });
    test(' 2', () => {
        const res = vsc.toPascalCase('some name');
        assert.equal(res, 'SomeName');
    });
    test(' 3', () => {
        const res = vsc.toPascalCase('some_name');
        assert.equal(res, 'SomeName');
    });
    test(' 4', () => {
        const res = vsc.toPascalCase('some.name');
        assert.equal(res, 'SomeName');
    });
});
suite('Raw_toSnakeCase', () => {
    test(' 1', () => {
        const res = vsc.toSnakeCase('SomeName');
        assert.equal(res, 'some_name');
    });
    test(' 2', () => {
        const res = vsc.toSnakeCase('SomeName', true);
        assert.equal(res, 'SOME_NAME');
    });
    test(' 3', () => {
        const res = vsc.toSnakeCase('Some Name');
        assert.equal(res, 'some_name');
    });
    test(' 4', () => {
        const res = vsc.toSnakeCase('Some.Name');
        assert.equal(res, 'some_name');
    });
});
suite('Raw_toTitleCase', () => {
    test(' 1', () => {
        const res = vsc.toTitleCase('some-name');
        assert.equal(res, 'Some Name');
    });
    test(' 2', () => {
        const res = vsc.toTitleCase('some.name');
        assert.equal(res, 'Some Name');
    });
    test(' 3', () => {
        const res = vsc.toTitleCase('some name');
        assert.equal(res, 'Some Name');
    });
});
suite('Raw_trimDashes', () => {
    test(' 1', () => {
        const res = vsc.trimDashes('/root/area/module/');
        assert.equal(res, 'root/area/module');
    });
});
suite('Raw_trimLeadingDash', () => {
    test(' 1', () => {
        const res = vsc.trimLeadingDash('/root/area/module/');
        assert.equal(res, 'root/area/module/');
    });
});
suite('Raw_insertAfter', () => {
    test(' 1', () => {
        const source = '1 2 3 4 5';
        const res = '1 2 3T 4 5';
        const r1 = vsc.insertAfter(source, '3', 'T');
        assert.equal(r1, res);
    });
    test(' 2', () => {
        const source = '1 2 3 4 5';
        const res = '1 2 3 4 T5';
        const r1 = vsc.insertAfter(source, /\s+4\s+/, 'T');
        assert.equal(r1, res);
    });
});
suite('Raw_insertBefore', () => {
    test(' 1', () => {
        const source = '1 2 3 4 5';
        const res = '1 2 3T 4 5';
        const r1 = vsc.insertBefore(source, /\s+4\s+/, 'T');
        assert.equal(r1, res);
    });
    test(' 1', () => {
        const source = '1 2 3 4 5';
        const res = '1 2 3 4 T5';
        const r1 = vsc.insertBefore(source, '5', 'T');
        assert.equal(r1, res);
    });
});
//# sourceMappingURL=vsc-base-raw.test.js.map