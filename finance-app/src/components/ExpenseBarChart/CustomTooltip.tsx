import React from 'react';
import type { ExpenseItem } from './types';

export const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {

    const data = payload[0].payload as ExpenseItem;
    
    return (
      <div style={{
        backgroundColor: '#fff',
        padding: '8px 12px',
        border: '1px solid #eaeaea',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>{data.category}</p>
        <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', color: '#FF7506' }}>
          {data.amount.toLocaleString('uk-UA')} грн
        </p>
      </div>
    );
  }

  return null;
};