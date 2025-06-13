import React from "react";
import CostControlReportTable from "../../components/Cost-control/CostControlReportTable";
import { ProjectFilterInput } from "../../components/Cost-control/ProjectFilterInput";
import { Button } from "../../components/UI/Button";
import { Label } from "../../components/UI/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/UI/select";
import { Tabs, TabsList, TabsTrigger } from "../../components/UI/Tabs";
import { SquareChartGantt } from "lucide-react";
// import { useRequireAuth } from "../../hooks/Authenticate";

function Project() {
  // const redirect = useRequireAuth();
  // if (redirect) return redirect;

  return (
    <div className="ml-20 mt-16 mx-8">
      <div className="mb-16">
        <h1 className="text-2xl font-bold">Project Report</h1>
      </div>
      <Tabs defaultValue="project-details" className="mb-4">
        <TabsList>
          <TabsTrigger value="project-details">
            <SquareChartGantt className="mr-2 h-4 w-4" />
            Cost Control Report
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <h1 className="mb-6">Month-Wise Project Cost Control Report</h1>
      <div className="grid grid-cols-5 gap-4 items-center mb-8">
        <Label>Pick a Project</Label>
        <ProjectFilterInput placeholder="Choose Customer..." />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="running">Running</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <ProjectFilterInput placeholder="Choose Project..." />
        <Button className="bg-[var(--csblue)] hover:bg-[var(--csblue/90)]">View Report</Button>
      </div>
      <div className="budget-sheet mb-12">
        <CostControlReportTable />
      </div>
    </div>
  );
}

export default Project