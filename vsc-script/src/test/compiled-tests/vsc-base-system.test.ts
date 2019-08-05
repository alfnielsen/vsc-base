import * as assert from 'assert'

import * as vsc from '../../vsc-base-development/vsc-base'

suite('System_addFileContent', () => {
   test(' 1', async () => {
      const path = '/Users/alfnielsen/TEMP_VSC-BASE/TEMP_TEST_FILE.ts';
      await vsc.saveFileContent(path, 'File1')
      await vsc.addFileContent(path, '\nMORE!')
      const c = await vsc.getFileContent(path)
      assert.equal(c, 'File1\nMORE!')
   })
})

suite('System_copy', () => {
   test(' 1', async () => {
      const path = '/Users/alfnielsen/TEMP_VSC-BASE/TEMP_TEST_FILE.ts';
      const path2 = '/Users/alfnielsen/TEMP_VSC-BASE/TEMP_TEST_FILE2.ts';
      await vsc.copy(path, path2)
      const c = await vsc.getFileContent(path2)
      assert.equal(c, 'File1\nMORE!')
   })
})

suite('System_doesExists', () => {
   test(' 1', () => {
      const path = '/Users/alfnielsen';
      const path2 = '/Users/alfnielsen/TEMP_VSC-BASE/TEMP_TEST_FILE2.ts';
      const path3 = '/Users/alfnielsen/TEMP_VSC-BASE/TEMP_TEST_FILE2_NO.ts';
      const r1 = vsc.doesExists(path)
      const r2 = vsc.doesExists(path2)
      const r3 = vsc.doesExists(path3)
      assert.equal(r1, true)
      assert.equal(r2, true)
      assert.equal(r3, false)
   })
})

suite('System_emptyDir', () => {
   test(' 1', async () => {
      const path = '/Users/alfnielsen/TEMP_VSC-BASE';
      const path2 = '/Users/alfnielsen/TEMP_VSC-BASE/TEMP_TEST_FILE2.ts';
      const r1 = vsc.doesExists(path2)
      assert.equal(r1, true)
      await vsc.execFromPath('mkdir test22', path)
      await vsc.emptyDir(path)
      const r2 = vsc.doesExists(path2)
      assert.equal(r2, false)
   })
})

suite('System_execFromPath', () => {
   test(' 1', async () => {
      const path = '/Users/alfnielsen/TEMP_VSC-BASE';
      await vsc.execFromPath('mkdir test', path)
      const path2 = '/Users/alfnielsen/TEMP_VSC-BASE/test';
      const r2 = vsc.doesExists(path2)
      assert.equal(r2, true)
   })
})

// suite('System_getConfig', () => {
//    test(' 1', () => {
//       const r1 = vsc.getConfig()
//       assert.equal(r1, '')
//    })
// })

suite('System_getDir', () => {
   test(' 1', async () => {
      const path = '/Users/alfnielsen/TEMP_VSC-BASE/TEMP_TEST_FILE2.ts';
      await vsc.saveFileContent(path, 'File1')
      const dir = vsc.getDir(path)
      assert.equal(dir, '/Users/alfnielsen/TEMP_VSC-BASE')
   })
})

suite('System_getFileContent', () => {
   test(' 1', async () => {
      const path = '/Users/alfnielsen/TEMP_VSC-BASE/TEMP_TEST_FILE2.ts';
      const source = await vsc.getFileContent(path)
      assert.equal(source, 'File1')
   })
})

suite('System_getJsonContent', () => {
   test(' 1', async () => {
      const path = '/Users/alfnielsen/TEMP_VSC-BASE/json.json';
      await vsc.saveFileContent(path, '{"test":1}')
      const json: any = await vsc.getJsonContent(path)
      const hasTest = json && json.hasOwnProperty && json.hasOwnProperty('test')
      assert.equal(hasTest, true)
      assert.equal(json.test, 1)
   })
})

