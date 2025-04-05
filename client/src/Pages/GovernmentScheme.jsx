import React, { useState } from "react";
import { Search, User, ChevronDown, ChevronUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import NavBar from "../components/NavBar";

const GovernmentSchemes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    state: "All",
    income: "All",
    age: "All",
    occupation: "All",
  });
  const [isFilterOpen, setIsFilterOpen] = useState({
    category: true,
    demographic: true,
    eligibility: true,
  });

  const schemes = [
    {
      id: 1,
      title: "PM Kisan Samman Nidhi",
      category: "Agriculture",
      description:
        "Direct income support of ₹6,000 per year to farmer families",
      eligibility: "Small and marginal farmers with cultivable landholding",
      benefits: "Financial assistance through three equal installments",
      applicationLink: "#",
      state: ["All"],
      occupation: ["Farmer"],
      maxIncome: 600000,
      ageGroup: "18-60",
    },
    {
      id: 2,
      title: "Ayushman Bharat",
      category: "Healthcare",
      description: "Health insurance coverage of ₹5 lakh per family per year",
      eligibility:
        "Poor and vulnerable families identified through SECC database",
      benefits: "Cashless and paperless treatment at empaneled hospitals",
      applicationLink: "#",
      state: ["All"],
      occupation: ["All"],
      maxIncome: 300000,
      ageGroup: "All",
    },
    {
      id: 3,
      title: "PM Awas Yojana",
      category: "Housing",
      description: "Housing for all by 2024 through financial assistance",
      eligibility: "Economically weaker sections and low-income groups",
      benefits: "Financial assistance up to ₹2.67 lakh for house construction",
      applicationLink: "#",
      state: ["All"],
      occupation: ["All"],
      maxIncome: 300000,
      ageGroup: "All",
    },
    {
      id: 4,
      title: "Sukanya Samriddhi Yojana",
      category: "Education",
      description:
        "Savings scheme for girl child education and marriage expenses",
      eligibility: "Parents of girl child below 10 years",
      benefits: "High interest rate and tax benefits under Section 80C",
      applicationLink: "#",
      state: ["All"],
      occupation: ["All"],
      maxIncome: "All",
      ageGroup: "0-10",
    },
  ];

  const filterOptions = {
    category: ["All", "Agriculture", "Healthcare", "Housing", "Education"],
    state: [
      "All",
      "Maharashtra",
      "Delhi",
      "Karnataka",
      "Tamil Nadu",
      "Gujarat",
    ],
    income: ["All", "Below 3L", "3L-6L", "Above 6L"],
    age: ["All", "0-18", "18-60", "Above 60"],
    occupation: ["All", "Farmer", "Student", "Business", "Service", "Other"],
  };

  const toggleFilter = (filterName) => {
    setIsFilterOpen((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const getIncomeRange = (income) => {
    if (income === "Below 3L") return 300000;
    if (income === "3L-6L") return 600000;
    if (income === "Above 6L") return Infinity;
    return "All";
  };

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filters.category === "All" || scheme.category === filters.category;
    const matchesState =
      filters.state === "All" ||
      scheme.state.includes("All") ||
      scheme.state.includes(filters.state);
    const matchesOccupation =
      filters.occupation === "All" ||
      scheme.occupation.includes("All") ||
      scheme.occupation.includes(filters.occupation);

    const userIncome = getIncomeRange(filters.income);
    const matchesIncome =
      filters.income === "All" ||
      scheme.maxIncome === "All" ||
      (typeof scheme.maxIncome === "number" && userIncome <= scheme.maxIncome);

    const matchesAge =
      filters.age === "All" ||
      scheme.ageGroup === "All" ||
      scheme.ageGroup === filters.age;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesState &&
      matchesOccupation &&
      matchesIncome &&
      matchesAge
    );
  });

  const FilterSection = ({ title, isOpen, onToggle, children }) => (
    <div className="mb-6 border-b border-gray-200 pb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full mb-4 text-lg font-semibold text-gray-900"
      >
        {title}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && children}
    </div>
  );

  return (
    <>
      <NavBar language="en" toggleLanguage={() => {}} />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="flex">
          {/* Left Panel with Filters */}
          <div className="w-80 min-h-screen bg-white border-r border-gray-200 p-6">
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search schemes..."
                  className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <FilterSection
              title="Category"
              isOpen={isFilterOpen.category}
              onToggle={() => toggleFilter("category")}
            >
              <div className="space-y-2">
                {filterOptions.category.map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === option}
                      onChange={() => handleFilterChange("category", option)}
                      className="form-radio text-green-600"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection
              title="Demographic"
              isOpen={isFilterOpen.demographic}
              onToggle={() => toggleFilter("demographic")}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <select
                    value={filters.state}
                    onChange={(e) =>
                      handleFilterChange("state", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {filterOptions.state.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age Group
                  </label>
                  <select
                    value={filters.age}
                    onChange={(e) => handleFilterChange("age", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {filterOptions.age.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </FilterSection>

            <FilterSection
              title="Eligibility"
              isOpen={isFilterOpen.eligibility}
              onToggle={() => toggleFilter("eligibility")}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Income Range
                  </label>
                  <select
                    value={filters.income}
                    onChange={(e) =>
                      handleFilterChange("income", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {filterOptions.income.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occupation
                  </label>
                  <select
                    value={filters.occupation}
                    onChange={(e) =>
                      handleFilterChange("occupation", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {filterOptions.occupation.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </FilterSection>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Government Schemes
                </h1>
                <p className="text-xl text-gray-600">
                  Showing {filteredSchemes.length} matching schemes
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSchemes.map((scheme) => (
                  <Card
                    key={scheme.id}
                    className="hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-2">
                            {scheme.title}
                          </CardTitle>
                          <CardDescription>
                            <span className="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm">
                              {scheme.category}
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-gray-600">{scheme.description}</p>

                        <div>
                          <h4 className="font-semibold mb-1">Eligibility:</h4>
                          <p className="text-gray-600">{scheme.eligibility}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-1">Benefits:</h4>
                          <p className="text-gray-600">{scheme.benefits}</p>
                        </div>

                        <a
                          href={scheme.applicationLink}
                          className="inline-block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                          Apply Now
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GovernmentSchemes;
