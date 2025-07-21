const Project = require("../Models/ProjectModel");

exports.updateTimelineTask = async (req, res) => {
  try {
    const { project_name, timeline } = req.body;
    // Convert start_date and end_date to string (YYYY-MM-DD)
    const toDateString = (d) => {
      if (!d) return d;
      const date = new Date(d);
      if (!isNaN(date)) return date.toISOString().slice(0, 10);
      return d;
    };
    const {
      id,
      milestone,
      start_date,
      end_date,
      duration,
      key_deliverables,
      weight,
    } = timeline;
    const startDateStr = toDateString(start_date);
    const endDateStr = toDateString(end_date);

    const updateTask = await Project.findOneAndUpdate(
      {
        project_name,
        "timeline.milestone": milestone,
      },
      {
        $set: {
          "timeline.$.start_date": startDateStr,
          "timeline.$.end_date": endDateStr,
          "timeline.$.duration": duration,
          "timeline.$.key_deliverables": key_deliverables,
          "timeline.$.weight": weight,
        },
      },
      { new: true }
    );

    // 2. If month not found, push new data
    if (!updateTask) {
      const pushTask = await Project.findOneAndUpdate(
        { project_name },
        {
          $push: { timeline: timeline },
        },
        { new: true }
      );
      return res.status(200).json(pushTask);
    }

    return res.status(200).json(updateTask);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Failed to update timeline" });
  }
};

exports.getTimelineTasks = async (req, res) => {
  const { project_name } = req.body;
  try {
    const projectData = await Project.findOne(
      { project_name: project_name },
      {
        timeline: 1,
      }
    );
    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json({ error: "Failed to get timeline" });
  }
};

