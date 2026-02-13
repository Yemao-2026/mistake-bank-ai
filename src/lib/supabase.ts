/**
 * Supabase 客户端配置
 * 用于数据库连接和数据操作
 */

import { createClient } from '@supabase/supabase-js';

// 从环境变量获取 Supabase 配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 创建 Supabase 客户端实例
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * 错题类型定义
 */
export interface Question {
  id?: string;
  subject: string;           // 科目：数学、语文、英语等
  question_text: string;     // 题目内容（OCR识别结果）
  image_url?: string;        // 题目图片URL
  user_answer?: string;      // 用户的答案
  correct_answer?: string;   // 正确答案
  explanation?: string;      // AI讲解
  difficulty?: string;       // 难度：简单、中等、困难
  status: 'pending' | 'mastered' | 'reviewing'; // 状态：待复习、已掌握、复习中
  practice_count: number;    // 练习次数
  correct_count: number;     // 正确次数
  created_at?: string;       // 创建时间
  updated_at?: string;       // 更新时间
}

/**
 * 创建新错题
 */
export async function createQuestion(question: Omit<Question, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('questions')
    .insert([{
      ...question,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('创建错题失败:', error);
    throw error;
  }

  return data;
}

/**
 * 获取所有错题
 */
export async function getQuestions() {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('获取错题失败:', error);
    throw error;
  }

  return data as Question[];
}

/**
 * 更新错题
 */
export async function updateQuestion(id: string, updates: Partial<Question>) {
  const { data, error } = await supabase
    .from('questions')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('更新错题失败:', error);
    throw error;
  }

  return data;
}

/**
 * 删除错题
 */
export async function deleteQuestion(id: string) {
  const { error } = await supabase
    .from('questions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('删除错题失败:', error);
    throw error;
  }

  return true;
}

/**
 * 获取学习统计
 */
export async function getStats() {
  const { data, error } = await supabase
    .from('questions')
    .select('*');

  if (error) {
    console.error('获取统计失败:', error);
    throw error;
  }

  const questions = data || [];
  const totalQuestions = questions.length;
  const masteredCount = questions.filter(q => q.status === 'mastered').length;
  const reviewingCount = questions.filter(q => q.status === 'reviewing').length;
  const pendingCount = questions.filter(q => q.status === 'pending').length;
  const totalPractices = questions.reduce((sum, q) => sum + q.practice_count, 0);
  const correctAnswers = questions.reduce((sum, q) => sum + q.correct_count, 0);
  const accuracyRate = totalPractices > 0 ? (correctAnswers / totalPractices * 100).toFixed(1) : 0;

  return {
    totalQuestions,
    masteredCount,
    reviewingCount,
    pendingCount,
    totalPractices,
    accuracyRate: Number(accuracyRate),
  };
}
