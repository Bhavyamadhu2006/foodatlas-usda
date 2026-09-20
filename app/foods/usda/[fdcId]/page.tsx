import Link from "next/link";
import USDAFoodDetail from "@/components/USDAFoodDetail";

export default async function USDAFoodPage({ params }: { params: Promise<{ fdcId: string }> }) {
  const { fdcId } = await params;
  return (
    <div className="space-y-5">
      <Link href="/foods" className="text-[14px] font-extrabold text-forest-300">← Back to food search</Link>
      <USDAFoodDetail fdcId={fdcId} />
    </div>
  );
}
