import React, { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import Cookies from "js-cookie";
import Form from "../../components/Form";
import CustomizedTables from "../../components/table";
import BasicButtons from "../../components/button";
import { Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Pencil } from "lucide-react";

// Mutable config for remark form
const remarkConfig = {
  open: false,
  task: null,
  newStatus: "",
};

// Mutable config for tabs
const tabConfig = {
  currentTab: "Pending",
  tabs: [
    { label: "Pending", value: "Pending" },
    { label: "Completed", value: "Completed" },
  ],
};

function MyTask() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [project, setProject] = useState(null);
  const [editing, setediting] = useState(null);

  const [, forceUpdate] = useState(0);
  const triggerUpdate = () => forceUpdate((v) => v + 1);

  const { fetchData: fetchTasks } = useApi(
    `/api/task?related_project=${projectId}`,
    "get",
    false,
    {},
    (res) => setTasks(res || [])
  );

  const { fetchData: fetchUsers } = useApi(
    "/api/user",
    "get",
    false,
    {},
    (res) => setUsers(res || [])
  );

  const { fetchData: fetchProject } = useApi(
    `/api/Project?_id=${projectId}`,
    "get",
    false,
    {},
    (res) => {
      if (res && Array.isArray(res) && res.length > 0) {
        setProject(res[0]);
      }
    }
  );

  const { fetchData: createTask } = useApi(
    "/api/task",
    "post",
    false,
    {},
    (res) => {
      if (res) {
        setOpenForm(false);
        fetchTasks();
      }
    }
  );

  const { fetchData: updateTask } = useApi(
    "/api/task",
    "put",
    false,
    {},
    (res) => {
      if (res) {
        setOpenForm(false);
        setediting(null);
        fetchTasks();
      }
    }
  );

  useEffect(() => {
    fetchTasks();
    fetchUsers();
    fetchProject();
  }, [projectId]);

  const handleTaskSubmit = (formdata) => {
    const dataWithProject = { ...formdata, related_project: projectId };
    if (editing) {
      updateTask({ ...dataWithProject, _id: editing._id });
    } else {
      const { _id, ...newTaskData } = dataWithProject;
      createTask(newTaskData);
    }
  };

  const handleEditTask = (task) => {
    setediting(task);
    setOpenForm(true);
  };

  const handleStatusChange = (taskId, newStatus) => {
    const task = tasks.find((t) => t._id === taskId);
    if (!task) return;

    if (newStatus === "Completed") {
      remarkConfig.open = true;
      remarkConfig.task = task;
      remarkConfig.newStatus = newStatus;
      triggerUpdate();
    } else {
      updateTask({ ...task, status: newStatus });
    }
  };

  // Calculate task counts
  const pendingTasks = tasks.filter(task => task.status !== "Completed");
  const completedTasks = tasks.filter(task => task.status === "Completed");

  const tableconfig = {
    headers: [
      { key: "name", label: "Name" },
      { key: "description", label: "Description" },
      { key: "estimated_hours", label: tabConfig.currentTab==="Completed"?"Completion Hours":"Estimated hours" },
      { key: "assigned_to", label: "Assigned To" },
      { key: "status", label: "Status" },
      { key: "update", label: tabConfig.currentTab === "Completed" ? "Remark" : "Action" },
    ],
  };

  const filteredTasks = tasks.filter((task) => {
    if (tabConfig.currentTab === "Completed") return task.status === "Completed";
    return task.status !== "Completed";
  });

  const formattedTasks =
    filteredTasks.length === 0
      ? [{ name: "No Task available" }]
      : filteredTasks.map((task) => {
          const assignedUser =
            users.find((u) => u._id === task.assigned_to)?.name || "Unknown";
          const isCompletedTab = tabConfig.currentTab === "Completed";

          return {
            name: task.name,
            description: task.description,
            estimated_hours: task.estimated_hours,
            assigned_to: assignedUser,
            status: isCompletedTab ? (
              <span style={{ color: "green", fontWeight: 500 }}>
                {task.status}
              </span>
            ) : (
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  backgroundColor: "#fff",
                }}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
              </select>
            ),
            update: isCompletedTab ? (
              <div style={{ color: "#4caf50", whiteSpace: "pre-wrap" }}>
                {task.remark || <span style={{ color: "#999" }}>No Remark</span>}
              </div>
            ) : (
              <span
                style={{ cursor: "pointer", color: "#1976d2" }}
                onClick={() => handleEditTask(task)}
              >
                <Pencil size={18} />
              </span>
            ),
          };
        });

  const formconfig = {
    open: openForm,
    handleClose: () => setOpenForm(false),
    fields: [
      {
        label: "Task Name",
        name: "name",
        type: "text",
        value: editing?.name || "",
      },
      {
        label: "Description",
        name: "description",
        type: "text",
        value: editing?.description || "",
      },
      {
        label: "Assign To",
        name: "assigned_to",
        type: "autocomplete",
        options: users.map((user) => ({
          label: user.name,
          value: user._id,
        })),
        value: editing?.assigned_to || "",
      },
      {
        label: "Estimated Hours",
        name: "estimated_hours",
        type: "number",
        value: editing?.estimated_hours || "",
      },
      {
        label: "Status",
        name: "status",
        type: "select",
        options: [
          { label: "Not Started", value: "Not Started" },
          { label: "In Progress", value: "In Progress" },
          { label: "On Hold", value: "On Hold" },
          { label: "Completed", value: "Completed" },
        ],
        value: editing?.status || "",
      },
    ],
    heading: editing ? "Update the task" : "Add New Task",
    onsubmit: handleTaskSubmit,
  };

  const remarkFormConfig = {
    open: remarkConfig.open,
    handleClose: () => {
      remarkConfig.open = false;
      remarkConfig.task = null;
      remarkConfig.newStatus = "";
      triggerUpdate();
    },
    heading: "Add Completion Remark",
    fields: [
      {
        label: "Remark",
        name: "remark",
        type: "text",
      },{
        label:"Completion hours",
        name:"completion_hours",
       type:"number",
      }
    ],

    onsubmit: (formData) => {
      const updatedTask = {
        ...remarkConfig.task,
        status: remarkConfig.newStatus,
estimated_hours:formData.completion_hours,
        remark: formData.remark,
      };
      updateTask(updatedTask);
      remarkConfig.open = false;
      remarkConfig.task = null;
      remarkConfig.newStatus = "";
      triggerUpdate();
    },
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Typography variant="h6">Tasks in {project?.title}</Typography>
        <BasicButtons buttontext="Add Task" onClick={() => setOpenForm(true)} />
      </div>

    
      <div style={{ marginBottom: 16, display: "flex", gap: 16 }}>
        <button
          onClick={() => {
            tabConfig.currentTab = "Pending";
            triggerUpdate();
          }}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            backgroundColor: tabConfig.currentTab === "Pending" ? "#1976d2" : "#fff",
            color: tabConfig.currentTab === "Pending" ? "#fff" : "#000",
            cursor: "pointer",
          }}
        >
          Pending ({pendingTasks.length})
        </button>
        <button
          onClick={() => {
            tabConfig.currentTab = "Completed";
            triggerUpdate();
          }}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            backgroundColor: tabConfig.currentTab === "Completed" ? "#1976d2" : "#fff",
            color: tabConfig.currentTab === "Completed" ? "#fff" : "#000",
            cursor: "pointer",
          }}
        >
          Completed ({completedTasks.length})
        </button>
      </div>

      <CustomizedTables {...tableconfig} rows={formattedTasks} />

      <Form formData={editing} {...formconfig} />
      <Form {...remarkFormConfig} />
    </div>
  );
}

export default MyTask;