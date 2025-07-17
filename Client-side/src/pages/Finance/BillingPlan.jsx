import React from 'react'
import BillingPlanSheet from '../../components/Billing-plan/BillingPlanSheet'
import { Separator } from '../../components/UI/Separator'
import DataTable from '../../components/Billing-plan/DataTable'
import { useAuthRedirect } from '../../Hooks/useAuthRoute';
import { useState } from 'react';
import { useEffect } from 'react';
import { columns } from '../../components/Billing-plan/Columns';
import axios from 'axios';

function BillingPlan() {

      useAuthRedirect();
      const [loading, setLoading] = useState(false);
      const [data, setData] = useState([]);
    
     const fetchData = async () => {
  try {
    setLoading(true);
    const res = await axios.get(`${import.meta.env.VITE_CS365_URI}/api/billing-plan/list`);

    // Flatten billing_plans
    const flatData = res.data.flatMap(entry =>
      entry.billing_plans.map(plan => ({
        ...plan,
        salesOrderName: entry.salesOrderName,
        status: plan.status ?? entry.status,
        clientName: entry.clientName,
        billingPlanName: plan.description, // if this is the name
      }))
    );

    setData(flatData);
    console.log("Flattened Billing Plan:", flatData);
  } catch (error) {
    console.error("Error fetching Billing plan:", error);
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
        <h1 className="text-2xl font-bold">Billing Plan</h1>
        <div className="flex justify-end">
          <BillingPlanSheet refresh={fetchData}/>
        </div>
      </div>
      <Separator className="mb-4" />
      <div className="flex justify-center">
        <div className="w-full">
          <DataTable data={data} columns={columns(fetchData)} loading={loading}/>
        </div>
      </div>
    </div>
  )
}

export default BillingPlan
