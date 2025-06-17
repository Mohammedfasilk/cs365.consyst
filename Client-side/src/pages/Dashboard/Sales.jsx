import { useEffect, useState } from "react";
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

function SalesPipeline() {
  const [topOpportunities, setTopOpportunities] = useState([]);
  const dispatch = useDispatch()
  const {settings} = useSelector((state)=>state.settings)

    useEffect(() => {
    if (!settings || Object.keys(settings).length == 0) {
      dispatch(fetchSettings())
    }
  }, [dispatch, settings])

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_CS365_URI
          }/api/sales-pipeline/top-opportunities`
        );

        setTopOpportunities(res.data);
      } catch (error) {
        console.error("Error fetching Top Opportunities:", error);
      }
    };

    fetchData();
  }, []);

  const [sumFunnelData, setSumFunnelData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_CS365_URI}/api/sales-pipeline/sum`
        );

        setSumFunnelData(res.data);
      } catch (error) {
        console.error("Error fetching funnel Value:", error);
      }
    };

    fetchData();
  }, []);

  const [countFunnelData, setCountFunnelData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_CS365_URI}/api/sales-pipeline/count`
        );

        setCountFunnelData(res.data);
      } catch (error) {
        console.error("Error fetching funnel Count:", error);
      }
    };

    fetchData();
  }, []);

  const [orderBookingData, setOrderBookingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_CS365_URI}/api/sales-analysis`
        );

        setOrderBookingData(res.data);
      } catch (error) {
        console.error("Error fetching sales Order:", error);
      }
    };

    fetchData();
  }, []);

  function getOrderBookingGroupedValueUSD(orderBookingData) {

    const usdRates = {
      "CONSYST Digital Industries Pvt. Ltd": settings?.usdToinr,
      "CONSYST Technologies (India) Pvt. Ltd.": settings?.usdToinr,
      "CONSYST Middle East FZ-LLC": settings?.usdToaed,
    };

    let totalValue = 0;

    orderBookingData.map((item) => {
      const rate = usdRates[item.company];
      const valueInUSD = item.value / rate;

      totalValue += valueInUSD;
    });

    return totalValue;
  }
  const orderBookingGroupedValueUSD =
    getOrderBookingGroupedValueUSD(orderBookingData);

  const [monthlyOrderBookingData, setMonthlyOrderBookingData] = useState({
    dateList: [],
    valueList: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fyDate = settings?.currentFyStartDate;
        const usd = settings?.usdToinr;
        const aed = settings?.usdToaed;

        const response = await axios.post(
          `${
            import.meta.env.VITE_CS365_URI
          }/api/sales-analysis/order-booking-monthly`,
          {
            fyDate,
            usd,
            aed,
          }
        );

        setMonthlyOrderBookingData(response.data);
      } catch (error) {
        console.error("Error fetching monthly order booking data:", error);
      }
    };

    fetchData();
  }, []);

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

        <TabsContent
          value="sales-pipeline"
          className="bg-[var(--csgray)] w-full"
        >
          <div className="flex justify-center gap-2 ml-20 mx-8 mb-2">
            <Card className="flex-1 flex flex-col justify-center items-center">
              <h1 className="m-4 mb-6 w-[95%]">
                Current Opportunity Pipeline (Value)
              </h1>
              <div className="h-80 w-[80%]">
                <CurrentOpportunityPipeline
                  funnelType="sum"
                  funnelData={sumFunnelData}
                />
              </div>
            </Card>
            <Card className="flex-1 flex flex-col justify-center items-center">
              <h1 className="m-4 mb-6 w-[95%]">
                Current Opportunity Pipeline (Count)
              </h1>
              <div className="h-80 w-[80%]">
                <CurrentOpportunityPipeline
                  funnelType="count"
                  funnelData={countFunnelData}
                />
              </div>
            </Card>
          </div>
          <div className="flex justify-center mb-12 mx-8 ml-20">
            <Card className="flex-1 w-[768px] p-4">
              <h1 className="m-2 mb-6">Top Opportunities</h1>
              <OpportunityDataTable
                data={topOpportunities}
                columns={opportunityDataColumns}
              />
            </Card>
          </div>
        </TabsContent>

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
