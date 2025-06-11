import { useEffect, useState } from "react";
import { useTask } from "../hooks/useTasks";
import type { task } from "../types/type";

function IndexItems() {
  const { getTasks } = useTask();
  const [tasks, setTasks] = useState<Array<task>>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response);
        console.log("Tasks:", response);
      } catch (error: any) {
        console.error("Error:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>description</th>
          <th>due_date</th>
          <th>status_id</th>
          <th>status</th>
          <th>owner_id</th>
          <th>owner</th>
          <th>created_at</th>
          <th>updated_at</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.due_date}</td>
            <td>{task.status_id}</td>
            <td>{task.status}</td>
            <td>{task.owner_id}</td>
            <td>{task.owner}</td>
            <td>{task.created_at}</td>
            <td>{task.updated_at}</td>
            <td>
              <button >Edit</button>
              <button >Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default IndexItems;
