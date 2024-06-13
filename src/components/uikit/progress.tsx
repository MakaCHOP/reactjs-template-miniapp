import {Progress} from "@nextui-org/react";

export default function ProgressEnergy({energy,limit}: {energy: number, limit: number}) {
  console.log(Math.trunc((energy/limit)*100))
  return (
      <div className="w-full items-center flex flex-col py-3">
        <div className="flex ">
          {energy}/{limit}
        </div>
        <Progress color="secondary" aria-label="Loading..." value={Math.trunc((energy/limit)*100)} className={"xs:px-8 px-3"} />

      </div>
  );
}

