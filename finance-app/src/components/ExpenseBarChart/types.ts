export interface ExpenseItem {
  category: string;
  amount: number;
}

export interface ExpenseBarChartProps {
  data: ExpenseItem[];
}