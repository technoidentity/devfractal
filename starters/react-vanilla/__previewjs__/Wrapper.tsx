// __previewjs__/Wrapper.tsx

import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider>{children}</ChakraProvider>
);
