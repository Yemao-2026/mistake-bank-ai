/**
 * 小学生错题库首页
 * 集成所有功能的主页面
 */

'use client';

import { useState, useEffect } from 'react';
import QuestionCard from '@/components/question-card';
import CameraUpload from '@/components/camera-upload';
import AIExplanation from '@/components/ai-explanation';
import { LearningStats } from '@/components/stats-card';
import { Question } from '@/lib/supabase';

export default function HomePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [stats, setStats] = useState({
    totalQuestions: 0,
    masteredCount: 0,
    reviewingCount: 0,
    pendingCount: 0,
    totalPractices: 0,
    accuracyRate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // 加载错题列表和统计数据
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      // 加载错题列表
      const questionsRes = await fetch('/api/questions');
      const questionsData = await questionsRes.json();
      if (questionsData.success) {
        setQuestions(questionsData.data);
      }

      // 加载统计数据
      const statsRes = await fetch('/api/stats');
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.data);
      }
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理图片上传
  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true);

      // 上传图片进行OCR识别
      const formData = new FormData();
      formData.append('file', file);

      const ocrRes = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });

      const ocrData = await ocrRes.json();

      if (ocrData.success) {
        // 创建新错题
        const createRes = await fetch('/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject: '数学', // 默认科目，可以后续让用户选择
            question_text: ocrData.data.questionText,
            image_url: ocrData.data.imageUrl,
            status: 'pending',
          }),
        });

        const createData = await createRes.json();

        if (createData.success) {
          // 重新加载数据
          await loadData();
          alert('错题添加成功！');
        }
      }
    } catch (error) {
      console.error('上传失败:', error);
      alert('上传失败，请重试');
    } finally {
      setIsUploading(false);
    }
  };

  // 生成AI讲解
  const handleGenerateExplanation = async (questionId: string) => {
    try {
      const question = questions.find(q => q.id === questionId);
      if (!question) return;

      // 调用AI讲解API
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: question.question_text,
          userAnswer: question.user_answer,
          correctAnswer: question.correct_answer,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // 更新错题的讲解内容
        await fetch('/api/questions', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: questionId,
            explanation: data.data.explanation,
          }),
        });

        // 重新加载数据
        await loadData();
      }
    } catch (error) {
      console.error('生成讲解失败:', error);
      alert('生成讲解失败，请重试');
    }
  };

  // 删除错题
  const handleDeleteQuestion = async (id: string) => {
    try {
      const res = await fetch(`/api/questions?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // 重新加载数据
        await loadData();
        alert('删除成功！');
      }
    } catch (error) {
      console.error('删除失败:', error);
      alert('删除失败，请重试');
    }
  };

  // 查看讲解
  const handleViewExplanation = (question: Question) => {
    setSelectedQuestion(question);
    setShowExplanation(true);
  };

  // 练习错题
  const handlePractice = (id: string) => {
    alert('练习功能开发中...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            📚 小学生错题库智能体
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            帮助小学生有效提升知识掌握
          </p>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 统计卡片 */}
        <LearningStats {...stats} />

        {/* 拍照上传 */}
        <div className="mb-8">
          <CameraUpload
            onUpload={handleImageUpload}
            isLoading={isUploading}
          />
        </div>

        {/* 错题列表 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            我的错题
          </h2>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">加载中...</p>
            </div>
          ) : questions.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">还没有错题，快来拍照上传吧！</p>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onDelete={handleDeleteQuestion}
                  onPractice={handlePractice}
                  onViewExplanation={handleViewExplanation}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* AI讲解弹窗 */}
      {showExplanation && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">AI 智能讲解</h3>
                <button
                  onClick={() => setShowExplanation(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <AIExplanation
                questionText={selectedQuestion.question_text}
                userAnswer={selectedQuestion.user_answer}
                correctAnswer={selectedQuestion.correct_answer}
                onGenerate={() => handleGenerateExplanation(selectedQuestion.id || '')}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
