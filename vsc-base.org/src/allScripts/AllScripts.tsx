import React from 'react'

import NameAllScripts from './scripts/NameAllScripts'
import OrganizeImports from './scripts/OrganizeImports'

interface AllScriptsProps {
   activeScript: string
}

const AllScripts = ({ activeScript }: AllScriptsProps) => (
   <>
      <OrganizeImports open={activeScript === 'OrganizeImports'} />
      <NameAllScripts open={activeScript === 'NameAllScripts'} />
   </>
)

export default AllScripts
