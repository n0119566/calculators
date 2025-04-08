import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useStore } from '../store/useStore';

export function ThemeToggle() {
  const { themeMode, toggleThemeMode } = useStore();
  const { setColorScheme } = useMantineColorScheme();
  
  const handleToggle = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    toggleThemeMode();
    setColorScheme(newMode);
  };

  return (
    <ActionIcon
      onClick={handleToggle}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
    >
      {themeMode === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
    </ActionIcon>
  );
}