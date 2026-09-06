"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton({ label }: { label: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="border-dashed gap-2"
      onClick={() => window.print()}
    >
      <Printer className="size-3" />
      <span className="text-xs">{label}</span>
    </Button>
  );
}
