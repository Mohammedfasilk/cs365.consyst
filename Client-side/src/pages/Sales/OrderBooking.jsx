import React, { useEffect, useState } from "react";
import { Separator } from "../../components/UI/Separator";
import DataTable from "../../components/Order-booking/DataTable";
import { columns } from "../../components/Order-booking/Columns";
import OrderBookingSheet from "../../components/Order-booking/OrderBookingSheet";
import axios from 'axios';
import { useAuthRedirect } from "../../Hooks/useAuthRoute";

function OrderBooking() {
  useAuthRedirect();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_CS365_URI}/api/orders`);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching order bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mx-8 ml-20 mt-16">
      <div className="mb-16">
        <h1 className="text-2xl font-bold">Order Booking</h1>
        <div className="flex justify-end">
          <OrderBookingSheet fetchData={fetchData} />
        </div>
      </div>
      <Separator className="mb-4" />
      <div className="flex justify-center">
        <div className="w-full">
          <DataTable columns={columns(fetchData)} data={data} loading={loading}/>
        </div>
      </div>
    </div>
  );
}

export default OrderBooking;
