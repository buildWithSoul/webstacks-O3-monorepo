import type { FC } from 'react';
import { Heading } from '../../atoms';

export interface MetricItem {
  _key: string;
  label: string;
  value: string;
}

export interface MetricsModuleProps {
  _type: 'metricsModule';
  metrics: MetricItem[];
}

const MetricsModule: FC<MetricsModuleProps> = ({ metrics }) => {
  if (!metrics || metrics.length === 0) {
    return null;
  }

  // Determine grid columns based on number of metrics
  const getGridCols = () => {
    const count = metrics.length;
    
    // If divisible by 3, use 3 columns
    if (count % 3 === 0) {
      return 'sm:grid-cols-2 lg:grid-cols-3';
    }
    // If divisible by 2, use 2 columns
    if (count % 2 === 0) {
      return 'sm:grid-cols-2';
    }
    // For odd numbers (1, 5, 7, etc), use 3 columns on large screens
    return 'sm:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <div className="my-spacing-6 rounded bg-card border border-secondary p-6">
      <div className={`grid grid-cols-1 gap-12 sm:gap-16 ${getGridCols()}`}>
        {metrics.map((metric) => (
          <div key={metric._key} className="flex flex-col gap-spacing-4">
            <Heading
              as="h3" 
              fontFamily="accent"
              textTransform="none"
            >
              {metric.value}
            </Heading>
            <div className="text-body font-body">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsModule;
