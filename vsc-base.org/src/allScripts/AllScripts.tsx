import React from 'react'
import OrganizeImports from './scripts/OrganizeImports'

interface AllScriptsProps {
   activeScript: string
}

const AllScripts = ({ activeScript }: AllScriptsProps) => (
   <>
      <OrganizeImports open={activeScript === 'OrganizeImports'} />
   </>
)

export default AllScripts
