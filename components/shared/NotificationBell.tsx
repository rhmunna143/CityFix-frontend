"use client";

import { memo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/lib/api/notifications";
import type { Notification } from "@/lib/api/notifications";
import type { Paginated } from "@/types/api";

const countUnread = (d: Paginated<Notification>) =>
  d.items.reduce((n, i) => n + (i.isRead ? 0 : 1), 0);

interface NotificationBellProps {
  href: string;
}

export const NotificationBell = memo(function NotificationBell({
  href,
}: NotificationBellProps) {
  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["notifications-bell"],
    queryFn: () => getNotifications({ limit: "50" }),
    select: countUnread, // re-render only when the *count* changes
    refetchInterval: 30_000, // was 15 s
  });

  return (
    <Link href={href} className="relative mr-1">
      <Button
        variant="ghost"
        size="icon"
        className="relative text-muted-foreground hover:text-foreground cursor-pointer"
        title="Notifications"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive border-2 border-background" />
        )}
      </Button>
    </Link>
  );
});
