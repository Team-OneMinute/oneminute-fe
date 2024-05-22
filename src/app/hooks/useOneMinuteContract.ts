import { useEffect, useState } from "react";
import { OneMinuteContract } from "@/app/contracts/OneMinuteContract";
import { useTonClient } from "@/app/hooks//useTonClient";
import { useAsyncInitialize } from "@/app/hooks//useAsyncInitialize";
import { Address, OpenedContract, toNano } from "@ton/core";
import { useTonConnect } from "./useTonConnect";

export function useOneMinuteContract() {
  const client = useTonClient();
  const { sender } = useTonConnect();

  const sleep = (time: number) => {
    new Promise((resolve) => setTimeout(resolve, time));
  };

  const [contractData, setContractData] = useState<null | {
    owner_address: Address;
  }>();

  const [balance, setBalance] = useState<null | bigint>(BigInt(0));

  const oneMinuteContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new OneMinuteContract(
      Address.parse("EQBTgbkoc-7DkSwaKM8M3ZsPrBTlzD3gHiCMI75vWBN_KOZv") // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<OneMinuteContract>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
        if (!oneMinuteContract) return;
      setContractData(null);
        const balance = await oneMinuteContract.getBalance();
        const owner = await oneMinuteContract.getOwner();
      setContractData({
        owner_address: owner,
      });
      setBalance(balance);
      await sleep(5000);
      getValue();
    }
    getValue();
  }, [oneMinuteContract]);

  return {
    contract_address: oneMinuteContract?.address.toString(),
    contract_balance: balance,
    ...contractData,
    sendBet: async () => {
        return oneMinuteContract?.send(
          sender,
          {
            value: toNano("0.1"),
          },
          "Bet",
        );
    },
  };
}
