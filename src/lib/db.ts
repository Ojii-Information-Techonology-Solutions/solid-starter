import { Database } from "bun:sqlite";
import { isServer } from "solid-js/web";

let db: Database | null = null;

export function getDatabase() {
  "use server";

  if (!isServer) {
    throw new Error("Database can only be accessed on the server");
  }

  if (!db) {
    db = new Database("app.db");
    db.exec("PRAGMA journal_mode = WAL;");
    initializeDatabase();
  }

  return db;
}

function initializeDatabase() {
  if (!db) return;

  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create password reset tokens table
  db.exec(`
    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      token TEXT NOT NULL UNIQUE,
      expires_at TEXT NOT NULL,
      used INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Create invoices table
  db.exec(`
    CREATE TABLE IF NOT EXISTS invoices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      invoice_number TEXT NOT NULL UNIQUE,
      client_name TEXT NOT NULL,
      client_email TEXT NOT NULL,
      client_address TEXT,
      amount REAL NOT NULL,
      tax REAL DEFAULT 0,
      total REAL NOT NULL,
      status TEXT DEFAULT 'draft',
      due_date TEXT NOT NULL,
      issue_date TEXT NOT NULL,
      notes TEXT,
      items TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create kanban columns table
  db.exec(`
    CREATE TABLE IF NOT EXISTS kanban_columns (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      position INTEGER NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create kanban tasks table with extended fields
  db.exec(`
    CREATE TABLE IF NOT EXISTS kanban_tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      column_id TEXT NOT NULL,
      position INTEGER NOT NULL,
      priority TEXT DEFAULT 'medium',
      label TEXT,
      assignee TEXT,
      due_date TEXT,
      progress INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (column_id) REFERENCES kanban_columns(id) ON DELETE CASCADE
    )
  `);

  // Initialize default kanban columns if they don't exist
  const columnsCount = db.query("SELECT COUNT(*) as count FROM kanban_columns").get() as { count: number };

  if (columnsCount.count === 0) {
    const insertColumn = db.prepare("INSERT INTO kanban_columns (id, title, position) VALUES (?, ?, ?)");

    insertColumn.run("todo", "To Do", 0);
    insertColumn.run("in-progress", "In Progress", 1);
    insertColumn.run("review", "Review", 2);
    insertColumn.run("done", "Done", 3);

    // Insert default tasks with extended fields
    const insertTask = db.prepare(`
      INSERT INTO kanban_tasks (id, title, description, column_id, position, priority, label, assignee, due_date, progress)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertTask.run("task-1", "Design new landing page", "Create wireframes and mockups for the new marketing landing page", "todo", 0, "high", "Design", "JD", "2025-01-15", 0);
    insertTask.run("task-2", "Set up database schema", "Design and implement SQLite tables for invoices and kanban board", "todo", 1, "medium", "Backend", "AS", "2025-01-12", 0);
    insertTask.run("task-3", "Implement authentication", "Add OAuth and JWT token-based authentication system", "in-progress", 0, "high", "Security", "MK", "2025-01-10", 45);
    insertTask.run("task-4", "Code review API endpoints", "Review all API endpoints for security vulnerabilities", "review", 0, "medium", "Backend", "LR", "2025-01-08", 80);
    insertTask.run("task-5", "Project setup", "Initialize repository, configure CI/CD pipelines", "done", 0, "low", "DevOps", "JD", "2025-01-05", 100);
    insertTask.run("task-6", "Write unit tests", "Add comprehensive test coverage for core modules", "todo", 2, "medium", "Testing", "AS", "2025-01-20", 0);
    insertTask.run("task-7", "Integrate Stripe payments", "Set up Stripe API for payment processing", "in-progress", 1, "high", "Backend", "MK", "2025-01-14", 30);
    insertTask.run("task-8", "Mobile responsive design", "Ensure all pages work on mobile devices", "review", 1, "low", "Design", "LR", "2025-01-11", 90);
  }
}

// Invoice operations
export async function getInvoices() {
  "use server";
  const db = getDatabase();
  const invoices = db.query("SELECT * FROM invoices ORDER BY created_at DESC").all();
  return invoices.map((invoice: any) => ({
    ...invoice,
    items: JSON.parse(invoice.items)
  }));
}

export async function getInvoice(id: number) {
  "use server";
  const db = getDatabase();
  const invoice = db.query("SELECT * FROM invoices WHERE id = ?").get(id) as any;
  if (invoice) {
    invoice.items = JSON.parse(invoice.items);
  }
  return invoice;
}

