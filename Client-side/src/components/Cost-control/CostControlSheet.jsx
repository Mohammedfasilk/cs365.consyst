// import React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../UI/Sheet";
import { Button } from "../UI/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../UI/Tabs";
import { Label } from "../UI/Label";
import {
  CircleCheckIcon,
  CircleXIcon,
  Plus,
  SquareChartGantt,
} from "lucide-react";
import { MonthPickerComponent } from "../UI/MonthPickerComponent";
import MonthlyBudgetTable from "./MonthlyBudgetTable";
import ChooseCostControlProject from "./ChooseCostControlProject";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsOpen,
  setSelectedProjectName,
  setSaved,
  setSelectedMonth,
  setProjectStatus,
} from "../../Redux/Slices/costControlsheet";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../../Hooks/use-toast";
import {useSessionUser} from '../../Hooks/useSessionUser'

export function CostControlSheet() {
  const dispatch = useDispatch();
  const { selectedProjectName } = useSelector(
    (state) => state.costControlSheet
  );
  const { saved } = useSelector((state) => state.costControlSheet);
  const { isOpen } = useSelector((state) => state.costControlSheet);
  const { projectStatus } = useSelector((state) => state.costControlSheet);

  const sessionUser = useSessionUser();
  const { selectedMonth } = useSelector((state) => state.costControlSheet);
  const [project, setProject] = useState({});
  const [monthlydata, setMonthlyData] = useState({});
  const [isSaveDisabled,setIsSaveDisabled] = useState(false)
  const { toast } = useToast();
  useEffect(() => {
    async function fetchSelectedProject(project_name) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_CS365_URI}/api/cost-control/projects`,
          { project: project_name, month: selectedMonth }
        );
        const projects = res.data;
        setProject(projects);

        const status = projects.monthly_cost_control[0].status

        dispatch(setProjectStatus(status))
        
      } catch (error) {
        console.error("Error fetching  projects:", error);
      }
    }
    if (selectedProjectName) {
      fetchSelectedProject(selectedProjectName);
    }
  }, [selectedProjectName, selectedMonth]);

  const handleSubmit = async () => {
    if (projectStatus === "approved") {
          toast({
            title: "Error: Approved Cost Cannot Be Edited",
            description: "There was an error saving the Cost.",
            variant: "destructive",
            icon: <CircleXIcon className="mr-4" color="red" />,
          });
          return;
      }

    if(isSaveDisabled){
       toast({
          title: "Projected must be greater",
          description: "There was an error saving the monthly budget.",
          variant: "destructive",
          icon: <CircleXIcon className="mr-4" color="red" />,
        });
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/cost-control/monthly-data`,
        { monthlyData: monthlydata, project_name: selectedProjectName }
      );

      const data = res.data;

      dispatch(setSaved(!saved));

      if (!data || data?.error) {
        toast({
          title: "Monthly Budget Not Saved",
          description: "There was an error saving the monthly budget.",
          variant: "destructive",
          icon: <CircleXIcon className="mr-4" color="red" />,
        });
        return;
      }

      const actData = {
                    field: "cost_control",
                    data: {
                      username: sessionUser,
                      date: new Date().toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      }),
                      activity: `The project "${selectedProjectName}" ${selectedMonth} cost is updated`,
                    },
                  };
                  const act = await axios.post(
                    `${import.meta.env.VITE_CS365_URI}/api/activity`,
                    actData
                  );

      toast({
        title: "Monthly Budget Saved",
        description: "The monthly budget has been successfully saved.",
        icon: <CircleCheckIcon className="mr-4" color="green" />,
      });
    } catch (error) {
      console.error("Error saving monthly costcontrol:", error);
    }
  };
  
  return (
    <Sheet
      open={isOpen}
      onOpenChange={(value) => {
        if (!value) {
          dispatch(setSelectedProjectName(""));
          dispatch(setSelectedMonth(""));
          setProject({});
        }
        dispatch(setIsOpen(value));
      }}
    >
      <SheetTrigger asChild>
        <Button className="bg-[var(--csred)] hover:bg-[var(--csred)]/90">
          <Plus className="mr-2 h-4 w-4" /> Add Cost Control
        </Button>
      </SheetTrigger>

      <SheetContent className="min-w-[800px] overflow-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Cost Control</SheetTitle>

          {<ChooseCostControlProject />}

          <div>
            <Tabs defaultValue="cost-control-details">
              <TabsList>
                <TabsTrigger value="cost-control-details">
                  <SquareChartGantt className="mr-2 h-4 w-4" /> Cost Control
                  Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cost-control-details">
                <div className="flex justify-between items-center">
                  <h1 className="font-bold">Monthly Cost Control Sheet</h1>
                  <Button
                    className="bg-[var(--csblue)] hover:bg-[var(--csblue)]/90 px-8"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </div>

                <Label className="mt-4 block">
                  Month <sup className="text-red-600">*</sup>
                </Label>

                <div className="mt-2 mb-6">
                  <MonthPickerComponent
                    selectedMonth={selectedMonth}
                    onSelect={(date) => {
                      const options = { month: "long", year: "numeric" };
                      if (date) {
                        const formatted = date.toLocaleDateString(
                          "en-US",
                          options
                        );
                        dispatch(setSelectedMonth(formatted));
                      }
                    }}
                  />
                </div>

                <div className="budget-sheet mt-4">
                  {selectedMonth !== "" ? (
                    <MonthlyBudgetTable
                      project={project}
                      getData={(data) => {
                        setMonthlyData(data);
                      }}
                      selectedMonth={selectedMonth}
                      setIsSaveDisabled={setIsSaveDisabled}
                    />
                  ) : (
                     <div className="text-[var(--destructive)] text-xl w-full flex justify-center items-center h-[200px]">Please select a month</div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
