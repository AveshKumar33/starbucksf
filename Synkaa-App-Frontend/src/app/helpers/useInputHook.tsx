import React, { createContext, useContext, useState } from "react";

type ListItem = {
  id: string;
  title: string;
};

type InputContextType = {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  globalListItems: ListItem[];
  setGlobalListItems: React.Dispatch<React.SetStateAction<ListItem[]>>;
  addnewNode: string;
  setAddnewNode: React.Dispatch<React.SetStateAction<string>>;
};

const InputContext = createContext<InputContextType | undefined>(undefined);

export function InputProvider({ children }: any) {
  const [inputValue, setInputValue] = useState<string>("");
  const [globalListItems, setGlobalListItems] = useState<ListItem[]>([]);
  const [addnewNode, setAddnewNode] = useState<string>("");

  return (
    <InputContext.Provider
      value={{
        inputValue,
        setInputValue,
        globalListItems,
        setGlobalListItems,
        addnewNode,
        setAddnewNode,
      }}
    >
      {children}
    </InputContext.Provider>
  );
}

export function useInputValue() {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("useInputValue must be used within an InputProvider");
  }
  return context;
}
