import {
  decodeJWT,
  createJWS,
  ES256KSigner,
  hexToBytes
} from "did-jwt";
import {
  PEX,
  VerifiablePresentationFromOpts,
  KeyEncoding,
  IPresentationDefinition,
  PresentationSignCallBackParams,
} from '@sphereon/pex';
import {
  IProofPurpose,
  IProofType
} from "@sphereon/ssi-types/src/types/did";
import {
  IVerifiablePresentation,
  JwtDecodedVerifiableCredential
} from "@sphereon/ssi-types/src/types/vc";


/**
 * Using the PEX library for Presentation exchange to create a signed VP from our VC.
 * @param vc
 * @param privkey
 * @constructor
 */
const GeneratePresentation = async (vc: string, privkey: string): Promise<string> => {

  try {

    // decode our stored JWT VC
    const decoded = decodeJWT(vc as string);

    // Cast original JWT payload to PEX VC type - both are the same structure
    const originalPayload:JwtDecodedVerifiableCredential = decoded.payload as any;

    //console.log(decoded);
    //console.log(decoded.payload);
    //console.log(originalPayload);

    const pex: PEX = new PEX();

    const params: VerifiablePresentationFromOpts = {
      holderDID: originalPayload.sub,
      proofOptions: {
        type: IProofType.EcdsaSecp256k1Signature2019,
        proofPurpose: IProofPurpose.assertionMethod,
      },
      signatureOptions: {
        verificationMethod: originalPayload.sub, // ?? not sure about this.
        keyEncoding: KeyEncoding.Base58,
        privateKey: privkey,
      },
    };

    const presentationDefinition: IPresentationDefinition = {
      'id': '1234',
      'input_descriptors': [
        {
          id: '1-2-3-4',
          constraints: {
            fields: [
              {
                path: ['$.credentialSubject.name'],
                filter: {
                  type: 'string',
                  pattern: 'n'
                }
              }
            ]
          }
        }
      ],
    }


    /*
        const srMatches = pex.selectFrom(presentationDefinition, [originalPayload.vc]);
        console.log(srMatches);
    */

    const vp = await pex.verifiablePresentationFrom(
      presentationDefinition,
      [originalPayload.vc],
      signedProofCallback,
      params
    );

    // @ts-ignore
    let jws = vp.verifiablePresentation.jws;
    return jws;

  } catch (e) {
    console.log(e);
    return '';
  }
}

export default GeneratePresentation;

/**
 * Sign VP callback
 * @param callBackParams
 */
async function signedProofCallback(callBackParams: PresentationSignCallBackParams): Promise<IVerifiablePresentation> {
  const {presentation, proof, options} = callBackParams;
  const {signatureOptions, proofOptions} = options;
  const privateKeyBase58 = signatureOptions?.privateKey;

  const signer = ES256KSigner(hexToBytes(privateKeyBase58 as string));

  presentation.jws = await createJWS(presentation, signer);

  // @ts-ignore
  return { ...presentation, proof };
}