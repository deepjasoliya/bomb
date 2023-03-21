import React from 'react'
import Boardroom from './components/Boardroom'
import Bonds from './components/Bonds'
import Farms from './components/Farms'
import News from './components/News'
import Summary from './components/Summary'
import styles from "./styles/dashboard.module.css"
import { Grid } from '@material-ui/core'

function dashboard() {
  return (
    <>
      <Grid justifyContent='center' container spacing={5}>
        <Grid item xs={11}>
          <Summary />
        </Grid>
        <Grid item xs={8}>
          <Boardroom />
        </Grid>
        <Grid item xs={3}>
          <News />
        </Grid>
        <Grid item xs={11}>
          <Farms />
        </Grid>
        <Grid item xs={11}>
          <Bonds />
        </Grid>
      </Grid>

    </>
  )
}

export default dashboard
