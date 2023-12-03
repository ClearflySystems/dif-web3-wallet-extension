import React from 'react';
import {useNautilusWalletProvider} from "../services/NautilusWalletProvider";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {Select} from "@chakra-ui/react";

const ProfilesScreen = () => {
  /**
   * Reference Wallet Context vars
   */
  const {
    walletLocked,
    curWalletIndex,
    setCurWalletIndex
  } = useNautilusWalletProvider();

  return (
    <>
      <h1>Your Profiles</h1>
      {!walletLocked &&
        <>
          <div className="nautilus-profiles-page">
            <AccountSwitcher/>
          </div>
        </>
      }
    </>
  )
}

export default ProfilesScreen;


export const AccountSwitcher = () => {
  const {
    curWalletIndex,
    setCurWalletIndex
  } = useNautilusWalletProvider();

  return <Select
    placeholder='Switch profile'
    value={curWalletIndex}
    onChange={(e) => setCurWalletIndex(parseInt(e.target.value)) }
  >
    <option value='0'>Account 1</option>
    <option value='1'>Account 2</option>
  </Select>
}