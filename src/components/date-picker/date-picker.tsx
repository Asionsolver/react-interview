import { useState } from "react";
import DatePickers from "./components/date-pickers";
import CustomDatePicker from "./components/custom-date-pickers";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Custom Date & Time Picker
          </h1>
          <p className="text-lg text-muted-foreground">
            Built with React and Tailwind CSS - No external libraries
          </p>
        </div>

        <CustomDatePicker value={selectedDate} onChange={handleDateChange} />
        <div className="mt-8 text-center">
          <div className="inline-block px-6 py-3 bg-card border border-border rounded-lg shadow-sm">
            <p className="text-sm text-muted-foreground mb-1">
              Currently Selected:
            </p>
            <p className="text-lg font-semibold text-foreground">
              {selectedDate.toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
