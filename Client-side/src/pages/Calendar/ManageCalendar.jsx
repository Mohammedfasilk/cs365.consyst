import { useEffect, useState } from "react";
import { Separator } from "../../components/UI/Separator"
import { useAuthRedirect } from "../../Hooks/useAuthRoute";
import axios from "axios";
import CalendarSheet from "../../components/Calendar/CalendarSheet";
import { columns } from "../../components/Calendar/Columns";
import { DataTable } from "../../components/Calendar/DataTable";

function ManageCalendar() {
     useAuthRedirect();
      const [loading,setLoading] = useState()
      const [data,setData] = useState([])
      
          const fetchData = async () => {
            try {
              setLoading(true)
              const res = await axios.get(
                `${import.meta.env.VITE_CS365_URI}/api/calendar`
              );
      
              const calendars = res.data ;
    
              setData(calendars);
            
             
            } catch (error) {
              console.error("Error fetching  calendar:", error);
            } finally{
              setLoading(false)
            }
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