/**
 * LLM (大语言模型) 调用配置
 * 用于 AI 讲解错题、生成练习题等功能
 */

/**
 * AI 讲解错题
 * @param questionText 题目文本
 * @param userAnswer 用户答案（可选）
 * @param correctAnswer 正确答案（可选）
 * @returns AI讲解内容
 */
export async function generateExplanation(
  questionText: string,
  userAnswer?: string,
  correctAnswer?: string
): Promise<string> {
  // TODO: 集成真实的 LLM 调用
  // 这里先返回模拟的讲解内容
  
  const prompt = `
请为小学生讲解以下题目，要求：
1. 用简单易懂的语言，适合小学生理解
2. 逐步分析解题思路
3. 指出易错点
4. 给出类似题型的练习建议

题目：${questionText}
${userAnswer ? `学生答案：${userAnswer}` : ''}
${correctAnswer ? `正确答案：${correctAnswer}` : ''}
  `.trim();

  // 模拟 AI 讲解（实际部署时需要集成真实的 LLM）
  const mockExplanation = `
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
  `.trim();

  return mockExplanation;
}

/**
 * OCR 识别题目
 * @param imageUrl 题目图片 URL
 * @returns 识别出的题目文本
 */
export async function recognizeQuestion(imageUrl: string): Promise<string> {
  // TODO: 集成真实的 OCR 识别服务
  // 这里先返回模拟的识别结果
  
  const mockQuestionText = `
小明有 5 个苹果，给了小红 2 个，又买了 3 个，
现在小明一共有多少个苹果？
  `.trim();

  return mockQuestionText;
}

/**
 * 生成练习题
 * @param subject 科目
 * @param difficulty 难度
 * @param topic 知识点
 * @returns 生成的练习题
 */
export async function generatePracticeQuestion(
  subject: string,
  difficulty: string,
  topic?: string
): Promise<{
  question: string;
  answer: string;
  explanation: string;
}> {
  // TODO: 集成真实的 LLM 生成练习题
  // 这里先返回模拟的练习题
  
  const mockPracticeQuestion = {
    question: `
小华有 6 个橘子，给了小李 3 个，
妈妈又给了他 4 个，现在小华一共有多少个橘子？
    `.trim(),
    answer: '7',
    explanation: `
小华原有 6 个橘子，给了小李 3 个后剩下 6 - 3 = 3 个，
妈妈又给了 4 个，所以现在有 3 + 4 = 7 个橘子。
    `.trim()
  };

  return mockPracticeQuestion;
}

/**
 * 分析错题模式
 * @param questions 错题列表
 * @returns 错题分析结果
 */
export async function analyzeMistakePattern(questions: any[]): Promise<{
  weakTopics: string[];
  suggestions: string[];
}> {
  // TODO: 集成真实的 LLM 分析错题模式
  // 这里先返回模拟的分析结果
  
  const mockAnalysis = {
    weakTopics: [
      '加减法运算',
      '应用题理解',
    ],
    suggestions: [
      '建议加强对加减法基础运算的练习',
      '做题时要仔细阅读题目，理解题意',
      '可以多做应用题，提高理解能力',
    ]
  };

  return mockAnalysis;
}
