import React, {createRef} from 'react';
//import {IResolver} from '@veramo/core';
//import { useVeramo } from '@veramo-community/veramo-react';
import {useNautilusWalletProvider} from "../services/NautilusWalletProvider";
import GeneratePresentation from "../services/NautilusCredentialProcessing";
import {Button, Card, CardFooter, CardHeader, Center, Stack, TabPanel} from "@chakra-ui/react";
import {v4 as uuidv4} from "uuid";
import {ChatIcon, EditIcon} from "@chakra-ui/icons";
import CredentialForm, {CredentialFormRef} from "../components/Form/CredentialForm";
import {useReadLocalStorage} from "usehooks-ts";
import {CREDENTIAL_STORAGE_KEY, ICredentialModel} from "../models/ICredentialModel";
import {VerifiableCredential} from "did-jwt-vc";

const CredentialsScreen = () => {

  //const { agent } = useVeramo<IResolver>()

  /**
   * Reference Wallet Context vars
   */
  const {
    walletLocked,
    getCurrentWallet,
    lastMessage,
    setLastMessage
  } = useNautilusWalletProvider();

  /**
   * Storage of credentials in localStorage
   * TODO - move to Veramo sqlite and using typeorm
   */
  const currentCredentialList = useReadLocalStorage<ICredentialModel[]>(CREDENTIAL_STORAGE_KEY);

  /**
   * Forward reference for child credential form component
   */
  const childFormRef = createRef<CredentialFormRef>();

  /**
   * Event handler to generate VP from selected credential
   * @param index
   */
  const handlePresent = async (index: number) => {
    // TODO - Add filter based on presentationDefinition passed by server/external request so user only selects from relevant credentials

    if(currentCredentialList && currentCredentialList[index]) {
      const selectedCredential = currentCredentialList[index];// as ICredentialModel;
      const selectedVC: VerifiableCredential = selectedCredential.vc;

      // Generate VP - IE signed VC
      const VP = GeneratePresentation(selectedVC, getCurrentWallet().signingKey.privateKey).then((VP: string | undefined) => {
        const msg = JSON.stringify({
          'action': 'PRESENT_VP',
          'data': VP
        });
        // show in debug window
        setLastMessage(msg);
        // Send to extension service worker
        //window.postMessage(msg);
        // @ts-ignore
        if (typeof chrome !== 'undefined') {
          // @ts-ignore
          chrome.runtime.sendMessage(msg).then((r:any) => {
            // todo re-enable button
          });
        }
      });
    }
  }

  return (
    <>
      <h1>Your Credentials</h1>
      {!walletLocked &&
        <>
          <div className="nautilus-credentials-page">
              <Stack spacing='4'>
                {
                  currentCredentialList?.map((credential, index) => {
                    return (<div key={uuidv4()}>
                      <Card>
                        <CardHeader>{credential.title}</CardHeader>
                        <CardFooter>
                          <Button
                            flex='1'
                            variant='ghost'
                            leftIcon={<EditIcon/>}
                            onClick={(e) => {childFormRef?.current?.openModalForm(index)}}
                          >
                            Edit
                          </Button>
                          <Button
                            flex='1'
                            variant='ghost'
                            leftIcon={<ChatIcon/>}
                            onClick={(e) => {handlePresent(index)}}
                          >
                            Present
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>)
                  })
                }
              </Stack>
              <br/>
              <CredentialForm ref={childFormRef}/>
              <Center>
                <Stack>
                  <Button onClick={() => {
                    childFormRef?.current?.openModalForm(-1)
                  }}>
                    Add New Credential
                  </Button>
                </Stack>
              </Center>

            <br/>
            <Card>
              <CardHeader>Last Message:</CardHeader>
              <>{lastMessage}</>
            </Card>
          </div>
        </>
      }
    </>
  )
}

export default CredentialsScreen;