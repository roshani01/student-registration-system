import React, { useState } from "react";
import CourseType from "./components/CourseType";
import Course from "./components/Course";
import CourseOffering from "./components/CourseOffering";
import Registration from "./components/Registration";

function App() {
  const [view, setView] = useState("CourseType");

  const renderComponent = () => {
    switch (view) {
      case "Course":
        return <Course />;
      case "CourseOffering":
        return <CourseOffering />;
      case "Registration":
        return <Registration />;
      default:
        return <CourseType />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6 flex space-x-4 justify-center">
        <button
          className={`px-4 py-2 rounded ${
            view === "CourseType" ? "bg-blue-600 text-white" : "bg-white border"
          }`}
          onClick={() => setView("CourseType")}
        >
          Course Types
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "Course" ? "bg-blue-600 text-white" : "bg-white border"
          }`}
          onClick={() => setView("Course")}
        >
          Courses
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "CourseOffering" ? "bg-blue-600 text-white" : "bg-white border"
          }`}
          onClick={() => setView("CourseOffering")}
        >
          Course Offerings
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "Registration" ? "bg-blue-600 text-white" : "bg-white border"
          }`}
          onClick={() => setView("Registration")}
        >
          Registrations
        </button>
      </div>

      {/* Render selected component */}
      <div className="bg-white shadow-md rounded p-4">
        {renderComponent()}
      </div>
    </div>
  );
}

export default App;
