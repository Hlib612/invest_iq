export interface RawTransaction {
  id: string;
  categoryName: string;
  sum: number;
}

export const transformTransactionsToChartData = (transactions: RawTransaction[]): ExpenseCategoryData[] => {
  const aggregated = transactions.reduce((acc: { [key: string]: number }, item) => {
    acc[item.categoryName] = (acc[item.categoryName] || 0) + item.sum;
    return acc;
  }, {});

  return Object.keys(aggregated).map((category) => ({
    category,
    amount: aggregated[category],
  }));
};