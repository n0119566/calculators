import { 
  MantineProvider, 
  AppShell,
  Header,
  Group,
  Text,
  Container,
  ColorSchemeScript,
} from '@mantine/core';
import { ThemeToggle } from './components/ThemeToggle';
import { CalculatorSelector } from './components/CalculatorSelector';
import { CalculatorDisplay } from './components/CalculatorDisplay';
import { useStore } from './store/useStore';
import '@mantine/core/styles.css';

function App() {
  const { themeMode } = useStore();

  return (
    <>
      <ColorSchemeScript />
      <MantineProvider defaultColorScheme={themeMode}>
        <AppShell
          header={{ height: 60 }}
          padding="md"
        >
          <AppShell.Header>
            <Container size="lg">
              <Group h="100%" px="md" justify="space-between">
                <Text fw={700} size="lg">Multi Calculator</Text>
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
    </>
  );
}

export default App;