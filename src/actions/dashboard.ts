import { getDatabase } from "~/lib/db";

export interface DashboardStats {
  totalUsers: number;
  totalInvoices: number;
  totalRevenue: number;
  pendingInvoices: number;
  paidInvoices: number;
  overdueInvoices: number;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  "use server";
  const db = getDatabase();

  // Get user count
  const userCount = db.query("SELECT COUNT(*) as count FROM users").get() as { count: number };

  // Get invoice stats
  const invoiceStats = db.query(`
    SELECT
      COUNT(*) as total,
      SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) as paid,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
      SUM(CASE WHEN status = 'overdue' THEN 1 ELSE 0 END) as overdue,
      SUM(CASE WHEN status = 'paid' THEN total ELSE 0 END) as revenue
    FROM invoices
  `).get() as { total: number; paid: number; pending: number; overdue: number; revenue: number };

  // Get kanban task stats
  const taskStats = db.query(`
    SELECT
      COUNT(*) as total,
      SUM(CASE WHEN column_id = 'done' THEN 1 ELSE 0 END) as completed,
      SUM(CASE WHEN column_id = 'in-progress' THEN 1 ELSE 0 END) as in_progress
    FROM kanban_tasks
  `).get() as { total: number; completed: number; in_progress: number };

  return {
    totalUsers: userCount.count || 0,
    totalInvoices: invoiceStats.total || 0,
    totalRevenue: invoiceStats.revenue || 0,
    pendingInvoices: invoiceStats.pending || 0,
    paidInvoices: invoiceStats.paid || 0,
    overdueInvoices: invoiceStats.overdue || 0,
    totalTasks: taskStats.total || 0,
    completedTasks: taskStats.completed || 0,
    inProgressTasks: taskStats.in_progress || 0
  };
}

export interface RecentInvoice {
  id: number;
  invoice_number: string;
  client_name: string;
  total: number;
  status: string;
  created_at: string;
}

export async function getRecentInvoices(limit: number = 5): Promise<RecentInvoice[]> {
  "use server";
  const db = getDatabase();

  const invoices = db.query(`
    SELECT id, invoice_number, client_name, total, status, created_at
    FROM invoices
    ORDER BY created_at DESC
    LIMIT ?
  `).all(limit) as RecentInvoice[];

  return invoices;
}

export interface RecentTask {
  id: string;
  title: string;
  priority: string;
  column_id: string;
  assignee: string | null;
  due_date: string | null;
}

export async function getRecentTasks(limit: number = 5): Promise<RecentTask[]> {
  "use server";
  const db = getDatabase();

  const tasks = db.query(`
    SELECT id, title, priority, column_id, assignee, due_date
    FROM kanban_tasks
    WHERE column_id != 'done'
    ORDER BY
      CASE priority
        WHEN 'high' THEN 1
        WHEN 'medium' THEN 2
        ELSE 3
      END,
      created_at DESC
    LIMIT ?
  `).all(limit) as RecentTask[];

  return tasks;
}
