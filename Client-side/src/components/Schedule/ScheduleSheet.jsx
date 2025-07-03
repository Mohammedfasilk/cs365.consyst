import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose
} from "../UI/Sheet";
import { useToast } from "../../Hooks/use-toast";
import { useSessionUser } from "../../Hooks/useSessionUser";
import { Button } from "../UI/Button";
import { Plus } from "lucide-react";
import { MonthPickerComponent } from "../UI/MonthPickerComponent";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../UI/Form";
import { Textarea } from "../UI/TextArea";
import { Input } from "../UI/Input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../UI/Tabs";
import { Flag } from "lucide-react";
import * as Slider from '@radix-ui/react-slider';
import { ChooseProject } from "../Project-manage/ChooseProject";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../UI/Dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "../UI/Card";
import { ChooseScheduleProjects } from "./ChooseScheduleProjects";
import { setSelectedScheduleProjectName, setSelectedScheduleProject, setIsOpen } from "../../Redux/Slices/scheduleSheetslice";

const ScheduleSheet = ({ fetchData }) => {
  const [schedule, setSchedule] = useState(null);
  const dispatch = useDispatch();
  const sessionUser = useSessionUser();
  const selectedSchedule = useSelector((state) => state.selectedSchedule?.schedule);
  const selectedScheduleName = useSelector((state) => state.selectedSchedule?.selectedScheduleName);
  const isOpen = useSelector((state) => state.selectedSchedule?.isOpen);
  const isSaved = useSelector((state) => state.selectedSchedule?.isSaved);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [tabValue, setTabValue] = useState("details");
  const [progress, setProgress] = useState(0);
  const [prevProgress, setPrevProgress] = useState(0);
  const { toast } = useToast();

  // Milestones array should come from props or Redux, not hardcoded here
  const milestones = [
    {
      milestone: "Design Phase",
      startDate: "2025-07-15",
      endDate: "2025-09-10",
 
      progress: 30,
      prevProgress: 10
    },
    {
      milestone: "Development Phase",
      startDate: "2025-07-11",
      endDate: "2025-07-25",
      progressNotes: "API integration started.",
      risksIssues: "API documentation delays.",
      nextSteps: "Complete core module implementation.",
      progress: 15,
      prevProgress: 0
    },
    {
      milestone: "Testing & QA",
      startDate: "2025-07-26",
      endDate: "2025-07-31",
      progressNotes: "Test cases drafted.",
      risksIssues: "Test environment setup pending.",
      nextSteps: "Begin functional testing.",
      progress: 0,
      prevProgress: 0
    }
  ];

  // Initialize milestone states for form fields
  const [milestoneStates, setMilestoneStates] = useState([]);

  // Track which milestone cards are open
  const [openCards, setOpenCards] = useState([]);

  // When milestones change, initialize milestoneStates and openCards
  useEffect(() => {
    if (milestones.length > 0 && (milestoneStates.length === 0 || isOpen)) {
      setMilestoneStates(
        milestones.map((m, idx) =>
          milestoneStates[idx]
            ? { ...milestoneStates[idx], ...m }
            : { ...m }
        )
      );
      setOpenCards(Array(milestones.length).fill(false));
    } else if (milestones.length === 0) {
      setMilestoneStates([]);
      setOpenCards([]);
    }
  }, [milestones, isOpen]);

  // Reset openCards when sheet is closed
  useEffect(() => {
    if (!isOpen) {
      setOpenCards([]);
    }
  }, [isOpen]);

  const formSchema = z.object({
    milestone: z.string(),
    progressNotes: z.string(),
    risksIssues: z.string(),
    nextSteps: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      milestone: "",
      progressNotes: "",
      risksIssues: "",
      nextSteps: "",
    },
  });

  // Handle field change for a milestone
  const handleMilestoneChange = (idx, field, value) => {
    setMilestoneStates(milestoneStates.map((m, i) => i === idx ? { ...m, [field]: value } : m));
  };

  // Handle progress change for a milestone
  const handleProgressChange = (idx, value) => {
    setMilestoneStates(milestoneStates.map((m, i) => i === idx ? { ...m, progress: value } : m));
  };

  async function onSubmit() {
    const payload = {
      month: selectedMonth,
      milestones: milestoneStates,
    };
    console.log(payload);
    // Send payload to backend or handle as needed
  }

  useEffect(() => {
    if (selectedSchedule) {
      form.reset({
        milestone: selectedSchedule.milestone || "",
        progressNotes: selectedSchedule.progressNotes || "",
        risksIssues: selectedSchedule.risksIssues || "",
        nextSteps: selectedSchedule.nextSteps || "",
      });
    }
  }, [selectedSchedule]);

  // Remove the useEffect that listens to isOpen for reset/clear logic
  // Instead, handle open/close logic in onOpenChange
  const handleSheetOpenChange = (open) => {
    dispatch(setIsOpen(open));
    if (!open) {
      form.reset({
        milestone: "",
        progressNotes: "",
        risksIssues: "",
        nextSteps: "",
      });
      setSelectedMonth(null);
      setProgress(0);
      setPrevProgress(0);
      setTabValue("details");
      dispatch(setSelectedScheduleProjectName(""));
      dispatch(setSelectedScheduleProject({}));
    }
  };

  // Ensure progress and dropdown are cleared when form is reset
  useEffect(() => {
    const subscription = form.watch((values, { name, type }) => {
      if (name === undefined && type === undefined) {
        setProgress(0);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {}, [selectedScheduleName]);

  // Helper to get clamped milestone duration for the selected month
  function getClampedDuration(milestone, selectedMonth) {
    if (!selectedMonth || typeof selectedMonth !== 'string' || !selectedMonth.includes('-')) {
      return { start: milestone.startDate, end: milestone.endDate };
    }
    // Parse dates
    const msStart = new Date(milestone.startDate);
    const msEnd = new Date(milestone.endDate);
    const [year, month] = selectedMonth.split('-').map(Number);
    const monthStart = new Date(year, month - 1, 1);
    const monthEnd = new Date(year, month, 0); // last day of month
    // Clamp start
    const start = msStart >= monthStart && msStart <= monthEnd ? msStart : monthStart;
    // Clamp end
    const end = msEnd >= monthStart && msEnd <= monthEnd ? msEnd : monthEnd;
    // If milestone doesn't overlap, return nulls
    if (end < monthStart || start > monthEnd) return { start: null, end: null };
    // Format as YYYY-MM-DD
    const fmt = d => d ? d.toISOString().slice(0, 10) : null;
    return { start: fmt(start), end: fmt(end) };
  }

  // Helper to format date as YYYY-MM-DD, even if input is ISO string
  const fmt = d => {
    if (!d) return null;
    if (typeof d === 'string') {
      // Try to parse string
      const parsed = new Date(d);
      if (!isNaN(parsed)) return parsed.toISOString().slice(0, 10);
      return d;
    }
    return d.toISOString().slice(0, 10);
  };

  // Helper to get YYYY-MM from a Date object or string
  function getYearMonth(val) {
    if (!val) return null;
    if (typeof val === 'string' && val.includes('-')) return val.slice(0, 7); // already YYYY-MM
    const d = new Date(val);
    if (!isNaN(d)) {
      return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
    }
    return null;
  }

  // Helper to get only the duration within the selected month
  function getMonthOnlyDuration(milestone, selectedMonth) {
    const monthStr = getYearMonth(selectedMonth);
    if (!monthStr) return { start: null, end: null, days: null };
    const [year, month] = monthStr.split('-').map(Number);
    // Parse dates
    const msStart = new Date(milestone.startDate);
    const msEnd = new Date(milestone.endDate);
    // Use UTC to avoid timezone issues
    const monthStart = new Date(Date.UTC(year, month - 1, 1));
    const monthEnd = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999)); // last ms of last day
    if (msEnd < monthStart || msStart > monthEnd) return { start: null, end: null, days: null };
    const start = msStart > monthEnd ? null : (msStart > monthStart ? msStart : monthStart);
    const end = msEnd < monthStart ? null : (msEnd < monthEnd ? msEnd : monthEnd);
    if (!start || !end) return { start: null, end: null, days: null };
    // Calculate total days (inclusive)
    const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return { start: fmt(start), end: fmt(end), days };
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button className="bg-[var(--csred)] hover:bg-[var(--csred)]/90">
          <Plus className="mr-2 h-4 w-4" /> Add Schedule
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[800px] overflow-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Schedule</SheetTitle>
          <div className="mb-4">
            <ChooseScheduleProjects/>
          </div>
          <Tabs value={tabValue} onValueChange={setTabValue} className="mb-4">
            <TabsList>
              <TabsTrigger value="details">
                <Flag className="mr-2 h-4 w-4" /> Milestone
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Schedule Information</h2>
                <Button className="bg-[var(--csblue)] hover:bg-[var(--csblue)]/90 px-8" type="button" onClick={onSubmit}>
                  Save
                </Button>
              </div>
              <div className="mb-4">
                <MonthPickerComponent onSelect={setSelectedMonth} selectedMonth={selectedMonth} />
              </div>
              {milestoneStates.map((m, idx) => {
                const open = openCards[idx];
                const handleCardToggle = () => {
                  setOpenCards((prev) => {
                    const updated = [...prev];
                    updated[idx] = !updated[idx];
                    return updated;
                  });
                };
                return (
                  <Card key={idx} className="mb-6 p-2">
                    <CardHeader
                      className="cursor-pointer select-none p-2"
                      onClick={handleCardToggle}
                    >
                      <h2 className="text-base font-semibold mb-2">{m.milestone}</h2>
                      {(() => {
                        const duration = getMonthOnlyDuration(m, selectedMonth);
                        if (!duration.start && !duration.end) {
                          return <p className="text-xs text-gray-500 mt-1">Not in selected month</p>;
                        }
                        return (
                          <p className="text-xs text-gray-500 mt-1">
                            Duration: {duration.start} &mdash; {duration.end} ({duration.days} days)
                          </p>
                        );
                      })()}
                    </CardHeader>
                    {open && (
                      <CardContent className="p-2">
                        <div className="mt-5 grid w-full grid-cols-1 gap-6">
                          <div>
                            <label className="mb-2 block font-medium">Previous Progress</label>
                            <Slider.Root
                              className="relative flex items-center select-none touch-none w-[600px] h-5 opacity-60 cursor-not-allowed"
                              min={0}
                              max={100}
                              step={1}
                              value={[m.prevProgress]}
                              onValueChange={() => {}} // Disable seeking
                              disabled
                            >
                              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                                <Slider.Range className="absolute bg-green-500 rounded-full h-2" />
                              </Slider.Track>
                              <Slider.Thumb className="block w-5 h-5 bg-white border border-green-500 rounded-full shadow focus:outline-none" />
                            </Slider.Root>
                            <span className="ml-2 text-sm font-semibold">{m.prevProgress}%</span>
                          </div>
                          <div>
                            <label className="mb-2 block font-medium">Progress</label>
                            <Slider.Root
                              className="relative flex items-center select-none touch-none w-[600px] h-5"
                              min={0}
                              max={100}
                              step={1}
                              value={[m.progress]}
                              onValueChange={([v]) => handleProgressChange(idx, v)}
                            >
                              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                                <Slider.Range className="absolute bg-blue-500 rounded-full h-2" />
                              </Slider.Track>
                              <Slider.Thumb className="block w-5 h-5 bg-white border border-blue-500 rounded-full shadow focus:outline-none" />
                            </Slider.Root>
                            <span className="ml-2 text-sm font-semibold">{m.progress}%</span>
                          </div>
                          <div>
                            <label className="mb-2 block font-medium">Progress Notes</label>
                            <Textarea
                              placeholder="Progress Notes"
                              value={m.progressNotes}
                              onChange={e => handleMilestoneChange(idx, "progressNotes", e.target.value)}
                              className="min-h-[100px] max-w-[600px] w-full"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block font-medium">Risks & Issues</label>
                            <Textarea
                              placeholder="Risks & Issues"
                              value={m.risksIssues}
                              onChange={e => handleMilestoneChange(idx, "risksIssues", e.target.value)}
                              className="min-h-[100px] max-w-[600px] w-full"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block font-medium">Next Steps</label>
                            <Textarea
                              placeholder="Next Steps"
                              value={m.nextSteps}
                              onChange={e => handleMilestoneChange(idx, "nextSteps", e.target.value)}
                              className="min-h-[100px] max-w-[600px] w-full"
                            />
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </TabsContent>
          </Tabs>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ScheduleSheet;
