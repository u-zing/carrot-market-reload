import { db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// 사용자 정보 저장
export async function saveUserData(userId, userData) {
  try {
    await setDoc(doc(db, "users", userId), {
      username: userData.username,
      email: userData.email,
      createdAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    console.error("사용자 정보 저장 중 오류:", error);
    throw error;
  }
}

// 사용자 ID로 사용자 정보 가져오기
export async function getUserById(userId) {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return {
        id: userDoc.id,
        ...userDoc.data(),
      };
    }

    return null;
  } catch (error) {
    console.error("사용자 정보를 불러오는 중 오류:", error);
    throw error;
  }
}
