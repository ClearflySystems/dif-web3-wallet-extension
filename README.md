## Nautilus Wallet

Second iteration of a Digital Asset wallet and SSI credential storage wallet.
The idea being an all in one WEB3 Identity solution for use in WEB2/WEB3 authentication flows.

Using DIF (https://identity.foundation/) did-jwt VC components and Sphereon/PEX for Presentation Exchange of VerifiedCredentials.

~~Exploring using Veramo Agent for Key Management and Credential Management with a view to implement TypeORM Browser SQLite DB for storage instead of localStorage.~~

Added TypeORM/SQL JS storage and setup Local Veramo Agent which will eventually handle account/credential storage and searches for presentation exchange.


Local React Build working.
Browser Extension Build works up until Presentation Exchange where AVL is invoked by an external library to validated JSON.


Current Blockers:
1. Constant pain of CSP in browser extensions blocking unsafe-eval which includes 'new Function' a common construct in many JS libraries. 
2. At the moment the AJV library that is used for JSON schema validation can not execute due to above CSP restriction.
3. Have not yet been able to get sqlite running in Veramo agent (this.sqlite undefined)
4. Using InfuraProvider in Veramo agent seems to be breaking (no error, blocks compile) in both ethrDidResolver and ethrDidProvider.


Current Error Triggered by:

`await pex.verifiablePresentationFrom`

```
Error compiling schema, function code: const schema2 = scope.schema[2];const schema1 = scope.schema[1];return function validate1(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){let vErrors = null;let errors = 0;if(!(((typeof data == "number") && (!(data % 1) && !isNaN(data))) && (isFinite(data)))){const err0 = {instancePath,schemaPath:"#/definitions/nonNegativeInteger/type",keyword:"type",params:{type: "integer"},message:"must be integer"};if(vErrors === null){vErrors = [err0];}else {vErrors.push(err0);}errors++;}if((typeof data == "number") && (isFinite(data))){if(data < 0 || isNaN(data)){const err1 = {instancePath,schemaPath:"#/definitions/nonNegativeInteger/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};if(vErrors === null){vErrors = [err1];}else {vErrors.push(err1);}errors++;}}validate1.errors = vErrors;return errors === 0;}
```
```
unknown exception occurred: Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src 'self' 'wasm-unsafe-eval'"
```


### Potential work arounds
1. Explore other Presentation Exchange libraries - Veramo, vc-js
2. Move all business logic code into WASM libraries built in Rust, using React as presentation layer only.

see - 

https://github.com/topics/verifiable-credentials?l=rust , 

https://docs.rs/caelum-vcdm/latest/caelum_vcdm/, 

https://crates.io/crates/didkit