import { Box, Typography } from '@material-ui/core'
import React from 'react'
import bondLogo from "../../../assets/img/bbond.png"
import styles from "../styles/Bonds.module.css"
import useBondStats from '../../../hooks/useBondStats'
import useBondsPurchasable from '../../../hooks/useBondsPurchasable';
import useCashPriceInLastTWAP from '../../../hooks/useCashPriceInLastTWAP'
import useBombFinance from '../../../hooks/useBombFinance'
import { useCallback } from 'react'
import { addTransaction } from '../../../state/transactions/actions'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { roundAndFormatNumber } from '../../../0x'

function Bonds() {

  const bombFinance = useBombFinance()
  const bondBalance = useTokenBalance(bombFinance?.BBOND);
  const bondPurchasable = useBondsPurchasable()


  
  const handleRedeemBonds = useCallback(
    async () => {
      const tx = await bombFinance.redeemBonds(bondBalance);
      addTransaction(tx, {summary: `Redeem ${bondBalance} BBOND`});
    },
    [bombFinance, addTransaction],
  );

  const bondStats = useBondStats()

  return (
    <Box className={styles.container}>
      <div className={styles.header}>
        <img style={{ height: "3rem" }} src={bondLogo} />
        <div>
          <Typography color="textPrimary" variant="h5">
            Bonds
          </Typography>
          <Typography color="textPrimary" variant="h6">
            BBOND can be purchased only on contraction periods, when TWAP of BOMB below 1
          </Typography>
        </div>
      </div>
      <div className={styles.purchaseContainer}>
        <Typography color="textPrimary">
          Current price : (Bomb) ^ 2
        </Typography>
        <Typography color="textPrimary">
          Available to redeem:
        </Typography>
        <div>
          <Typography color="textPrimary">
            Purchase BBOND
          </Typography>
          <Typography color="textPrimary">
            Bomb is {bondPurchasable < 0 ? "over": "under"} peg
          </Typography>
        </div>

        <button disabled={bondPurchasable <= 0} onClick={null} className={styles.writeBtns}>  <Typography color='textPrimary' >
          Purchase
        </Typography></button>
      </div>
      <hr />
      <div className={styles.redeemContainer}>
        <div>
        <Typography color="textPrimary" variant='h6'>
            BBOND = {bondStats?.tokenInFtm} BTC
          </Typography>
        </div>
        <div>
        <Typography color="textPrimary" variant='h6'>
            {roundAndFormatNumber(bondBalance, 2)}
          </Typography>
        </div>
        <div>
        <Typography color="textPrimary" variant='h6'>
            Redeem Bomb
          </Typography>
        </div>
        <button onClick={()=>handleRedeemBonds(5)} className={styles.writeBtns}>  <Typography color='textPrimary' >
          Redeem
        </Typography></button>
      </div>
    </Box>
  )
}

export default Bonds
