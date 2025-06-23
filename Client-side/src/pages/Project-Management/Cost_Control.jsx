import React, { useEffect, useState } from "react";
import { Separator } from "../../components/UI/Separator";
import { CostControlSheet } from "../../components/Cost-control/CostControlSheet";
import { DataTable } from "../../components/Cost-control/data_column";
import { columns } from "../../components/Project/Columns";
import ChooseProject from "../../components/Cost-control/ChooseProject";
import { useSelector } from "react-redux";
import axios from "axios";

function Cost_Control() {

  const {choosenProject} = useSelector((state)=>state.costControlSheet)
  const {saved} = useSelector((state)=>state.costControlSheet)
  const [project,setProject] = useState([])


const fetchData = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_CS365_URI}/api/cost-control/monthly-budget`,
          {project_name:choosenProject}
        );
        const data = await res.data;
        setProject(data?.monthly_cost_control)
      } catch (error) {
        console.error("Error fetching Monthly Budget:", error);
      }
    };
useEffect(()=>{
    fetchData();
},[choosenProject,saved])

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
      <div className="w-fit flex absolute mt-5">
        <div className="w-md px-5 py-1 border border-gray-400 rounded-lg hover:bg-gray-100/50">
          <ChooseProject/>
        </div>
      </div>
      <div>
        <DataTable data={project} columns={columns(fetchData)} noFilter />
      </div>
    </div>
  );
}

export default Cost_Control;
