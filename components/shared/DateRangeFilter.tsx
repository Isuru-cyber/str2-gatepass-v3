import { format, subDays, startOfWeek } from "date-fns";

export type PresetRange = "today" | "this-week" | "last-7-days" | "current-month" | "custom";

interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  preset: string;
  onPresetChange: (preset: PresetRange) => void;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export function DateRangeFilter({
  startDate,
  endDate,
  preset,
  onPresetChange,
  onStartDateChange,
  onEndDateChange,
}: DateRangeFilterProps) {
  
  const handlePresetChange = (value: string) => {
    onPresetChange(value as PresetRange);
    const now = new Date();
    
    if (value === "today") {
      onStartDateChange(format(now, "yyyy-MM-dd"));
      onEndDateChange(format(now, "yyyy-MM-dd"));
    } else if (value === "this-week") {
      const firstDayOfWeek = startOfWeek(now, { weekStartsOn: 1 });
      onStartDateChange(format(firstDayOfWeek, "yyyy-MM-dd"));
      onEndDateChange(format(now, "yyyy-MM-dd"));
    } else if (value === "last-7-days") {
      onStartDateChange(format(subDays(now, 7), "yyyy-MM-dd"));
      onEndDateChange(format(now, "yyyy-MM-dd"));
    } else if (value === "current-month") {
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      onStartDateChange(format(firstDay, "yyyy-MM-dd"));
      onEndDateChange(format(now, "yyyy-MM-dd"));
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 bg-slate-50 dark:bg-slate-900/50 p-2 sm:p-3 rounded-xl border border-slate-200 dark:border-slate-800 w-full sm:w-auto shadow-sm">
      <div className="flex items-center justify-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Range:</span>
        <select
          value={preset}
          onChange={(e) => handlePresetChange(e.target.value)}
          className="h-8 rounded-md border border-input bg-background/80 dark:bg-slate-950 px-2 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="today">Today</option>
          <option value="this-week">This Week</option>
          <option value="last-7-days">Last 7 Days</option>
          <option value="current-month">Current Month</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            onPresetChange("custom");
            onStartDateChange(e.target.value);
          }}
          className="h-8 rounded-md border border-input bg-background/80 dark:bg-slate-950 px-2 py-1 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1"
        />
        <span className="text-muted-foreground text-xs">to</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            onPresetChange("custom");
            onEndDateChange(e.target.value);
          }}
          className="h-8 rounded-md border border-input bg-background/80 dark:bg-slate-950 px-2 py-1 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1"
        />
      </div>
    </div>
  );
}
