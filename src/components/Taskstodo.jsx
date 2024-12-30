import { useEffect, useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";

function Taskstodo({ refresh }) {
  const [tasks, setTasks] = useState([]);
  const [complete, setComplete] = useState(false);
  const fetchAllTasks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/getTodos`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      setTasks(
        result.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    } catch (err) {
      console.log("error in fetching all tasks :", err.message);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, [tasks.length, refresh, complete]);

  const deleteHandler = async (_id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/deleteTodo/${_id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== _id));
        toast.success("Task Deleted successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.log("Something went wrong in deleting :" + err.message);
    }
  };

  const completeHandler = async (_id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/updateTodo/${_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        setComplete((prev) => !prev);
      }
    } catch (err) {
      console.log("something went wrong in complete :" + err.message);
    }
  };

  return (
    <div className="w-full py-10 ">
      <div>
        {tasks.length > 0 ? (
          <div className="flex flex-col w-11/12 sm:w-3/4 md:w-3/5 items-center  mx-auto gap-10">
            {tasks.map((task, index) => (
              <div
                className="border flex  border-slate-600 rounded-lg h-fit w-full hover:bg-slate-900 hover:transition-all duration-300"
                key={index}
              >
                <div className="w-5/6 flex flex-col gap-2 my-2 mx-4 sm:mx-6">
                  <div
                    className={`text-xl sm:text-2xl flex flex-col sm:flex-row gap-2 font-semibold ${task.completed && "line-through text-slate-500"
                      } font-serif `}
                  >
                    {" "}
                    {task.completed ? (
                      <MdOutlineCheckBox className="text-slate-400 mt-1"
                        onClick={() => completeHandler(task._id)}
                      />
                    ) : (
                      <MdCheckBoxOutlineBlank className="text-slate-400 mt-1"
                        onClick={() => completeHandler(task._id)}
                      />
                    )}{" "}
                    {task.title}
                  </div>
                  <div className="text-slate-400">{task.description}</div>
                  <div className="text-slate-600  text-xs">
                    Created at : {task.createdAt.split("T")[0]}
                  </div>
                </div>
                <div className="w-1/6 sm:w-16 flex items-center justify-center flex-grow">
                  <MdDeleteForever
                    onClick={() => deleteHandler(task._id)}
                    className="h-8 w-8 text-center  hover:bg-red-300 hover:bg-opacity-20 hover:text-rose-400 rounded-md hover:cursor-pointer duration-200"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-11/12 sm:w-3/4 md:w-3/5 mx-auto py-10  border border-slate-500 rounded-lg flex-col gap-4 items-center">
            <div>
              <FaClipboardList className="h-10 w-10" />
            </div>
            <div className="text-xl font-serif font-semibold">No tasks yet</div>
            <p className="text-center mx-2">Add your first task above to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Taskstodo;
