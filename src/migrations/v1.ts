import type { Database } from "bun:sqlite";

export function runMigration(db: Database) {
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

  // Seed default kanban columns if they don't exist
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
