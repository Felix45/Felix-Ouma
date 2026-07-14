import { MessagesList } from "@/components/admin/messages-list";
import { listContactMessages } from "@/lib/contact";

export default async function AdminMessagesPage() {
  const messages = await listContactMessages();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-foreground">Messages</h1>
      <MessagesList initialMessages={messages} />
    </div>
  );
}
