import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { TransactionRow } from './TransactionRow';
import { TableWrapper, Table, TableHead, Th } from './TransactionTable.styled';

export const TransactionTable: React.FC = () => {
  const { items, activeTab } = useSelector((state: RootState) => state.transactions);

  const filteredTransactions = items.filter(item => item.type === activeTab);

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
          {filteredTransactions.map(item => (
            <TransactionRow key={item.id} item={item} />
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};