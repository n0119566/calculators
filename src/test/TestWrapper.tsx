import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';

interface TestWrapperProps {
  children: ReactNode;
}

export function TestWrapper({ children }: TestWrapperProps) {
  return (
    <MantineProvider defaultColorScheme="light">
      {children}
    </MantineProvider>
  );
}