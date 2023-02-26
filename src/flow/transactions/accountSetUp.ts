import { contract } from "@/libs/utils";
import * as fcl from "@onflow/fcl";

const createProfile = async (name: string, callBack: () => void) => {

  const transactionId = await fcl.mutate({
    cadence: `
      import RPSGAME from ${contract}

      transaction {
        prepare(acct: AuthAccount) {
    
          // Create a new empty Games
          let games <- RPSGAME.createEmptyGame(name: "${name}")
  
          // store the empty Account in account storage
          acct.save<@RPSGAME.Games>(<-games, to: RPSGAME.GamesStoragePath)
  
          log("Games created for account 2")
  
          // create a public capability for the Games
          let capability = acct.link<&{RPSGAME.GamesCollectionInterface}>(RPSGAME.GamesPublicPath, target: RPSGAME.GamesStoragePath)
  
          log("Capability created")
    
          // // Create a new empty Vault object
          // let vaultA <- RPSToken.createEmptyVault()
          
          // // Store the vault in the account storage
          // acct.save<@RPSToken.Vault>(<-vaultA, to: RPSToken.VaultStoragePath)
    
          // log("Empty Vault stored")
    
          // // Create a public Receiver capability to the Vault
          // let ReceiverRef = acct.link<&RPSToken.Vault{RPSToken.Receiver, RPSToken.Balance}>(RPSToken.ReceiverPublicPath, target: RPSToken.VaultStoragePath)
    
          // log("References created")
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
 