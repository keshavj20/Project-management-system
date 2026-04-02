import React, { useEffect, useState } from "react";
import BasicButtons from "../../components/button";
import { useSearchParams } from "react-router-dom";
import useApi from "../../Hooks/useApi";
import Cookies from "js-cookie";
import Form from "../../components/Form";
import CustomizedTables from "../../components/table";
function ProjectDetail() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");
  const [openForm, setOpenForm] = useState(false);
  const [project, setProject] = useState({});
  const [allocations, setAllocations] = useState([]);
  const [users, setusers] = useState([]);

 
  const { fetchData: allocateUserToProject, loading } = useApi(
    "/api/ProjectAllocation",
    "post",
    false,
    {},
    (res, err) => {
      if (res) {
        alert("Project successfully allocated to user!");
        fetchAllocations();
      } else {
        alert("Allocation failed.");
      }
    }
  );

  const { fetchData: fetchAllocations } = useApi(
    `/api/ProjectAllocation?project_id=${projectId}`,
    "get",
    false,
    {},
    (res) => {
      if (res) {
        setAllocations(res);
      }
    }
  );
  const { fetchData: fetchProject } = useApi(
    `/api/Project?_id=${projectId}`,
    "get",
    false,
    {},
    (res) => {
      if (res) {
        if (res && Array.isArray(res) && res.length > 0) {
          setProject(res[0]);
        }
      }
    }
  );

  const { fetchData: fetchAllUser } = useApi(
    "/api/user",
    "get",
    false,
    {},
    (res, err) => {
      if (res) {
        setusers(res);
      }
    }
  );

  useEffect(() => {
    if (projectId) {
      fetchAllocations();
      fetchProject();
    }
    fetchAllUser();
  }, [projectId]);

  const handleAllocateSubmit = (formdata) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const payload = {
      project_id: projectId,
      user_id: formdata.user_id,
      time_period: {
        from: formdata.from,
        to: formdata.to,
      },
      created_by: currentUser._id,
    };
    allocateUserToProject(payload);
  };


    const tableConfig={
          headers: [
    { key: "name", label: "Employee" },
    { key: "from", label: "From" },
    { key: "to", label: "To" },
  ],
  rows:allocations.length > 0
      ? allocations.map((alloc) => {
          const matchedUser = users.find((user) => user._id === alloc.user_id);

          return {
            name: matchedUser?.name || "Unknown",
            from: new Date(alloc.time_period.from).toLocaleDateString(),
            to: new Date(alloc.time_period.to).toLocaleDateString(),
          };
        })
      : [
          {
            name: "No user allocated",
            from: "-",
            to: "-",
          },
        ],
        }
  const formconfig = {
    open: openForm,
    handleClose: () => setOpenForm(false),
    heading: "Allocate Project to User",
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
                from: toISO(today),
                to: toISO(end),
              };
            },
            Custom: () => ({
              from: toISO(today),
              to: "",
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
        dependsOn: ["from", "to"],
        options: [{ label: "This Week" }, { label: "Custom" }],
      },
      {
        label: "User Name",
        name: "user_id",
        type: "autocomplete",

        options: users.map((user) => ({
          label: user.name,
          value: user._id,
        })),
      },
      {
        label: "From",
        name: "from",
        type: "date",
        focused: true,
      },
      {
        label: "To",
        name: "to",
        type: "date",
        focused: true,
      },
    ],
    onsubmit: handleAllocateSubmit,
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>{project?.title}</h2>

        <div style={{ marginBottom: 20 }}>
          <BasicButtons
            buttontext={loading ? "Allocating..." : "Allocate Project"}
            onClick={() => setOpenForm(true)}
          />
        </div>
      </div>

      <Form {...formconfig} />
      <CustomizedTables {...tableConfig} />
    </div>
  );
}

export default ProjectDetail;
