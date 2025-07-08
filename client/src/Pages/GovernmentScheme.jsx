import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const GovernmentSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    state: "All",
    income: "All",
    age: "All",
    occupation: "All",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/schemes")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setSchemes(res.data);
        }
      })
      .catch((err) => console.error("Error fetching schemes:", err));
  }, []);

  const getIncomeUpperBound = (income) => {
    if (income === "Below 3L") return 300000;
    if (income === "3L-6L") return 600000;
    if (income === "Above 6L") return Infinity;
    return "All";
  };

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filters.category === "All" || scheme.category === filters.category;

    const matchesState =
      filters.state === "All" || scheme.state?.includes(filters.state);

    const matchesOccupation =
      filters.occupation === "All" ||
      scheme.occupation?.includes(filters.occupation);

    const matchesAge =
      filters.age === "All" || scheme.ageGroup === filters.age;

    const userIncome = getIncomeUpperBound(filters.income);
    const schemeIncome =
      scheme.maxIncome === "All" ? Infinity : parseInt(scheme.maxIncome);
    const matchesIncome =
      filters.income === "All" || userIncome <= schemeIncome;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesState &&
      matchesOccupation &&
      matchesAge &&
      matchesIncome
    );
  });

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-20 bg-gray-50 flex">
        <aside className="w-80 p-6 bg-white border-r">
          <input
            type="text"
            placeholder="Search schemes..."
            className="w-full p-2 mb-4 border rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {["category", "state", "income", "age", "occupation"].map((key) => (
            <div key={key} className="mb-4">
              <label className="block mb-1 capitalize font-medium">{key}</label>
              <select
                className="w-full border rounded p-2"
                value={filters[key]}
                onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
              >
                {["All"]
                  .concat(
                    key === "category"
                      ? ["General", "Agriculture", "Healthcare", "Housing"]
                      : key === "state"
                      ? ["Maharashtra", "Delhi", "Gujarat"]
                      : key === "income"
                      ? ["Below 3L", "3L-6L", "Above 6L"]
                      : key === "age"
                      ? ["0-18", "18-60", "60+"]
                      : ["Farmer", "Student", "Business", "Service"]
                  )
                  .map((option) => (
                    <option key={option}>{option}</option>
                  ))}
              </select>
            </div>
          ))}
        </aside>

        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Government Schemes</h2>
          <p className="mb-4 text-gray-500">
            Showing {filteredSchemes.length} matching schemes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSchemes.map((scheme) => (
              <Card key={scheme.id}>
                <CardHeader>
                  <CardTitle>{scheme.title}</CardTitle>
                  <CardDescription>{scheme.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{scheme.description}</p>
                  <a
                    href={scheme.applicationLink || "#"}
                    className="inline-block bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700"
                    target="_blank"
                  >
                    Apply Now
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default GovernmentSchemes;
