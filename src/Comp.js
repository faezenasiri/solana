import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, {useCallback } from 'react';

const Comp = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    var recieverWallet = "J5RMqG3weuXtZJ8mT8sm9gKY3QETcLFxZB7zGHnDU1V8"

    
    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: recieverWallet,
                lamports: 1,
            })
        );


        const signature = await sendTransaction(transaction, connection);
        console.log(signature)

        await connection.confirmTransaction(signature, 'processed');
    }, [publicKey, sendTransaction, connection]);

    return (
        <button onClick={onClick} disabled={!publicKey}>
            Send 1 lamport to a random address!
        </button>
    );
};
export default Comp;
