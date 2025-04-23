import React, { useState, useEffect } from "react";

const CourseOfferings = () => {
  const [courseTypes, setCourseTypes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [selectedCourseType, setSelectedCourseType] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedCourseTypes = JSON.parse(localStorage.getItem("courseTypes")) || [];
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const storedOfferings = JSON.parse(localStorage.getItem("courseOfferings")) || [];

    setCourseTypes(storedCourseTypes);
    setCourses(storedCourses);
    setOfferings(storedOfferings);
  }, []);

  useEffect(() => {
    localStorage.setItem("courseOfferings", JSON.stringify(offerings));
  }, [offerings]);

  const handleSubmit = () => {
    if (!selectedCourseType || !selectedCourse) return;

    const newOffering = {
      courseType: selectedCourseType,
      course: selectedCourse,
    };

    if (editIndex !== null) {
      const updated = [...offerings];
      updated[editIndex] = newOffering;
      setOfferings(updated);
      setEditIndex(null);
    } else {
      setOfferings([...offerings, newOffering]);
    }

    setSelectedCourse("");
    setSelectedCourseType("");
  };

  const handleEdit = (index) => {
    setSelectedCourseType(offerings[index].courseType);
    setSelectedCourse(offerings[index].course);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = [...offerings];
    updated.splice(index, 1);
    setOfferings(updated);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Course Offerings</h1>
      <div className="flex flex-col gap-4 mb-4">
        <select
          className="border rounded p-2"
          value={selectedCourseType}
          onChange={(e) => setSelectedCourseType(e.target.value)}
        >
          <option value="">Select Course Type</option>
          {courseTypes.map((ct, i) => (
            <option key={i} value={ct.name}>
              {ct.name}
            </option>
          ))}
        </select>

        <select
          className="border rounded p-2"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map((c, i) => (
            <option key={i} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          {editIndex !== null ? "Update" : "Add"} Offering
        </button>
      </div>

      <ul className="divide-y border rounded">
        {offerings.map((o, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2"
          >
            <span>{`${o.courseType} - ${o.course}`}</span>
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

export default CourseOfferings;
