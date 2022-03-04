import { useState } from 'react';

export interface IUseToggledStateProps {
  enabled?: boolean;
}

const useToggledState = (props: IUseToggledStateProps) => {

  props = {
    enabled: false as boolean,
    ...props
  };

  const [enabled, setEnabled] = useState(props.enabled);

  const update = (value: boolean) => setEnabled(value);
  const toggle = () => setEnabled(!enabled);
  
  return {
    enabled,
    update,
    toggle
  };

};

export default useToggledState;