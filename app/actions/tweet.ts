"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// Zod 스키마 정의
const TweetSchema = z.object({
  content: z
    .string()
    .min(1, "트윗 내용을 입력해주세요.")
    .max(280, "트윗은 최대 280자까지 작성 가능합니다."),
});

// 폼 상태 타입 정의
export type State = {
  message: string;
  errors: {
    content: string[];
  };
};

export async function addTweet(
  prevState: State,
  formData: FormData
): Promise<State> {
  // 사용자 인증 확인
  const session = await auth();
  if (!session || !session.user) {
    return {
      message: "로그인이 필요합니다.",
      errors: { content: [] },
    };
  }

  // 폼 데이터 추출
  const content = formData.get("content") as string;

  // Zod로 유효성 검사
  const validationResult = TweetSchema.safeParse({ content });

  if (!validationResult.success) {
    return {
      message: "입력 형식이 올바르지 않습니다.",
      errors: {
        content: validationResult.error.flatten().fieldErrors.content || [],
      },
    };
  }

  try {
    // Prisma로 트윗 저장
    await db.tweet.create({
      data: {
        content: validationResult.data.content,
        userId: session.user.id,
      },
    });

    // 페이지 갱신
    revalidatePath("/");

    return {
      message: "트윗이 성공적으로 등록되었습니다.",
      errors: { content: [] },
    };
  } catch (error) {
    console.error("Tweet creation error:", error);
    return {
      message: "트윗 등록 중 오류가 발생했습니다.",
      errors: { content: [] },
    };
  }
}
