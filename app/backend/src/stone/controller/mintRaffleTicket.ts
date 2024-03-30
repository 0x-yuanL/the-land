import { Request, Response } from "express";
import {Account, AccountAddress, Aptos, AptosConfig, Ed25519PrivateKey, Network} from "@aptos-labs/ts-sdk";

const config = new AptosConfig({ network: Network.DEVNET }); // default network is devnet
const aptos = new Aptos(config);
const privateKey = new Ed25519PrivateKey("0x7d227838e01a3930df57aa0921b647a93260b5291cf12b197a04ccddcf65d66a");
const address = AccountAddress.from("0x58ed9d97df952659859a5185dae113430146c42b558cf405adc0f311000b2b6c");
export const mintRaffleTicket = async (req: Request, res: Response) => {
    try {
        const receiver = req.params?.walletAddress;
        // to do: deduct point for minting raffle ticket
        const account = Account.fromPrivateKeyAndAddress({ privateKey, address });
        // const modules = await aptos.getAccountModules({ accountAddress: "0x58ed9d97df952659859a5185dae113430146c42b558cf405adc0f311000b2b6c" });
        const transaction = await aptos.transaction.build.simple({
            sender: account.accountAddress,
            data: {
                function: "0x58ed9d97df952659859a5185dae113430146c42b558cf405adc0f311000b2b6c::main::mint_raffle_ticket",
                typeArguments: [],
                functionArguments: [receiver],
            },
        });
        const committedTransaction = await aptos.signAndSubmitTransaction({ signer: account, transaction })
        return res.status(200).send();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

