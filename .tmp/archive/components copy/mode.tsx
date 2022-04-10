import { useContext } from '../providers/context';
import SwitchComponent from '../theme/elements/switch';

const ModeComponent = () => {

  const ctx = useContext();
  const { dark, mode } = ctx.theme;

  return (
    <SwitchComponent
      onChange={(isDark) => ctx.setThemeMode(isDark ? 'dark' : 'light')}
      value={dark}
    >
      {mode}
    </SwitchComponent>
  );

};

export default ModeComponent;