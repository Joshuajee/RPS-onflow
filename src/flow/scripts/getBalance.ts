// Get Balances

import * as fcl from "@onflow/fcl";
import { contract } from "@/libs/utils";

const getRPSTokenBalance = async (account: string | undefined) => { 

    if (!account) return

    return await fcl.query({
        cadence: `
        import RPSToken from ${contract}

  
        pub fun main(address: Address): UFix64 {

            let gamesAccount = getAccount(address)
            
            let rpsTokenRef = gamesAccount.getCapability(RPSToken.VaultPublicPath)
                .borrow<&RPSToken.Vault{RPSToken.FungibleToken.Balance}>()
                ?? panic("Could not borrow a reference to the account")

            log(rpsTokenRef.balance)

            return  rpsTokenRef.balance

        }


    `,
        args: (arg: any, t:any) => [arg(account, t.Address)],
    });

}

export default getRPSTokenBalance

