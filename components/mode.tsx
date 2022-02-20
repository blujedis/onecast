import { useThemeContext } from '../providers/theme';
import SwitchComponent from './switch';

const ModeComponent = () => {

  const ctx = useThemeContext();

  return (
    <SwitchComponent
      onChange={(isDark) => ctx.setMode(isDark ? 'dark' : 'light')}
      enabled={ctx.dark}
    >
      {ctx.mode}
    </SwitchComponent>
  );

};

export default ModeComponent;