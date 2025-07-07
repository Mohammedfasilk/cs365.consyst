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
  SheetClose,
} from "../UI/Sheet";
import { useToast } from "../../Hooks/use-toast";
import { useSessionUser } from "../../Hooks/useSessionUser";
import { Button } from "../UI/Button";
import { CircleCheckIcon, CircleXIcon, Plus } from "lucide-react";
import { MonthPickerComponent } from "../UI/MonthPickerComponent";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../UI/Form";
import { Textarea } from "../UI/TextArea";
import { Input } from "../UI/Input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../UI/Tabs";
import { Flag } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";
import { ChooseProject } from "../Project-manage/ChooseProject";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../UI/Dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "../UI/Card";
import { ChooseScheduleProjects } from "./ChooseScheduleProjects";
import {
  setSelectedScheduleProjectName,
  setIsOpen,
  setSelectedMonth,
} from "../../Redux/Slices/scheduleSheetslice";
import axios from "axios";

const ScheduleSheet = ({ fetchData }) => {
  const [schedule, setSchedule] = useState(null);
  const dispatch = useDispatch();
  const sessionUser = useSessionUser();
  const selectedScheduleProjectName = useSelector(
    (state) => state.scheduleSheet?.selectedScheduleProjectName
  );
  const scheduleStatus = useSelector((state) => state.scheduleSheet?.selectedScheduleStatus);
  const selectedMonth = useSelector(
    (state) => state.scheduleSheet?.selectedMonth
  );
  const isOpen = useSelector((state) => state.scheduleSheet?.isOpen);
  console.log(selectedMonth);

  const [milestones, setMilestones] = useState([]);
  const [tabValue, setTabValue] = useState("details");
  const [progress, setProgress] = useState(0);
  const [prevProgress, setPrevProgress] = useState(0);
  const { toast } = useToast();

  // Initialize milestone states for form fields
  const [milestoneStates, setMilestoneStates] = useState([]);

  // Track which milestone cards are open
  const [openCards, setOpenCards] = useState([]);

  // When milestones change, initialize milestoneStates and openCards
  useEffect(() => {
    // If API returns { timeline: [...] }, extract timeline
    let ms = milestones;
    if (milestones && milestones.timeline) {
      ms = milestones.timeline;
    }
    if (
      Array.isArray(ms) &&
      ms.length > 0 &&
      (milestoneStates.length === 0 || isOpen)
    ) {
      setMilestoneStates(
        ms.map((m, idx) =>
          milestoneStates[idx] ? { ...milestoneStates[idx], ...m } : { ...m }
        )
      );
      setOpenCards(Array(ms.length).fill(false));
    } else if (!ms || ms.length === 0) {
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
    setMilestoneStates(
      milestoneStates.map((m, i) => (i === idx ? { ...m, [field]: value } : m))
    );
  };

  // Handle progress change for a milestone
  const handleProgressChange = (idx, value) => {
    setMilestoneStates(
      milestoneStates.map((m, i) => (i === idx ? { ...m, progress: value } : m))
    );
  };

  async function onSubmit() {
    if(scheduleStatus === "approved") {
       toast({
            title: "Error: Approved Schedules Cannot Be Edited",
            description: "There was an error saving the schedule.",
            variant: "destructive",
            icon: <CircleXIcon className="mr-4" color="red" />,
          });
      return;
    }
    if (!selectedScheduleProjectName) {
 
      toast({
            title: "Schedule Not Saved",
            description: "There was an error saving the schedule.",
            variant: "destructive",
            icon: <CircleXIcon className="mr-4" color="red" />,
          });
      return;
    }
    if (!selectedMonth) {
      toast({
        title: "No month selected",
        description: "Please select a month before saving the schedule.",
        variant: "destructive",
        icon: <CircleXIcon className="mr-4" color="red" />,
      });

      return;
    }
    try {
      const payload = {
        project_name: selectedScheduleProjectName,
        month:selectedMonth,
        milestones: milestoneStates,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/timeline/saveSchedules`,
        payload
      );
      toast({
                title: "Schedule saved!",
                description: `Milestones for ${payload.project_name} (${payload.month}) have been saved successfully.`,
                icon: <CircleCheckIcon className="mr-4" color="green" />,
              });
      if (fetchData) fetchData();
      // Optionally, refetch milestones to update UI
      // fetchMilestones();
    } catch (error) {
      toast({
        title: "Failed to save schedule",
        description: error?.response?.data?.error || error.message,
        variant: "destructive",
      });
    }
  }

  // useEffect(() => {
  //   if (selectedSchedule) {
  //     form.reset({
  //       milestone: selectedSchedule.milestone || "",
  //       progressNotes: selectedSchedule.progressNotes || "",
  //       risksIssues: selectedSchedule.risksIssues || "",
  //       nextSteps: selectedSchedule.nextSteps || "",
  //     });
  //   }
  // }, [selectedSchedule]);

  // Remove the useEffect that listens to isOpen for reset/clear logic
  // Instead, handle open/close logic in onOpenChange
  // const handleSheetOpenChange = (open) => {
  //   dispatch(setIsOpen(open));
  //   if (open) {

  //   } else {
  //     form.reset({
  //       milestone: "",
  //       progressNotes: "",
  //       risksIssues: "",
  //       nextSteps: "",
  //     });
  //     setProgress(0);
  //     setPrevProgress(0);
  //     setTabValue("details");
  //     dispatch(setSelectedScheduleProjectName(""));
  //    // Do NOT clear selectedMonth here
  //   }
  // };

  // Ensure progress and dropdown are cleared when form is reset
  useEffect(() => {
    const subscription = form.watch((values, { name, type }) => {
      if (name === undefined && type === undefined) {
        setProgress(0);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

 useEffect(() => {
  const fetchMilestones = async () => {
    try {
      const params = { project_name: selectedScheduleProjectName };
      if (selectedMonth) {
        params.month = selectedMonth;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/timeline`,
        params
      );

      const data = res.data;

      if (selectedMonth && data?.schedule?.milestones) {
        const currentMilestones = data.schedule.milestones;
        const previousMilestones = data.previous_schedule?.milestones || [];

       const milestonesWithPrevProgress = currentMilestones.map((m) => {
  if (!data.previous_schedule) {
    return {
      ...m,
      prevProgress: 0, // or null, or undefined
    };
  }

  const previousMilestones = data.previous_schedule.milestones || [];
  const match = previousMilestones.find(
    (p) => (p.milestone && p.milestone === m.milestone) || (p.task && p.task === m.task)
  );

  return {
    ...m,
    prevProgress: match?.progress || 0,
  };
});


        setMilestones(milestonesWithPrevProgress);
      } else if (data.timeline) {
        setMilestones(data.timeline);
      } else {
        setMilestones([]);
      }
    } catch (error) {
      console.error("Error fetching milestones:", error);
      setMilestones([]);
    }
  };

  fetchMilestones();
}, [selectedScheduleProjectName, selectedMonth]);


  // Clear form and milestone states when month changes
  useEffect(() => {
    form.reset({
      milestone: "",
      progressNotes: "",
      risksIssues: "",
      nextSteps: "",
    });
    setMilestoneStates([]);
    setOpenCards([]);
  }, [selectedMonth]);

  // Helper to get clamped milestone duration for the selected month
  function getClampedDuration(milestone, selectedMonth) {
    if (
      !selectedMonth ||
      typeof selectedMonth !== "string" ||
      !selectedMonth.includes("-")
    ) {
      return { start: milestone.startDate, end: milestone.endDate };
    }
    // Parse dates
    const msStart = new Date(milestone.startDate);
    const msEnd = new Date(milestone.endDate);
    const [year, month] = selectedMonth.split("-").map(Number);
    const monthStart = new Date(year, month - 1, 1);
    const monthEnd = new Date(year, month, 0); // last day of month
    // Clamp start
    const start =
      msStart >= monthStart && msStart <= monthEnd ? msStart : monthStart;
    // Clamp end
    const end = msEnd >= monthStart && msEnd <= monthEnd ? msEnd : monthEnd;
    // If milestone doesn't overlap, return nulls
    if (end < monthStart || start > monthEnd) return { start: null, end: null };
    // Format as YYYY-MM-DD
    const fmt = (d) => (d ? d.toISOString().slice(0, 10) : null);
    return { start: fmt(start), end: fmt(end) };
  }

  // Helper to format date as YYYY-MM-DD, even if input is ISO string
  const fmt = (d) => {
    if (!d) return null;
    if (typeof d === "string") {
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
    if (typeof val === "string" && val.includes("-")) return val.slice(0, 7); // already YYYY-MM
    const d = new Date(val);
    if (!isNaN(d)) {
      return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
    }
    return null;
  }

  // Helper to get only the duration within the selected month
  function getMonthOnlyDuration(milestone, selectedMonth) {
    const monthStr = getYearMonth(selectedMonth);
    if (!monthStr) return { start: null, end: null, days: null };
    const [year, month] = monthStr.split("-").map(Number);
    // Parse dates
    const msStart = new Date(milestone.startDate);
    const msEnd = new Date(milestone.endDate);
    // Use UTC to avoid timezone issues
    const monthStart = new Date(Date.UTC(year, month - 1, 1));
    const monthEnd = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999)); // last ms of last day
    if (msEnd < monthStart || msStart > monthEnd)
      return { start: null, end: null, days: null };
    const start =
      msStart > monthEnd ? null : msStart > monthStart ? msStart : monthStart;
    const end = msEnd < monthStart ? null : msEnd < monthEnd ? msEnd : monthEnd;
    if (!start || !end) return { start: null, end: null, days: null };
    // Calculate total days (inclusive)
    const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return { start: fmt(start), end: fmt(end), days };
  }

  // Utility to get current month in YYYY-MM format
  function getCurrentMonth() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  }

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(value) => {
        if (!value) {
          dispatch(setSelectedScheduleProjectName(""));
          dispatch(setSelectedMonth(null));
        }
        dispatch(setIsOpen(value));
      }}
    >
      <SheetTrigger asChild>
        <Button className="bg-[var(--csred)] hover:bg-[var(--csred)]/90">
          <Plus className="mr-2 h-4 w-4" /> Add Schedule
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[800px] overflow-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Schedule</SheetTitle>
          <div className="mb-4">
            <ChooseScheduleProjects />
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
                <Button
                  className="bg-[var(--csblue)] hover:bg-[var(--csblue)]/90 px-8"
                  type="button"
                  onClick={onSubmit}
                >
                  Save
                </Button>
              </div>
              <div className="mb-4">
                <MonthPickerComponent
                  selectedMonth={selectedMonth}
                  onSelect={(date) => {
                                        const options = { month: "short", year: "numeric" };
                                        if (date) {
                                          const formatted = date.toLocaleDateString(
                                            "en-US",
                                            options
                                          );
                                          dispatch(setSelectedMonth(formatted));
                                        }
                                      }}
                />
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
                      <h2 className="text-base font-semibold mb-2">
                        {m.task || m.milestone}
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Duration: {m.start_date || "-"} &mdash;{" "}
                        {m.end_date || "-"}
                      </p>
                    </CardHeader>
                    {open && (
                      <CardContent className="p-2">
                        <div className="mt-5 grid w-full grid-cols-1 gap-6">
                          <div>
                            <label className="mb-2 block font-medium">
                              Previous Progress
                            </label>
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
                            <span className="ml-2 text-sm font-semibold">
                              {m.prevProgress}%
                            </span>
                          </div>
                          <div>
                            <label className="mb-2 block font-medium">
                              Progress
                            </label>
                            <Slider.Root
                              className="relative flex items-center select-none touch-none w-[600px] h-5"
                              min={0}
                              max={100}
                              step={1}
                              value={[m.progress || 0]}
                              onValueChange={([v]) =>
                                handleProgressChange(idx, v)
                              }
                            >
                              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                                <Slider.Range className="absolute bg-blue-500 rounded-full h-2" />
                              </Slider.Track>
                              <Slider.Thumb className="block w-5 h-5 bg-white border border-blue-500 rounded-full shadow focus:outline-none" />
                            </Slider.Root>
                            <span className="ml-2 text-sm font-semibold">
                              {m.progress || 0}%
                            </span>
                          </div>
                          <div>
                            <label className="mb-2 block font-medium">
                              Progress Notes
                            </label>
                            <Textarea
                              placeholder="Progress Notes"
                              value={m.progressNotes}
                              onChange={(e) =>
                                handleMilestoneChange(
                                  idx,
                                  "progressNotes",
                                  e.target.value
                                )
                              }
                              className="min-h-[100px] max-w-[600px] w-full"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block font-medium">
                              Risks & Issues
                            </label>
                            <Textarea
                              placeholder="Risks & Issues"
                              value={m.risksIssues}
                              onChange={(e) =>
                                handleMilestoneChange(
                                  idx,
                                  "risksIssues",
                                  e.target.value
                                )
                              }
                              className="min-h-[100px] max-w-[600px] w-full"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block font-medium">
                              Next Steps
                            </label>
                            <Textarea
                              placeholder="Next Steps"
                              value={m.nextSteps}
                              onChange={(e) =>
                                handleMilestoneChange(
                                  idx,
                                  "nextSteps",
                                  e.target.value
                                )
                              }
                              className="min-h-[100px] max-w-[600px] w-full"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block font-medium">
                              Key Deliverables
                            </label>
                            <Textarea
                              placeholder="Key Deliverables"
                              value={m.key_deliverables || ""}
                              onChange={(e) =>
                                handleMilestoneChange(
                                  idx,
                                  "key_deliverables",
                                  e.target.value
                                )
                              }
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
