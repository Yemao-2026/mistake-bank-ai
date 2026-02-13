/**
 * AI讲解API路由
 * 用于生成错题的AI讲解内容
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateExplanation } from '@/lib/llm';

export const runtime = 'edge';

/**
 * POST /api/explain
 * 生成错题的AI讲解
 */
export async function POST(request: NextRequest) {
  try {
    // 获取请求体
    const body = await request.json();
    const { questionText, userAnswer, correctAnswer } = body;

    // 验证必填参数
    if (!questionText) {
      return NextResponse.json(
        { error: '题目文本不能为空' },
        { status: 400 }
      );
    }

    // 调用LLM生成讲解
    const explanation = await generateExplanation(
      questionText,
      userAnswer,
      correctAnswer
    );

    // 返回讲解内容
    return NextResponse.json({
      success: true,
      data: {
        explanation,
      },
    });

  } catch (error) {
    console.error('生成讲解失败:', error);
    return NextResponse.json(
      { error: '生成讲解失败，请重试' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/explain
 * 获取AI讲解服务状态
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'AI讲解服务正常运行',
  });
}
