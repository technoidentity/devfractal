import { Heading } from "@chakra-ui/react";
import { Suspense } from "react";
import { ErrorBoundary, type ErrorBoundaryProps } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";
import invariant from "tiny-invariant";
const rootEl = document.getElementById("root");
invariant(rootEl, "root element not found");

const ErrorFallback: ErrorBoundaryProps["FallbackComponent"] = ({ error }) => (
  <Heading size="3xl" color="red.700">
    {error.message}
  </Heading>
);

const SuspenseFallback = <Heading size="3xl">Loading...</Heading>;

export type ProviderProps = Readonly<{
  children: React.ReactNode;
}>;

export const Provider = ({ children }: ProviderProps) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Suspense fallback={SuspenseFallback}>
      <SWRConfig value={{ suspense: true }}>
        {children}
        <Toaster />
      </SWRConfig>
    </Suspense>
  </ErrorBoundary>
);
