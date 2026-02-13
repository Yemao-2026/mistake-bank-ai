/**
 * OCR识别API路由
 * 用于识别题目图片中的文字
 */

import { NextRequest, NextResponse } from 'next/server';
import { recognizeQuestion } from '@/lib/llm';

export const runtime = 'edge';

/**
 * POST /api/ocr
 * 上传题目图片，识别出题目文本
 */
export async function POST(request: NextRequest) {
  try {
    // 获取表单数据
    const formData = await request.formData();
    const file = formData.get('file') as File;

    // 验证文件
    if (!file) {
      return NextResponse.json(
        { error: '请上传图片文件' },
        { status: 400 }
      );
    }

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: '只支持图片文件' },
        { status: 400 }
      );
    }

    // 验证文件大小（最大10MB）
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: '图片大小不能超过10MB' },
        { status: 400 }
      );
    }

    // 将文件转换为base64（用于后续处理）
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const imageUrl = `data:${file.type};base64,${base64}`;

    // 调用OCR识别
    const questionText = await recognizeQuestion(imageUrl);

    // 返回识别结果
    return NextResponse.json({
      success: true,
      data: {
        questionText,
        imageUrl,
      },
    });

  } catch (error) {
    console.error('OCR识别失败:', error);
    return NextResponse.json(
      { error: 'OCR识别失败，请重试' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ocr
 * 获取OCR服务状态
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'OCR服务正常运行',
  });
}
