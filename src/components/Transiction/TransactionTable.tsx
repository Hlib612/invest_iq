import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { TransactionRow } from './TransactionRow';
import { TableWrapper, Table, TableHead, Th, Tr } from './TransactionTable.styled';

const MIN_ROWS = 9;

export const TransactionTable: React.FC = () => {
  const { items, activeTab } = useSelector((state: RootState) => state.transactions);

  const filteredTransactions = items.filter((item) => item.type === activeTab);
  const emptyRowsCount = Math.max(0, MIN_ROWS - filteredTransactions.length);

  return (
    <TableWrapper>
      <Table>
        <TableHead>
          <tr>
            <Th>Дата</Th>
            <Th>Опис</Th>
            <Th>Категорія</Th>
            <Th $align="right">Сума</Th>
            <Th />
          </tr>
        </TableHead>
        <tbody>
          {filteredTransactions.map((item) => (
            <TransactionRow key={item.id} item={item} />
          ))}
          {Array.from({ length: emptyRowsCount }).map((_, idx) => (
            <Tr key={`empty-${idx}`}>
              <td colSpan={5} className="h-10" />
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};
