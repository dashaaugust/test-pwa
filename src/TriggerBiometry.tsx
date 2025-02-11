import { FC } from 'react';

function generateRandomBase64(size: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const charactersLength = characters.length;

  for (let i = 0; i < size; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const base64ToUint8Array = (base64: string): Uint8Array => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const base64Encoded = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = atob(base64Encoded);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const TriggerBiometry: FC = () => {
  const getCredential1 = async () => {
    const challenge = generateRandomBase64(32);
    const credentialId = generateRandomBase64(16);

    const challengeFromServer = challenge; // Вызов с сервера
    const credentialIdFromServer = credentialId; // Идентификатор учетных данных с сервера

    const decodedChallenge = base64ToUint8Array(challengeFromServer);
    const decodedCredentialId = base64ToUint8Array(credentialIdFromServer);

    const options = {
      challenge: decodedChallenge,
      rpId: 'https://glittery-florentine-7f42c8.netlify.app/',
      allowCredentials: [{ type: 'public-key', id: decodedCredentialId }],
      userVerification: 'required',
      timeout: 60000,
    };

    navigator.credentials
      .get({
        // @ts-ignore
        publicKey: options,
      })
      .then((assertion) => {
        console.log('assertion', assertion);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <>
      <div className="card">
        <button onClick={getCredential1}>get biometry</button>
      </div>
    </>
  );
};

export default TriggerBiometry;
