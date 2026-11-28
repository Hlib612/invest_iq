import styled from 'styled-components';

export const TableWrapper = styled.div`
  width: 100%;
  max-width: 746px;
  background-color: #ffffff;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f5f6fb;
  height: 40px;
`;

export const Th = styled.th<{ $align?: 'left' | 'right' }>`
  padding: 0 20px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #000000;
  text-align: ${({ $align }) => $align || 'left'};
`;

export const Tr = styled.tr`
  height: 40px;
  border-bottom: 2px solid #f5f6fb;
  transition: background-color 150ms ease;

  &:hover {
    background-color: #fafbfd;
  }
`;

export const Td = styled.td<{ $align?: 'left' | 'right' | 'center' }>`
  padding: 0 20px;
  font-size: 12px;
  line-height: 1.17;
  letter-spacing: 0.04em;
  text-align: ${({ $align }) => $align || 'left'};
`;

export const DateCell = styled(Td)`
  color: #52555f;
  width: 110px;
`;

export const DescriptionCell = styled(Td)`
  color: #52555f;
`;

export const CategoryCell = styled(Td)`
  color: #000000;
  width: 140px;
`;

export const AmountCell = styled(Td)<{ $isExpense: boolean }>`
  font-weight: 700;
  text-align: right;
  width: 140px;
  color: ${({ $isExpense }) => ($isExpense ? '#e7192e' : '#407946')};
`;

export const ActionCell = styled(Td)`
  width: 60px;
  text-align: center;
`;

export const DeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  color: #52555f;
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease;

  &:hover {
    background-color: #f5f6fb;
    color: #e7192e;
  }
`;