import { Box, Typography } from '@material-ui/core'
import React, { useMemo } from 'react'
import styles from "../styles/Boardroom.module.css"
import bsharelogo from "../../../assets/img/bomb2.png"
import usebShareStats from '../../../hooks/usebShareStats';
import { roundAndFormatNumber } from '../../../0x';
import useFetchBoardroomAPR from '../../../hooks/useFetchBoardroomAPR';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useTotalStakedOnBoardroom from '../../../hooks/useTotalStakedOnBoardroom';
import useShareStats from '../../../hooks/usebShareStats';
import useApprove from '../../../hooks/useApprove';
import useBombFinance from '../../../hooks/useBombFinance';
import useWithdrawFromBoardroom from '../../../hooks/useWithdrawFromBoardroom';
import useRedeemOnBoardroom from '../../../hooks/useRedeemOnBoardroom';
import WithdrawModal from '../../Bank/components/WithdrawModal';
import useModal from '../../../hooks/useModal';
import DepositModal from '../../Bank/components/DepositModal';
import useStakeToBoardroom from '../../../hooks/useStakeToBoardroom';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';

function Boardroom() {
  const bShareStats = usebShareStats();
  const bshareAPR = useFetchBoardroomAPR()
  const bstaked = useStakedBalanceOnBoardroom()
  const bEarned = useEarningsOnBoardroom()
  const bombFinance = useBombFinance()
  const [approveStatus, approve] = useApprove(bombFinance.BSHARE, bombFinance.contracts.Boardroom.address);
  const { onWithdraw } = useWithdrawFromBoardroom()
  const { onRedeem } = useRedeemOnBoardroom()
  const {onStake} = useStakeToBoardroom()
  const tokenBalance = useTokenBalance(bombFinance.BSHARE)
  const {onReward} = useHarvestFromBoardroom()



  const bShareCirculatingSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );

  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={tokenBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'BShare'}
    />,
  );

  
  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={bstaked}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'BShare'}
    />,
  );

  async function handleDeposit() {
    await bombFinance.watchAssetInMetamask("BSHARE")
    await approve()
  }

  return (
    <Box className={styles.boardContainer}>
      <Box>
        <div style={{ textAlign: "right", margin: "1rem" }}><a href='#'>Read Investment strategy  </a></div>
      </Box>
      <Box>
        <button style={{
          backgroundColor: "#728CDF", width: "100%", minHeight: "3rem",
          borderRadius: "0.3rem"
        }}>
          <Typography color='textPrimary' variant='h6' >
            Invest now
          </Typography>
        </button>
      </Box>
      <Box className={styles.btnContainer}>
        <a className={styles.btn} href='https://discord.com'> <Typography color='textPrimary' variant='h6' >
          Chat on  discord
        </Typography>
        </a>
        <a className={styles.btn} href='https://docs.bomb.money/welcome-start-here/readme'> <Typography color='textPrimary' variant='h6' >
          Read Docs
        </Typography>
        </a>
      </Box>
      <Box className={styles.boardPortfolioContainer}>
        <div>
          <div style={{ display: "flex", justifyContent: "flex-start", gap: "0.5rem" }}>
            <img style={{ width: "2rem" }} src={bsharelogo} />
            <Typography variant='h5' color='textPrimary' >Boardroom</Typography>
          </div>
          <span style={{ margin: "0.2rem", marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
            <Typography variant='caption' color='textPrimary' >Stake BSHARE and earn BOMB every second</Typography>

            <Typography variant='caption' color='textPrimary' >
              TVL: ${roundAndFormatNumber(bShareCirculatingSupply, 2)}</Typography>
          </span>
          <hr />
        </div>
        <div className={styles.boardStats}>
          <div className={styles.bshareDailyAPR}>
            <span>  <Typography variant='h5' color='textPrimary' >
              Daily Returns:</Typography></span>
            <div><Typography variant='h4' color='textPrimary' >
              {roundAndFormatNumber(bshareAPR / 365, 2)}%</Typography></div>
          </div>
          <div className={styles.bshareStaked}>
            <div>
              <Typography variant='h5' color='textPrimary' >
                Your Stake:
              </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img style={{ height: "1.5rem" }} src={bsharelogo} />
              <Typography variant='h6' color='textPrimary' >
                {roundAndFormatNumber(bstaked, 2)}
              </Typography>
            </div>
            <div>
              <Typography variant='h6' color='textPrimary' >
                ${roundAndFormatNumber(bSharePriceInDollars * bstaked, 2)}
              </Typography>
            </div>
          </div>
          <div className={styles.bshareEarned}>
            <div>
              <Typography variant='h5' color='textPrimary' >
                Earned
              </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img style={{ height: "1.5rem" }} src={bsharelogo} />
              <Typography variant='h6' color='textPrimary' >
                {roundAndFormatNumber(bEarned, 2)}
              </Typography>
            </div>
            <Typography variant='h6' color='textPrimary' >
              ${roundAndFormatNumber(bSharePriceInDollars * bEarned, 2)}
            </Typography>
          </div>
          <Box className={styles.boardBtnContainer}>
            <div>   <Typography variant='h5' color='textPrimary' >
              Total staked
            </Typography><span>
                <div style={{ display: "flex", justifyContent: "flex-start" }}> <img style={{ height: "1.5rem" }} src={bsharelogo} />
                  <Typography variant='h6' color='textPrimary' >
                    {roundAndFormatNumber(bstaked, 2)}
                  </Typography></div>


              </span></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "0.7rem" }}>
              <button onClick={onPresentDeposit} className={styles.writeBtns}> <Typography color='textPrimary' >
                Deposit
              </Typography></button>
              <button onClick={onPresentWithdraw} className={styles.writeBtns}>  <Typography color='textPrimary' >
                Withdraw
              </Typography></button>
            </div>
            <button onClick={onReward} className={styles.writeBtns}> <Typography color='textPrimary' >
              Claim rewards
            </Typography></button>
          </Box>
        </div>
      </Box>
    </Box>
  )
}

export default Boardroom
