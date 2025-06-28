'use client';

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// 각 파이 조각에 대한 데이터 타입 정의
export interface Segment {
  value: number;          // 해당 조각의 값
  color?: string;         // 조각 색상
  label?: string;         // 조각 라벨
}

// CircularChart 컴포넌트가 받을 수 있는 props 정의
export interface CircularChartProps {
  segments: Segment[];    // 파이 차트에 사용될 데이터 배열
  total?: number;         // 전체 값 (생략 시 segments의 합으로 계산)
  centerText?: string | React.ReactNode; // 중앙 또는 하단에 표시할 텍스트
  centerTextPosition?: 'center' | 'bottom'; // 텍스트 위치
  unit?: string;          // 텍스트 옆에 붙을 단위 (%, 건 등)
  showLabel?: boolean;    // 각 조각 위에 라벨 표시 여부

  size?: number | string; // 차트 크기. 숫자면 height로 사용되고, string이면 Tailwind 클래스
  strokeWidth?: number;   // 도넛 차트일 때의 두께 (100에서 빼는 %)
  bgColor?: string;       // 차트 배경색 (현재 사용 안 됨)
  gap?: number;           // 추후 조각 간 간격 설정용
  className?: string;     // 외부에서 주입할 클래스
  style?: React.CSSProperties; // 인라인 스타일
  responsive?: boolean;   // 추후 반응형 설정용

  animation?: boolean | { duration: number }; // 애니메이션 여부 및 설정
  onClick?: (segmentIndex: number) => void;   // 조각 클릭 시 호출될 콜백

  // 추가 기능
  labelPosition?: 'center' | 'outside';       // 라벨 위치 (중앙 or 외부)
  tooltipFormatter?: (label: string, value: number) => string; // 툴팁 포맷터 함수
  showLegend?: boolean;       // 범례 표시 여부
  legendPosition?: 'bottom' | 'right'; // 범례 위치
  donut?: boolean;            // 도넛형 여부 (true: 가운데 뚫림)
}

const CircularChart: React.FC<CircularChartProps> = ({
  segments,
  total,
  centerText,
  centerTextPosition = 'center',
  unit,
  showLabel = false,
  size = 200,
  strokeWidth = 12,
  bgColor = '#f3f4f6',
  gap = 0,
  className = '',
  style = {},
  responsive = true,
  animation = true,
  onClick,
  labelPosition = 'outside',
  tooltipFormatter,
  showLegend = false,
  legendPosition = 'bottom',
  donut = true,
}) => {
  // total이 없으면 segments의 합으로 자동 계산
  const computedTotal = total || segments.reduce((sum, seg) => sum + seg.value, 0);

  // Highcharts 설정 정의
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      height: typeof size === 'number' ? size : undefined,
      backgroundColor: 'transparent',
      spacingBottom: centerTextPosition === 'bottom' ? 60 : undefined, // bottom centerText 보이게 여백 추가
    },
    title: {
      text: centerText
        ? `<div style="font-size: 1.25rem; font-weight: 600">${centerText}${unit || ''}</div>`
        : undefined,
      verticalAlign: centerTextPosition === 'center' ? 'middle' : 'bottom',
      floating: centerTextPosition === 'center',
      align: 'center',
      y: centerTextPosition === 'bottom' ? 40 : undefined,
      useHTML: true, // HTML 렌더링 허용
    },
    tooltip: {
      pointFormatter: function (this: Highcharts.Point) {
        const val = this.y;
        const label = this.name;
        return tooltipFormatter && typeof val === 'number'
          ? tooltipFormatter(label, val)
          : `<b>${label}</b>: ${val ?? 'N/A'}`;
      },
    },
    accessibility: { enabled: false },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        innerSize: donut ? `${100 - strokeWidth}%` : '0%', // 도넛일 경우 innerSize 조정
        dataLabels: {
          enabled: showLabel,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          distance: labelPosition === 'center' ? -30 : 20, // 라벨 위치
        },
        point: {
          events: {
            click: function () {
              onClick && onClick(this.index); // 클릭 이벤트 핸들러
            },
          },
        },
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Data',
        data: segments.map((seg) => ({
          name: seg.label || '',
          y: seg.value,
          color: seg.color,
        })),
        animation: typeof animation === 'boolean'
          ? animation
          : { duration: animation?.duration || 1000 },
      },
    ],
    legend: {
      enabled: showLegend,
      align: legendPosition === 'right' ? 'right' : 'center',
      verticalAlign: legendPosition === 'bottom' ? 'bottom' : 'middle',
      layout: legendPosition === 'right' ? 'vertical' : 'horizontal',
    },
  };

  // Tailwind 기반 size class 처리
  const containerClass = typeof size === 'string' ? size : '';

  return (
    <div className={`relative ${containerClass} ${className}`} style={style}>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default CircularChart;
