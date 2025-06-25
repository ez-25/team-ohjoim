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
        segments={data}                          // 차트에 표시할 데이터 (value, color, label 포함)
        centerText="100"                         // 차트 중앙 또는 하단에 표시할 텍스트
        centerTextPosition="bottom"             // center 또는 bottom 중 선택 (기본값: center)
        unit="%"                                // centerText에 붙는 단위 (예: %, 건 등)
        showLabel={true}                        // 각 파이 조각에 라벨 표시 여부
        size="w-128 h-128"                      // Tailwind 기반 크기 (예: w-64 h-64)
        strokeWidth={16}                        // 도넛형일 때 두께 비율 (100에서 빼기)
        className=""                            // 사용자 정의 클래스 추가용
        animation={{ duration: 1000 }}          // 애니메이션 지속 시간 (ms)
        showLegend={true}                       // 하단 또는 오른쪽에 범례 표시 여부
        legendPosition="bottom"                 // 범례 위치 ('bottom' 또는 'right')
        tooltipFormatter={(label: string, value: number) => `${label}: ${value}건`}// 툴팁 표시 포맷 함수
        donut={true}                           // 도넛형 여부 (false일 경우 일반 파이 차트)
      />
    </div>
    );
  };

  export default SamplePieChart;