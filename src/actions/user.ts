import { getDatabase } from "~/lib/db";
import { useAuthSession } from "~/lib/session";

export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface UserPublic {
  id: number;
  email: string;
  name: string;
  created_at: string;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  "use server";
  const db = getDatabase();
  const user = db.query("SELECT * FROM users WHERE email = ?").get(email) as User | null;
  return user;
}

export async function getUserById(id: number): Promise<UserPublic | null> {
  "use server";
  const db = getDatabase();
  const user = db.query("SELECT id, email, name, created_at FROM users WHERE id = ?").get(id) as UserPublic | null;
  return user;
}

export async function createUser(email: string, passwordHash: string, name: string): Promise<number> {
  "use server";
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO users (email, password_hash, name)
    VALUES (?, ?, ?)
  `);
  const result = stmt.run(email, passwordHash, name);
  return Number(result.lastInsertRowid);
}

export async function updateUserPassword(userId: number, passwordHash: string): Promise<boolean> {
  "use server";
  const db = getDatabase();
  const stmt = db.prepare(`
    UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `);
  stmt.run(passwordHash, userId);
  return true;
}

// Password reset token operations
export async function createPasswordResetToken(userId: number, token: string, expiresAt: Date): Promise<void> {
  "use server";
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO password_reset_tokens (user_id, token, expires_at)
    VALUES (?, ?, ?)
  `);
  stmt.run(userId, token, expiresAt.toISOString());
}

export async function getPasswordResetToken(token: string) {
  "use server";
  const db = getDatabase();
  const result = db.query(`
    SELECT * FROM password_reset_tokens
    WHERE token = ? AND used = 0 AND expires_at > datetime('now')
  `).get(token) as { id: number; user_id: number; token: string; expires_at: string } | null;
  return result;
}

export async function markTokenAsUsed(token: string): Promise<void> {
  "use server";
  const db = getDatabase();
  const stmt = db.prepare("UPDATE password_reset_tokens SET used = 1 WHERE token = ?");
  stmt.run(token);
}

// Get current user profile from session
export async function getCurrentUserProfile() {
  "use server";
  const session = await useAuthSession();

  if (!session.data.userId) {
    return null;
  }

  // For demo purposes, return session data
  // In production, you'd fetch from the users table
  return {
    id: session.data.userId,
    email: session.data.email || "demo@gmail.com",
    name: "Demo User",
    created_at: new Date().toISOString()
  };
}

// Update user profile
export async function updateUserProfile(name: string, email: string): Promise<boolean> {
  "use server";
  const session = await useAuthSession();

  if (!session.data.userId) {
    return false;
  }

  // Update session email if changed
  if (email !== session.data.email) {
    await session.update({ email });
  }

  // In production, update the database too
  return true;
}
