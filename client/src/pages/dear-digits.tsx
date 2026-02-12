import { useState, useMemo, useCallback } from "react";
import { ChevronLeft, Filter } from "lucide-react";
import { Link } from "wouter";

// Extended VALUES array with 100 days (61 historical + 39 future placeholders)
const VALUES = [
  { mor: ",", day: ",", evn: "," },  // 31-03-26
  { mor: ",", day: ",", evn: "," },  // 30-03-26
  { mor: ",", day: ",", evn: "," },  // 29-03-26
  { mor: ",", day: ",", evn: "," },  // 28-03-26
  { mor: ",", day: ",", evn: "," },  // 27-03-26
  { mor: ",", day: ",", evn: "," },  // 26-03-26
  { mor: ",", day: ",", evn: "," },  // 25-03-26
  { mor: ",", day: ",", evn: "," },  // 24-03-26
  { mor: ",", day: ",", evn: "," },  // 23-03-26
  { mor: ",", day: ",", evn: "," },  // 22-03-26
  { mor: ",", day: ",", evn: "," },  // 21-03-26
  { mor: ",", day: ",", evn: "," },  // 20-03-26
  { mor: ",", day: ",", evn: "," },  // 19-03-26
  { mor: ",", day: ",", evn: "," },  // 18-03-26
  { mor: ",", day: ",", evn: "," },  // 17-03-26
  { mor: ",", day: ",", evn: "," },  // 16-03-26
  { mor: ",", day: ",", evn: "," },  // 15-03-26
  { mor: ",", day: ",", evn: "," },  // 14-03-26
  { mor: ",", day: ",", evn: "," },  // 13-03-26
  { mor: ",", day: ",", evn: "," },  // 12-03-26
  { mor: ",", day: ",", evn: "," },  // 11-03-26
  { mor: ",", day: ",", evn: "," },  // 10-03-26
  { mor: ",", day: ",", evn: "," },  // 09-03-26
  { mor: ",", day: ",", evn: "," },  // 08-03-26
  { mor: ",", day: ",", evn: "," },  // 07-03-26
  { mor: ",", day: ",", evn: "," },  // 06-03-26
  { mor: ",", day: ",", evn: "," },  // 05-03-26
  { mor: ",", day: ",", evn: "," },  // 04-03-26
  { mor: ",", day: ",", evn: "," },  // 03-03-26
  { mor: ",", day: ",", evn: "," },  // 02-03-26
  { mor: ",", day: ",", evn: "," },  // 01-03-26
  { mor: ",", day: ",", evn: "," },  // 28-02-26
  { mor: ",", day: ",", evn: "," },  // 27-02-26
  { mor: ",", day: ",", evn: "," },  // 26-02-26
  { mor: ",", day: ",", evn: "," },  // 25-02-26
  { mor: ",", day: ",", evn: "," },  // 24-02-26
  { mor: ",", day: ",", evn: "," },  // 23-02-26
  { mor: ",", day: ",", evn: "," },  // 22-02-26
  { mor: ",", day: ",", evn: "," },  // 21-02-26
  { mor: ",", day: ",", evn: "," },  // 20-02-26
  { mor: ",", day: ",", evn: "," },  // 19-02-26
  { mor: ",", day: ",", evn: "," },  // 18-02-26
  { mor: ",", day: ",", evn: "," },  // 17-02-26
  { mor: ",", day: ",", evn: "," },  // 16-02-26
  { mor: ",", day: ",", evn: "," },  // 15-02-26
  { mor: ",", day: ",", evn: "," },  // 14-02-26
  { mor: ",", day: ",", evn: "," },  // 13-02-26
  { mor: "3", day: "8", evn: "2" },  // 12-02-26
  { mor: "9", day: "7", evn: "6" },  // 11-02-26
  { mor: "3", day: "1", evn: "7" },  // 10-02-26
  { mor: "7", day: "5", evn: "9" },  // 09-02-26
  { mor: "4", day: "1", evn: "7" },  // 08-02-26
  { mor: "7", day: "6", evn: "8" },  // 07-02-26 
  { mor: "2", day: "0", evn: "9" },  // 06-02-26 
  { mor: "9", day: "8", evn: "2" },  // 05-02-26 
  { mor: "3", day: "4", evn: "3" }, // 04-02-26 
  { mor: "4", day: "0", evn: "4" }, // 03-02-26
  { mor: "0", day: "2", evn: "6" }, // 02-02-26
  { mor: "1", day: "7", evn: "2" }, // 01-02-26
  { mor: "3", day: "6", evn: "5" }, // 31-01-26
  { mor: "4", day: "7", evn: "3" }, // 30-01-26
  { mor: "5", day: "1", evn: "5" }, // 29-01-26
  { mor: "5", day: "2", evn: "6" }, // 28-01-26
  { mor: "7", day: "0", evn: "0" }, // 27-01-26
  { mor: "", day: "", evn: "" },   // 26-01-26
  { mor: "8", day: "3", evn: "2" }, // 25-01-26
  { mor: "1", day: "1", evn: "5" }, // 24-01-26
  { mor: "4", day: "6", evn: "0" }, // 23-01-26
  { mor: "7", day: "8", evn: "0" }, // 22-01-26
  { mor: "2", day: "7", evn: "6" }, // 21-01-26
  { mor: "3", day: "2", evn: "3" }, // 20-01-26
  { mor: "8", day: "7", evn: "0" }, // 19-01-26
  { mor: "9", day: "1", evn: "2" }, // 18-01-26
  { mor: "1", day: "9", evn: "4" }, // 17-01-26
  { mor: "7", day: "8", evn: "9" }, // 16-01-26
  { mor: "9", day: "0", evn: "2" }, // 15-01-26
  { mor: "6", day: "6", evn: "2" }, // 14-01-26
  { mor: "3", day: "7", evn: "2" }, // 13-01-26
  { mor: "4", day: "7", evn: "0" }, // 12-01-26
  { mor: "7", day: "1", evn: "2" }, // 11-01-26
  { mor: "8", day: "2", evn: "7" }, // 10-01-26
  { mor: "2", day: "9", evn: "9" }, // 09-01-26
  { mor: "2", day: "2", evn: "6" }, // 08-01-26
  { mor: "0", day: "9", evn: "6" }, // 07-01-26
  { mor: "6", day: "7", evn: "2" }, // 06-01-26
  { mor: "3", day: "3", evn: "0" }, // 05-01-26
  { mor: "6", day: "6", evn: "7" }, // 04-01-26
  { mor: "3", day: "8", evn: "7" }, // 03-01-26
  { mor: "1", day: "4", evn: "8" }, // 02-01-26
  { mor: "0", day: "2", evn: "6" }, // 01-01-26
  { mor: "7", day: "9", evn: "6" }, // 31-12-25
  { mor: "4", day: "0", evn: "8" }, // 30-12-25
  { mor: "2", day: "7", evn: "8" }, // 29-12-25
  { mor: "3", day: "1", evn: "3" }, // 28-12-25
  { mor: "9", day: "1", evn: "2" }, // 27-12-25
  { mor: "9", day: "2", evn: "0" }, // 26-12-25
  { mor: "0", day: "4", evn: "7" }, // 25-12-25
  { mor: "0", day: "2", evn: "3" }, // 24-12-25
  { mor: "9", day: "9", evn: "1" }, // 23-12-25
  { mor: "0", day: "0", evn: "3" }, // 22-12-25
  { mor: "0", day: "1", evn: "3" }, // 21-12-25
  { mor: "9", day: "3", evn: "0" }, // 20-12-25
  { mor: "0", day: "0", evn: "9" }, // 19-12-25
  { mor: "5", day: "3", evn: "5" }, // 18-12-25
  { mor: "8", day: "1", evn: "1" }, // 17-12-25
  { mor: "1", day: "5", evn: "3" }, // 16-12-25
  { mor: "3", day: "1", evn: "0" }, // 15-12-25
  { mor: "8", day: "0", evn: "0" }, // 14-12-25
  { mor: "8", day: "9", evn: "5" }, // 13-12-25
  { mor: "5", day: "2", evn: "8" }, // 12-12-25
  { mor: "6", day: "0", evn: "2" }, // 11-12-25
  { mor: "6", day: "3", evn: "8" }, // 10-12-25
  { mor: "4", day: "9", evn: "2" }, // 09-12-25
  { mor: "7", day: "7", evn: "6" }, // 08-12-25
];

