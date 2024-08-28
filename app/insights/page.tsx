import { SpeedInsights } from "@vercel/speed-insights/next";
export default function Insights() {
  return (
    <>
      <h1 className="text-center text-3xl">Insights</h1>
      <SpeedInsights />
    </>
  );
}
