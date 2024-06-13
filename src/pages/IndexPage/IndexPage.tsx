import './IndexPage.css';
import ProgressEnergy from "@/components/uikit/progress.tsx";
import Balance from "@/components/uikit/balance.tsx";
import React from "react";
import {TONConnectPage} from "@/pages/TONConnectPage/TONConnectPage.tsx";
import CardHolder from "@/components/Footer/Footer.tsx";
import CoinIcon from "@/components/uikit/TapCoin.tsx";

export const IndexPage = ({fBalance,setFBalance,balance,energy,limit,increment,sendMessage,guru}:{guru:boolean,increment:number,sendMessage?:any,fBalance:number,setFBalance: React.Dispatch<React.SetStateAction<number>>,balance:number,energy:number,limit:number}) => {
  return (
      <div id="App" className="bg-amber-500 h-screen flex justify-around items-center flex-col ">
        <TONConnectPage/>
        <Balance from={fBalance} to={balance} setFromBalance={setFBalance} border={false} cup={true}/>
        <CoinIcon increment={increment} currentSpark={energy} guru={guru} sendMessage={sendMessage}/>
        <ProgressEnergy limit={limit} energy={energy}/>
        <CardHolder/>
      </div>
  );
};
