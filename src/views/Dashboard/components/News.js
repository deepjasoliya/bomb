import { Typography } from '@material-ui/core'
import React from 'react'

function News() {
  return (
    <div style={{backgroundColor : "#23284bc1", minHeight : "50vh", paddingLeft: "1rem", paddingTop: "1rem",borderRadius: "1rem"}}>
      <Typography variant='h6' color='textPrimary'>
        Latest News
      </Typography>
    </div>
  )
}

export default News
