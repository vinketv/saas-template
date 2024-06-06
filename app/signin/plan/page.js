import { Cards } from "@/components/Front/Pricing/card";

export default async function Page() {
  return (
    <div className="xl:h-screen xl:w-screen flex justify-center items-center bg-slate-100">
      <div className="flex flex-col sm:shadow-xl px-8 py-8 bg-white rounded-xl space-y-8 justify-items-center items-center w-4/5">
        <Cards />
      </div>
    </div>
  );
}
