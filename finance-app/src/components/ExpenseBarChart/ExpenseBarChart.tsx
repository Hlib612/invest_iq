import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import type { ExpenseBarChartProps } from './types';
import{ CustomTooltip } from './CustomTooltip';

export const ExpenseBarChart: React.FC<ExpenseBarChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 400, backgroundColor: '#fff', padding: '20px', borderRadius: '16px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F6FB" />
          <XAxis 
            dataKey="category" 
            tick={{ fill: '#52555F', fontSize: 12 }} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            hide={true} 
          />
          <Tooltip content={<CustomTooltip/>} cursor={{ fill: 'transparent' }} />
          <Bar 
            dataKey="amount" 
            fill="#FF7506" 
            radius={[10, 10, 0, 0]} 
            barSize={38} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};