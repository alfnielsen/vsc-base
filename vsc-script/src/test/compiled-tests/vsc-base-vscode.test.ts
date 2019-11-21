import * as assert from 'assert'

import * as vsc from '../../vsc-base-development/vsc-base'

// suite('Vscode_addSelection', () => {
//    test(' 1', () => {
//       const r1 = vsc.addSelection()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_addSelectionFromRange', () => {
//    test(' 1', () => {
//       const r1 = vsc.addSelectionFromRange()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_appendLineToDocument', () => {
//    test(' 1', () => {
//       const r1 = vsc.appendLineToDocument()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_appendToDocument', () => {
//    test(' 1', () => {
//       const r1 = vsc.appendToDocument()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_ask', () => {
//    test(' 1', () => {
//       const r1 = vsc.ask()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_createSelection', () => {
//    test(' 1', () => {
//       const r1 = vsc.createSelection()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_createVscodeRangeAndPosition', () => {
//    test(' 1', () => {
//       const r1 = vsc.createVscodeRangeAndPosition()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_findFilePaths', () => {
//    test(' 1', () => {
//       const r1 = vsc.findFilePaths()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_findFilePathsFromBase', () => {
//    test(' 1', () => {
//       const r1 = vsc.findFilePathsFromBase()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_findRelativeFilePaths', () => {
//    test(' 1', () => {
//       const r1 = vsc.findRelativeFilePaths()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_getActiveDocument', () => {
//    test(' 1', () => {
//       const r1 = vsc.getActiveDocument()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_getActiveEditor', () => {
//    test(' 1', () => {
//       const r1 = vsc.getActiveEditor()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_getActiveTerminal', () => {
//    test(' 1', () => {
//       const r1 = vsc.getActiveTerminal()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_getDocumentContent', () => {
//    test(' 1', () => {
//       const r1 = vsc.getDocumentContent()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_getDocumentPath', () => {
//    test(' 1', () => {
//       const r1 = vsc.getDocumentPath()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_getFullDocumentRange', () => {
//    test(' 1', () => {
//       const r1 = vsc.getFullDocumentRange()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_getRootPath', () => {
//    test(' 1', () => {
//       const r1 = vsc.getRootPath()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_insertAt', () => {
//    test(' 1', () => {
//       const r1 = vsc.insertAt()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_insertAtRange', () => {
//    test(' 1', () => {
//       const r1 = vsc.insertAtRange()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_newDocument', () => {
//    test(' 1', () => {
//       const r1 = vsc.newDocument()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_pick', () => {
//    test(' 1', () => {
//       const r1 = vsc.pick()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_prependLineToDocument', () => {
//    test(' 1', () => {
//       const r1 = vsc.prependLineToDocument()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_prependToDocument', () => {
//    test(' 1', () => {
//       const r1 = vsc.prependToDocument()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_saveAll', () => {
//    test(' 1', () => {
//       const r1 = vsc.saveAll()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_saveDocument', () => {
//    test(' 1', () => {
//       const r1 = vsc.saveDocument()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_setDocumentContent', () => {
//    test(' 1', () => {
//       const r1 = vsc.setDocumentContent()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_setSelection', () => {
//    test(' 1', () => {
//       const r1 = vsc.setSelection()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_setSelectionFromRange', () => {
//    test(' 1', () => {
//       const r1 = vsc.setSelectionFromRange()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_setSelections', () => {
//    test(' 1', () => {
//       const r1 = vsc.setSelections()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_setSelectionsFromRanges', () => {
//    test(' 1', () => {
//       const r1 = vsc.setSelectionsFromRanges()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_showErrorMessage', () => {
//    test(' 1', () => {
//       const r1 = vsc.showErrorMessage()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_showMessage', () => {
//    test(' 1', () => {
//       const r1 = vsc.showMessage()
//       assert.equal(r1, '')
//    })
// })

// suite('Vscode_writeToTerminal', () => {
//    test(' 1', () => {
//       const r1 = vsc.writeToTerminal()
//       assert.equal(r1, '')
//    })
// })

suite('Vscode_open', () => {
   test(' 1', () => {
      const r1 = vsc.open()
      assert.equal(r1, '')
   })
})
