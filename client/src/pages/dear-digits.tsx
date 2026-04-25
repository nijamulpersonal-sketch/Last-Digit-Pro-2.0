import { useState, useMemo, useCallback } from "react";
import { ChevronLeft, Filter } from "lucide-react";
import { Link } from "wouter";

// নতুন VALUES অ্যারে (আপনি যেটা দিয়েছেন)
const VALUES = [
  { mor: "", day: "", evn: "" }, // 09-07-26
  { mor: "", day: "", evn: "" }, // 08-07-26
  { mor: "", day: "", evn: "" }, // 07-07-26
  { mor: "", day: "", evn: "" }, // 06-07-26
  { mor: "", day: "", evn: "" }, // 05-07-26
  { mor: "", day: "", evn: "" }, // 04-07-26
  { mor: "", day: "", evn: "" }, // 03-07-26
  { mor: "", day: "", evn: "" }, // 02-07-26
  { mor: "", day: "", evn: "" }, // 01-07-26

  { mor: "", day: "", evn: "" }, // 30-06-26
  { mor: "", day: "", evn: "" }, // 29-06-26
  { mor: "", day: "", evn: "" }, // 28-06-26
  { mor: "", day: "", evn: "" }, // 27-06-26
  { mor: "", day: "", evn: "" }, // 26-06-26
  { mor: "", day: "", evn: "" }, // 25-06-26
  { mor: "", day: "", evn: "" }, // 24-06-26
  { mor: "", day: "", evn: "" }, // 23-06-26
  { mor: "", day: "", evn: "" }, // 22-06-26
  { mor: "", day: "", evn: "" }, // 21-06-26
  { mor: "", day: "", evn: "" }, // 20-06-26
  { mor: "", day: "", evn: "" }, // 19-06-26
  { mor: "", day: "", evn: "" }, // 18-06-26
  { mor: "", day: "", evn: "" }, // 17-06-26
  { mor: "", day: "", evn: "" }, // 16-06-26
  { mor: "", day: "", evn: "" }, // 15-06-26
  { mor: "", day: "", evn: "" }, // 14-06-26
  { mor: "", day: "", evn: "" }, // 13-06-26
  { mor: "", day: "", evn: "" }, // 12-06-26
  { mor: "", day: "", evn: "" }, // 11-06-26
  { mor: "", day: "", evn: "" }, // 10-06-26
  { mor: "", day: "", evn: "" }, // 09-06-26
  { mor: "", day: "", evn: "" }, // 08-06-26
  { mor: "", day: "", evn: "" }, // 07-06-26
  { mor: "", day: "", evn: "" }, // 06-06-26
  { mor: "", day: "", evn: "" }, // 05-06-26
  { mor: "", day: "", evn: "" }, // 04-06-26
  { mor: "", day: "", evn: "" }, // 03-06-26
  { mor: "", day: "", evn: "" }, // 02-06-26
  { mor: "", day: "", evn: "" }, // 01-06-26

  { mor: "", day: "", evn: "" }, // 31-05-26
  { mor: "", day: "", evn: "" }, // 30-05-26
  { mor: "", day: "", evn: "" }, // 29-05-26
  { mor: "", day: "", evn: "" }, // 28-05-26
  { mor: "", day: "", evn: "" }, // 27-05-26
  { mor: "", day: "", evn: "" }, // 26-05-26

  { mor: "", day: "", evn: "" }, // 25-04-26
  { mor: "5", day: "0", evn: "7" }, // 24-04-26
  { mor: "7", day: "7", evn: "9" }, // 23-04-26
  { mor: "3", day: "9", evn: "8" }, // 22-04-26
  { mor: "5", day: "1", evn: "8" }, // 21-04-26
  { mor: "8", day: "9", evn: "5" }, // 20-04-26
  { mor: "4", day: "8", evn: "6" }, // 19-04-26
  { mor: "0", day: "1", evn: "8" }, // 18-04-26
  { mor: "1", day: "7", evn: "1" }, // 17-04-26
  { mor: "7", day: "4", evn: "4" }, // 16-04-26
  { mor: "5", day: "3", evn: "9" }, // 15-04-26
  { mor: "0", day: "3", evn: "7" }, // 14-04-26
  { mor: "8", day: "2", evn: "0" }, // 13-04-26
  { mor: "0", day: "1", evn: "6" }, // 12-04-26
  { mor: "3", day: "8", evn: "6" }, // 11-04-26
  { mor: "9", day: "7", evn: "5" }, // 10-04-26
  { mor: "8", day: "9", evn: "6" }, // 09-04-26
  { mor: "7", day: "7", evn: "0" }, // 08-04-26
  { mor: "0", day: "1", evn: "9" }, // 07-04-26
  { mor: "3", day: "9", evn: "0" }, // 06-04-26
  { mor: "9", day: "1", evn: "3" }, // 05-04-26
  { mor: "8", day: "0", evn: "0" }, // 04-04-26
  { mor: "5", day: "3", evn: "6" }, // 03-04-26
  { mor: "2", day: "9", evn: "5" }, // 02-04-26
  { mor: "6", day: "1", evn: "8" }, // 01-04-26
];

// ডেটা জেনারেট করার ফাংশন (শুধু অ-খালি সারি দেখাবে)
const generateData = () => {
  const startDate = new Date(2026, 6, 9); // ৯ জুলাই ২০২৬
  const data = [];

  for (let i = 0; i < VALUES.length; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() - i);
    const dateStr = `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear().toString().slice(-2)}`;

    const value = VALUES[i];

    // তিনটি ফিল্ডই খালি কিনা পরীক্ষা
    const isEmpty = (val: string | undefined) => !val || val === "" || val === ",";
    const allEmpty = isEmpty(value.mor) && isEmpty(value.day) && isEmpty(value.evn);

    if (allEmpty) {
      continue; // পুরো সারি বাদ দিন
    }

    data.push({
      date: dateStr,
      mor: value.mor || "-",
      day: value.day || "-",
      evn: value.evn || "-",
    });
  }

  return data;
};

// ভার্চুয়াল টেবিল কম্পোনেন্ট (অপরিবর্তিত)
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

// মূল কম্পোনেন্ট
export default function DearDigits() {
  const [searchTerm, setSearchTerm] = useState("");

  const chartData = useMemo(() => generateData(), []);

  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    chartData.forEach(row => {
      [row.mor, row.day, row.evn].forEach(val => {
        if (val && val !== "-" && val !== "." && val !== "" && val !== ",") {
          counts[val] = (counts[val] || 0) + 1;
        }
      });
    });
    return counts;
  }, [chartData]);

  const totalEntries = useMemo(() => {
    return Object.values(stats).reduce((a, b) => a + b, 0);
  }, [stats]);

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
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

        <div className="bg-white rounded shadow-sm overflow-hidden border border-slate-200">
          <div className="grid grid-cols-4 bg-[#4caf50] text-white font-bold text-center sticky top-0 z-10">
            <div className="py-2.5 border-r border-white/20">DATE</div>
            <div className="py-2.5 border-r border-white/20">MORNING</div>
            <div className="py-2.5 border-r border-white/20">DAY</div>
            <div className="py-2.5">EVENING</div>
          </div>
          <VirtualTable data={chartData} searchTerm={searchTerm} />
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex gap-3 items-start">
              <Filter className="w-5 h-5 text-[#d53369] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-slate-600">
                  Enter a digit (0-9) to highlight occurrences. Click on frequency badges to search.
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Showing all historical data (empty days hidden automatically)
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
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
