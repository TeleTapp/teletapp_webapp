import { cn } from "@nextui-org/system";
import { useMemo } from "react";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";

const stepsKeys: Record<CreateBotFormStep, number> = {
  info: 1,
  categories: 2,
  payments: 3,
  contacts: 4,
};

const steps = Object.values(stepsKeys);

export default function Page() {
  const context = useOutletContext<CreateBotFormContext>();

  return (
    <>
      <Steps />

      <div className="mt-6">
        <Outlet context={context} />
      </div>
    </>
  );
}

function Steps() {
  return (
    <div className="flex justify-between relative -mx-1">
      <div className="absolute h-0.5 bg-secondary w-full top-[50%] mt-[-1px]" />
      {steps.map((step) => (
        <Step step={step} key={step} />
      ))}
    </div>
  );
}

function Step({ step }: { step: number }) {
  const location = useLocation();
  const { isActive, isSuccess } = useMemo(() => {
    const key = location.pathname.split("/").pop() as CreateBotFormStep;
    const current = stepsKeys[key];
    const isActive = step === current;
    const isSuccess = step < current;

    return { isActive, isSuccess };
  }, [location.pathname, step]);

  return (
    <div className="p-1 bg-background rounded-full z-10">
      <div
        className={cn(
          "w-8 h-8 transition border-transparent border-1 bg-secondary rounded-full flex justify-center items-center",
          isActive && "!border-primary",
          isSuccess && "!bg-primary !text-primary-foreground"
        )}
      >
        {step}
      </div>
    </div>
  );
}
