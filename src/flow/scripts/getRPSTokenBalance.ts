// Get Balances

import * as fcl from "@onflow/fcl";
import { contract } from "@/libs/utils";

const getRPSTokenBalance = async (account: string | undefined) => { 

    if (!account) return

    return await fcl.query({
        cadence: `
        import FungibleToken from ${contract}
        import RPSToken from ${contract}

        pub fun main(account: Address): UFix64 {
            let acct = getAccount(account)
            let vaultRef = acct.getCapability(RPSToken.VaultPublicPath)
                .borrow<&RPSToken.Vault{FungibleToken.Balance}>()
                ?? panic("Could not borrow Balance reference to the Vault")

            return vaultRef.balance
        }

    `,
        args: (arg: any, t:any) => [arg(account, t.Address)],
    });

}

export default getRPSTokenBalance

