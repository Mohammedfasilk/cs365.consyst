import React, { useEffect, useState } from "react";
import { Separator } from "../../components/UI/Separator";
import { CostControlSheet } from "../../components/Cost-control/CostControlSheet";
import { DataTable } from "../../components/Cost-control/data_column";
import { columns } from "../../components/Cost-control/Columns";
import ChooseProject from "../../components/Project/ChooseProject";
import { useSelector } from "react-redux";
import axios from "axios";
import { useAuthRedirect } from "../../Hooks/useAuthRoute";

function Cost_Control() {
  useAuthRedirect();
  const { choosenProject } = useSelector((state) => state.costControlSheet);
  const { saved } = useSelector((state) => state.costControlSheet);
  const [project, setProject] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_CS365_URI}/api/cost-control/monthly-budget`
      );

      const data = res.data;
      const flattened = data.flatMap((project) =>
        project.monthly_cost_control.map((entry) => ({
          ...entry,
          project_name: project.project_name,
          project_description:project.project_description
        }))
      );
      
      setProject(flattened)
      
    } catch (error) {
      console.error("Error fetching Monthly Budget:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [choosenProject, saved]);
  
  return (
    <div className="ml-20 mt-16 mx-8">
      <div className="mb-16">
        <h1 className="text-2xl font-bold">Cost Control</h1>
        <div className="flex justify-end">
          <CostControlSheet />
        </div>
      </div>

      <Separator className="mt-8 mb-4" />

      <div>
        <DataTable data={project} columns={columns(fetchData)} />
      </div>
    </div>
  );
}

export default Cost_Control;
