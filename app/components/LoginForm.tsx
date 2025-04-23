// components/LoginForm.tsx
"use client";

import { useState } from "react";
import { login } from "../actions";

type FormState = {
  errors?: {
    email?: string[];
    username?: string[];
    password?: string[];
    _form?: string[];
  };
  message?: string;
};

export default function LoginForm() {
  const [formState, setFormState] = useState<FormState>({});

  async function handleSubmit(formData: FormData) {
    const result = await login(formData);
    setFormState(result);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="flex justify-center">
          <div className="h-12 w-12 bg-red-400 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-6 h-6"
            >
              <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-3.3 0-6 2.7-6 6v4.8c0 .6.4 1.2 1 1.4V18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-1.8c.6-.2 1-.8 1-1.4V10c0-3.3-2.7-6-6-6z" />
            </svg>
          </div>
        </div>

        <form
          action={handleSubmit}
          className="mt-8 space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="sr-only"
            >
              이메일
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="py-2 px-10 block w-full border border-gray-300 rounded-md"
                placeholder="이메일"
              />
            </div>
            {formState.errors?.email && (
              <div className="text-red-500 text-sm mt-1">
                {formState.errors.email.join(", ")}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="username"
              className="sr-only"
            >
              사용자 이름
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                className="py-2 px-10 block w-full border border-gray-300 rounded-md"
                placeholder="사용자 이름"
              />
            </div>
            {formState.errors?.username && (
              <div className="text-red-500 text-sm mt-1">
                {formState.errors.username.join(", ")}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="sr-only"
            >
              비밀번호
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="py-2 px-10 block w-full border border-gray-300 rounded-md"
                placeholder="비밀번호"
              />
            </div>
            {formState.errors?.password && (
              <div className="text-red-500 text-sm mt-1">
                {formState.errors.password.join(", ")}
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-200 hover:bg-gray-300"
            >
              로그인
            </button>
          </div>

          {formState.message && (
            <div className="text-green-500 text-center">
              {formState.message}
            </div>
          )}

          {formState.errors?._form && (
            <div className="text-red-500 text-center">
              {formState.errors._form.join(", ")}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
