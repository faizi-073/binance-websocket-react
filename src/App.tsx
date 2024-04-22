import React, { FC } from 'react';
import './App.css';
import CurrencyComparator from './features/binance/currency-comparator';
import useBinance from './hooks/use-binance';
import { getSocketByCurrency } from './api/binance-websocket';
import DisplayCurrency from './features/binance/currency-comparator/display-currency';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const ethSocket: WebSocket = getSocketByCurrency('ethusdt');
const btcSocket: WebSocket = getSocketByCurrency('btcusdt');


const App: FC = () => {
  const { coursesInfo:btcCoursesInfo, isAskPriceGoingUp:btcIsAskPriceGoingUp ,isBidPriceGoingUp:btcIsBidPriceGoingUp } = useBinance({socket:btcSocket});
  const { coursesInfo:ethCoursesInfo, isAskPriceGoingUp:ethIsAskPriceGoingUp ,isBidPriceGoingUp:ethIsBidPriceGoingUp } = useBinance({socket:ethSocket});

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
  };

  interface StyledTabsProps {
    children?: React.ReactNode;
    value: number | string;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
  }
  
  const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))({
    display: 'flex',
    justifyContent: 'center',
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 40,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#635ee7',
    },
  });
  
  interface StyledTabProps {
    label: string;
  }
  
  const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
  ))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.7)',    
    '&.Mui-selected': {
      color: '#fff',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }));

  return (
    <>
      <Box sx={{ bgcolor: '#000000' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="Binance Currency"
        >
          <StyledTab label="BTC" />
          <StyledTab label="ETH" />
        </StyledTabs>
      </Box>
      {value ?
      <DisplayCurrency coursesInfo={ethCoursesInfo} isAskPriceGoingUp={ethIsAskPriceGoingUp} isBidPriceGoingUp={ethIsBidPriceGoingUp}/> :
      <DisplayCurrency coursesInfo={btcCoursesInfo} isAskPriceGoingUp={btcIsAskPriceGoingUp} isBidPriceGoingUp={btcIsBidPriceGoingUp}/>
      }
    </>

  );

}

export default App;
