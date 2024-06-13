import { Link } from "react-router-dom";
import { ArrowRight, Trophy } from "../Icons";
import AnimatedCounter from "../AnimatedCounter.tsx";
import React from "react";

interface BalanceType {
  border?: boolean;
  cup?: boolean;
  description?: string;
  referral?: boolean;
  referral_score?: number;
  referral_status?: boolean;
  balance?: number | string;
  user_trophy?: string;
  from: number;
  to: number;
  setFromBalance: React.Dispatch<React.SetStateAction<number>>;
}

const Balance = ({
                   border,
                   cup,
                   description,
                   referral,
                   referral_score,
                   referral_status = false,
                   user_trophy,
                   from,
                   to,
                   setFromBalance,
                 }: BalanceType) => {
  return (
      <div
          className={`flex flex-col items-center justify-center gap-1 p-1 ${border && "border-b-[1px] border-gray-200"}`}
      >
        {referral_status ? (
            <div className="flex flex-col gap-1 items-center justify-center">
              <p className="text-xl text-white font-bold">{referral} Referrals</p>
              <span className="text-sm text-green-600">+ {referral_score}</span>
            </div>
        ) : (
            <>
              {description && <p className="pb-0 text-sm">{description}</p>}
              <div className="flex gap-2 items-center w-full justify-center">
                <img src="./images/favicon32.png" alt="coin" className="scale-85" />
                <span className="text-3xl text-white font-bold">
              <AnimatedCounter
                  from={from}
                  to={to}
                  setFromBalance={setFromBalance}
              />
            </span>
              </div>
              {cup && (
                  <Link
                      className="flex justify-center items-center gap-x-2"
                      to={"/trophy"}
                  >
                    <Trophy/>
                    {user_trophy}
                    <ArrowRight size={24} />
                  </Link>
              )}
            </>
        )}
      </div>
  );
};

export default Balance;
