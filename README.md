## Nautilus Wallet

Second iteration of a Digital Asset wallet and SSI credential storage wallet.
The idea being an all in one WEB3 Identity solution for use in WEB2/WEB3 authentication flows.

Using DIF (https://identity.foundation/) did-jwt VC components and Sphereon/PEX for Presentation Exchange of VerifiedCredentials.

Exploring using Veramo Agent for Key Management and Credential Management with a view to implement TypeORM Browser SQLite DB for storage instead of localStorage.

Local React Build working.
Browser Extension Build works up until Presentation Exchange where AVL is invoked by an external library to validated JSON.


Current Blockers:
1. Constant pain of CSP in browser extensions blocking unsafe-eval which includes 'new Function' a common construct in many JS libraries. 
2. At the moment the AVL library that is used for JSON schema validation can not execute due to above CSP restriction.
3. Have not yet been able to get sqlite running in Veramo agent (this.sqlite undefined)
4. Using InfuraProvider in Veramo agent seems to be breaking (no error, blocks compile) in both ethrDidResolver and ethrDidProvider.