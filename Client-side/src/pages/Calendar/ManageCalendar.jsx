import { useEffect, useState } from "react";
import { DataTable } from "../../components/Project-manage/DataTable"
import { Separator } from "../../components/UI/Separator"
import { useAuthRedirect } from "../../Hooks/useAuthRoute";
import axios from "axios";
import { columns } from "../../components/Project-manage/Columns";
import CalendarSheet from "../../components/Calendar/CalendarSheet";

function ManageCalendar() {
     useAuthRedirect();
      const [loading,setLoading] = useState()
      const [data,setData] = useState({})
      
          const fetchData = async () => {
            // try {
            //   setLoading(true)
            //   const res = await axios.get(
            //     `${import.meta.env.VITE_CS365_URI}/api/projects`
            //   );
      
            //   const projects = res.data ;
    
            //   setData(projects);
            
             
            // } catch (error) {
            //   console.error("Error fetching  calendar:", error);
            // } finally{
            //   setLoading(false)
            // }
          };
    
      useEffect(() => {
          fetchData();
        }, []);
  return (
    <div className="mx-8 ml-20 mt-16">
      <div className="mb-16">
        <h1 className="text-2xl font-bold">Manage Calendar</h1>
        <div className="flex justify-end">
          <CalendarSheet fetchData = {fetchData} />
        </div>
      </div>

      <Separator className="mb-4" />

      <div>
        <DataTable columns={columns(fetchData)} data={data} loading={loading}/>
      </div>
    </div>
  )
}

export default ManageCalendar