import { useEffect, useState } from "react";
import { columns } from "../../components/Signatures/Columns";
import axios from "axios";
import { DataTable } from "../../components/Signatures/Data-Table";
import { Separator } from "../../components/UI/Separator";
import { useAuthRedirect } from "../../Hooks/useAuthRoute";
import NoticeSheet from "../../components/Notice/NoticeSheet";

function Notice() {

  useAuthRedirect();

  const [data, setData] = useState([]);

  const fetchData = async () => {
    // try {
    //   const response = await axios.get(
    //     `${import.meta.env.VITE_CS365_URI}/api/signature`
    //   );

    //   setData(response.data);
    // } catch (error) {
    //   console.error("Error fetching Signatures:", error);
    // }
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className="mx-8 ml-20 mt-16">
      <div className="mb-16">
        <h1 className="text-2xl font-bold">Signatures</h1>
        <div className="flex justify-end">
          <NoticeSheet onSuccess={fetchData} />
        </div>
      </div>

      <Separator className="mb-4" />

      <div>
        <DataTable columns={columns(fetchData)} data={data} />
      </div>
    </div>
  );
}
export default Notice;
