import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-muted/40">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <XCircle className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Payment Cancelled</CardTitle>
          <CardDescription>
            Your checkout session was cancelled or expired. You have not been charged.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You can safely return to your dashboard or retry the payment from the complaint details page.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Link href="/dashboard" className={buttonVariants({ className: "w-full" })}>Return to Dashboard</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
