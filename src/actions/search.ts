import { getDatabase } from "~/lib/db";

export type SearchResult = {
  value: string | number;
  label: string;
  [key: string]: unknown;
};

export type TaskSearchResult = SearchResult & {
  description: string | null;
  priority: string;
  status: string;
};

export type UserSearchResult = SearchResult & {
  email: string;
};

export type InvoiceSearchResult = SearchResult & {
  clientName: string;
  total: number;
  status: string;
};

/**
 * Search tasks by title
 */
export async function searchTasks(query: string): Promise<TaskSearchResult[]> {
  "use server";

  if (!query || query.length < 1) {
    return [];
  }

  const db = getDatabase();
  const searchPattern = `%${query}%`;

  const tasks = db.query(`
    SELECT
      id,
      title,
      description,
      priority,
      column_id as status
    FROM kanban_tasks
    WHERE title LIKE ?
    ORDER BY title
    LIMIT 10
  `).all(searchPattern) as Array<{
    id: string;
    title: string;
    description: string | null;
    priority: string;
    status: string;
  }>;

  return tasks.map(task => ({
    value: task.id,
    label: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
  }));
}

/**
 * Search users by name or email
 */
export async function searchUsers(query: string): Promise<UserSearchResult[]> {
  "use server";

  if (!query || query.length < 1) {
    return [];
  }

  const db = getDatabase();
  const searchPattern = `%${query}%`;

  const users = db.query(`
    SELECT
      id,
      name,
      email
    FROM users
    WHERE name LIKE ? OR email LIKE ?
    ORDER BY name
    LIMIT 10
  `).all(searchPattern, searchPattern) as Array<{
    id: number;
    name: string;
    email: string;
  }>;

  return users.map(user => ({
    value: user.id,
    label: user.name,
    email: user.email,
  }));
}

/**
 * Search invoices by invoice number or client name
 */
export async function searchInvoices(query: string): Promise<InvoiceSearchResult[]> {
  "use server";

  if (!query || query.length < 1) {
    return [];
  }

  const db = getDatabase();
  const searchPattern = `%${query}%`;

  const invoices = db.query(`
    SELECT
      id,
      invoice_number,
      client_name,
      total,
      status
    FROM invoices
    WHERE invoice_number LIKE ? OR client_name LIKE ?
    ORDER BY invoice_number DESC
    LIMIT 10
  `).all(searchPattern, searchPattern) as Array<{
    id: number;
    invoice_number: string;
    client_name: string;
    total: number;
    status: string;
  }>;

  return invoices.map(invoice => ({
    value: invoice.id,
    label: invoice.invoice_number,
    clientName: invoice.client_name,
    total: invoice.total,
    status: invoice.status,
  }));
}
