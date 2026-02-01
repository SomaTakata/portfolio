"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Terminal, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Locale } from "@/types";

export default function ActivityPage({ locale }: { locale: Locale }) {
  return (
    <div className="flex justify-center items-center p-4 h-full">
      <Card className="w-full max-w-md border-dashed border-2 rounded-none shadow-none">
        <CardHeader className="border-b border-dashed pb-4">
          <div className="flex items-center space-x-2">
            <Terminal className="h-5 w-5" />
            <span className="text-sm font-mono">Message</span>
          </div>
        </CardHeader>
        <CardContent className="pt-6 pb-0 font-mono">Coming Soon</CardContent>
        <CardFooter className="pt-6 border-t border-dashed mt-6 flex flex-col sm:flex-row flex-wrap gap-2">
          <Button
            variant="outline"
            className="w-full rounded-none border-dashed"
            asChild
          >
            <Link href="/">$ cd /home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