suite('System_getLineStreamReader', () => {
   test(' 1', async () => {
      const path = '/Users/alfnielsen/TEMP_VSC-BASE/reader.ts';
      await vsc.saveFileContent(path, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n')
      const readStream = vsc.getReadStream(path)
      const lineReader = vsc.getLineStreamReader(readStream)
      let lineCount = 0
      for await (const line of lineReader()) {
         switch (lineCount) {
            case 0: assert.equal(line, '1\n'); break;
            case 1: assert.equal(line, '2\n'); break;
            case 18: assert.equal(line, '19\n'); break;
            case 19: assert.equal(line, '20\n'); break;
            default:
               break;
         }
         lineCount++;
      }
   })
   test(' 2', async () => {
      const path = '/Users/alfnielsen/TEMP_VSC-BASE/reader.ts';
      await vsc.saveFileContent(path, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n')
      const readStream = vsc.getReadStream(path)
      const lineReader = vsc.getLineStreamReader(readStream, true)
      let lineCount = 0
      for await (const line of lineReader()) {
         switch (lineCount) {
            case 0: assert.equal(line, '1'); break;
            case 1: assert.equal(line, '2'); break;
            case 18: assert.equal(line, '19'); break;
            case 19: assert.equal(line, '20'); break;
            default:
               break;
         }
         lineCount++;
      }
   })
})

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
   test(' 1', async () => {
      const path = '/Users/alfnielsen/TEMP_VSC-BASE/readerChunk.ts';
      await vsc.saveFileContent(path, `readerChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreader`)
      const reader = vsc.getReadStream(path)
      let countChunk = 0
      for await (const chunk of reader) {
         switch (countChunk) {
            case 0: assert.equal(chunk, 'readerChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreaderChunkreader'); break;
            default:
               break;
         }
         countChunk++
      }
   })
})

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
      const r1 = vsc.isDir(path)
      const r2 = vsc.isDir(path2)
      assert.equal(r1, true)
      assert.equal(r2, false)
   })
})

suite('System_makeDir', () => {
   test(' 1', async () => {
      const path = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir';
      await vsc.makeDir(path)
      const r1 = vsc.doesExists(path);
      const r2 = vsc.isDir(path);
      assert.equal(r1, true)
      assert.equal(r2, true)
      const path2 = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir/sub1';
      await vsc.makeDir(path2)
      const r3 = vsc.doesExists(path2);
      assert.equal(r3, true)
   })
})

suite('System_move', () => {
   test(' 1', async () => {
      const path1 = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir';
      const path12 = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir/test1.ts';
      const path13 = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir/test1-2.ts';
      const path2 = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir-3';
      await vsc.saveFileContent(path12, "Im a test")
      await vsc.move(path12, path13)
      await vsc.move(path1, path2)
      const r1 = vsc.doesExists(path1);
      const r2 = vsc.doesExists(path2);
      assert.equal(r1, false)
      assert.equal(r2, true)
   })
})

suite('System_remove', () => {
   test(' 1', async () => {
      const path1 = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir/test1-2.ts';
      const pathDir = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir';
      const pathSupDir = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir/testSubDir';
      const pathSupDirFile = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir/testSubDir/file1.ts';
      await vsc.makeDir(pathDir)
      await vsc.makeDir(pathSupDir)
      await vsc.saveFileContent(pathSupDirFile, "Im a sub file")
      await vsc.remove(path1)
      const r1 = vsc.doesExists(path1);
      assert.equal(r1, false)
      await vsc.remove(pathDir)
      const r2 = vsc.doesExists(pathDir);
      assert.equal(r2, false)
   })
})

suite('System_rename', () => {
   test(' 1', async () => {
      const pathDir = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir';
      const pathDir2 = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir2';
      const pathDirFile = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir/file1.ts';
      const pathDirFile2 = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir/file2.ts';
      const pathDirFile2Test = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir2/file2.ts';
      await vsc.makeDir(pathDir)
      await vsc.saveFileContent(pathDirFile, 'File content!')
      await vsc.rename(pathDirFile, pathDirFile2);
      await vsc.rename(pathDir, pathDir2);
      const r1 = vsc.doesExists(pathDir2);
      assert.equal(r1, true)
      const r2 = vsc.doesExists(pathDirFile2Test);
      assert.equal(r2, true)
   })
})

suite('System_saveFileContent', () => {
   test(' 1', async () => {
      const pathDirFile = '/Users/alfnielsen/TEMP_VSC-BASE/test-new-dir2/file1.ts';
      await vsc.saveFileContent(pathDirFile, "file1")
      const r1 = vsc.doesExists(pathDirFile);
      assert.equal(r1, true)
      const content = await vsc.getFileContent(pathDirFile)
      assert.equal(content, "file1")
   })
})
