export interface InputState {
  name: string;
  surname: string;
  inn: string;
  taxMode: "simple" | "general";
  income: number;
}

export interface Taxes {
  ipn: { name: string; checked: boolean; procent: number };
  co: { name: string; checked: boolean; procent: number };
  opv: { name: string; checked: boolean; procent: number };
  vosms: { name: string; checked: boolean; procent: number };
}

