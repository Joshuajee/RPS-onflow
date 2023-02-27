export interface AUTH_INTERFACE {
    currentUser: any, 
    profileExists: boolean;
    logOut: () => void;
    logIn:  () => void; 
    signUp: () => void;   
}


export interface GamePVPDetails {
    host: string, 
    opponent: string, 
    hostStake: number, 
    opponentStake: number,
    bet: boolean
}