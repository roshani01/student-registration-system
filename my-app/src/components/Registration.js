import React, { useState, useEffect } from "react";

const Registration = () => {
  const [offerings, setOfferings] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [selectedOffering, setSelectedOffering] = useState("");
  const [filterCourseType, setFilterCourseType] = useState("");

  useEffect(() => {
    const storedOfferings = JSON.parse(localStorage.getItem("courseOfferings")) || [];
    const storedRegistrations = JSON.parse(localStorage.getItem("registrations")) || [];
    setOfferings(storedOfferings);
    setRegistrations(storedRegistrations);
  }, []);

  useEffect(() => {
    localStorage.setItem("registrations", JSON.stringify(registrations));
  }, [registrations]);

  const handleSubmit = () => {
    if (!studentName || !selectedOffering) return;

    setRegistrations([
      ...registrations,
      { studentName, offering: selectedOffering },
    ]);

    setStudentName("");
    setSelectedOffering("");
  };

  const filteredOfferings = filterCourseType
    ? offerings.filter((o) => o.courseType === filterCourseType)
    : offerings;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Student Registrations</h1>

      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={selectedOffering}
          onChange={(e) => setSelectedOffering(e.target.value)}
        >
          <option value="">Select Offering</option>
          {filteredOfferings.map((o, index) => (
            <option key={index} value={`${o.courseType} - ${o.course}`}>
              {o.courseType} - {o.course}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Filter by Course Type</label>
        <select
          className="border p-2 rounded w-full"
          value={filterCourseType}
          onChange={(e) => setFilterCourseType(e.target.value)}
        >
          <option value="">All</option>
          {[...new Set(offerings.map((o) => o.courseType))].map((type, i) => (
            <option key={i} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-lg font-semibold mb-2">Registered Students</h2>
      <ul className="divide-y border rounded">
        {registrations.map((reg, i) => (
          <li key={i} className="p-2">
            {reg.studentName} — <span className="text-gray-600">{reg.offering}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Registration;
