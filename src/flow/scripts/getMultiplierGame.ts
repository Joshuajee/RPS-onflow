import * as fcl from "@onflow/fcl";
import { contract } from "@/libs/utils";

const getMultiplierGame = async (id: number) => { 

    return await fcl.query({
        cadence: `
            import RPSGAME from ${contract}

            pub fun main(): &RPSGAME.Match {

                let challengeAccount = getAccount(${contract})
    
                let challengeCapability = challengeAccount.getCapability<&RPSGAME.Challenge>(RPSGAME.AdminMatchPublicPath)

                let challengeReference = challengeCapability.borrow() ?? panic("Could not borrow a reference to the games capability")

                let match = challengeReference.returnGame(id: ${id}) ?? panic("Match not found")

                return match
            
            }

    `
    });

}

export default getMultiplierGame