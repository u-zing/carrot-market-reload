"use client";

import {
  useState,
  useTransition,
  useRef,
  experimental_useOptimistic as useOptimistic,
} from "react";
import { createResponse } from "@/app/actions";
import { ResponseSchema } from "@/lib/schemas";

interface ResponseFormProps {
  tweetId: string;
  currentUserId: string;
}

export default function ResponseForm({
  tweetId,
  currentUserId,
}: ResponseFormProps) {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  // 낙관적 UI 업데이트를 위한 상태
  const [optimisticResponses, addOptimisticResponse] = useOptimistic<any[]>(
    [],
    (state, newResponse) => [...state, newResponse]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 클라이언트 측 유효성 검사
    const validation = ResponseSchema.safeParse({ content });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    // 낙관적 UI 업데이트
    const optimisticResponse = {
      id: `temp-${Date.now()}`,
      content,
      createdAt: new Date().toISOString(),
      user: {
        id: currentUserId,
        name: "작성 중...",
        username: "...",
      },
      isOptimistic: true,
    };

    addOptimisticResponse(optimisticResponse);

    // 폼 초기화
    setContent("");
    setError(null);

    // 서버 액션 호출
    startTransition(async () => {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("userId", currentUserId);
      formData.append("tweetId", tweetId);

      const result = await createResponse(formData);

      if (result?.error) {
        setError(result.error);
        setContent(content); // 에러가 발생한 경우 내용 복원
      }
    });
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="font-bold text-lg mb-4">답글 작성</h3>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="이 트윗에 답글을 남겨보세요..."
            className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            maxLength={280}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <div className="text-right text-gray-500 text-sm">
            {content.length}/280
          </div>
        </div>
        <input
          type="hidden"
          name="userId"
          value={currentUserId}
        />
        <input
          type="hidden"
          name="tweetId"
          value={tweetId}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-medium disabled:opacity-50"
          >
            {isPending ? "게시 중..." : "답글 게시"}
          </button>
        </div>
      </form>
    </div>
  );
}
