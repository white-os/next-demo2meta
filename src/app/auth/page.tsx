'use client'

import { useState, useEffect } from 'react';
import crypto from 'crypto';

export default function AuthPage() {
  const [password, setPassword] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 在实际应用中，应该从后端API获取公钥
    fetch('/public.pem')
      .then(res => res.text())
      .then(key => setPublicKey(key))
      .catch(err => console.error('Failed to load public key:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 使用公钥加密密码
      const encryptedPassword = crypto.publicEncrypt(
        {
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        Buffer.from(password)
      ).toString('base64');

      // 发送加密后的密码到服务器
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ encryptedPassword }),
      });

      const data = await response.json();
      setMessage(data.message);
      
      if (data.success) {
        // 登录成功后的处理逻辑
        console.log('登录成功');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('登录过程发生错误');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">登录</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入密码"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            登录
          </button>
        </form>
        {message && (
          <div className={`mt-4 p-3 rounded-lg ${
            message.includes('成功') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
} 