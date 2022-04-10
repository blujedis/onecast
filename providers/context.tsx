import { createContext, FC, useContext as useReactContext, useState } from 'react';

export type CastType = 'chromecast' | 'airplay';

export interface IContext {
  cast: undefined | null | { type: CastType, uri: string };
  setCast: (type?: CastType, uri?: string) => void;
  updateCast: (uri: string) => void;
}

export interface IContextOptions {}

const Context =
  createContext<IContext>(null as unknown as Required<IContext>);

Context.displayName = 'ThemeContext';

const ContextProvider: FC<IContextOptions> = ({children }) => {

  const [cast, setCast] = useState(null as null | undefined | { type: CastType, uri: string });

  const context: IContext = {

    get cast() {
      return cast;
    },

    setCast: (type?: CastType, uri?: string) => {
      if (type && uri)
        setCast({ type, uri })
      else
        setCast(null);
    },

    updateCast: (uri: string) => {
      if (cast && cast.type)
        setCast({ ...cast, uri });
    }
  };

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );

};

const useContext = () => useReactContext(Context);

export {
  Context,
  ContextProvider,
  useContext,
};