import React, { useEffect, useState } from "react";
import CustomizedTables from "../../components/table";
import FreeSolo from "../../components/input";
import BasicButtons from "../../components/button";
import { Typography } from "@mui/material";
import Form from "../../components/Form";
import Cookies from "js-cookie";
import useApi from "../../Hooks/useApi";
import { useNavigate } from "react-router-dom";

function MyProject() {
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const { fetchData: createProject } = useApi(
    "/api/Project",
    "post",
    true,
    {},
    (res) => {
      if (res) {
        handleCloseForm();
        getProjects();
      }
    }
  );

  const { fetchData: getProjects, data: projects } = useApi(
    "/api/Project",
    "get",
    true
  );
  useEffect(() => {
    getProjects();
    getAllocateProjects();
  }, []);
  const userProjects = (projects || [])
    .filter((project) => project.user_id?.toString() === user.id)
    .map((project) => ({
      ...project,
      start_date: new Date(project.start_date).toLocaleDateString(),
      end_date: new Date(project.end_date).toLocaleDateString(),
    }));
      const{fetchData:getAllocateProjects,data:allocatedProjects}=useApi(
    `/api/ProjectAllocation?user_id=${user.id}`,
    "get",
    true,
  )
   const allocatedUserProject=(allocatedProjects||[])
  
   .map((alloc)=>{
    const project=projects?.find((p)=>p._id===alloc.project_id);
    
    if(!project){
      return null;
    }     return {
      ...project,
      start_date: new Date(project.start_date).toLocaleDateString(),
      end_date: new Date(project.end_date).toLocaleDateString(),
    };
   })

  const tableConfig = {
    headers: [
      { key: "title", label: "Title" },
      { key: "description", label: "Description" },
      { key: "start_date", label: "Start Date" },
      { key: "end_date", label: "End Date" },
    ],
    rows:user.role==="user"?allocatedUserProject:userProjects,
    onRowClick: (row) => {
      navigate(`/my-project/detail/task?projectId=${row._id}`);
    },
  };

  // const handleOpenForm = () => setOpenForm(true);

  const handleFormSubmit = (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const payload = {
      ...data,
      created_by: user.id,
      user_id: user.id,
    };
    createProject(payload);
  };

  const formConfig = {
    open: openForm,
    handleClose: () => setOpenForm(false),
    heading: "Add Project",

    computations: [
      {
        name: "action_buttons",
        dependsOn: ["action_buttons"],
        compute: ({ selected }) => {
          const today = new Date();
          const toISO = (d) => d.toISOString().split("T")[0];

          const computeMap = {
            "This Week": () => {
              const dayOfWeek = today.getDay();
              const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
              const end = new Date(today);
              end.setDate(today.getDate() + daysUntilSunday);

              return {
                start_date: toISO(today),
                end_date: toISO(end),
              };
            },
            Custom: () => ({
              start_date: toISO(today),
              end_date: "",
            }),
          };

          return computeMap[selected]?.() ?? {};
        },
      },
    ],

    fields: [
      {
        name: "action_buttons",
        label: "",
        defaultSelected: "This Week",
        dependsOn: ["start_date", "end_date"],
        options: [{ label: "This Week" }, { label: "Custom" }],
      },
      {
        name: "start_date",
        label: "Start Date",
        type: "date",
        value: "",
        focused: true,
      },
      {
        name: "end_date",
        label: "End Date",
        type: "date",
        value: "",
        focused: true,
      },
      {
        name: "title",
        label: "Title",
        type: "text",
        value: "",
      },
      {
        name: "description",
        label: "Description",
        type: "text",
        value: "",
      },
    ],

    onsubmit: handleFormSubmit,
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <Typography variant="h6">Projects</Typography>
        <div style={{ marginLeft: "auto" }}>
          {user.role!=="user"&&(<BasicButtons buttontext="Add Project" onClick={() => setOpenForm(true)} />)}
        </div>
      </div>
      

      <div style={{ marginBottom: 20 }}>
        <FreeSolo inputtext="Enter project name" />
      </div>

      <CustomizedTables {...tableConfig} />
      <Form {...formConfig} />
    </div>
  );
}

export default MyProject;
