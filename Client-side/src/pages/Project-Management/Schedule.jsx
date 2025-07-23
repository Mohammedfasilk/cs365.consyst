import React, { useEffect, useState } from "react";
import { Separator } from "../../components/UI/Separator";
import { useAuthRedirect } from "../../Hooks/useAuthRoute";
import ScheduleSheet from "../../components/Schedule/ScheduleSheet";
import ProgressChart from "../../components/Schedule/ProgressChart";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/UI/Card";
import DataTable from "../../components/Schedule/DataTable";
import { columns as scheduleColumns } from "../../components/Schedule/Columns";
import axios from "axios";

function Schedule() {
  useAuthRedirect();
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);

  const fetchScheduleData = async () => {
    try {
      setLoading(true);
       const res = await axios.get(`${import.meta.env.VITE_CS365_URI}/api/timeline/schedules`);
      setData(res.data);
      
    } catch (error) {
      console.error("Error fetching schedules:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduleData();
  }, []);

  return (
    <div className="mx-8 ml-20 mt-16">
      <div className="mb-16">
        <h1 className="text-2xl font-bold">Schedules</h1>
        <div className="flex justify-end">
          <ScheduleSheet fetchData={fetchScheduleData} />
        </div>
      </div>
      <Separator className="mb-4" />
      <div className="flex justify-center">
        <div className="w-full">
          <DataTable columns={scheduleColumns(fetchScheduleData)} data={data} loading={loading} filterKey="task" />
        </div>
      </div>
    </div>
  );
}

export default Schedule;