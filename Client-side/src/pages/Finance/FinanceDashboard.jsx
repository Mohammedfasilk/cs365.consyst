import { useEffect, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Filter, Receipt, SquareChartGantt } from "lucide-react";
import axios from "axios";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/UI/Tabs";
import { Card, CardContent, CardTitle } from "../../components/UI/Card";
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
import MonthlyBillingChart from "../../components/Finance-dashboard/MonthlyBillingChart";
import BillingByPeriodChart from "../../components/Finance-dashboard/BillingByPeriodChart.jsx.jsx";
import { Label } from "../../components/UI/Label.jsx";

function FinanceDashboard() {
  useAuthRedirect();
  const dispatch = useDispatch();

  const { settings } = useSelector((state) => state.settings);

  const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);

  const [isChecked, setIsChecked] = useState(false);
  const [billingData, setBillingData] = useState([]);
  const [companySummaryData, setCompanySummaryData] = useState([]);
  const [countrySummaryData, setCountrySummaryData] = useState([]);
  const [monthlyBillingData, setMonthlyBillingData] = useState([]);
  const [quarterlyBillingData, setQuarterlyBillingData] = useState([]);
  const [tobeBilled, setTobeBilled] = useState();

  // Fetch settings if not already available
  useEffect(() => {
    if (!settings || Object.keys(settings).length === 0) {
      dispatch(fetchSettings());
    }
  }, [dispatch, settings]);

  const formatToShorthand = (num) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(2) + "K";
    return num?.toString();
  };

  // Fetch data only after settings are loaded
  useEffect(() => {
    if (!settings || Object.keys(settings).length === 0) return;

    const fetchData = async () => {
      setLoading(true);
      const base = import.meta.env.VITE_CS365_URI;

      try {
        const [billRes, countrySummaryRes, monthlyRes, quarterlyRes, toBeRes] =
          await Promise.all([
            axios.get(`${base}/api/finance/summary-by-company`),
            axios.get(`${base}/api/finance/summary-by-country`),
            axios.post(`${base}/api/finance/monthly-billed-summary`, {
              financialYear: settings?.currentFyStartDate,
            }),
            axios.post(`${base}/api/finance/quarterly-billed-summary`, {
              financialYear: settings?.currentFyStartDate,
            }),
            axios.post(`${base}/api/finance/to-be-billed`, {
              financialYear: settings?.currentFyStartDate,
            }),
          ]);

        setBillingData(billRes.data);
        setCountrySummaryData(countrySummaryRes.data);
        setMonthlyBillingData(monthlyRes.data);
        setQuarterlyBillingData(quarterlyRes.data);
        setTobeBilled(toBeRes.data);
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
    const company = companySummaryData.find((c) => c.company === companyName);
    return company ? company.total : 0;
  };
  // Calculate USD group value from company summary data
  const orderBookingGroupedValueUSD = useMemo(() => {
    return getCompanyUsdValue("Consyst Group");
  }, [companySummaryData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        <ScaleLoading size={60} />
      </div>
    );
  }
  // const summary = tobeBilled?.summary || [];
  const maxIndex = tobeBilled?.summary?.length - 1;

  const handlePrev = () => {
  setIndex((prev) => (prev > 0 ? prev - 1 : prev));
};

const handleNext = () => {
  setIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
};

  return (
    <div>
      <div className="mb-16 ml-20 mt-16 mx-8">
        <h1 className="text-2xl font-bold">Finance</h1>
      </div>

      <Tabs defaultValue="billing">
        <TabsList className="ml-20 mt-16">
          <TabsTrigger value="billing">
            <Receipt className="mr-2 h-4 w-4" /> Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="billing" className="bg-[var(--csgray)]">
          <div className="mx-8 ml-20 mb-2 flex flex-col md:flex-row gap-2">
            <div className="flex flex-col gap-2 md:w-1/4 w-full">
              {billingData
                .filter((c) => c.company !== "Consyst Group")
                ?.map((data) => {
                  return (
                    <OrderBookingFYTD
                      key={data.company}
                      company={data.company}
                      usdValue={data?.billingPlansTotalUSD || 0}
                      localValue={data?.billingPlansTotal || 0}
                      isBill
                    />
                  );
                })}
            </div>

            <div className="flex-1 flex md:flex-row gap-2 justify-center">
              <div className="md:w-[30%] w-full flex flex-col gap-2">
                <div className="h-[250px]">
                  {" "}
                  {/* Fixed height for OrderBookingFYTD */}
                  <OrderBookingFYTD
                    key="group"
                    company="Consyst Group"
                    usdValue={
                      billingData.find((c) => c.company === "Consyst Group")
                        ?.billingPlansTotalUSD || 0
                    }
                    // localValue={billingData.filter(c => c.company === "Consyst Group")?.billingPlansTotal || 0}
                    isGroup={true}
                    isBill
                  />
                </div>

                <div className="h-[250px]">
                  {/* Same fixed height for DonutChart */}
                  <DonutChart
                    isBill
                    countrySummaryData={countrySummaryData?.invoicedDataOnly}
                  />
                </div>
                <div className="h-[150px]">
                  {/* Same fixed height for DonutChart */}
                  <Card className="h-full bg-white p-5">
                    <CardTitle className="flex justify-between">
                      <h1 className="font-normal">To Be Billed</h1>

                      {/* <div className="flex items-center space-x-2">
                        <Switch
                          onCheckedChange={(val) => setIsChecked(val)}
                          checked={isChecked}
                        />
                        <Label>FY's</Label>
                      </div> */}
                    </CardTitle>
                    <div className="relative w-full flex items-center justify-center h-full">
                      <CardContent className="h-full flex items-center justify-center ">
                        {tobeBilled?.summary?.length > 0 ? (
                          <div className="flex items-center gap-4 w-full  justify-center">
                            <button
                              onClick={handlePrev}
                              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm rounded disabled:opacity-50"
                              disabled={index === 0}
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <div className="text-center">
                              <p className="text-sm text-gray-500">
                                {tobeBilled?.summary[index].financialYear}
                              </p>
                              <p className="font-medium text-lg text-[var(--csblue)]">
                                USD {formatToShorthand(tobeBilled?.summary[index].total)}
                              </p>
                            </div>
                            <button
                              onClick={handleNext}
                              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm rounded disabled:opacity-50"
                              disabled={index === maxIndex}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <p className="text-center font-medium text-gray-400">
                            No data
                          </p>
                        )}
                      </CardContent>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="md:w-[70%] w-full">
                <Card className="h-full bg-white p-5">
                  <p className=" text-gray-700 mb-10">
                    Monthly Billing Trends
                  </p>
                  <div className="h-full p-4 flex flex-col justify-center ">
                    <MonthlyBillingChart />
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="flex justify-center mx-8 ml-20 mb-12">
            <BillingByPeriodChart
              monthlydData={monthlyBillingData}
              quarterlyData={quarterlyBillingData}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default FinanceDashboard;
