import * as fcl from "@onflow/fcl";
import { contract } from "@/libs/utils";

const getAccount = async (account: string | undefined) => { 

    if (!account) return
    return await fcl.query({
        cadence: `
        import RPSGAME from ${contract}

        pub fun main(address: Address): &{RPSGAME.GamesCollectionInterface} {

            // Cadence code can get an account's public account object
            // by using the getAccount() built-in function.
            let gamesAccount = getAccount(address)
            // Get the public capability from the public path of the owner's account
            let gamesCapability = gamesAccount.getCapability<&{RPSGAME.GamesCollectionInterface}>(RPSGAME.GamesPublicPath)
            // borrow a reference for the capability
            let gamesReference = gamesCapability.borrow()
              ?? panic("Could not borrow a reference to the games capability")
          
            return gamesReference
          
        }
    `,
        args: (arg: any, t:any) => [arg(account, t.Address)],
    });

}

export default getAccount