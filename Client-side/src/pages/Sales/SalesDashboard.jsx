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
import { Switch } from "../../components/UI/Switch";
import MonthlyOrderBookingChart from "../../components/Sales-Pipeline/MonthlyOrdeBookingChart";
import OrderBookingPerformance from "../../components/Sales-Pipeline/OrderBookingPerformance";
import { CardHeader } from "@mui/material";
import DonutChart from "../../components/Sales-Pipeline/DonutChart";

function SalesDashboard() {
  useAuthRedirect();
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.settings);

  const [loading, setLoading] = useState(true);
  const [sumFunnelData, setSumFunnelData] = useState([]);
  const [countFunnelData, setCountFunnelData] = useState([]);
  const [orderBookingData, setOrderBookingData] = useState([]);
  const [orderSummaryData, setOrderSummaryData] = useState([]);
  const [isUsd, setIsUsd] = useState(false);
  const [usd, setUsd] = useState();
  const [rawTopOpportunities, setRawTopOpportunities] = useState([]);
  const [rawFocusOpportunities, setRawFocusOpportunities] = useState([]);
  const [companySummaryData, setCompanySummaryData] = useState([]);
  const [countrySummaryData, setCountrySummaryData] = useState([]);
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

  const displayedTopOpportunities = useMemo(() => {
    if (!usd) return rawTopOpportunities;

    return rawTopOpportunities.map((item) => {
      const isINR = item.currency === "INR";

      if (isINR) {
        const rate = settings?.usdToinr || 1;
        return {
          ...item,
          opportunity_amount: item.opportunity_amount / rate,
          currency: "USD",
        };
      }

      return item;
    });
  }, [rawTopOpportunities, usd, settings]);

  const displayedFocusOpportunities = useMemo(() => {
    if (!usd) return rawFocusOpportunities;

    return rawFocusOpportunities.map((item) => {
      const isINR = item.currency === "INR";

      if (isINR) {
        const rate = settings?.usdToinr || 1;
        return {
          ...item,
          opportunity_amount: item.opportunity_amount / rate,
          currency: "USD",
        };
      }

      return item;
    });
  }, [rawFocusOpportunities, usd, settings]);

  // Fetch data only after settings are loaded
  useEffect(() => {
    if (!settings || Object.keys(settings).length === 0) return;

    const fetchData = async () => {
      setLoading(true);
      const base = import.meta.env.VITE_CS365_URI;

      try {
        const [
          topRes,
          focRes,
          sumRes,
          countRes,
          orderRes,
          monthlyRes,
          summaryRes,
          companySummaryRes,
          countrySummaryRes,
        ] = await Promise.all([
          axios.get(`${base}/api/sales-pipeline/top-opportunities`),
          axios.get(`${base}/api/sales-pipeline/focus-opportunities`),
          axios.get(`${base}/api/sales-pipeline/sum`),
          axios.get(`${base}/api/sales-pipeline/count`),
          axios.post(`${base}/api/sales-analysis`, { fyDate: settings.currentFyStartDate }),
          axios.post(`${base}/api/sales-analysis/order-booking-monthly`, {
            fyDate: settings.currentFyStartDate,
            usd: settings.usdToinr || 0,
            aed: settings.usdToaed || 0,
          }),
          axios.get(`${base}/api/orders/order-summary`),
          axios.get(`${base}/api/orders/summary-by-company`),
          axios.get(`${base}/api/orders/summary-by-country`),
        ]);

        setRawTopOpportunities(topRes.data);
        setRawFocusOpportunities(focRes.data);
        setSumFunnelData(sumRes.data);
        setCountFunnelData(countRes.data);
        setOrderBookingData(orderRes.data);
        setMonthlyOrderBookingData(monthlyRes.data);
        setOrderSummaryData(summaryRes.data);
        setCompanySummaryData(companySummaryRes.data);
        setCountrySummaryData(countrySummaryRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [settings]);

  // Get USD value for a specific company
  const getCompanyUsdValue = (companyName) => {
    const company = companySummaryData.find(c => c.company === companyName);
    return company ? company.total : 0;
  };
  // Calculate USD group value from company summary data
  const orderBookingGroupedValueUSD = useMemo(() => {
    return getCompanyUsdValue("Consyst Group");
  }, [companySummaryData]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-lg font-semibold"><ScaleLoading size={60} /></div>;
  }

  const handleUSDConvertion = (checked) => {
    setIsUsd(checked);
  };

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
          <div className="flex justify-center gap-2 ml-20 mx-8 mb-4">
            <Card className="flex-1 flex flex-col justify-center items-center bg-white">
              <div className="flex justify-between items-center w-[95%] mt-4 mb-6">
                <h1>Current Opportunity Pipeline (Value)</h1>
                <div className="flex items-center gap-2">
                  <Switch
                    onCheckedChange={handleUSDConvertion}
                    id="is-usd"
                    checked={isUsd}
                  />
                  <label htmlFor="is-usd" className="text-sm font-medium text-gray-700">USD</label>
                </div>
              </div>
              <div className="h-80 w-[80%]">
                <CurrentOpportunityPipeline funnelType="sum" funnelData={sumFunnelData} isUsd={isUsd} />
              </div>
            </Card>
            <Card className="flex-1 flex flex-col justify-center items-center bg-white">
              <h1 className="m-4 mb-6 w-[95%]">Current Opportunity Pipeline (Count)</h1>
              <div className="h-80 w-[80%]">
                <CurrentOpportunityPipeline funnelType="count" funnelData={countFunnelData} />
              </div>
            </Card>
          </div>

          <div className="flex justify-center mb-12 mx-8 ml-20 mt-4">
            <Card className="flex-1 w-[768px] p-4 bg-white">
              <div className="flex justify-between items-center space-x-1">
                <h1 className="m-2 mb-6">Pipeline Details</h1>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={!!usd}
                    onCheckedChange={(value) => {
                      setUsd(value);
                    }}
                  />
                  <span>USD</span>
                </div>
              </div>
              <OpportunityDataTable data={displayedTopOpportunities} columns={opportunityDataColumns} isDetail />
            </Card>
          </div>
          <div className="flex justify-center mb-12 mx-8 ml-20 mt-4">
            <Card className="flex-1 w-[768px] p-4 bg-white">
              <div className="flex justify-between items-center space-x-1">
                <h1 className="m-2 mb-6">Focus Opportunities</h1>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={!!usd}
                    onCheckedChange={(value) => {
                      setUsd(value);
                    }}
                  />
                  <span>USD</span>
                </div>
              </div>
              <OpportunityDataTable data={displayedFocusOpportunities} columns={opportunityDataColumns} />
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales-analysis" className="bg-[var(--csgray)]">
          <div className="mx-8 ml-20 mb-2 flex flex-col md:flex-row gap-2">
            <div className="flex flex-col gap-2 md:w-1/4 w-full">
              {orderBookingData?.map((data) => {
                const companySummary = companySummaryData.find(c => c.company === data.company);
                return (
                  <OrderBookingFYTD
                    key={data.company}
                    company={data.company}
                    usdValue={companySummary?.adjustedUsdTotal || 0}
                    localValue={companySummary?.adjustedLocalTotal || 0}
                    isGroup={false}
                  />
                );
              })}
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-2 justify-center">
              <div className="md:w-[30%] w-full flex flex-col gap-2">
                <div className="h-[250px]"> {/* Fixed height for OrderBookingFYTD */}
                  <OrderBookingFYTD
                    key="group"
                    company="Consyst Group"
                    usdValue={companySummaryData.find(c => c.company === "Consyst Group")?.adjustedUsdTotal || 0}
                    localValue={companySummaryData.find(c => c.company === "Consyst Group")?.adjustedLocalTotal || 0}
                    isGroup={true}
                  />
                </div>

                <div className="h-[250px]"> {/* Same fixed height for DonutChart */}
                  <DonutChart countrySummaryData={countrySummaryData} />
                </div>
              </div>

              <div className="md:w-[70%] w-full">
                <Card className="h-full p-4 bg-white">
                  <p className="text-sm font-semibold text-gray-700 mb-5 text-center">Monthly Order Booking Trends</p>
                  <div className="h-[300px]">
                    <MonthlyOrderBookingChart data={monthlyOrderBookingData} />
                  </div>
                </Card>
              </div>
            </div>

          </div>
          <div className="mx-8 ml-20 flex justify-center">
            <OrderBookingPerformance
              orderBookingData={orderBookingData}
              groupValue={orderBookingGroupedValueUSD}
              orderSummaryData={orderSummaryData}
              companySummaryData={companySummaryData}
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

export default SalesDashboard;