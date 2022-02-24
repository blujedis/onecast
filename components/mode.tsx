import { useThemeContext } from '../providers/context';
import SwitchComponent from './elments/switch';

const ModeComponent = () => {

  const ctx = useThemeContext();

  return (
    <SwitchComponent
      onChange={(isDark) => ctx.setThemeMode(isDark ? 'dark' : 'light')}
      enabled={ctx.dark}
    >
      {ctx.mode}
    </SwitchComponent>
  );

};

export default ModeComponent;