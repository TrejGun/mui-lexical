import type { HistoryState } from "@lexical/react/LexicalHistoryPlugin";
import { createEmptyHistoryState } from "@lexical/react/LexicalHistoryPlugin";
import type { JSX, Context } from "react";
import { createContext, ReactNode, useContext, useMemo } from "react";

interface IContextShape {
  historyState?: HistoryState;
}

const Context: Context<IContextShape> = createContext({});

export const SharedHistoryContext = ({ children }: { children: ReactNode }): JSX.Element => {
  const historyContext = useMemo(() => ({ historyState: createEmptyHistoryState() }), []);
  return <Context.Provider value={historyContext}>{children}</Context.Provider>;
};

export const useSharedHistoryContext = (): IContextShape => {
  return useContext(Context);
};
