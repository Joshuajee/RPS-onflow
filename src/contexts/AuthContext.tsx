import getAccount from "@/flow/scripts/getAccount";
import getRPSTokenBalance from "@/flow/scripts/getRPSTokenBalance";
import createProfile from "@/flow/transactions/accountSetUp";
import * as fcl from "@onflow/fcl";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";


export const AuthContext = createContext({});

export const useAuth = (): any => useContext(AuthContext);

interface IProps {
  children: ReactNode
}

export default function AuthProvider({ children } : IProps) {
  
  const [currentUser, setUser] = useState({ loggedIn: false, addr: undefined });
  const [checkProfile, setCheckProfile] = useState(false);
  const [userProfile, setProfile] = useState(null);
  const [profileExists, setProfileExists] = useState(false);
  const [balance, setBalance] = useState(0)

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  const loadProfile = useCallback(async () => {
    if (currentUser?.loggedIn) {
      try {
        const profile = await getAccount(currentUser?.addr)
        setProfile(profile ?? null);
        setProfileExists(profile !== null);
        const balance = await getRPSTokenBalance(currentUser?.addr)
        setBalance(balance)
      } catch (e) {
        console.error(e)
      }
    }
  }, [currentUser.loggedIn, currentUser.addr, setProfile, setProfileExists]);

  useEffect(() => {
    // Upon login check if a userProfile exists
    if (currentUser.loggedIn && userProfile === null) {
      loadProfile();
    }
  }, [currentUser, userProfile, loadProfile]);

  const logOut = async () => {
    await fcl.unauthenticate();
    setUser({ addr: undefined, loggedIn: false });
    setProfile(null);
    setProfileExists(false);
  };

  const logIn = () => {
    fcl.logIn();
  };

  const signUp = () => {
    fcl.signUp();
  };

  const value = {
    currentUser,
    userProfile,
    profileExists,
    balance,
    logOut,
    logIn,
    signUp,
    loadProfile,
    //createProfile,
    //updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
 