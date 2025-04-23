"use server";

type FormErrors = {
  email?: string[];
  username?: string[];
  password?: string[];
  _form?: string[];
};

type ValidationResult = {
  success: boolean;
  errors?: FormErrors;
};

function validateForm(
  email: string,
  username: string,
  password: string
): ValidationResult {
  const errors: FormErrors = {};

  if (!email) {
    errors.email = ["이메일을 입력해주세요."];
  } else if (!email.includes("@")) {
    errors.email = ["유효한 이메일 형식이 아닙니다."];
  } else if (!email.endsWith("@zod.com")) {
    errors.email = ["오직 @zod.com 도메인의 이메일만 허용됩니다."];
  }

  if (!username) {
    errors.username = ["사용자 이름을 입력해주세요."];
  } else if (username.length < 5) {
    errors.username = ["사용자 이름은 최소 5글자 이상이어야 합니다."];
  }

  if (!password) {
    errors.password = ["비밀번호를 입력해주세요."];
  } else {
    const passwordErrors = [];

    if (password.length < 10) {
      passwordErrors.push("비밀번호는 최소 10글자 이상이어야 합니다.");
    }

    if (!/\d/.test(password)) {
      passwordErrors.push("비밀번호는 최소 1개 이상의 숫자를 포함해야 합니다.");
    }

    if (passwordErrors.length > 0) {
      errors.password = passwordErrors;
    }
  }

  return {
    success: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

export async function login(formData: FormData) {
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");

  const emailStr = email instanceof File ? email.name : email?.toString() || "";
  const usernameStr =
    username instanceof File ? username.name : username?.toString() || "";
  const passwordStr =
    password instanceof File ? password.name : password?.toString() || "";

  const validationResult = validateForm(emailStr, usernameStr, passwordStr);

  if (!validationResult.success) {
    return {
      errors: validationResult.errors,
    };
  }

  try {
    return {
      message: "로그인이 성공적으로 완료되었습니다!",
    };
  } catch (error) {
    return {
      errors: {
        _form: ["로그인 처리 중 오류가 발생했습니다."],
      },
    };
  }
}
