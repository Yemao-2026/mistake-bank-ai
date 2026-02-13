"use client";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">
        小学生错题高效学习智能体
      </h1>
      <p className="text-lg mb-8 text-gray-600">
        帮助小学生有效提升知识掌握
      </p>
      <div className="space-y-4">
        <button
          onClick={() => setCount(count + 1)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          点击测试: {count}
        </button>
      </div>
    </div>
  );
}
