import React, { useMemo } from 'react'
import { createGlobalStyle } from 'styled-components';
import { Box, Container, Typography, Grid } from '@material-ui/core';
import styles from "../styles/Summary.module.css"
import HomeImage from '../../../assets/img/background.jpg';
import { Helmet } from 'react-helmet';
import CardIcon from '../../../components/CardIcon';
import TokenSymbol from '../../../components/TokenSymbol';
import useBondStats from '../../../hooks/useBondStats';
import usebShareStats from '../../../hooks/usebShareStats';
import useBombStats from '../../../hooks/useBombStats';
import { roundAndFormatNumber } from '../../../0x';
import MetamaskFox from '../../..//assets/img/metamask-fox.svg';
import useCurrentEpoch from '../../../hooks/useCurrentEpoch';
import ProgressCountdown from '../../Boardroom/components/ProgressCountdown';
import moment from 'moment';
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;

    background-size: cover !important;
    background-color: #0C1125;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

function Summary() {

  const bombStats = useBombStats();
  const bShareStats = usebShareStats();
  const tBondStats = useBondStats();
  const currentEpoch = useCurrentEpoch();
  const { to } = useTreasuryAllocationTimes();

  const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
  const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);
  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);



  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  const bSharePriceInBNB = useMemo(
    () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
    [bShareStats],
  );
  const bShareCirculatingSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);


  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  return (
    <div>
      <BackgroundImage />
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
          <Box className={styles.financeSummary}>
            <Typography color="textPrimary" align="center" variant="h6">
              Bomb Finance Summary
              <hr />
            </Typography>

            <Box className={styles.finContent}>
              <Box className={styles.finTokenomics}>
                <div className={styles.finStats}>
                  <TokenSymbol symbol='BOMB' size={20} />
                  <div>
                    {roundAndFormatNumber(bombCirculatingSupply, 2)}
                  </div>
                  <div>
                    {roundAndFormatNumber(bombTotalSupply, 2)}
                  </div>
                  <div>
                    ${roundAndFormatNumber(bombPriceInDollars, 2)}
                  </div>
                  <div>
                    {roundAndFormatNumber(bombPriceInBNB, 2)} BTCB
                  </div>
                  <img style={{ height: "1rem" }} src={MetamaskFox} />
                </div>
                <hr />


                <div className={styles.finStats}>
                  <TokenSymbol symbol='BSHARE' size={20} />
                  <div>
                    {roundAndFormatNumber(bShareCirculatingSupply, 2)}
                  </div>
                  <div>
                    {roundAndFormatNumber(bShareTotalSupply, 2)}
                  </div>
                  <div>
                    ${roundAndFormatNumber(bSharePriceInDollars, 2)}
                  </div>
                  <div>
                    {roundAndFormatNumber(bSharePriceInBNB, 2)} BTCB
                  </div>
                  <img style={{ height: "1rem" }} src={MetamaskFox} />
                </div>
                <hr />


                <div className={styles.finStats}>
                  <TokenSymbol symbol='BBOND' size={20} />
                  <div>
                    {roundAndFormatNumber(tBondCirculatingSupply, 2)}
                  </div>
                  <div>
                    {roundAndFormatNumber(tBondTotalSupply, 2)}
                  </div>
                  <div>
                    ${roundAndFormatNumber(tBondPriceInDollars, 2)}
                  </div>
                  <div>
                    {roundAndFormatNumber(tBondPriceInBNB, 2)} BTCB
                  </div>
                  <img style={{ height: "1rem" }} src={MetamaskFox} />
                </div>
                <hr />
              </Box>


              <Box className={styles.finEpoch}>
                <div>
                  Current Epoch
                  <Typography color='textPrimary' align="center" variant='h5' >{Number(currentEpoch)}</Typography><hr />
                </div>
                <div>
                  <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
                  Next Epoch In

                </div>

              </Box>

            </Box>
          </Box>
    



    </div>
  )
}

export default Summary
