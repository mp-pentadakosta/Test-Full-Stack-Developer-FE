"use client";

import { ResponsiveLine } from "@nivo/line";

export interface TypeDataChart {
  id: string;
  data: { x: string; y: number }[];
}

export default function ChartComponent(
  data: TypeDataChart[],
  bottomName: string,
  margin?: { top: number; right: number; bottom: number; left: number },
) {
  return (
    <div className={`h-80`}>
      <ResponsiveLine
        animate={true}
        areaBaselineValue={9000}
        areaOpacity={0.1}
        axisBottom={{
          legend: bottomName,
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          legend: data.map((item) => item.id).join(", "),
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={{ scheme: "category10" }}
        curve={"monotoneX"}
        data={data}
        enableSlices={"x"}
        margin={{
          top: margin?.top ?? 50,
          right: margin?.right ?? 60,
          bottom: margin?.bottom ?? 50,
          left: margin?.left ?? 60,
        }}
        pointBorderWidth={2}
        pointLabelYOffset={-12}
        pointSize={8}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
      />
    </div>
  );
}
