import React from "react";
import {
  Navigate,
  RouteObject,
  RouteProps,
  useActionData,
} from "react-router-dom";
import { z } from "zod";
import { AuthUser } from "../../redux/types";
import { defaultErrorElement } from "./common";
import { useIsAuthenticated, useLogin } from "./hooks";

const LoginActionData = z.union([
  z.undefined(),
  z.object({ type: z.literal("error") }),
  z.object({ type: z.literal("success"), data: AuthUser }),
]);

export const useError = () => {
  const actionData = LoginActionData.parse(useActionData());

  if (actionData === undefined) {
    return false;
  }

  return actionData.type === "error";
};

type LoginRouteProps = Pick<RouteProps, "element"> & {
  readonly navigateTo: string;
};

function LoginRouteImpl({ element }: Pick<RouteProps, "element">) {
  const actionData = LoginActionData.parse(useActionData());
  const login = useLogin();

  // @TODO: shall we just shift this to useLogin?
  React.useEffect(() => {
    if (actionData !== undefined && actionData.type === "success") {
      login(actionData.data);
    }
  }, [actionData, login]);

  return <>{element}</>;
}

function LoginRoute({ navigateTo, element }: LoginRouteProps) {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <Navigate to={navigateTo} replace />;
  }

  return <LoginRouteImpl element={element} />;
}

export type LoginRouteArgs = RouteObject & LoginRouteProps;

export const loginRoute = ({
  navigateTo,
  element,
  ...props
}: LoginRouteArgs) => ({
  errorElement: defaultErrorElement,
  ...props,
  element: <LoginRoute element={element} navigateTo={navigateTo} />,
});