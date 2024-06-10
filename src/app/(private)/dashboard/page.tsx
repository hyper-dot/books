import AreaChartDiagram from "@/components/private/dashboard/AreaChart";
import BarDiagram from "@/components/private/dashboard/BarChart";
import StatCards from "@/components/private/dashboard/StatCards";

const page = () => {
  return (
    <div>
      <StatCards />
      <div className="grid md:grid-cols-2 gap-y-4 gap-x-10 px-4">
        <div className="mt-10 bg-secondary rounded-3xl border py-4">
          <h1 className="px-8 text-xl pb-5">Top Sales</h1>
          <div className="h-[200px] sm:h-[400px]">
            <BarDiagram />
          </div>
        </div>
        <div className=" mt-10 bg-secondary rounded-3xl border py-4">
          <h1 className="px-8 text-xl pb-5">Top Sales</h1>
          <div className="h-[200px] sm:h-[400px]">
            <AreaChartDiagram />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
