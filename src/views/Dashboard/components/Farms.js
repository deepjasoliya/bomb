import React from 'react'
import { Typography, Box } from '@material-ui/core'
import styles from "../styles/Farm.module.css"
import btcbLogo from "../../../assets/img/bomb-bitcoin-LP.png"
import bshareBnbLogo from "../../../assets/img/bshare-bnb-LP.png"
import useBank from '../../../hooks/useBank';
import useStatsForPool from '../../../hooks/useStatsForPool';
import { roundAndFormatNumber } from '../../../0x'



const BTCB_POOL = "BombBtcbLPBShareRewardPool"
const BSHAREBNB_POOL = "BshareBnbLPBShareRewardPool"

function Farms() {

  const btcBank = useBank(BTCB_POOL)
  const bnbBank = useBank(BSHAREBNB_POOL);

  let btcBankStats = useStatsForPool(btcBank)
  let bnbBankStats = useStatsForPool(bnbBank);

  return (
    <Box className={styles.farmContainer}>
      <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column" }}>
        <Typography color="textPrimary" align="center" variant="h4">Bomb Farms</Typography>
        <Typography color="textPrimary" align="center" variant="h6">Stake your LP tokens in our farms to start earning $BSHARE</Typography>
      </div>
      <Box className={styles.btcPool}>
        <div className={styles.btcPoolheader}>
          <img src={btcbLogo} style={{ height: "2rem" }} />
          <span>
            <Typography color="textPrimary" variant="h6">BOMB-BTCB</Typography>
          </span>
        </div>
        <hr />
        <div className={styles.btcPoolStatContainer}>
          <div className={styles.btcStat}>
            <Typography color="textPrimary" variant="h6">
              Daily Returns :
            </Typography>
            <span> <Typography color="textPrimary" variant="h6">
              {btcBankStats?.dailyAPR}
            </Typography></span>
          </div>
          <div className={styles.btcStat}>
            <Typography color="textPrimary" variant="h6">
              Your Stake
            </Typography>
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}> <img src={btcbLogo} style={{ height: "1.5rem" }} />  <Typography color="textPrimary" variant="h6">
              124
            </Typography> </div>
            <div><Typography color="textPrimary" variant="h6">
              4455
            </Typography> </div>
          </div>
          <div className={styles.btcStat}>
            <Typography color="textPrimary" variant="h6">
              Earned
            </Typography>
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
              <img src={btcbLogo} style={{ height: "1.5rem" }} />
              <span>
                <Typography color="textPrimary" variant="h6">
                  124
                </Typography>
              </span>
            </div>
            <div><Typography color="textPrimary" variant="h6">
              775
            </Typography> </div>
          </div>
          <div className={styles.btnContainer}>
            <button onClick={null} className={styles.writeBtns}> <Typography color='textPrimary' >
              Deposit
            </Typography></button>
            <button onClick={null} className={styles.writeBtns}>  <Typography color='textPrimary' >
              Withdraw
            </Typography></button>
            <button onClick={null} className={styles.writeBtns}>  <Typography color='textPrimary' >
              Claim Rewards
            </Typography></button>
          </div>
        </div>
      </Box>

      <Box className={styles.bnbPool}>
        <div className={styles.bnbPoolheader}>
          <img src={bshareBnbLogo} style={{ height: "2rem" }} />
          <Typography color="textPrimary" variant="h6">BSHARE-BNB</Typography>
        </div>
        <hr />
        <div className={styles.bnbPoolStatContainer}>
          <div className={styles.bnbStat}>
            <Typography color="textPrimary" variant="h6">
              Daily Returns :
            </Typography>
            <span> <Typography color="textPrimary" variant="h6">
                 {bnbBankStats?.dailyAPR}
            </Typography></span>
            </div>
          <div className={styles.bnbStat}>
            <Typography color="textPrimary" variant="h6">
              Your Stake
            </Typography>
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}> <img src={btcbLogo} style={{ height: "1.5rem" }} />  <Typography color="textPrimary" variant="h6">
              124
            </Typography> </div>
            <div><Typography color="textPrimary" variant="h6">
              775
            </Typography> </div>
          </div>
          <div className={styles.bnbStat}>
            <Typography color="textPrimary" variant="h6">
              Your Stake
            </Typography>
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}> <img src={btcbLogo} style={{ height: "1.5rem" }} />  <Typography color="textPrimary" variant="h6">
              124
            </Typography> </div>
            <div><Typography color="textPrimary" variant="h6">
              775
            </Typography> </div>
          </div>

          <div className={styles.btnContainer}>
            <button onClick={null} className={styles.writeBtns}> <Typography color='textPrimary' >
              Deposit
            </Typography></button>
            <button onClick={null} className={styles.writeBtns}>  <Typography color='textPrimary' >
              Withdraw
            </Typography></button>
            <button onClick={null} className={styles.writeBtns}>  <Typography color='textPrimary' >
              Claim Rewards
            </Typography></button>
          </div>
        </div>
      </Box>
    </Box>
  )
}

export default Farms
