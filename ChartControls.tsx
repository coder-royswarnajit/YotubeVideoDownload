import React from 'react';

// Components
import Button from '../../common/Button';

export type ChartType = 'line' | 'bar' | 'pie' | 'area' | 'scatter';
export type TimeRange = 'day' | 'week' | 'month' | 'quarter' | 'year' | 'all';

interface ChartControlsProps {
  activeChartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
  availableChartTypes?: ChartType[];
  
  timeRange?: TimeRange;
  onTimeRangeChange?: (range: TimeRange) => void;
  availableTimeRanges?: TimeRange[];
  
  showDownload?: boolean;
  onDownload?: (format: 'png' | 'csv' | 'pdf') => void;
  
  className?: string;
}

const ChartControls: React.FC<ChartControlsProps> = ({
  activeChartType,
  onChartTypeChange,
  availableChartTypes = ['line', 'bar', 'pie'],
  
  timeRange,
  onTimeRangeChange,
  availableTimeRanges = ['day', 'week', 'month', 'year', 'all'],
  
  showDownload = false,
  onDownload,
  
  className = '',
}) => {
  // Map chart types to display names
  const chartTypeNames: Record<ChartType, string> = {
    line: 'Line',
    bar: 'Bar',
    pie: 'Pie',
    area: 'Area',
    scatter: 'Scatter',
  };
  
  // Map time ranges to display names
  const timeRangeNames: Record<TimeRange, string> = {
    day: 'Day',
    week: 'Week',
    month: 'Month',
    quarter: 'Quarter',
    year: 'Year',
    all: 'All Time',
  };
  
  return (
    <div className={`flex flex-wrap items-center justify-between gap-2 ${className}`}>
      {/* Chart Type Controls */}
      <div className="flex space-x-2">
        {availableChartTypes.map((type) => (
          <Button
            key={type}
            variant={activeChartType === type ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onChartTypeChange(type)}
          >
            {chartTypeNames[type]}
          </Button>
        ))}
      </div>
      
      {/* Time Range Controls (if enabled) */}
      {timeRange && onTimeRangeChange && (
        <div className="flex space-x-2">
          {availableTimeRanges.map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => onTimeRangeChange(range)}
            >
              {timeRangeNames[range]}
            </Button>
          ))}
        </div>
      )}
      
      {/* Download Controls (if enabled) */}
      {showDownload && onDownload && (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDownload('png')}
          >
            PNG
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDownload('csv')}
          >
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDownload('pdf')}
          >
            PDF
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChartControls;