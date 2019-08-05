"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const vsc = require("../../vsc-base-development/vsc-base");
suite('System_addFileContent', () => {
    test(' 1', () => __awaiter(this, void 0, void 0, function* () {
        const path = '/Users/alfnielsen/TEMP_VSC-BASE/TEMP_TEST_FILE.ts';
        yield vsc.saveFileContent(path, 'File1');
        yield vsc.addFileContent(path, '\nMORE!');
        const c = yield vsc.getFileContent(path);
        assert.equal(c, 'File1\nMORE!');
    }));
});
suite('System_copy', () => {
    test(' 1', () => __awaiter(this, void 0, void 0, function* () {
        const path = '/Users/alfnielsen/TEMP_VSC-BASE/TEMP_TEST_FILE.ts';
        const path2 = '/Users/alfnielsen/TEMP_VSC-BASE/TEMP_TEST_FILE2.ts';
        yield vsc.copy(path, path2);
        const c = yield vsc.getFileContent(path2);
        assert.equal(c, 'File1\nMORE!');
    }));
});
suite('System_doesExists', () => {
    test(' 1', () => {
        const path = '/Users/alfnielsen';
        const path2 = '/Users/alfnielsen/TEMP_VSC-BASE/TEMP_TEST_FILE2.ts';
        const path3 = '/Users/alfnielsen/TEMP_VSC-BASE/TEMP_TEST_FILE2_NO.ts';
        const r1 = vsc.doesExists(path);
        const r2 = vsc.doesExists(path2);
        const r3 = vsc.doesExists(path3);
        assert.equal(r1, true);
        assert.equal(r2, true);
        assert.equal(r3, false);
    });
});
suite('System_emptyDir', () => {
    test(' 1', () => __awaiter(this, void 0, void 0, function* () {
        const path = '/Users/alfnielsen/TEMP_VSC-BASE';
        const path2 = '/Users/alfnielsen/TEMP_VSC-BASE/TEMP_TEST_FILE2.ts';
        const r1 = vsc.doesExists(path2);
        assert.equal(r1, true);
        yield vsc.execFromPath('mkdir test22', path);
        yield vsc.emptyDir(path);
        const r2 = vsc.doesExists(path2);
        assert.equal(r2, false);
    }));
});
suite('System_execFromPath', () => {
    test(' 1', () => __awaiter(this, void 0, void 0, function* () {
        const path = '/Users/alfnielsen/TEMP_VSC-BASE';
        yield vsc.execFromPath('mkdir test', path);
        const path2 = '/Users/alfnielsen/TEMP_VSC-BASE/test';
        const r2 = vsc.doesExists(path2);
        assert.equal(r2, true);
    }));
});
// suite('System_getConfig', () => {
//    test(' 1', () => {
//       const r1 = vsc.getConfig()
//       assert.equal(r1, '')
//    })
// })
suite('System_getDir', () => {
    test(' 1', () => __awaiter(this, void 0, void 0, function* () {
        const path = '/Users/alfnielsen/TEMP_VSC-BASE/TEMP_TEST_FILE2.ts';
        yield vsc.saveFileContent(path, 'File1');
        const dir = vsc.getDir(path);
        assert.equal(dir, '/Users/alfnielsen/TEMP_VSC-BASE');
    }));
});
suite('System_getFileContent', () => {
    test(' 1', () => __awaiter(this, void 0, void 0, function* () {
        const path = '/Users/alfnielsen/TEMP_VSC-BASE/TEMP_TEST_FILE2.ts';
        const source = yield vsc.getFileContent(path);
        assert.equal(source, 'File1');
    }));
});
suite('System_getJsonContent', () => {
    test(' 1', () => __awaiter(this, void 0, void 0, function* () {
        const path = '/Users/alfnielsen/TEMP_VSC-BASE/json.json';
        yield vsc.saveFileContent(path, '{"test":1}');
        const json = yield vsc.getJsonContent(path);
        const hasTest = json && json.hasOwnProperty && json.hasOwnProperty('test');
        assert.equal(hasTest, true);
        assert.equal(json.test, 1);
    }));
});
suite('System_getLineStreamReader', () => {
    test(' 1', () => __awaiter(this, void 0, void 0, function* () {
        var e_1, _a;
        const path = '/Users/alfnielsen/TEMP_VSC-BASE/reader.ts';
        yield vsc.saveFileContent(path, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n');
        const readStream = vsc.getReadStream(path);
        const lineReader = vsc.getLineStreamReader(readStream);
        let lineCount = 0;
        try {
            for (var _b = __asyncValues(lineReader()), _c; _c = yield _b.next(), !_c.done;) {
                const line = _c.value;
                switch (lineCount) {
                    case 0:
                        assert.equal(line, '1\n');
                        break;
                    case 1:
                        assert.equal(line, '2\n');
                        break;
                    case 18:
                        assert.equal(line, '19\n');
                        break;
                    case 19:
                        assert.equal(line, '20\n');
                        break;
                    default:
                        break;
                }
                lineCount++;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }));
    test(' 2', () => __awaiter(this, void 0, void 0, function* () {
        var e_2, _d;
        const path = '/Users/alfnielsen/TEMP_VSC-BASE/reader.ts';
        yield vsc.saveFileContent(path, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n');
        const readStream = vsc.getReadStream(path);
        const lineReader = vsc.getLineStreamReader(readStream, true);
        let lineCount = 0;
        try {
            for (var _e = __asyncValues(lineReader()), _f; _f = yield _e.next(), !_f.done;) {
                const line = _f.value;
                switch (lineCount) {
                    case 0:
                        assert.equal(line, '1');
                        break;
                    case 1:
                        assert.equal(line, '2');
                        break;
                    case 18:
                        assert.equal(line, '19');
                        break;
                    case 19:
                        assert.equal(line, '20');
                        break;
                    default:
                        break;
                }
                lineCount++;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_d = _e.return)) yield _d.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }));
});
//TODO: move to VS
// suite('System_getPackageDependencies', () => {
//    test(' 1', async () => {
//       const path = '/Users/alfnielsen/TEMP_VSC-BASE/package.json';
//       await vsc.saveFileContent(path, '{"dependencies":{"test":"1.0"}}')
//       const deps = vsc.getPackageDependencies()
//       assert.equal(JSON.stringify(deps), '{"test":"1.0"}')
//    })
// })
//TODO: move to VS
// suite('System_getPackageFilePaths', () => {
//    test(' 1', () => {
//       const r1 = vsc.getPackageFilePaths()
//       assert.equal(r1, '')
//    })
// })
suite('System_getReadStream', () => {
    test(' 1', () => __awaiter(this, void 0, void 0, function* () {
        var e_3, _a;
        const path = '/Users/alfnielsen/TEMP_VSC-BASE/readerChunk.ts';
        yield vsc.saveFileContent(path, `readerChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreader`);
        const reader = vsc.getReadStream(path);
        let countChunk = 0;
        try {
            for (var reader_1 = __asyncValues(reader), reader_1_1; reader_1_1 = yield reader_1.next(), !reader_1_1.done;) {
                const chunk = reader_1_1.value;
                switch (countChunk) {
                    case 0:
                        assert.equal(chunk, 'readerChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreader');
                        break;
                    default:
                        break;
                }
                countChunk++;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (reader_1_1 && !reader_1_1.done && (_a = reader_1.return)) yield _a.call(reader_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    }));
});
// TODO: move to VS
// suite('System_getRootPackageJson', () => {
//    test(' 1', () => {
//       const r1 = vsc.getRootPackageJson()
//       assert.equal(r1, '')
//    })
// })
suite('System_isDir', () => {
    test(' 1', () => {
        const path = '/Users/alfnielsen/TEMP_VSC-BASE';
        const path2 = '/Users/alfnielsen/TEMP_VSC-BASE/reader.ts';
        const r1 = vsc.isDir(path);
        const r2 = vsc.isDir(path2);
        assert.equal(r1, true);
        assert.equal(r2, false);
    });
});
suite('System_makeDir', () => {
    test(' 1', () => __awaiter(this, void 0, void 0, function* () {
        const path = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir';
        yield vsc.makeDir(path);
        const r1 = vsc.doesExists(path);
        const r2 = vsc.isDir(path);
        assert.equal(r1, true);
        assert.equal(r2, true);
        const path2 = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir/sub1';
        yield vsc.makeDir(path2);
        const r3 = vsc.doesExists(path2);
        assert.equal(r3, true);
    }));
});
suite('System_move', () => {
    test(' 1', () => __awaiter(this, void 0, void 0, function* () {
        const path1 = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir';
        const path12 = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir/test1.ts';
        const path13 = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir/test1-2.ts';
        const path2 = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir-3';
        yield vsc.saveFileContent(path12, "Im a test");
        yield vsc.move(path12, path13);
        yield vsc.move(path1, path2);
        const r1 = vsc.doesExists(path1);
        const r2 = vsc.doesExists(path2);
        assert.equal(r1, false);
        assert.equal(r2, true);
    }));
});
suite('System_remove', () => {
    test(' 1', () => __awaiter(this, void 0, void 0, function* () {
        const path1 = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir/test1-2.ts';
        const pathDir = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir';
        const pathSupDir = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir/testSubDir';
        const pathSupDirFile = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir/testSubDir/file1.ts';
        yield vsc.makeDir(pathDir);
        yield vsc.makeDir(pathSupDir);
        yield vsc.saveFileContent(pathSupDirFile, "Im a sub file");
        yield vsc.remove(path1);
        const r1 = vsc.doesExists(path1);
        assert.equal(r1, false);
        yield vsc.remove(pathDir);
        const r2 = vsc.doesExists(pathDir);
        assert.equal(r2, false);
    }));
});
suite('System_rename', () => {
    test(' 1', () => __awaiter(this, void 0, void 0, function* () {
        const pathDir = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir';
        const pathDir2 = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir2';
        const pathDirFile = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir/file1.ts';
        const pathDirFile2 = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir/file2.ts';
        const pathDirFile2Test = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir2/file2.ts';
        yield vsc.makeDir(pathDir);
        yield vsc.saveFileContent(pathDirFile, 'File content!');
        yield vsc.rename(pathDirFile, pathDirFile2);
        yield vsc.rename(pathDir, pathDir2);
        const r1 = vsc.doesExists(pathDir2);
        assert.equal(r1, true);
        const r2 = vsc.doesExists(pathDirFile2Test);
        assert.equal(r2, true);
    }));
});
suite('System_saveFileContent', () => {
    test(' 1', () => __awaiter(this, void 0, void 0, function* () {
        const pathDirFile = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir2/file1.ts';
        yield vsc.saveFileContent(pathDirFile, "file1");
        const r1 = vsc.doesExists(pathDirFile);
        assert.equal(r1, true);
        const content = yield vsc.getFileContent(pathDirFile);
        assert.equal(content, "file1");
    }));
});
//# sourceMappingURL=vsc-base-system.test.js.map