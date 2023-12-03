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
  Entities,
  KeyStore,
  DataStore,
  DIDStore,
  PrivateKeyStore,
  migrations
} from '@veramo/data-store'
//import {createConnection, DataSource, DataSourceOptions} from "typeorm";
import {KeyManagementSystem, SecretBox} from '@veramo/kms-local';
import {KeyManager} from "@veramo/key-manager";
import {DIDManager} from '@veramo/did-manager';
import {CredentialPlugin} from "@veramo/credential-w3c";
import {SelectiveDisclosure} from '@veramo/selective-disclosure';
import {EthrDIDProvider} from '@veramo/did-provider-ethr';
import {KeyDIDProvider} from '@veramo/did-provider-key';
import {DIDResolverPlugin} from '@veramo/did-resolver';
import {getResolver as ethrDidResolver} from 'ethr-did-resolver';
import {getResolver as webDidResolver} from 'web-did-resolver';
import {getResolver as keyDidResolver} from 'key-did-resolver';

const dbOptions:any = {
  type: 'sqljs',
  database: "test_veramo",
  synchronize: false,
  migrations,
  migrationsRun: true,
  logging: ['error', 'info', 'warn'],
  entities: Entities,
}

//const dbConnection = new DataSource(dbOptions).initialize()


export const agent = createAgent<IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialPlugin>({
  plugins: [
    /*
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
    new DataStore(dbConnection),
     */
    new DIDResolverPlugin({
      //...ethrDidResolver({infuraProjectId: import.meta.env.VITE_APP_INFURA_API_KEY}),
      ...webDidResolver(),
      ...keyDidResolver()
    }),

    //new SelectiveDisclosure(),
    //new CredentialPlugin()
  ],
});