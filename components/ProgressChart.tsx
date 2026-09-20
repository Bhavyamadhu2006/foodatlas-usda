"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function ProgressChart({ data }: { data: { date: string; weight: number }[] }) {
  if (!data.length) {
    return <div className="grid h-64 place-items-center rounded-[22px] border border-dashed border-forest-600 bg-forest-950/30 text-[15px] text-forest-200/65">Add a weight entry to start your chart.</div>;
  }

  return (
    <div className="h-72 w-full rounded-[22px] border border-forest-600 bg-forest-950/35 p-3">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fill: "#A4C894", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis domain={["dataMin - 1", "dataMax + 1"]} tick={{ fill: "#A4C894", fontSize: 12 }} axisLine={false} tickLine={false} width={36} />
          <Tooltip contentStyle={{ background: "#17311D", border: "1px solid #35663A", borderRadius: 14, color: "#F7F3E8" }} />
          <Line type="monotone" dataKey="weight" stroke="#A4C894" strokeWidth={3} dot={{ fill: "#79A96B", strokeWidth: 0, r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
