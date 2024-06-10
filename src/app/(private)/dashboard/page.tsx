import { HandCoins } from "lucide-react";

const page = () => {
  return (
    <div>
      <div className="flex">
        <div className="rounded-xl border-rose-100">
          <div className="bg-primary/10">
            <HandCoins />
          </div>
          <div>
            <span>Savings</span>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
