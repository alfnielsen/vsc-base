import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const ObjectWalkerAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'objectWalker'}
         title={'objectWalker'}
         open={open}
         annotation={
            <>
               <p>
                  
 Clone an JSON Object (any type) going through its entire tree structure. 
               </p>
               <p>
                This method goes through the object structure, and call the given callback on esh child (and grandchild). 
               </p>
               <p>
                The call back can replace each child or stop the iteration. 
               </p>
               <p>
                See <a href='http://vsc-base.org/#maxDepthReplacer'>maxDepthReplacer</a> and <a href='http://vsc-base.org/#keyValueReplacer'>keyValueReplacer</a> 
               </p>
               <p>
                they both use the objectWalker.
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={{
   obj: '{"a":{"b1":{"c1":12},"b2":{ "c2":{"c3":9}}}}'
}}
            onClickCall={(args, setResult) => {
    try{
       const json = JSON.parse(args.obj)
      let longestAncestorList = 0;
      let ancestorKeysString: (string|number)[] = [];
      vsc.objectWalker(json,(state)=>{
         if(longestAncestorList<state.depth){
            longestAncestorList = state.depth
            ancestorKeysString = [state.key, ...state.ancestorKeys]
         }
      })
       setResult(<>{ancestorKeysString.join('.')}<br/>{'reverse:'}<br/>{ancestorKeysString.reverse().join('.')}</>)
    }catch(e){
       setResult(''+e)
    }
}}
         />
      }
      
         codeOneLineEx={`const newObj = vsc.objectWalker(obj, walkerCallback);`}
         codeEx={`// try this walker out in the tester
const json = \{"a":\{"b1":\{"c1":12},"b2":\{ "c2":\{"c3":9}}}}
let longestAncestorList = 0;
let ancestorKeysString: (string|number)[] = [];
vsc.objectWalker(json,(state)=>\{
   if(longestAncestorList<state.depth)\{
      longestAncestorList = state.depth
      ancestorKeysString = [state.key, ...state.ancestorKeys]
   }
})

// log: ancestorKeysList.join('.') + '\\nreverse:\\n' + ancestorKeysString.reverse().join('.');`}
         code={`/**
 * @param obj, maxDepth, currentLevel
 * @debugTool Primary a debugging method.
 * @vscType Raw
 * @returns string
 */
export const objectWalker = (obj: any, callback: ObjectWalkerCallback): any => \{
   let stopFlag = false
   const stop = () => \{
      stopFlag = true;
   }
   const objectWalkerRecursive = (obj: any, key: string | number, depth: number, ancestors: any[], ancestorKeys: (string | number)[]): any => \{
      if (stopFlag) \{ return obj }
      let doReplace = false, replaceValue: any
      const callbackState = \{
         obj,
         key,
         replace: (val: any) => \{
            replaceValue = val
            doReplace = true
         },
         stop,
         depth,
         ancestors,
         ancestorKeys
      }
      callback(callbackState)
      if (doReplace) \{
         return replaceValue
      }
      if (stopFlag) \{ return obj }
      if (Array.isArray(obj)) \{
         obj.map((child, index) => \{
            const nextAncestorsList = [obj, ...ancestors]
            const nextAncestorKeyList = [...ancestorKeys]
            if (depth !== 0) \{
               nextAncestorKeyList.unshift(key)
            }
            const result = objectWalkerRecursive(child, index, depth + 1, nextAncestorsList, nextAncestorKeyList)
            return result
         })
      }
      if (typeof obj === "object" && obj !== null) \{
         for (const [currentKey, child] of Object.entries(obj)) \{
            const nextAncestorsList = [obj, ...ancestors]
            const nextAncestorKeyList = [...ancestorKeys]
            if (depth !== 0) \{
               nextAncestorKeyList.unshift(key)
            }
            const result = objectWalkerRecursive(child, currentKey, depth + 1, nextAncestorsList, nextAncestorKeyList)
            obj[currentKey] = result
         }
      }
      return obj
   }
   objectWalkerRecursive(obj, '', 0, [], [])
   return obj
}

interface ObjectWalkerCallbackState \{
   /**
    * The current child. (Any type)
    */
   obj: any,
   /**
    * The key for this child (a string if its in an object, a number if its in a list)
    */
   key: string | number,
   /**
    * The depth is how many step down an ancestor tree the iteration currently is in.
    */
   depth: number,
   /**
    * List with the ancestors (object or array)
    */
   ancestors: (object | Array<any>)[],
   /**
    * List with the ancestors keys (string for object, number for array item)
    */
   ancestorKeys: (string | number)[]
   /**
    * Replace the current child in parent object/array
    */
   replace: (val: any) => void,
   /**
    * Stop the recursive iteration in the walker. \\ 
    * Everything stops after calling this method. \\
    * The return object (which is copying itself from the original method), \\
    * will only be fill with properties until the point of the stop call.
    */
   stop: () => void,
}
export type ObjectWalkerCallback = (state: ObjectWalkerCallbackState) => void`}
      />
   )
}

export default ObjectWalkerAnnotatedCode

