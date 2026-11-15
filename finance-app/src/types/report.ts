export interface IReportData {
  periodFrom: string;
  periodTo: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  byCategory: { categoryId: string; total: number }[];
}
