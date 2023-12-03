import React from 'react';
import {
  Card, CardBody,
  CardHeader,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import {useNautilusWalletProvider} from "../services/NautilusWalletProvider";


const AssetsScreen = () => {
  /**
   * Reference Wallet Context vars
   */
  const {
    walletLocked,
    getCurrentWallet,
    ethBalance,
    curWalletIndex,
    setCurWalletIndex,
  } = useNautilusWalletProvider();


  return (
    <>
      {!walletLocked &&
        <div className="nautilus-assets-page">
          <Card>
            <CardBody>
              <p><strong>Account Address:</strong><br/><small>{getCurrentWallet().address}</small></p>
            </CardBody>
          </Card>
          <br/>
          <Card>

            <Tabs isFitted variant='enclosed'>
              <TabList mb='1em'>
                <Tab>Tokens</Tab>
                <Tab>NFTs</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <br/>
                  <p><strong>Account Balance:</strong><br/>{ethBalance} ETH</p>
                </TabPanel>
                <TabPanel>
                  Apes and Gifs
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Card>

        </div>
      }
    </>
  )
}


export default AssetsScreen;