import * as fcl from "@onflow/fcl";
import { contract } from "@/libs/utils";

const getActiveGamePVE = async (account: string | undefined) => { 

    if (!account) return
    return await fcl.query({
        cadence: `
        import RPSGAME from ${contract}

        pub fun main(address: Address): &RPSGAME.GamePVE {

            // Cadence code can get an account's public account object
            // by using the getAccount() built-in function.
            let gameAccount = getAccount(address)

            // Get the public capability from the public path of the owner's account
            let gameCapability = gameAccount.getCapability<&RPSGAME.GamePVE>(RPSGAME.PlayingBotPublicPath)
            
            // borrow a reference for the capability
            let gameReference = gameCapability.borrow() ?? panic("Could not borrow a reference to the games capability")
        
            return gameReference
        
        }
    `,
        args: (arg: any, t:any) => [arg(account, t.Address)],
    });

}

export default getActiveGamePVE