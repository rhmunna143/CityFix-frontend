"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, markNotificationRead, Notification } from "@/lib/api/notifications";
import { useUrlState } from "@/hooks/useUrlState";
import { PageHeader } from "@/components/shared/PageHeader";
import { Pagination } from "@/components/shared/Pagination";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Bell, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  const { searchParams, getPage, updateUrl } = useUrlState();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notifications", searchParams.toString()],
    queryFn: () => getNotifications(Object.fromEntries(searchParams.entries())),
    refetchInterval: 15000, // Poll every 15s
  });

  const { mutate: markAsRead, isPending: isMarking } = useMutation({
    mutationFn: markNotificationRead,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });
      const previousData = queryClient.getQueryData(["notifications", searchParams.toString()]);

      queryClient.setQueryData(["notifications", searchParams.toString()], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.map((item: Notification) =>
            item.id === id ? { ...item, isRead: true } : item
          )
        };
      });

      return { previousData };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["notifications", searchParams.toString()], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Notifications" description="Updates on your complaints and account." />

      {isLoading ? (
        <div className="flex justify-center p-8"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
      ) : data?.items.length === 0 ? (
        <Card className="bg-muted/40">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No notifications</h3>
            <p className="text-muted-foreground">You're all caught up!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {data?.items.map((notification) => (
            <Card key={notification.id} className={notification.isRead ? "opacity-70 bg-muted/20" : "bg-card border-l-4 border-l-primary"}>
              <CardContent className="p-4 flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-base">{notification.title}</h4>
                  <p className="text-muted-foreground mt-1 text-sm">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{format(new Date(notification.createdAt), "PPp")}</p>
                </div>
                {!notification.isRead && (
                  <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)} disabled={isMarking}>
                    <Check className="h-4 w-4 mr-2" />
                    Mark Read
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {data?.meta && data.meta.totalPages > 1 && (
        <Pagination
          currentPage={data.meta.page}
          totalPages={data.meta.totalPages}
          onPageChange={(p) => updateUrl({ page: p.toString() })}
        />
      )}
    </div>
  );
}
