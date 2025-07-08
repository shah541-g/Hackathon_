import React, { useState } from "react";
import { createProject } from "../API/projects";
import toast from "react-hot-toast";

const ProjectModal = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
  });
  const [isPending,setIsPending] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preV) => ({
      ...preV,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true)
    const response = await createProject(formData);

    if (response?.data) {
      toast.success(response?.data?.message);
      document.getElementById("create-project-modal").close();
      setFormData({ projectName: "", description: "" });
      setIsPending(false)
    } else {
      toast.error("Failed to create project");
    }
  };

  return (
    <dialog id="create-project-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Create Project</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Project Name"
            className="input input-bordered w-full"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Project Description"
            rows={4}
            className="textarea textarea-bordered w-full"
            required
          />

          <div className="modal-action flex justify-between items-center">
            <button type="submit" className="btn btn-primary">
                {isPending?   <span className="loading loading-spinner text-secondary" /> :"Create"}
            </button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ProjectModal;
