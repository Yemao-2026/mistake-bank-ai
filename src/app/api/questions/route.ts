/**
 * 错题管理API路由
 * 用于错题的增删改查
 */

import { NextRequest, NextResponse } from 'next/server';
import { createQuestion, getQuestions, updateQuestion, deleteQuestion, Question } from '@/lib/supabase';

export const runtime = 'edge';

/**
 * GET /api/questions
 * 获取所有错题
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const subject = searchParams.get('subject');

    // 获取所有错题
    let questions = await getQuestions();

    // 过滤
    if (status) {
      questions = questions.filter(q => q.status === status);
    }
    if (subject) {
      questions = questions.filter(q => q.subject === subject);
    }

    return NextResponse.json({
      success: true,
      data: questions,
    });

  } catch (error) {
    console.error('获取错题失败:', error);
    return NextResponse.json(
      { error: '获取错题失败，请重试' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/questions
 * 创建新错题
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 验证必填字段
    if (!body.subject || !body.question_text) {
      return NextResponse.json(
        { error: '科目和题目内容不能为空' },
        { status: 400 }
      );
    }

    // 创建错题
    const question = await createQuestion({
      subject: body.subject,
      question_text: body.question_text,
      image_url: body.image_url,
      user_answer: body.user_answer,
      correct_answer: body.correct_answer,
      explanation: body.explanation,
      difficulty: body.difficulty || 'medium',
      status: body.status || 'pending',
      practice_count: body.practice_count || 0,
      correct_count: body.correct_count || 0,
    });

    return NextResponse.json({
      success: true,
      data: question,
    }, { status: 201 });

  } catch (error) {
    console.error('创建错题失败:', error);
    return NextResponse.json(
      { error: '创建错题失败，请重试' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/questions
 * 更新错题
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 验证必填字段
    if (!body.id) {
      return NextResponse.json(
        { error: '错题ID不能为空' },
        { status: 400 }
      );
    }

    // 更新错题
    const question = await updateQuestion(body.id, body);

    return NextResponse.json({
      success: true,
      data: question,
    });

  } catch (error) {
    console.error('更新错题失败:', error);
    return NextResponse.json(
      { error: '更新错题失败，请重试' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/questions
 * 删除错题
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // 验证ID
    if (!id) {
      return NextResponse.json(
        { error: '错题ID不能为空' },
        { status: 400 }
      );
    }

    // 删除错题
    await deleteQuestion(id);

    return NextResponse.json({
      success: true,
      message: '删除成功',
    });

  } catch (error) {
    console.error('删除错题失败:', error);
    return NextResponse.json(
      { error: '删除错题失败，请重试' },
      { status: 500 }
    );
  }
}
