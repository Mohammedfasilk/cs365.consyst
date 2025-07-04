import { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  TextField,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import GanttTaskTable from "./GanttTaskTable";
import { Button } from "../UI/Button";
import { Form } from "../UI/Form";
import axios from "axios";
import { useSelector } from "react-redux";

function EnhancedTableToolbar({ onNewTaskClick }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mb: 5,
        }}
      >
        <h1>Project Plan</h1>
        <Button onClick={onNewTaskClick} className="px-8">
          New Milestone
        </Button>
      </Box>
    </Box>
  );
}

export default function TaskDrawer() {
  const selectedProject = useSelector(
    (state) => state.selectedProject.selectedProjectName
  );

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const form = useForm({
    defaultValues: {
      milestone: "",
      start_date: "",
      end_date: "",
      duration: 1,
      weight: 0,
      key_deliverables: "",
    },
  });

  const { register, handleSubmit, watch, setValue, reset } = form;

  const startDate = watch("start_date");
  const endDate = watch("end_date");
  const duration = watch("duration");
  const weight = watch("weight");
  const [editTask, setEditTask] = useState(null);

  // This ref tracks what triggered the update to avoid loops.
  // 'none' means no sync in progress.
  // 'date' means startDate/endDate changed, so update duration
  // 'duration' means duration changed, so update endDate
  const syncingRef = useRef("none");

  // debounce timer refs
  const durationTimeoutRef = useRef(null);
  const dateTimeoutRef = useRef(null);

  const getTasks = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/timeline/tasks`,
        { project_name: selectedProject }
      );
      // Use API fields directly (milestone, weight, etc)
      setTasks(res.data?.timeline || []);
    } catch (err) {
      console.error("Failed to fetch tasks:", err.message);
    }
  };

  useEffect(() => {
    if (selectedProject) getTasks();
  }, [selectedProject]);

  // When startDate or endDate changes -> update duration (debounced)
  useEffect(() => {
    if (!startDate || !endDate) return;

    if (syncingRef.current === "duration") {
      syncingRef.current = "none";
      return;
    }

    if (dateTimeoutRef.current) clearTimeout(dateTimeoutRef.current);

    dateTimeoutRef.current = setTimeout(() => {
      const start = new Date(startDate);
      const end = new Date(endDate);

      let diff = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
      if (diff < 1) diff = 1;

      if (diff !== duration) {
        syncingRef.current = "date";
        setValue("duration", diff, { shouldValidate: true, shouldDirty: true });
      }
    }, 300); // wait 300ms before syncing duration

    return () => clearTimeout(dateTimeoutRef.current);
  }, [startDate, endDate, setValue]); // Remove duration from dependency array

  // When duration changes -> update endDate (debounced)
  useEffect(() => {
    if (!startDate || !duration) return;

    if (syncingRef.current === "date") {
      syncingRef.current = "none";
      return;
    }

    if (durationTimeoutRef.current) clearTimeout(durationTimeoutRef.current);

    durationTimeoutRef.current = setTimeout(() => {
      const start = new Date(startDate);
      const newEnd = new Date(start);

      newEnd.setDate(start.getDate() + parseInt(duration) - 1);

      const formattedNewEnd = newEnd.toISOString().split("T")[0];

      if (formattedNewEnd !== endDate) {
        syncingRef.current = "duration";
        setValue("end_date", formattedNewEnd, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }, 300); // wait 300ms before syncing endDate

    return () => clearTimeout(durationTimeoutRef.current);
  }, [duration, startDate, endDate, setValue]);

  const handleRowClick = (task) => {
    setEditTask(task);
    setDrawerOpen(true);
    reset({
      milestone: task.milestone || "",
      start_date: task.start_date?.split("T")[0] || "",
      end_date: task.end_date?.split("T")[0] || "",
      duration: task.duration || 1,
      weight: typeof task.weight === 'number' ? task.weight : 0,
      key_deliverables: task.key_deliverables || "",
    });
  };

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/timeline/task-update`,
        {
          project_name: selectedProject,
          timeline: {
            milestone: data.milestone,
            start_date: data.start_date,
            end_date: data.end_date,
            duration: data.duration,
            weight: data.weight,
            key_deliverables: data.key_deliverables,
          },
        }
      );
      reset();
      setEditTask(null);
      setDrawerOpen(false);
      getTasks();
      
    } catch (err) {
      console.log("Error saving task", err);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Paper sx={{ width: "100%", height: "100%" }}>
        <EnhancedTableToolbar
          onNewTaskClick={() => {
            setEditTask(null);
            reset({
              milestone: "",
              start_date: "",
              end_date: "",
              duration: 1,
              weight: 0,
              key_deliverables: "",
            });
            setDrawerOpen(true);
          }}
        />
        <GanttTaskTable
          task={tasks}
          onRowClick={handleRowClick}
          refetch={getTasks}
        />
      </Paper>

      {drawerOpen && (
        <Box
          className="bg-gray-50 border border-gray-200"
          sx={{
            position: "absolute",
            borderRadius: "5px",
            top: 10,
            right: 0,
            width: 320,
            height: "98%" ,// Increased from 90% to 98% for more vertical space
            borderLeft: "1px solid #ddd",
            boxShadow: "-4px 0 10px rgba(0,0,0,0.1)",
            zIndex: 10,
            p: 2,
            backgroundColor: "white",
          }}
        >
          <Stack spacing={2} sx={{ height: "100%" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">
                {editTask ? "Edit Milestone" : "New Milestone"}
              </Typography>
              <IconButton onClick={() => setDrawerOpen(false)} size="small">
                <CloseIcon />
              </IconButton>
            </Box>

            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="Milestone"
                  fullWidth
                  {...register("milestone", { required: true })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  {...register("start_date", { required: true })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="End Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  {...register("end_date", { required: true })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Duration (days)"
                  type="number"
                  inputProps={{ min: 1 }}
                  fullWidth
                  {...register("duration", { required: true, min: 1 })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Milestone Weight (%)"
                  type="number"
                  inputProps={{ min: 0, max: 100 }}
                  fullWidth
                  {...register("weight", { required: true, min: 0, max: 100 })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Key Deliverables"
                  multiline
                  minRows={3}
                  fullWidth
                  {...register("key_deliverables")}
                  sx={{ mb: 2 }}
                />

                <Box mt="auto" className="flex justify-center">
                  <Button className="px-8" type="submit">
                    Save Milestone
                  </Button>
                </Box>
              </form>
            </Form>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
