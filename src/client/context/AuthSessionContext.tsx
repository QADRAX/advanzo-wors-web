import React, { createContext, useEffect, useState } from "react";
import nookies from "nookies";
import { auth, googleAuthProvider, init as firebaseInit } from "../firebaseClient";
import { signInWithPopup, Unsubscribe, User } from "firebase/auth";

export type AuthProviderProps = {
  children: React.ReactNode;
}

export function setTokenCookie(token: string) {
  nookies.destroy(null, "token");
  nookies.set(null, "token", token, { path: '/' });
}

export type AuthSessionContextState = {
  user?: User;
  signout: () => Promise<void>;
  signinWithGoogle: () => Promise<void>;
}

const signinWithGoogle = async () => {
  try {
    await signInWithPopup(auth(), googleAuthProvider());
    window.setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};

const signout = async () => {
  try {
    await auth().signOut();
    window.setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};

export const AuthContext = createContext<AuthSessionContextState>({
  signout,
  signinWithGoogle,
});

export function AuthSessionContext(props: AuthProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined);

  // listen for token changes and update the cookie
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    if (typeof window !== "undefined") {
      (window as any).nookies = nookies;
    }

    firebaseInit();
    
    unsubscribe = auth().onIdTokenChanged(async (user) => {
      console.log(`token changed!`, user);
      if (!user) {
        console.log(`no token found...`);
        setUser(undefined);
        setTokenCookie("");
      } else {
        console.log(`updating token...`);
        const token = await user.getIdToken();
        setUser(user);
        setTokenCookie(token);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };

  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      console.log(`refreshing token...`);
      const user = auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      signout,
      signinWithGoogle,
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return React.useContext(AuthContext);
}