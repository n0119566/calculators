import { 
  MantineProvider, 
  AppShell,
  Group,
  Text,
  Container,
  createTheme,
} from '@mantine/core';
import { ThemeToggle } from './components/ThemeToggle';
import { CalculatorSelector } from './components/CalculatorSelector';
import { CalculatorDisplay } from './components/CalculatorDisplay';
import '@mantine/core/styles.css';

// Create a custom theme with better spacing for calculators
const theme = createTheme({
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  primaryColor: 'blue',
  components: {
    Card: {
      defaultProps: {
        withBorder: true,
        shadow: 'sm',
        radius: 'md',
        p: 'lg',
      },
    },
  },
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <AppShell
        header={{ height: 60 }}
        padding="md"
      >
        <AppShell.Header pt="md" pb="md">
          <Container size="lg">
            <Group h="100%" px="md" justify="space-between">
              <Text fw={700} size="lg">Calculators</Text>
              <Group>
                <ThemeToggle />
              </Group>
            </Group>
          </Container>
        </AppShell.Header>

        <AppShell.Main>
          <Container size="lg" py="xl">
            <CalculatorSelector />
            <CalculatorDisplay />
          </Container>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;