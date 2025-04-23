import React, { useState, useEffect } from "react";

const CourseType = () => {
  const [courseTypes, setCourseTypes] = useState([]);
  const [name, setName] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("courseTypes")) || [];
    setCourseTypes(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("courseTypes", JSON.stringify(courseTypes));
  }, [courseTypes]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    if (editIndex !== null) {
      const updated = [...courseTypes];
      updated[editIndex].name = name;
      setCourseTypes(updated);
      setEditIndex(null);
    } else {
      setCourseTypes([...courseTypes, { name }]);
    }
    setName("");
  };

  const handleEdit = (index) => {
    setName(courseTypes[index].name);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = [...courseTypes];
    updated.splice(index, 1);
    setCourseTypes(updated);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Course Types</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border rounded p-2 w-full"
          placeholder="Enter course type"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <ul className="divide-y border rounded">
        {courseTypes.map((ct, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2"
          >
            <span>{ct.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(index)}
                className="text-green-600 font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-600 font-medium"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseType;