// Generate dates for the days (starting from fixed start date and going backwards)
const generateData = () => {
  // Fixed start date: 31-03-2026 (first entry in VALUES array)
  const startDate = new Date(2026, 2, 31); // Month is 0-based (2 = March)
  const data = [];
  
  for (let i = 0; i < VALUES.length; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() - i);
    const dateStr = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear().toString().slice(-2)}`;
    
    const value = VALUES[i];
    // Check if this is a placeholder row (all three values are ",")
    const isPlaceholder = value.mor === "," && value.day === "," && value.evn === ",";
    
    // Skip placeholder rows completely
    if (isPlaceholder) {
      continue;
    }
    
    data.push({
      date: dateStr,
      mor: value.mor || "-",
      day: value.day || "-",
      evn: value.evn || "-"
    });
  }
  
  return data;
};

// Virtual scroll component for performance
const VirtualTable = ({ data, searchTerm }: { 
  data: Array<{date: string, mor: string, day: string, evn: string}>, 
  searchTerm: string
}) => {
  const isHighlighted = useCallback((val: string) => {
    if (!searchTerm || val === "-" || val === "" || val === "." || val === ",") return false;
    return val === searchTerm;
  }, [searchTerm]);

  return (
    <div className="overflow-y-auto max-h-[600px]">
      <div className="divide-y divide-slate-200">
        {data.map((row, idx) => (
          <div key={`${row.date}-${idx}`} className="grid grid-cols-4 text-center items-center">
            <div className="py-2.5 bg-[#e1eaf1] text-slate-700 font-medium border-r border-slate-200 sticky left-0">
              {row.date}
            </div>
            
            <div className={`py-2.5 border-r border-slate-200 font-bold transition-colors duration-200 ${
              isHighlighted(row.mor) ? 'bg-yellow-300 text-slate-900' : 'text-slate-800'
            }`}>
              {row.mor === "," ? "-" : (row.mor || "-")}
            </div>
            
            <div className={`py-2.5 border-r border-slate-200 font-bold transition-colors duration-200 ${
              isHighlighted(row.day) ? 'bg-yellow-300 text-slate-900' : 'text-slate-800'
            }`}>
              {row.day === "," ? "-" : (row.day || "-")}
            </div>
            
            <div className={`py-2.5 font-bold transition-colors duration-200 ${
              isHighlighted(row.evn) ? 'bg-yellow-300 text-slate-900' : 'text-slate-800'
            }`}>
              {row.evn === "," ? "-" : (row.evn || "-")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function DearDigits() {
  const [searchTerm, setSearchTerm] = useState("");

  // Generate the data (placeholder rows are already filtered out)
  const chartData = useMemo(() => generateData(), []);

  // Count occurrences for stats (exclude placeholder values)
  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    
    chartData.forEach(row => {
      [row.mor, row.day, row.evn].forEach(val => {
        // Skip placeholder values (",") and empty/dash values
        if (val && val !== "-" && val !== "." && val !== "" && val !== ",") {
          counts[val] = (counts[val] || 0) + 1;
        }
      });
    });
    
    return counts;
  }, [chartData]);

  // Calculate total entries (only from visible data)
  const totalEntries = useMemo(() => {
    return Object.values(stats).reduce((a, b) => a + b, 0);
  }, [stats]);

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      {/* Header */}
      <header className="bg-[#d53369] text-white p-4 flex items-center gap-4 shadow-md sticky top-0 z-20">
        <Link href="/">
          <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft className="w-7 h-7" />
          </button>
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Dear : First Prize Last Digit</h1>
          <p className="text-sm opacity-90">
            Showing {chartData.length} days of data • Total entries: {totalEntries}
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 space-y-4">
        {/* Controls */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="text-slate-700 font-bold whitespace-nowrap">Search :</span>
                <div className="relative flex-1">
                  <input 
                    type="number"
                    min="0"
                    max="9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value.slice(0, 1))}
                    placeholder="Enter digit (0-9)"
                    className="w-full border-2 border-slate-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-400 transition-colors text-slate-800 font-medium"
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm("")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
              
              {searchTerm && (
                <div className="mt-2 text-sm text-slate-600">
                  <span className="font-semibold">Digit "{searchTerm}" appears {stats[searchTerm] || 0} times</span>
                  {" "}in {chartData.length} days
                </div>
              )}
            </div>
          </div>
          
          {/* Digit Frequency Stats */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Digit Frequency:</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from({length: 10}, (_, i) => i.toString()).map(digit => (
                <div 
                  key={digit}
                  className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-all ${
                    searchTerm === digit 
                      ? 'bg-yellow-300 text-slate-900' 
                      : stats[digit] 
                        ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' 
                        : 'bg-slate-100 text-slate-400'
                  }`}
                  onClick={() => setSearchTerm(digit)}
                >
                  {digit}: {stats[digit] || 0}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded shadow-sm overflow-hidden border border-slate-200">
          <div className="grid grid-cols-4 bg-[#4caf50] text-white font-bold text-center sticky top-0 z-10">
            <div className="py-2.5 border-r border-white/20">DATE</div>
            <div className="py-2.5 border-r border-white/20">MORNING</div>
            <div className="py-2.5 border-r border-white/20">DAY</div>
            <div className="py-2.5">EVENING</div>
          </div>

          <VirtualTable 
            data={chartData} 
            searchTerm={searchTerm}
          />
        </div>

        {/* Instructions and Export Options */}
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex gap-3 items-start">
              <Filter className="w-5 h-5 text-[#d53369] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-slate-600">
                  Enter a digit (0-9) to highlight occurrences. Click on frequency badges to search.
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Showing all historical data
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => {
                  // Export as CSV functionality - only exports visible rows
                  const headers = ["Date", "Morning", "Day", "Evening"];
                  const csvContent = [
                    headers.join(","),
                    ...chartData.map(row => 
                      [
                        row.date, 
                        row.mor === "," ? "" : (row.mor || ""), 
                        row.day === "," ? "" : (row.day || ""), 
                        row.evn === "," ? "" : (row.evn || "")
                      ].join(",")
                    )
                  ].join("\n");
                  
                  const blob = new Blob([csvContent], { type: "text/csv" });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `dear-digits-${new Date().toISOString().split('T')[0]}.csv`;
                  a.click();
                }}
                className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
              >
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
