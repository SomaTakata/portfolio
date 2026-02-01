import { Locale } from "@/types";
import ActivityPage from "@/features/activity/components/ActivityPage";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ActivityPage locale={locale as Locale} />;
}
