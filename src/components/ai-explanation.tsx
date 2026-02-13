/**
 * AI讲解组件
 * 用于显示AI对错题的讲解内容
 */

'use client';

import { useState } from 'react';

interface AIExplanationProps {
  questionText: string;
  userAnswer?: string;
  correctAnswer?: string;
  isGenerating?: boolean;
  onGenerate?: () => void;
}

export default function AIExplanation({
  questionText,
  userAnswer,
  correctAnswer,
  isGenerating = false,
  onGenerate,
}: AIExplanationProps) {
  const [explanation, setExplanation] = useState('');
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = () => {
    setHasGenerated(true);
    onGenerate?.();
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 space-y-4">
      {/* 标题 */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">AI 智能讲解</h3>
          <p className="text-sm text-gray-600">为你详细解析这道题目</p>
        </div>
      </div>

      {/* 生成按钮 */}
      {!hasGenerated && !isGenerating && (
        <div className="text-center">
          <button
            onClick={handleGenerate}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            🤖 开始讲解
          </button>
        </div>
      )}

      {/* 加载状态 */}
      {isGenerating && (
        <div className="text-center py-8">
          <div className="inline-block">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <p className="mt-4 text-gray-600">AI 正在思考中...</p>
          </div>
        </div>
      )}

      {/* 讲解内容 */}
      {hasGenerated && !isGenerating && (
        <div className="space-y-4">
          {/* 题目信息 */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-700 mb-2">题目：</p>
            <p className="text-gray-800">{questionText}</p>
            {userAnswer && (
              <div className="mt-2 text-sm">
                <span className="text-gray-600">你的答案：</span>
                <span className="text-red-600 font-medium">{userAnswer}</span>
              </div>
            )}
            {correctAnswer && (
              <div className="text-sm">
                <span className="text-gray-600">正确答案：</span>
                <span className="text-green-600 font-medium">{correctAnswer}</span>
              </div>
            )}
          </div>

          {/* 讲解内容 */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-700 mb-2">💡 详细解析：</p>
            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
              {explanation || `
📚 题目分析：

这道题考察的是基础概念的理解。让我们一步一步来看：

✅ 解题步骤：

第1步：仔细阅读题目，理解题目要求

第2步：找出题目中的关键信息

第3步：运用相关知识进行计算或推理

第4步：检查答案是否符合题目要求

💡 易错点提醒：

1. 仔细审题，避免理解偏差
2. 计算时要细心，避免计算错误
3. 答案要完整，不要遗漏

🎯 练习建议：

建议多做一些类似题目，加深对知识点的理解和运用。

加油！你一定可以的！💪
              `.trim()}
            </div>
          </div>

          {/* 重新生成按钮 */}
          <div className="text-center">
            <button
              onClick={handleGenerate}
              className="px-4 py-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              🔄 重新讲解
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
