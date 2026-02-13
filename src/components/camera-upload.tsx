/**
 * 拍照上传组件
 * 用于拍照或上传题目图片
 */

'use client';

import { useState, useRef } from 'react';

interface CameraUploadProps {
  onUpload: (file: File) => Promise<void>;
  isLoading?: boolean;
}

export default function CameraUpload({ onUpload, isLoading }: CameraUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        handleFileUpload(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      await onUpload(file);
    } catch (error) {
      console.error('上传失败:', error);
      alert('上传失败，请重试');
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`
        relative border-2 border-dashed rounded-lg p-8 transition-all duration-200
        ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={!isLoading ? handleButtonClick : undefined}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={isLoading}
      />

      <div className="flex flex-col items-center justify-center space-y-4">
        {/* 图标 */}
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${dragActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
          {isLoading ? (
            <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </div>

        {/* 文本 */}
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 mb-1">
            {isLoading ? '正在上传...' : '拍照或上传题目'}
          </p>
          <p className="text-sm text-gray-500">
            {isLoading ? '请稍候' : '拖拽图片到此处，或点击选择文件'}
          </p>
        </div>

        {/* 提示 */}
        <div className="text-xs text-gray-400 text-center">
          <p>支持 JPG、PNG、GIF 格式</p>
          <p>文件大小不超过 10MB</p>
        </div>
      </div>
    </div>
  );
}
