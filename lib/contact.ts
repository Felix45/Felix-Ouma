import "server-only";

import { db } from "@/lib/db";
import type { ContactInput } from "@/lib/validations";

export type ContactMessageDTO = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export async function createContactMessage(
  input: ContactInput
): Promise<ContactMessageDTO> {
  const row = await db.contactMessage.create({ data: input });

  // Hook point for an email service (e.g. Resend, Nodemailer): send a
  // notification here once RESEND_API_KEY (or similar) is configured.
  // await notifyNewContactMessage(row)

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function listContactMessages(): Promise<ContactMessageDTO[]> {
  const rows = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    createdAt: row.createdAt.toISOString(),
  }));
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  try {
    await db.contactMessage.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}