exports.deleteTimelineTasks = async (req, res) => {
  const { task, project_name } = req.body;
  try {
    const updatedTask = await Project.findOneAndUpdate(
      { project_name },
      { $pull: { timeline: { task } } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "timeline not found" });
    }

    res.status(200).json({
      message: `task deleted successfully.`,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to Delete Task" });
  }
};

exports.getTimelineProjects = async (req, res) => {
  try {
    const { search = "" } = req.body || {};
    // Build search filter for project_name (case-insensitive)
    const filter = {
      timeline: { $exists: true, $not: { $size: 0 } },
    };
    if (search && search.trim() !== "") {
      filter.project_name = { $regex: search, $options: "i" };
    }
    const projects = await Project.find(filter, {
      project_name: 1,
      project_title: 1,
    });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to get projects with timeline" });
  }
};

const getPreviousMonth = (monthStr) => {
  const date = new Date(monthStr + " 01");
  date.setMonth(date.getMonth() - 1);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const prevMonth = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${prevMonth} ${year}`;
};

exports.fetchTasks = async (req, res) => {
  try {
    const { project_name, month } = req.body;

    if (!project_name) {
      return res.status(400).json({ error: "project_name is required" });
    }

    if (month) {
      const prevMonth = getPreviousMonth(month);

      // Get both current and previous month schedules
      const project = await Project.findOne(
        {
          project_name,
          schedules: {
            $elemMatch: { month },
          },
        },
        { schedules: 1, _id: 0 }
      );

      if (project && project.schedules && project.schedules.length > 0) {
        const currentSchedule = project.schedules.find(
          (s) => s.month === month
        );
        const prevSchedule = project.schedules.find(
          (s) => s.month === prevMonth
        );

        return res.status(200).json({
          month,
          schedule: currentSchedule || null,
          previous_month: prevMonth,
          previous_schedule: prevSchedule || null,
        });
      }
    }

    // If no month or no schedules found, return the timeline
    const project = await Project.findOne(
      { project_name },
      { timeline: 1, schedules: 1, _id: 0 }
    );

    // if (!project) {
    //   return res.status(404).json({ error: 'Project not found' });
    // }
    const prevMonth = getPreviousMonth(month);
    const currentTimeline = project.timeline;
    const prevSchedule = project.schedules.find((s) => s.month === prevMonth);

    return res.status(200).json({
      month,
      timeline: currentTimeline || null,
      previous_month: prevMonth,
      previous_schedule: prevSchedule || null,
    });
  } catch (err) {
    console.error("Fetch Tasks Error:", err);
    res.status(500).json({ error: "Failed to fetch project tasks/schedules" });
  }
};

exports.saveSchedules = async (req, res) => {
  try {
    const { project_name, month, milestones } = req.body;
    if (!project_name || !month || !Array.isArray(milestones)) {
      return res
        .status(400)
        .json({ error: "project_name, month, and milestones are required" });
    }
    // Upsert the schedule for the given month
    const update = await Project.findOneAndUpdate(
      { project_name, "schedules.month": month },
      {
        $set: {
          "schedules.$.milestones": milestones,
        },
      },
      { new: true }
    );
    if (update) {
      return res.status(200).json(update);
    }
    // If not found, push a new schedule
    const push = await Project.findOneAndUpdate(
      { project_name },
      {
        $push: {
          schedules: { month, milestones },
        },
      },
      { new: true }
    );
    return res.status(200).json(push);
  } catch (err) {
    console.error("Save Schedules Error:", err);
    res.status(500).json({ error: "Failed to save schedules" });
  }
};

// Fetch schedules as a flat array: { project_name, month, status, stage }
exports.fetchSchedules = async (req, res) => {
  try {
    const { project_name } = req.body || {};
    const filter = project_name ? { project_name } : {};
    const projects = await Project.find(filter, {
      project_name: 1,
      project_description: 1,
      stage: 1,
      schedules: 1,
      _id: 0,
    });
    // Flatten all schedules into a single array with project_name and project_description
    const result = [];
    projects.forEach((p) => {
      (p.schedules || []).forEach((s) => {
        result.push({
          project_name: p.project_name,
          stage: p.stage,
          project_description: p.project_description,
          month: s.month,
          status: s.status,
        });
      });
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch schedules" });
  }
};

exports.deleteSchedule = async (req, res) => {
  const { month, project_name } = req.body;
  try {
    const updatedProject = await Project.findOneAndUpdate(
      { project_name },
      { $pull: { schedules: { month } } },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    res.status(200).json({
      message: `Schedule for ${month} deleted successfully.`,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to Delete Schedule" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { project_name, monthlySchedule } = req.body;
    const { month, status } = monthlySchedule;
    // 1. Try to update the specific month's data

    const updateProject = await Project.findOneAndUpdate(
      {
        project_name,
        "schedules.month": month,
      },
      {
        $set: {
          "schedules.$.status": status,
        },
      },
      { new: true }
    );

    return res.status(200).json(updateProject);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
};

exports.fetchScheduleProjects = async (req, res) => {
  try {
    const { search } = req.body;

    const query = {
      schedules: { $exists: true, $not: { $size: 0 } }, // Only projects with this field
    };

    if (search?.trim()) {
      query.project_title = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    const projects = await Project.find(query)
      .select("project_title project_name -_id")
      .limit(10);
    console.log(projects);

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching Project:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Projects.",
      error: error.message,
    });
  }
};

function getMonthsRange(startDate, endDate) {
  const months = [];
  const current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  const last = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

  while (current <= last) {
    months.push(
      current.toLocaleString("en-US", { month: "short", year: "numeric" })
    );
    current.setMonth(current.getMonth() + 1);
  }

  return months;
}

exports.fetchProgressReport = async (req, res) => {
  try {
    const { project_name } = req.body || {};
    if (!project_name)
      return res.status(400).json({ error: "Project name is required" });

    const project = await Project.findOne({ project_name });
    if (!project) return res.status(404).json({ error: "Project not found" });

    const schedules = project.schedules || [];

    let earliest = null;
    let latest = null;
    const allScheduleMonths = new Set();

    // Get earliest/latest from milestones and schedule months
    schedules.forEach((schedule) => {
      const [monStr, yearStr] = (schedule.month || "").split(" ");
      if (monStr && yearStr) {
        const schedDate = new Date(`${monStr} 1, ${yearStr}`);
        allScheduleMonths.add(
          schedDate.toLocaleString("en-US", { month: "short", year: "numeric" })
        );

        if (!earliest || schedDate < earliest) earliest = schedDate;
        if (!latest || schedDate > latest) latest = schedDate;
      }

      (schedule.milestones || []).forEach((milestone) => {
        const start = new Date(milestone.start_date);
        const end = new Date(milestone.end_date);
        if (!earliest || start < earliest) earliest = start;
        if (!latest || end > latest) latest = end;
      });
    });

    if (!earliest || !latest) return res.status(200).json([]);

    const allMonths = getMonthsRange(earliest, latest);
    allScheduleMonths.forEach((m) => {
      if (!allMonths.includes(m)) allMonths.push(m);
    });

    allMonths.sort((a, b) => new Date(a) - new Date(b)); // Ensure sorted

    const monthMap = {};

    // --- ACTUAL CALCULATION ---
    schedules.forEach((schedule) => {
      const scheduleMonth = schedule.month;
      const [schedMonStr, schedYearStr] = scheduleMonth.split(" ");
      const schedMonIdx = new Date(
        `${schedMonStr} 1, ${schedYearStr}`
      ).getMonth();
      const schedYear = parseInt(schedYearStr);

      (schedule.milestones || []).forEach((milestone) => {
        const weight = parseFloat(milestone.weight) || 0;
        const progress = parseFloat(milestone.progress) || 0;
        const actual = (progress / 100) * weight;

        // Just use the schedule's month directly
        if (!monthMap[scheduleMonth]) {
          monthMap[scheduleMonth] = { actual: 0, planned: 0 };
        }

        monthMap[scheduleMonth].actual += actual;
      });
    });

    // --- PLANNED CALCULATION ---
    const processedMilestones = new Set();
    schedules.forEach((schedule) => {
      (schedule.milestones || []).forEach((milestone) => {
        const milestoneKey = `${milestone.milestone}_${milestone.start_date}_${milestone.end_date}`;
        if (processedMilestones.has(milestoneKey)) return;
        processedMilestones.add(milestoneKey);

        const weight = parseFloat(milestone.weight) || 0;
        const startDate = new Date(milestone.start_date);
        const endDate = new Date(milestone.end_date);
        const duration = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

        let temp = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        const endMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

        while (temp <= endMonth) {
          const monthKey = temp.toLocaleString("en-US", {
            month: "short",
            year: "numeric",
          });

          const monthStart = new Date(temp.getFullYear(), temp.getMonth(), 1);
          const monthEnd = new Date(temp.getFullYear(), temp.getMonth() + 1, 0);

          const overlapStart = new Date(Math.max(startDate, monthStart));
          const overlapEnd = new Date(Math.min(endDate, monthEnd));

          const overlapDays = Math.max(
            0,
            (overlapEnd - overlapStart) / (1000 * 60 * 60 * 24) + 1
          );
          const proportionalWeight = (overlapDays / duration) * weight;

          if (!monthMap[monthKey]) {
            monthMap[monthKey] = { actual: 0, planned: 0 };
          }

          monthMap[monthKey].planned += proportionalWeight;
          temp.setMonth(temp.getMonth() + 1);
        }
      });
    });

    // Calculate cumulative planned values
    let cumulativePlanned = 0;
    const result = allMonths.map((month) => {
      const actualVal = monthMap[month]?.actual || 0;
      const plannedVal = monthMap[month]?.planned || 0;

      cumulativePlanned += plannedVal;

      return {
        month,
        actual: parseFloat(actualVal.toFixed(2)),
        planned: parseFloat(cumulativePlanned.toFixed(2)), // cumulative planned sum
      };
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Error in fetchProgressReport:", err);
    res.status(500).json({ error: "Failed to fetch project progress report" });
  }
};

exports.fetchProjectProgress = async (req, res) => {
  try {
    const { project_name } = req.body;

    const query = {
      project_name,
      schedules: { $exists: true, $not: { $size: 0 } },
    };

    const project = await Project.findOne(query).lean();

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or has no schedules.",
      });
    }

    const milestonesMap = new Map();
    const seenMilestones = new Set();
    const uniqueMilestoneNames = new Set();

    // Build milestone history from schedules
    for (const schedule of project.schedules) {
      const month = schedule.month;

      if (Array.isArray(schedule.milestones)) {
        for (const milestone of schedule.milestones) {
          const name =
            milestone.milestone || milestone.task || "Unnamed Milestone";

          uniqueMilestoneNames.add(name);

          if (!milestonesMap.has(name)) {
            milestonesMap.set(name, []);
          }

          milestonesMap.get(name).push({
            month,
            nextSteps: milestone.nextSteps || "",
            risksIssues: milestone.risksIssues || "",
            progressNotes: milestone.progressNotes || "",
            progress: milestone.progress || 0,
          });

          if (Number(milestone.progress) === 100 && !seenMilestones.has(name)) {
            seenMilestones.add(name);
          }
        }
      }
    }

    // Sort history by month (descending)
    const parseMonthString = (monthStr) => new Date(monthStr);
    const milestone_history = Array.from(milestonesMap.entries()).map(
      ([milestone, history]) => {
        const sortedHistory = history.sort(
          (a, b) => parseMonthString(b.month) - parseMonthString(a.month)
        );
        return { milestone, history: sortedHistory };
      }
    );

    // Calculate latest month progress
    const latestSchedule = project.schedules[project.schedules.length - 1];
    const latestMonth = latestSchedule?.month || "";
    let latestMonthActual = 0;

    if (latestSchedule && Array.isArray(latestSchedule.milestones)) {
      latestMonthActual = latestSchedule.milestones.reduce((acc, m) => {
        return acc + (Number(m.progress || 0) / 100) * Number(m.weight || 0);
      }, 0);
    }

    // ✅ total_project_days: from timeline earliest start to latest end
    let totalProjectDays = 0;
    let earliestStart = null;
    let latestEnd = null;

    if (Array.isArray(project.timeline) && project.timeline.length > 0) {
      for (const milestone of project.timeline) {
        const start = new Date(milestone.start_date);
        const end = new Date(milestone.end_date);

        if (!earliestStart || start < earliestStart) earliestStart = start;
        if (!latestEnd || end > latestEnd) latestEnd = end;
      }

      if (earliestStart && latestEnd) {
        const diffMs = latestEnd - earliestStart;
        totalProjectDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      }
    }

    // ✅ current_days: from earliest timeline start to latest schedule month last day
    let currentDays = 0;

    if (Array.isArray(project.timeline) && project.timeline.length > 0) {
      for (const milestone of project.timeline) {
        const start = new Date(milestone.start_date);
        if (!earliestStart || start < earliestStart) earliestStart = start;
      }

      const today = new Date();
      if (earliestStart && today) {
        const diffMs = today - earliestStart;
        currentDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      }
    }

    const atRiskMilestones = [];
    const onTrustMilestones = [];
    const allMilestones = new Set();

    const now = new Date();

    for (const milestone of project.timeline) {
      const name = milestone.milestone;
      allMilestones.add(name);

      const start = new Date(milestone.start_date);
      const end = new Date(milestone.end_date);

      const totalDuration = (end - start) / (1000 * 60 * 60 * 24); // in days
      const elapsed = (now - start) / (1000 * 60 * 60 * 24); // in days

      const elapsedPercent = Math.min((elapsed / totalDuration) * 100, 100);

      const history =
        project?.milestone_history?.find((m) => m.milestone === name)
          ?.history || [];
      const latestProgress =
        history.sort((a, b) => new Date(b.month) - new Date(a.month))[0]
          ?.progress || 0;

      if (latestProgress >= 100) {
        continue;
      } else if (latestProgress < 80 && elapsedPercent >= 80) {
        atRiskMilestones.push(name);
      }
    }

    // Now build the watchlist
    const watchlist = Array.from(allMilestones).filter(
      (name) =>
        !onTrustMilestones.includes(name) && !atRiskMilestones.includes(name)
    );

    // ✅ Response
    res.status(200).json({
      project_name: project.project_name,
      total_milestones: uniqueMilestoneNames.size,
      milestone_delivered: seenMilestones.size,
      project_progress: parseFloat(latestMonthActual.toFixed(2)),
      milestone_history,
      planned_days: totalProjectDays,
      current_days: currentDays,
      at_risk: atRiskMilestones?.length,
      on_trust: onTrustMilestones?.length,
      watch_list: watchlist?.length,
    });
  } catch (error) {
    console.error("Error fetching project progress:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve project progress.",
      error: error.message,
    });
  }
};
