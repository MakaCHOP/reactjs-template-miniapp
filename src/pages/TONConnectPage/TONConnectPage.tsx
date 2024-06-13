import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import type { FC } from 'react';


import './TONConnectPage.css';

export const TONConnectPage: FC = () => {
  const wallet = useTonWallet();
  if (!wallet) {
    return (
            <TonConnectButton className='pt-3'/>
    );
  }
  return (
          <TonConnectButton className='pt-3'/>
  );
};