export async function createInvoice(invoice: any) {
  "use server";
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO invoices (
      invoice_number, client_name, client_email, client_address,
      amount, tax, total, status, due_date, issue_date, notes, items
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    invoice.invoice_number,
    invoice.client_name,
    invoice.client_email,
    invoice.client_address || null,
    invoice.amount,
    invoice.tax || 0,
    invoice.total,
    invoice.status || 'draft',
    invoice.due_date,
    invoice.issue_date,
    invoice.notes || null,
    JSON.stringify(invoice.items)
  );

  return result.lastInsertRowid;
}

export async function updateInvoice(id: number, invoice: any) {
  "use server";
  const db = getDatabase();
  const stmt = db.prepare(`
    UPDATE invoices SET
      invoice_number = ?,
      client_name = ?,
      client_email = ?,
      client_address = ?,
      amount = ?,
      tax = ?,
      total = ?,
      status = ?,
      due_date = ?,
      issue_date = ?,
      notes = ?,
      items = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  stmt.run(
    invoice.invoice_number,
    invoice.client_name,
    invoice.client_email,
    invoice.client_address || null,
    invoice.amount,
    invoice.tax || 0,
    invoice.total,
    invoice.status,
    invoice.due_date,
    invoice.issue_date,
    invoice.notes || null,
    JSON.stringify(invoice.items),
    id
  );

  return true;
}

export async function deleteInvoice(id: number) {
  "use server";
  const db = getDatabase();
  const stmt = db.prepare("DELETE FROM invoices WHERE id = ?");
  stmt.run(id);
  return true;
}

// Kanban operations
export async function getKanbanData() {
  "use server";
  const db = getDatabase();

  const columns = db.query("SELECT * FROM kanban_columns ORDER BY position").all() as any[];
  const tasks = db.query("SELECT * FROM kanban_tasks ORDER BY position").all() as any[];

  return columns.map(column => ({
    ...column,
    tasks: tasks.filter(task => task.column_id === column.id)
  }));
}

export interface KanbanTaskInput {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  label?: string;
  assignee?: string;
  due_date?: string;
}

export async function createKanbanTask(columnId: string, task: KanbanTaskInput) {
  "use server";
  const db = getDatabase();

  // Get the max position for tasks in this column
  const result = db.query("SELECT COALESCE(MAX(position), -1) + 1 as next_pos FROM kanban_tasks WHERE column_id = ?").get(columnId) as { next_pos: number };

  const taskId = `task-${Date.now()}`;
  const stmt = db.prepare(`
    INSERT INTO kanban_tasks (id, title, description, column_id, position, priority, label, assignee, due_date, progress)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
  `);

  stmt.run(
    taskId,
    task.title,
    task.description || null,
    columnId,
    result.next_pos,
    task.priority || 'medium',
    task.label || null,
    task.assignee || null,
    task.due_date || null
  );

  return taskId;
}

export async function updateKanbanTask(taskId: string, updates: Partial<KanbanTaskInput & { progress: number }>) {
  "use server";
  const db = getDatabase();

  const fields: string[] = [];
  const values: any[] = [];

  if (updates.title !== undefined) { fields.push("title = ?"); values.push(updates.title); }
  if (updates.description !== undefined) { fields.push("description = ?"); values.push(updates.description); }
  if (updates.priority !== undefined) { fields.push("priority = ?"); values.push(updates.priority); }
  if (updates.label !== undefined) { fields.push("label = ?"); values.push(updates.label); }
  if (updates.assignee !== undefined) { fields.push("assignee = ?"); values.push(updates.assignee); }
  if (updates.due_date !== undefined) { fields.push("due_date = ?"); values.push(updates.due_date); }
  if (updates.progress !== undefined) { fields.push("progress = ?"); values.push(updates.progress); }

  if (fields.length === 0) return false;

  fields.push("updated_at = CURRENT_TIMESTAMP");
  values.push(taskId);

  const stmt = db.prepare(`UPDATE kanban_tasks SET ${fields.join(", ")} WHERE id = ?`);
  stmt.run(...values);

  return true;
}

export async function moveKanbanTask(taskId: string, fromColumnId: string, toColumnId: string) {
  "use server";
  const db = getDatabase();

  if (fromColumnId === toColumnId) return;

  // Get the max position in the target column
  const result = db.query("SELECT COALESCE(MAX(position), -1) + 1 as next_pos FROM kanban_tasks WHERE column_id = ?").get(toColumnId) as { next_pos: number };

  const stmt = db.prepare("UPDATE kanban_tasks SET column_id = ?, position = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
  stmt.run(toColumnId, result.next_pos, taskId);

  return true;
}

export async function deleteKanbanTask(taskId: string) {
  "use server";
  const db = getDatabase();
  const stmt = db.prepare("DELETE FROM kanban_tasks WHERE id = ?");
  stmt.run(taskId);
  return true;
}

// User operations
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
