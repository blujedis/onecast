/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
import Toast, { ToastProps } from 'react-native-root-toast';
import { Theme } from '../theme';
import { useTheme } from '../providers/context';
import { remap } from '../utils/object';
import { useState } from 'react';

type VariantKey = keyof Theme['toast'];
type CleanVariantKey = keyof Omit<Theme['toast'], 'default'>;

export type ActionType = 'show' | 'shown' | 'hide' | 'hidden';

export interface IUseToastProps extends Omit<ToastProps, 'backgroundColor' | 'textColor' | 'onShow' | 'onShown' | 'onHide' | 'onHidden'> {
  variant?: VariantKey;
  onAction?: ToastHandler;
  actions?: ActionType[];
}

export interface ToastInstance {
  id: string;
  destroy: () => {};
  update: () => {};
}

export interface IShowToast {
  (message: string, variant?: VariantKey, onAction?: ToastHandler): ToastInstance;
  (message: string, onAction?: ToastHandler): ToastInstance;
}

export interface IShowToastVariant {
  (message: string, onAction?: ToastHandler): ToastInstance;
}

export type ShowToastApi = Record<CleanVariantKey, IShowToastVariant> & {
  show: IShowToast;
  hide: () => void;
}

export type ToastHandler = (type: ActionType) => void;

const VARIANT_MAP = {
  color: 'textColor'
};

const useToast = (props = {} as IUseToastProps) => {

  props = {
    variant: 'default',
    actions: ['hidden'],
    ...props
  };

  const { variant: variantKey, actions, onAction, ...rest } = props;
  const theme = useTheme();

  const [active, setActive] = useState(null as any);

  const api = {
    show,
    hide
  } as ShowToastApi;

  function show(message: string, variantOrOnAction?: VariantKey | ToastHandler, onActionInstance?: ToastHandler) {

    let variant = variantOrOnAction as (VariantKey | undefined);

    if (typeof variantOrOnAction === 'function') {
      onActionInstance = variantOrOnAction;
      variant = undefined;
    }

    const onActionHandler = onActionInstance || onAction || ((type) => { }) as ToastHandler;

    const actionOptions = {
      onShow: () => onActionHandler('show'),
      onShown: () => onActionHandler('shown'),
      onHide: () => onActionHandler('hide'),
      onHidden: () => onActionHandler('hidden'),
    };

    Object.keys(actionOptions).forEach(k => {
      const key = k.replace('on', '').toLowerCase() as ActionType;
      if (!actions?.includes(key as ActionType))
        delete actionOptions[k as keyof typeof actionOptions];
    });

    const variantOptions =
      remap<ToastProps>(theme.toast[variant || variantKey as VariantKey], VARIANT_MAP);

    const options = {
      ...actionOptions,
      ...rest,
      ...variantOptions,
      containerStyle: {
        width: '75%',
        marginTop: 24,
        marginBottom: 24
      },
      textStyle: {
        fontWeight: '600'
      },

    } as ToastProps;

    const toast = Toast.show(message, {
      ...options
    });

    setActive(toast);

    return toast;

  }

  function hide() {
    if (!active) return;
    Toast.hide(active);
  }

  Object.keys(theme.toast).forEach(k => {
    if (k !== 'default')
      api[k as CleanVariantKey] = (msg, onAction) =>
        show(msg, k as CleanVariantKey, onAction);
  });

  return api;

};

export default useToast;