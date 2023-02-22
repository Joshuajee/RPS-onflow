import { createContext, useContext, useState, ReactNode } from "react";

// https://docs.onflow.org/fcl/reference/api/#transaction-statuses
/**
 * STATUS CODE  DESCRIPTION <br/>
 * -1 No Active Transaction<br/>
 * 0  Unknown<br/>
 * 1  Transaction Pending - Awaiting Finalization<br/>
 * 2  Transaction Finalized - Awaiting Execution<br/>
 * 3  Transaction Executed - Awaiting Sealing<br/>
 * 4  Transaction Sealed - Transaction Complete. At this point the transaction result has been committed to the blockchain.<br/>
 * 5  Transaction Expired<br/>
 */

export const TransactionContext = createContext({ 
  initTransactionState: null, setTxId: null, setTransactionStatus: null});

export const useTransaction = () => useContext(TransactionContext);

interface IProps {
  children: ReactNode
}

export default function TransactionProvider({ children }: IProps) {
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(-1);
  const [txId, setTxId] = useState("");

  function initTransactionState() {
    setTransactionInProgress(true);
    setTransactionStatus(-1);
  }

  const value = {
    transactionInProgress,
    transactionStatus,
    txId,
    initTransactionState,
    setTxId,
    setTransactionStatus,
  };

  console.log("TransactionProvider", value);

  return (
    <TransactionContext.Provider value={value as any}>
      {children}
    </TransactionContext.Provider>
  );
}
