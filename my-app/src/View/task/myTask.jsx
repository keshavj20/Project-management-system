import React, { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import Cookies from "js-cookie";
import CustomizedTables from "../../components/table";

const headers = [
  { key: "name", label: "name" },
  { key: "description", label: "Description" },
  { key: "estimated_hours", label: "Estimated Hours" },
  { key: "status", label: "Status" },
];

function MyTask() {
  const [tasks, setTasks] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user)
  const userId = user?.id;

  const { fetchData: fetchUserTasks } = useApi(
    `/api/task?assigned_to=${userId}`,
    "get",
    false,
    {},
    (res, err) => {
      if (res) {
        setTasks(res);
      }
    }
  );

  useEffect(() => {
    if (userId) fetchUserTasks();
  }, [userId]);

  return (
    <div>
      <h2>My Tasks</h2>
      <CustomizedTables headers={headers} rows={tasks} />
    </div>
  );
}

export default MyTask;
