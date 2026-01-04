import { getDatabase } from "~/lib/db";

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
