import { getDatabase } from "~/lib/db";

export interface KanbanTaskInput {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  label?: string;
  assignee?: string;
  due_date?: string;
}

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
