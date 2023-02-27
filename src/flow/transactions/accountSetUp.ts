import { contract } from "@/libs/utils";
import * as fcl from "@onflow/fcl";

const createProfile = async (name: string, callBack: () => void) => {

  const transactionId = await fcl.mutate({
    cadence: `
      import RPSGAME from ${contract}
      import FungibleToken from ${contract}
      import RPSToken from ${contract}
      import MetadataViews from ${contract}


      transaction {
        prepare(acct: AuthAccount) {
    
          // Create a new empty Games
          let games <- RPSGAME.createEmptyGame(name: "${name}")
  
          // store the empty Account in account storage
          acct.save<@RPSGAME.Games>(<-games, to: RPSGAME.GamesStoragePath)
  
          log("Games created")
  
          // create a public capability for the Games
          let capability = acct.link<&{RPSGAME.GamesCollectionInterface}>(RPSGAME.GamesPublicPath, target: RPSGAME.GamesStoragePath)
  
          log("Capability created")

          if acct.borrow<&RPSToken.Vault>(from: RPSToken.VaultStoragePath) != nil {
            return
          }
          
          // Create a new RPSToken Vault and put it in storage
          acct.save(
            <-RPSToken.createEmptyVault(),
            to: RPSToken.VaultStoragePath
          )
  
          // Create a public capability to the Vault that only exposes
          // the deposit function through the Receiver interface
          acct.link<&RPSToken.Vault{FungibleToken.Receiver}>(
            RPSToken.ReceiverPublicPath,
            target: RPSToken.VaultStoragePath
          )
  
          // Create a public capability to the Vault that exposes the Balance and Resolver interfaces
          acct.link<&RPSToken.Vault{FungibleToken.Balance, MetadataViews.Resolver}>(
            RPSToken.VaultPublicPath,
            target: RPSToken.VaultStoragePath
          )

        }
    
      }
    `,
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 50,
  });

  fcl.tx(transactionId).subscribe((res: any) => {
    if (res.status === 4) {
      callBack()
    }
  });

};

export default createProfile
 