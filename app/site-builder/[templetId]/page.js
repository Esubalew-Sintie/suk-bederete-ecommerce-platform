import React from 'react'
import Pagebuilder from '@/app/components/SiteBuilder/pageBuilder'

function Template({ params }) {
  return (
    <div className="App">
    {/* <GrapesjsMain/> */}
      <Pagebuilder templetId={ params.templetId} />
  </div>
  )
}

export default Template