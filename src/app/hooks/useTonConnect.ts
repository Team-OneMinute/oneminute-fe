import { SendTransactionResponse, useTonConnectUI } from "@tonconnect/ui-react";
import { Sender, SenderArguments } from "@ton/core";
import { useState } from "react";

export function useTonConnect(): {
  sender: Sender;
  connected: boolean;
  isSent: boolean;
  transactionResponse?: SendTransactionResponse;
} {
  const [tonConnectUI] = useTonConnectUI();
  const [isSent, setIsSent] = useState<boolean>(false);
  const [transactionResponse, setTransactionResponse] =
    useState<SendTransactionResponse>();

  return {
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUI
          ?.sendTransaction({
            messages: [
              {
                address: args.to.toString(),
                amount: args.value.toString(),
                payload: args.body?.toBoc().toString("base64"),
              },
            ],
            validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
          })
          .then((transactionResponse) => {
            setIsSent(true);
            setTransactionResponse(transactionResponse);
          });
      },
    },
    connected: tonConnectUI?.connected,
    isSent: isSent,
    transactionResponse: transactionResponse,
  };
}
