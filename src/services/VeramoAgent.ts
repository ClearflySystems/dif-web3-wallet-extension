// Core interfaces
import {
  createAgent,
  IDIDManager,
  IResolver,
  IDataStore,
  IDataStoreORM,
  IKeyManager,
  ICredentialPlugin,
} from '@veramo/core'
import {
  KeyStore,
  DataStore,
  DataStoreORM,
  DIDStore,
  PrivateKeyStore
} from '@veramo/data-store'
import {dbConnection} from './DatabaseConnection';
import {KeyManagementSystem, SecretBox} from '@veramo/kms-local';
import {KeyManager} from "@veramo/key-manager";
import {DIDManager} from '@veramo/did-manager';
import {CredentialPlugin} from "@veramo/credential-w3c";
import {SelectiveDisclosure} from '@veramo/selective-disclosure';
//import {EthrDIDProvider} from '@veramo/did-provider-ethr';
import {KeyDIDProvider} from '@veramo/did-provider-key';
import {DIDResolverPlugin, getUniversalResolverFor} from '@veramo/did-resolver';
//import {getResolver as ethrDidResolver} from 'ethr-did-resolver';
//import {getResolver as webDidResolver} from '@veramo/did-resolver';
//import {getResolver as keyDidResolver} from '@veramo/did-resolver';


console.log(dbConnection);

const initializeAgent = async () => {

  const uniResolver = getUniversalResolverFor(['web', 'key', 'ethr'])

  const agent = createAgent<IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialPlugin>({
    plugins: [
      new KeyManager({
        store: new KeyStore(dbConnection),
        kms: {
          local: new KeyManagementSystem(
            new PrivateKeyStore(dbConnection, new SecretBox(import.meta.env.VITE_APP_KMS_SECRET_KEY))
          ),
        },
      }),
      new DIDManager({
        store: new DIDStore(dbConnection),
        defaultProvider: 'did:key',
        providers: {
          'did:key': new KeyDIDProvider({
            defaultKms: 'local'
          })
        },
      }),
      new DataStore(dbConnection), // may not use in favour of ORM version
      new DataStoreORM(dbConnection),
      new DIDResolverPlugin({
        //...ethrDidResolver({infuraProjectId: import.meta.env.VITE_APP_INFURA_API_KEY}),
        ...uniResolver
      }),

      new SelectiveDisclosure(),
      new CredentialPlugin()
    ],
  });

  return agent;
}

export const agent = initializeAgent();