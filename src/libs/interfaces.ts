export interface AUTH_INTERFACE {
    currentUser: any, 
    profileExists: boolean;
    logOut: () => void;
    logIn:  () => void; 
    signUp: () => void;   
}