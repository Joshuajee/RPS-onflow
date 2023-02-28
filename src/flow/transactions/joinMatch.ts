import { contract } from "@/libs/utils";
import * as fcl from "@onflow/fcl";

const joinMatch = async (id: number, address: string, player: string, stake: number, callBack: () => void) => {

  const transactionId = await fcl.mutate({
    cadence: `
        import RPSGAME from ${contract}
        import RPSToken from ${contract}

        transaction {

          prepare(acct: AuthAccount) {

            let gameAccount = getAccount(${address})
            let challengeAccount = getAccount(${contract})
           
            // Get the public capability from the public path of the owner's account
            let gameCapability = gameAccount.getCapability<&RPSGAME.PVPGame>(RPSGAME.MatchPublicPath)
            // borrow a reference for the capability
            log(gameCapability)
            let gameReference = gameCapability.borrow() ?? panic("Could not borrow a reference to the games capability")

            let challengeCapability = gameAccount.getCapability<&RPSGAME.Challenge>(RPSGAME.AdminMatchPublicPath)

            let challengeReference = challengeCapability.borrow() ?? panic("Could not borrow a reference to the games capability")

            let match = challengeReference.returnGame(id: ${id}) ?? panic("Match not found")

            gameReference.join(match: match, opponent: ${player}, stake: ${stake.toFixed(4)})

            log("Joined Match Created Successfully")

          }
        
        }
    `,
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 500,
  });

  fcl.tx(transactionId).subscribe((res: any) => {
    if (res.status === 4) {
      callBack()
    }
  });

};

export default joinMatch
 