/**
 * 错题卡片组件
 * 用于展示单个错题的详细信息
 */

'use client';

import { useState } from 'react';
import { Question } from '@/lib/supabase';
import { formatDate, getDifficultyColor, getDifficultyLabel, getStatusColor, getStatusLabel, calculateAccuracy } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  onDelete?: (id: string) => void;
  onPractice?: (id: string) => void;
  onViewExplanation?: (id: string) => void;
}

export default function QuestionCard({
  question,
  onDelete,
  onPractice,
  onViewExplanation
}: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const accuracy = calculateAccuracy(question.correct_count, question.practice_count);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* 卡片头部 */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-600">{question.subject}</span>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getDifficultyColor(question.difficulty || 'medium')}`}>
                {getDifficultyLabel(question.difficulty || 'medium')}
              </span>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(question.status)}`}>
                {getStatusLabel(question.status)}
              </span>
            </div>
            <p className="text-gray-800 line-clamp-2">
              {question.question_text}
            </p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={isExpanded ? '收起' : '展开'}
          >
            <svg
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 卡片内容（可展开） */}
      {isExpanded && (
        <div className="p-4 space-y-4 bg-gray-50">
          {/* 题目图片 */}
          {question.image_url && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={question.image_url}
                alt="题目图片"
                className="w-full h-auto max-h-64 object-contain"
              />
            </div>
          )}

          {/* 答案信息 */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-3 rounded-lg">
              <span className="text-gray-600 block mb-1">学生答案</span>
              <span className="font-medium text-gray-800">{question.user_answer || '-'}</span>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <span className="text-gray-600 block mb-1">正确答案</span>
              <span className="font-medium text-green-600">{question.correct_answer || '-'}</span>
            </div>
          </div>

          {/* 练习统计 */}
          <div className="bg-white p-3 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">练习统计</span>
              <span className="font-medium text-gray-800">
                {question.practice_count} 次练习，正确率 {accuracy}%
              </span>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${accuracy}%` }}
              />
            </div>
          </div>

          {/* AI讲解 */}
          {question.explanation && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <span className="text-sm font-medium text-blue-900 block mb-2">💡 AI讲解</span>
              <p className="text-sm text-gray-700 whitespace-pre-line">{question.explanation}</p>
            </div>
          )}

          {/* 时间信息 */}
          <div className="text-xs text-gray-500">
            创建于 {formatDate(question.created_at || '')}
            {question.updated_at && question.updated_at !== question.created_at && (
              <span> · 更新于 {formatDate(question.updated_at)}</span>
            )}
          </div>
        </div>
      )}

      {/* 卡片底部操作按钮 */}
      <div className="p-4 bg-white border-t border-gray-200 flex gap-2">
        {onViewExplanation && !question.explanation && (
          <button
            onClick={() => onViewExplanation(question.id || '')}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            🤖 AI讲解
          </button>
        )}
        {onPractice && (
          <button
            onClick={() => onPractice(question.id || '')}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            📝 练习
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => {
              if (confirm('确定要删除这道错题吗？')) {
                onDelete(question.id || '');
              }
            }}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
          >
            🗑️ 删除
          </button>
        )}
      </div>
    </div>
  );
}
