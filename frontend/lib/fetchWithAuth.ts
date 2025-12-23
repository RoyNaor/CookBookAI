import { auth } from "@/lib/firebase";
import type { User } from "firebase/auth";

/**
 * Waits for Firebase Auth to load the current user (even after refresh).
 */
function waitForUser(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

/**
 * Secure fetch wrapper that automatically adds the Firebase ID token.
 */
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const user: User | null = auth.currentUser || (await waitForUser());
  if (!user) throw new Error("User not logged in");

  const token = await user.getIdToken();

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  return fetch(url, { ...options, headers });
}
