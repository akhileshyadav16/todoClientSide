import { useEffect, useState } from "react";
import { RiAddFill } from "react-icons/ri";
import toast from "react-hot-toast";

function CreateTask({ refresh, setRefresh }) {
  const [formData, setFormData] = useState({ title: "", description: "" });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      console.log("base url in create to do:",process.env.REACT_APP_BASE_URL)
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/createTodo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log("response in create to do :",response);
      if (response.ok) {
        toast.success("Task added in To-do List");
        setRefresh(!refresh);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("onsubmit", error.message);

    }
  };

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  return (
    <div className=" flex flex-col justify-center items-center w-11/12 mx-auto text-slate-400 h-full py-20 ">
      <h1 className="font-bold font-serif text-center w-full text-2xl sm:text-4xl md:text-5xl">
        Create To-do Task
      </h1>
      <p className="text-lg sm:text-xl text-center font-semibold my-4">
        Stay organized, stay productive
      </p>
      <form
        className="flex flex-col gap-4 w-full justify-center items-center py-5"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col sm:flex-row mt-6 gap-2 justify-center mx-1 sm:mx-auto w-11/12 sm:w-3/4 md:w-3/5 ">
          <label
            className="text-md sm:text-lg w-fit my-auto font-semibold font-serif"
            htmlFor="title"
          >
            Title Name :{" "}
          </label>
          <input
            className="bg-slate-500  bg-opacity-20 w-11/12 sm:w-3/4 md:w-3/5 h-10 pl-2 shadow-[0_0_5px_rgba(100,116,139,0.3)] border border-slate-500 rounded-lg flex-grow outline-none"
            type="text"
            name="title"
            id="title"
            onChange={changeHandler}
            value={formData.title}
            placeholder="Enter task name"
          />
        </div>
        <div className="flex flex-col sm:flex-row mt-2 justify-center mx-2 w-11/12 sm:w-4/5 md:w-3/5 gap-1">
          <label
            className="text-md sm:text-lg w-fit font-semibold font-serif pt-1 "
            htmlFor="description"
          >
            Description :
          </label>
          <textarea
            className="bg-slate-500 bg-opacity-20 pt-1  pl-2 shadow-[0_0_5px_rgba(100,116,139,0.3)] border border-slate-500 rounded-lg flex-grow w-11/12 sm:w-3/4 md:w-3/5  h-32 outline-none"
            name="description"
            id="description"
            value={formData.description}
            onChange={changeHandler}
            placeholder="Enter task description"
          />
        </div>
        <button className="bg-slate-600 mt-10 flex items-center justify-center gap-1 bg-opacity-20 h-12 w-3/5 whitespace-nowrap sm:w-32 pl-4 shadow-[0_0_5px_rgba(100,116,139,0.3)] border border-slate-500 rounded-xl font-semibold font-sans">
          Add Task
          <RiAddFill className="h-7 w-7" />
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
