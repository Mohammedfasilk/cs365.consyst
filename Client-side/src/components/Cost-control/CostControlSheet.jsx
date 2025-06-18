// import React from "react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "../UI/Sheet";
import { Button } from "../UI/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../UI/Tabs";
import { Label } from "../UI/Label";
import { Plus, SquareChartGantt } from "lucide-react";
// import { ChooseProject } from "@/components/ChooseProject";
import { MonthPickerComponent } from "../UI/MonthPickerComponent";
import MonthlyBudgetTable from "./MonthlyBudgetTable";
import ChooseCostControlProject from "./ChooseCostControlProject";
// import { MonthlyBudgetTable } from "@/components/MonthlyBudgetTable";

export function CostControlSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-[var(--csred)] hover:bg-[var(--csred)]/90">
          <Plus className="mr-2 h-4 w-4" /> Add Cost Control
        </Button>
      </SheetTrigger>

      <SheetContent className="min-w-[800px] overflow-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Cost Control</SheetTitle>

          {<ChooseCostControlProject/>}

          <div>
            <Tabs defaultValue="cost-control-details">
              <TabsList>
                <TabsTrigger value="cost-control-details">
                  <SquareChartGantt className="mr-2 h-4 w-4" /> Cost Control Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cost-control-details">
                <div className="flex justify-between items-center">
                  <h1 className="font-bold">Monthly Cost Control Sheet</h1>
                  <Button className="bg-[var(--csblue)] hover:bg-[var(--csblue)]/90 px-8" type="submit">
                    Save
                  </Button>
                </div>

                <Label className="mt-4 block">Month</Label>

                <div className="mt-2 mb-6">
                  <MonthPickerComponent />
                </div>

                <div className="budget-sheet mt-4">
                  <MonthlyBudgetTable/>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
