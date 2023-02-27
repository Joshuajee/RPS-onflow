import { PLAYER_MOVE } from "@/libs/constants";
import { getCadenceMove } from "@/libs/gamePlay";
import { contract } from "@/libs/utils";
import * as fcl from "@onflow/fcl";

const endGamePVE = async (callBack: () => void) => {

  const transactionId = await fcl.mutate({
    cadence: `
      import RPSGAME from ${contract}
      import RPSToken from ${contract}

      transaction {

        prepare(acct: AuthAccount) {

          let game <- acct.load<@RPSGAME.GamePVE>(from: RPSGAME.PlayingBotStoragePath)
        
          let gamesRef = acct.getCapability<&{RPSGAME.GamesCollectionInterface}>(RPSGAME.GamesPublicPath)
            .borrow()?? panic("Could not borrow receiver reference")
          
          let rewardedGame <- RPSToken.claimRewardGamePVE(game: <- game!, account: acct)
          
          gamesRef.addPVE(game: <-rewardedGame!)
    
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

export default endGamePVE
 