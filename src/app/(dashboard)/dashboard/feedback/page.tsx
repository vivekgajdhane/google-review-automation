"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Trash2, Calendar, Phone, User, CheckCircle2 } from "lucide-react";
import { deleteFeedbackAction } from "./actions";

interface FeedbackItem {
  id: string;
  message: string;
  customerName?: string | null;
  customerPhone?: string | null;
  createdAt: string;
}

export default function FeedbackDashboardPage() {
  // Demo seed feedback items
  const [feedbackList, setFeedbackList] = React.useState<FeedbackItem[]>([
    {
      id: "fb-1",
      message: "The haircut with Vikram was excellent, but the wait time at reception was almost 25 minutes past my booking time.",
      customerName: "Rahul Sharma",
      customerPhone: "+91 98200 12345",
      createdAt: "Today, 10:45 AM",
    },
    {
      id: "fb-2",
      message: "AC cooling was low in the styling area today. Please check before afternoon slots.",
      customerName: null,
      customerPhone: null,
      createdAt: "Yesterday, 4:20 PM",
    },
    {
      id: "fb-3",
      message: "Loved the organic shampoo product line you used! Do you sell retail bottles?",
      customerName: "Pooja Kulkarni",
      customerPhone: "+91 98811 54321",
      createdAt: "14 Oct 2026, 12:15 PM",
    },
  ]);

  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [notification, setNotification] = React.useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await deleteFeedbackAction(id);
    setFeedbackList((prev) => prev.filter((item) => item.id !== id));
    setDeletingId(null);
    setNotification("Feedback item deleted successfully.");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Private Feedback Inbox
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Confidential customer feedback submitted directly via your QR counter page.
          </p>
        </div>
        <Badge variant="outline" className="self-start sm:self-auto font-mono text-xs">
          {feedbackList.length} Messages
        </Badge>
      </div>

      {notification && (
        <div className="flex items-center gap-2 rounded-lg bg-slate-900 p-3 text-sm text-white shadow-md">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {feedbackList.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent className="space-y-3">
            <MessageSquare className="mx-auto h-12 w-12 text-slate-300" />
            <CardTitle className="text-lg">No Private Feedback Yet</CardTitle>
            <CardDescription className="max-w-sm mx-auto">
              When customers scan your counter stand and tap &ldquo;Send Private Feedback&rdquo;, their messages will appear here.
            </CardDescription>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {feedbackList.map((item) => (
            <Card key={item.id} className="transition-all hover:border-slate-300 shadow-sm">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <Calendar className="h-3.5 w-3.5" /> {item.createdAt}
                      </span>
                      {item.customerName ? (
                        <span className="flex items-center gap-1 text-blue-600 font-medium">
                          <User className="h-3.5 w-3.5" /> {item.customerName}
                        </span>
                      ) : (
                        <Badge variant="outline" className="text-slate-400 text-[10px]">Anonymous</Badge>
                      )}
                      {item.customerPhone && (
                        <span className="flex items-center gap-1 text-slate-600 font-mono">
                          <Phone className="h-3.5 w-3.5" /> {item.customerPhone}
                        </span>
                      )}
                    </div>
                    <p className="text-base text-slate-800 leading-relaxed pt-1">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="text-slate-400 hover:text-red-600 hover:bg-red-50 self-end sm:self-start"
                    title="Delete permanently"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
