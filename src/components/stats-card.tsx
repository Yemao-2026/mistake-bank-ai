/**
 * 统计卡片组件
 * 用于展示学习统计数据
 */

'use client';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: 'blue' | 'green' | 'orange' | 'purple';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const colorClasses = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  purple: 'bg-purple-500',
};

const bgColorClasses = {
  blue: 'bg-blue-50',
  green: 'bg-green-50',
  orange: 'bg-orange-50',
  purple: 'bg-purple-50',
};

const textColorClasses = {
  blue: 'text-blue-600',
  green: 'text-green-600',
  orange: 'text-orange-600',
  purple: 'text-purple-600',
};

export default function StatsCard({ title, value, icon, color, trend }: StatsCardProps) {
  return (
    <div className={`rounded-lg p-6 ${bgColorClasses[color]} border border-gray-200 hover:shadow-md transition-shadow duration-200`}>
      {/* 标题和图标 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`w-10 h-10 ${colorClasses[color]} rounded-lg flex items-center justify-center text-white text-lg`}>
          {icon}
        </div>
      </div>

      {/* 数值 */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-800">{value}</span>
        {trend && (
          <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * 学习统计概览组件
 */
interface LearningStatsProps {
  totalQuestions: number;
  masteredCount: number;
  reviewingCount: number;
  pendingCount: number;
  accuracyRate: number;
  totalPractices: number;
}

export function LearningStats({
  totalQuestions,
  masteredCount,
  reviewingCount,
  pendingCount,
  accuracyRate,
  totalPractices,
}: LearningStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      {/* 总错题数 */}
      <StatsCard
        title="总错题数"
        value={totalQuestions}
        icon="📚"
        color="blue"
      />

      {/* 已掌握 */}
      <StatsCard
        title="已掌握"
        value={masteredCount}
        icon="✅"
        color="green"
      />

      {/* 复习中 */}
      <StatsCard
        title="复习中"
        value={reviewingCount}
        icon="📖"
        color="orange"
      />

      {/* 待复习 */}
      <StatsCard
        title="待复习"
        value={pendingCount}
        icon="⏳"
        color="purple"
      />

      {/* 正确率 */}
      <StatsCard
        title="正确率"
        value={`${accuracyRate}%`}
        icon="🎯"
        color="green"
        trend={{
          value: 5,
          isPositive: true,
        }}
      />

      {/* 总练习次数 */}
      <StatsCard
        title="总练习次数"
        value={totalPractices}
        icon="💪"
        color="blue"
      />
    </div>
  );
}
