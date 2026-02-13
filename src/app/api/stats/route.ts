/**
 * 学习统计API路由
 * 用于获取学习统计数据
 */

import { NextRequest, NextResponse } from 'next/server';
import { getStats } from '@/lib/supabase';

export const runtime = 'edge';

/**
 * GET /api/stats
 * 获取学习统计
 */
export async function GET() {
  try {
    // 获取统计数据
    const stats = await getStats();

    return NextResponse.json({
      success: true,
      data: stats,
    });

  } catch (error) {
    console.error('获取统计失败:', error);
    return NextResponse.json(
      { error: '获取统计失败，请重试' },
      { status: 500 }
    );
  }
}
