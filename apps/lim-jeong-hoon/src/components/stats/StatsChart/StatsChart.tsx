'use client';

import { useStats } from "@/hooks/word";
import { cn } from "@/utils/cn";
import { CircularChart } from '@repo/ui';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
  chartContainerStyles,
  chartErrorStyles,
  chartLoadingStyles,
  chartTitleStyles,
  statsChartStyles
} from "./StatsChart.styles";

// Chart.js 등록 (ArcElement 제거 - CircularChart 사용)
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface StatsChartProps {
  type: 'status' | 'daily';
  title: string;
  height?: 'small' | 'medium' | 'large';
  className?: string;
}

export function StatsChart({ type, title, height = 'medium', className }: StatsChartProps) {
  const { data: stats, isLoading, error } = useStats();

  if (isLoading) {
    return (
      <div className={cn(statsChartStyles(), className)}>
        <h3 className={chartTitleStyles()}>{title}</h3>
        <div className={chartLoadingStyles()}>
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className={cn(statsChartStyles(), className)}>
        <h3 className={chartTitleStyles()}>{title}</h3>
        <div className={chartErrorStyles()}>
          <svg className="w-8 h-8 text-red-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p>차트를 로드할 수 없습니다</p>
        </div>
      </div>
    );
  }

  const renderStatusChart = () => {
    // CircularChart용 segments 데이터 변환
    const segments = stats.statusData.map((item, index) => {
      const colors = [
        '#EF4444', // 미복습 - 빨간색
        '#3B82F6', // 복습중 - 파란색  
        '#10B981', // 암기완료 - 초록색
      ];
      
      return {
        value: item.y,
        color: colors[index] || '#6B7280',
        label: item.name,
      };
    });

    const total = stats.statusData.reduce((sum, item) => sum + item.y, 0);

    return (
      <div className={chartContainerStyles({ chartHeight: height })}>
        <CircularChart
          segments={segments}
          total={total}
          centerText={`총 ${total}개`}
          centerTextPosition="center"
          showLabel={false}
          showLegend={true}
          legendPosition="bottom"
          donut={true}
          strokeWidth={30}
          size={height === 'small' ? 200 : height === 'medium' ? 300 : 400}
          tooltipFormatter={(label: string, value: number) => {
            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
            return `<b>${label}</b>: ${value}개 (${percentage}%)`;
          }}
          animation={{ duration: 1000 }}
        />
      </div>
    );
  };

  const renderDailyChart = () => {
    // 최근 7일 데이터만 표시
    const recentData = stats.dailyData.slice(-7);
    
    const dailyData = {
      labels: recentData.map(item => {
        const date = new Date(item.date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      }),
      datasets: [
        {
          label: '학습한 단어 수',
          data: recentData.map(item => item.count),
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#3B82F6',
          pointBorderColor: '#FFFFFF',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#FFFFFF',
          bodyColor: '#FFFFFF',
          borderColor: '#3B82F6',
          borderWidth: 1,
          callbacks: {
            label: function(context: any) {
              return `${context.parsed.y}개의 단어를 학습했습니다`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12,
              weight: 'normal' as const,
            },
            color: '#6B7280',
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(156, 163, 175, 0.2)',
          },
          ticks: {
            stepSize: 1,
            font: {
              size: 12,
              weight: 'normal' as const,
            },
            color: '#6B7280',
          },
        },
      },
    };

    return (
      <div className={chartContainerStyles({ chartHeight: height })}>
        <Line data={dailyData} options={options} />
      </div>
    );
  };

  return (
    <div className={cn(statsChartStyles(), className)}>
      <h3 className={chartTitleStyles()}>{title}</h3>
      {type === 'status' ? renderStatusChart() : renderDailyChart()}
    </div>
  );
}