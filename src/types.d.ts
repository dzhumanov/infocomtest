export interface InputState {
  name: string;
  surname: string;
  inn: string;
  taxMode: "simple" | "general";
  income: number;
}

export interface Tax {
  name: string;
  displayName: string;
  checked: boolean;
  procent: number;
}
