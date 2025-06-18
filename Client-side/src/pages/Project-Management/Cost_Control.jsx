import React from "react";
import { Separator } from "../../components/UI/Separator";
import { CostControlSheet } from "../../components/Cost-control/CostControlSheet";
import { DataTable } from "../../components/Project/data_column";
import { columns } from "../../components/Project/Columns";

function Cost_Control() {

 


  const snapShotsData = [
    {
      id: "728ed52f",
      month: "month",
      status: "draft",
      stage: "open",
    },
   
  ];
  return (
    <div className="ml-20 mt-16 mx-8">
      <div className="mb-16">
        <h1 className="text-2xl font-bold">Cost Control</h1>
        <div className="flex justify-end">
          <CostControlSheet />
        </div>
      </div>

      <Separator className="mt-8 mb-4" />
      <h1 className="mt-6">Monthly Budget Updates</h1>
      <div className="mt-4">
        <DataTable data={snapShotsData} columns={columns} />
      </div>
    </div>
  );
}

export default Cost_Control;
