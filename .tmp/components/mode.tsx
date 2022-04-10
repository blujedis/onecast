
// import { useTheme } from '../providers/theme';
// import SwitchComponent from '../theme/elements/switch';

const ModeComponent = () => {

  const themer = useTheme();

  return (
    <SwitchComponent
      onChange={themer.toggleMode}
      value={themer.mode === 'dark'}
    >
      {themer.mode}
    </SwitchComponent>
  );

};

export default ModeComponent;