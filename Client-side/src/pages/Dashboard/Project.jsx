import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../../components/UI/Tabs";
import { SquareChartGantt } from "lucide-react";
import ChooseProject from "../../components/Project/ChooseProject";
import MonthwiseTable from "../../components/Project/MonthwiseTable";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import CostControlBudgetTable from "../../components/Cost-control/CostControlReportTable";
import LatestProjectionTable from "../../components/Project/LatestProjection";
import { setChoosenProject } from "../../Redux/Slices/costControlsheet";
import ScaleLoading from "../../components/UI/ScaleLoader";
import { Checkbox } from "../../components/UI/Checkbox";
import MonthlyLineChart from "../../components/Project/MonthlyLineChart";
import { Card, CardHeader } from "../../components/UI/Card";

function Project() {
  const { choosenProject } = useSelector((state) => state.costControlSheet);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setChoosenProject(""));
    };
  }, [dispatch]);
  const [checked, setChecked] = useState(true);
  const [budget, setBudget] = useState({});
  const [monthWiseData, setMonthWiseData] = useState([]);
  const [latestProjection, setLatestProjection] = useState({});
  const [loader, setLoader] = useState();
  const [chartData, setChartData] = useState({});
  const selectedProject = {
    project: choosenProject,
  };
  const fetchCostcontrolReport = async () => {
    try {
      setLoader(true);
      const res = await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/project-report`,
        selectedProject
      );

      const project = res.data;

      setBudget(project?.budget);

      const monthOrder = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
      };

      const parseMonthYear = (str) => {
        // Example input: "June 2025"
        const [monthStr, yearStr] = str.split(" ");
        const month = monthOrder[monthStr];
        const year = parseInt(yearStr, 10);
        // Return a Date object for sorting
        return new Date(year, month);
      };

      const sortedMonthlyCostControl = (project?.monthly_cost_control || [])
        .slice()
        .sort((a, b) => {
          return parseMonthYear(a.month) - parseMonthYear(b.month);
        });

      setMonthWiseData(sortedMonthlyCostControl);
      setLatestProjection(sortedMonthlyCostControl.at(-1).projected || {});

      const chartValues = {
  month: sortedMonthlyCostControl.map(entry => entry.month),
  billing_total: sortedMonthlyCostControl.map(entry => entry.current.billing_total),
  total_direct_expenses: sortedMonthlyCostControl.map(entry => entry.current.total_direct_expenses),
  total_indirect_expenses: sortedMonthlyCostControl.map(entry => entry.current.total_indirect_expenses),
  total_expenses: sortedMonthlyCostControl.map(entry => entry.current.total_expenses),
  net_profit_loss: sortedMonthlyCostControl.map(entry => entry.current.net_profit_loss),
};
      setChartData(chartValues)      

    } catch (error) {
      console.error("Error fetching  projects:", error);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchCostcontrolReport();
  }, [choosenProject]);

  return (
    <section className="w-screen">
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
        <div className="flex mb-8 justify-between items-center">
          <div className="border w-lg p-1 rounded hover:bg-gray-100">
            <ChooseProject />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={checked}
              onCheckedChange={(value) => {
                setChecked(value);
                console.log(checked);
              }}
            />{" "}
            <span>Show Projected</span>
          </div>
        </div>

        <Card className='px-5 mb-5'>
          <CardHeader className="text-center font-bold text-lg">Monthly Chart</CardHeader>
          <MonthlyLineChart data={chartData}/>
        </Card>
        {choosenProject == "" ? (
          null
          // <div className="w-full h-[30vh] flex justify-center items-center border border-[var(--secondary)] italic rounded text-[var(--secondary)]">
          //   No Data Found
          // </div>
        ) : loader ? (
          <div className="w-full h-[30vh] flex justify-center items-center">
            <ScaleLoading size={60} />
          </div>
        ) : (
          <div className="flex budget-sheet mb-12 w-full">
            <div className="pointer-events-none">
              <CostControlBudgetTable project={budget} />
            </div>
            <div className="flex overflow-x-scroll" style={{scrollbarWidth:"thin"}}>
              {monthWiseData.map((months, index) => {
              return (
                <div key={index} className="mx-px pointer-events-none">
                  <MonthwiseTable
                    project={months}
                    title={months?.month}
                    showProjected={checked}
                  />
                </div>
              );
            })}
            <div className="pointer-events-none">
              <LatestProjectionTable project={latestProjection} />
            </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Project;
