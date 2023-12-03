import React from 'react';
import {useNavigate} from "react-router-dom";
import {Card, CardHeader, CardBody, Stack, StackDivider, Heading, Button, Input} from "@chakra-ui/react";
import {useNautilusWalletProvider} from "../services/NautilusWalletProvider";

const UnlockScreen = () => {
  /**
   * Reference Wallet Context vars
   */
  const {
    setWalletLocked
  } = useNautilusWalletProvider();

  /**
   * After unlock event - TODO add password processing
   */
  const afterUnlock = () => {
    setWalletLocked(0);
    navigate('/assets');
  }

  // Add Navigation/Location hooks
  const navigate = useNavigate();

  return (
    <>
      <div className="nautilus-unlock-page">
        <Card>
          <CardHeader>
            <div className="nautilus-logo"></div>
            <Heading size='md'>Unlocking Web3</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider/>} spacing='4'>
              <Input type='password' placeholder='Enter Your Password'/>
              <Button onClick={afterUnlock}>Unlock</Button>
            </Stack>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default UnlockScreen;