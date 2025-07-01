import { useEffect, useState, useMemo } from "react";
import { Filter, SquareChartGantt } from "lucide-react";
import axios from "axios";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/UI/Tabs";
import { Card } from "../../components/UI/Card";
import { CurrentOpportunityPipeline } from "../../components/Sales-Pipeline/CurrentOpportunityPipeLine";
import OrderBookingFYTD from "../../components/Sales-Pipeline/OrderBookingFYTD";
import { OpportunityDataTable } from "../../components/Sales-Pipeline/OpportunityDataTable";
import { opportunityDataColumns } from "../../components/top-opportunity/OpportunityDataColumns";
import { SalesOrderByPeriodGraph } from "../../components/Sales-Pipeline/SalesOrderByPeriodGraph";
import { useSelector, useDispatch } from "react-redux";
import { fetchSettings } from "../../Redux/Slices/settingsSlice";
import ScaleLoading from "../../components/UI/ScaleLoader";
import { useAuthRedirect } from "../../Hooks/useAuthRoute";

function SalesPipeline() {
  useAuthRedirect();
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.settings);

  const [loading, setLoading] = useState(true);
  const [topOpportunities, setTopOpportunities] = useState([]);
  const [sumFunnelData, setSumFunnelData] = useState([]);
  const [countFunnelData, setCountFunnelData] = useState([]);
  const [orderBookingData, setOrderBookingData] = useState([]);
  const [monthlyOrderBookingData, setMonthlyOrderBookingData] = useState({
    dateList: [],
    valueList: [],
  });

  // Fetch settings if not already available
  useEffect(() => {
    if (!settings || Object.keys(settings).length === 0) {
      dispatch(fetchSettings());
    }
  }, [dispatch, settings]);

  // Fetch data only after settings are loaded
  useEffect(() => {
    if (!settings || Object.keys(settings).length === 0) return;

    const fetchData = async () => {
      setLoading(true);
      const base = import.meta.env.VITE_CS365_URI;

      try {
        const [
          topRes,
          sumRes,
          countRes,
          orderRes,
          monthlyRes,
        ] = await Promise.all([
          axios.get(`${import.meta.env.VITE_CS365_URI}/api/sales-pipeline/top-opportunities`),
          axios.get(`${import.meta.env.VITE_CS365_URI}/api/sales-pipeline/sum`),
          axios.get(`${import.meta.env.VITE_CS365_URI}/api/sales-pipeline/count`),
          axios.post(`${import.meta.env.VITE_CS365_URI}/api/sales-analysis`,{fyDate: settings.currentFyStartDate}),
          axios.post(`${import.meta.env.VITE_CS365_URI}/api/sales-analysis/order-booking-monthly`, {
            fyDate: settings.currentFyStartDate,
            usd: settings.usdToinr || 0,
            aed: settings.usdToaed || 0,
          }),
        ]);

        setTopOpportunities(topRes.data);
        setSumFunnelData(sumRes.data);
        setCountFunnelData(countRes.data);
        setOrderBookingData(orderRes.data);
        setMonthlyOrderBookingData(monthlyRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [settings]);

  // Calculate USD group value
  const orderBookingGroupedValueUSD = useMemo(() => {
    const usdRates = {
      "CONSYST Digital Industries Pvt. Ltd": settings?.usdToinr || 0,
      "CONSYST Technologies (India) Pvt. Ltd.": settings?.usdToinr || 0,
      "CONSYST Middle East FZ-LLC": settings?.usdToaed || 0,
    };

    let totalValue = 0;

    orderBookingData.forEach((item) => {
      const rate = usdRates[item.company];
      if (!rate) return; // skip if no rate
      const valueInUSD = item.value / rate;
      totalValue += valueInUSD;
    });

    return totalValue;
  }, [orderBookingData, settings]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-lg font-semibold"><ScaleLoading size={60}/></div>;
  }

  return (
    <div>
      <div className="mb-16 ml-20 mt-16 mx-8">
        <h1 className="text-2xl font-bold">Sales</h1>
      </div>

      <Tabs defaultValue="sales-pipeline">
        <TabsList className="ml-20 mt-16">
          <TabsTrigger value="sales-pipeline">
            <Filter className="mr-2 h-4 w-4" /> Sales Pipeline
          </TabsTrigger>
          <TabsTrigger value="sales-analysis">
            <SquareChartGantt className="mr-2 h-4 w-4" /> Sales Analysis
          </TabsTrigger>
        </TabsList>

        {/* Sales Pipeline View */}
        <TabsContent value="sales-pipeline" className="bg-[var(--csgray)] w-full">
          <div className="flex justify-center gap-2 ml-20 mx-8 mb-2">
            <Card className="flex-1 flex flex-col justify-center items-center">
              <h1 className="m-4 mb-6 w-[95%]">Current Opportunity Pipeline (Value)</h1>
              <div className="h-80 w-[80%]">
                <CurrentOpportunityPipeline funnelType="sum" funnelData={sumFunnelData} />
              </div>
            </Card>
            <Card className="flex-1 flex flex-col justify-center items-center">
              <h1 className="m-4 mb-6 w-[95%]">Current Opportunity Pipeline (Count)</h1>
              <div className="h-80 w-[80%]">
                <CurrentOpportunityPipeline funnelType="count" funnelData={countFunnelData} />
              </div>
            </Card>
          </div>

          <div className="flex justify-center mb-12 mx-8 ml-20">
            <Card className="flex-1 w-[768px] p-4">
              <h1 className="m-2 mb-6">Top Opportunities</h1>
              <OpportunityDataTable data={topOpportunities} columns={opportunityDataColumns} />
            </Card>
          </div>
        </TabsContent>

        {/* Sales Analysis View */}
        <TabsContent value="sales-analysis" className="bg-[var(--csgray)]">
          <div className="mx-8 ml-20 mb-2 flex justify-center gap-2">
            {orderBookingData?.map((data) => (
              <OrderBookingFYTD
                key={data.company}
                company={data.company}
                value={data.value}
                isGroup={false}
              />
            ))}
            <OrderBookingFYTD
              key="group"
              company="Consyst Group"
              value={orderBookingGroupedValueUSD}
              isGroup={true}
            />
          </div>
          <div className="flex justify-center mx-8 ml-20 mb-12">
            <SalesOrderByPeriodGraph
              values={monthlyOrderBookingData.valueList}
              dates={monthlyOrderBookingData.dateList}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SalesPipeline;
