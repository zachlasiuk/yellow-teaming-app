import { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import './App.css';

import Header from './components/Header';
import LeftColumn from './components/LeftColumn';
import RightColumn from './components/RightColumn';

function App() {
  const [isRightColumnVisible, setIsRightColumnVisible] = useState(true);

  return (
    <div className="App">
      <Header />
      <Button onClick={() => setIsRightColumnVisible(!isRightColumnVisible)}>
        {isRightColumnVisible ? 'Hide Right Column' : 'Show Right Column'}
      </Button>
      <Grid templateColumns={isRightColumnVisible ? "3fr 1fr" : "1fr"} gap={6}>
        <GridItem>
          <LeftColumn />
        </GridItem>
        {isRightColumnVisible && (
          <GridItem>
            <RightColumn />
          </GridItem>
        )}
      </Grid>
    </div>
  );
}

export default App;
