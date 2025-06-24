'use client';

  import React from 'react';
  import { CircularChart } from '@repo/ui';

  const SamplePieChart: React.FC = () => {
    const data = [
      { value: 40, color: '#3b82f6', label: '완료' },
      { value: 30, color: '#facc15', label: '진행중' },
      { value: 30, color: '#ef4444', label: '지연' },
    ];

    return (
      <div>
        <CircularChart
          segments={data}
          centerText="100"
          centerTextPosition="bottom"
          unit="%"
          showLabel={true}
          size="w-128 h-128"
          strokeWidth={16}
          className=""
          animation={{ duration: 1000 }}
          showLegend={true}
          legendPosition="bottom"
          tooltipFormatter={(label: string, value: number) => `${label}: ${value}건`}
          donut={false}
        />
      </div>
    );
  };

  export default SamplePieChart;