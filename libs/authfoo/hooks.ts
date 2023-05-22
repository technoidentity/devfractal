import { useAtomValue, useSetAtom } from "jotai";
import { RESET } from "jotai/utils";
import React from "react";
import invariant from "tiny-invariant";
import {
  authAtom,
  isAuthenticatedAtom,
  nameAtom,
  rolesAtom,
  tokenAtom,
} from "./state";
import { AuthUser } from "../../redux/types";

export const useLogin = () => {
  const setAuth = useSetAtom(authAtom);

  return React.useCallback(
    (auth: AuthUser) => {
      setAuth(auth);
    },
    [setAuth]
  );
};

export const useLogout = () => {
  const setAuth = useSetAtom(authAtom);

  return React.useCallback(() => {
    setAuth(RESET);
  }, [setAuth]);
};

export const useIsAuthenticated = () => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  return isAuthenticated;
};

export const useToken = () => useAtomValue(tokenAtom);

export const useUser = () => {
  const user = useAtomValue(authAtom);
  invariant(user !== undefined && user !== null, "User is undefined");

  return { user };
};

export const useName = () => {
  const name = useAtomValue(nameAtom);
  invariant(name !== undefined, "Name is undefined");

  return name;
};

export const useRoles = () => useAtomValue(rolesAtom);