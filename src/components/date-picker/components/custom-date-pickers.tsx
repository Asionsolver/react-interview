import { useState } from "react";
import { GoCalendar } from "react-icons/go";
import { FaChevronDown } from "react-icons/fa6";
import { useRef } from "react";
import { useEffect } from "react";
interface CustomDatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
}

const CustomDatePicker = ({ value, onChange }: CustomDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(value || new Date());
  const [open, setOpen] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [currentYear, setCurrentYear] = useState<number>(
    value?.getFullYear() || new Date().getFullYear()
  );

  const [currentMonth, setCurrentMonth] = useState<number>(
    value?.getMonth() || new Date().getMonth()
  );

  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // nearest half-hour round
  minutes = minutes < 30 ? 0 : 30;

  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;

  const minuteStr = minutes === 0 ? "00" : "30";
  const currentTimeStr = `${hours
    .toString()
    .padStart(2, "0")}:${minuteStr}${period}`;

  const [selectedTime, setSelectedTime] = useState<string>(currentTimeStr);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dropdownMonthRef = useRef<HTMLDivElement | null>(null);
  const dropdownYearRef = useRef<HTMLDivElement | null>(null);
  const dropdownTimeRef = useRef<HTMLDivElement | null>(null);

  // when the month dropdown opens, scroll to the current month
  useEffect(() => {
    if (showMonthDropdown && dropdownMonthRef.current) {
      const currentMonthButton = dropdownMonthRef.current.querySelector(
        `button[data-month='${currentMonth}']`
      ) as HTMLButtonElement | null;
      if (currentMonthButton && dropdownMonthRef.current) {
        //  not smooth scroll, direct positioning
        const parent = dropdownMonthRef.current;
        const buttonOffset = currentMonthButton.offsetTop;
        const containerHeight = parent.clientHeight;
        const buttonHeight = currentMonthButton.offsetHeight;

        // Bring the current month to the middle of the container
        parent.scrollTop =
          buttonOffset - containerHeight / 2 + buttonHeight / 2;
      }
    }
  }, [showMonthDropdown]);

  //  When the year dropdown opens, scroll to the current year
  useEffect(() => {
    if (showYearDropdown && dropdownYearRef.current) {
      const currentYearButton = dropdownYearRef.current.querySelector(
        `button[data-year='${currentYear}']`
      ) as HTMLButtonElement | null;
      if (currentYearButton && dropdownYearRef.current) {
        //  not smooth scroll, direct positioning
        const parent = dropdownYearRef.current;
        const buttonOffset = currentYearButton.offsetTop;
        const containerHeight = parent.clientHeight;
        const buttonHeight = currentYearButton.offsetHeight;

        // Bring the current year to the middle of the container
        parent.scrollTop =
          buttonOffset - containerHeight / 2 + buttonHeight / 2;
      }
    }
  }, [showYearDropdown]);

  // When the time dropdown opens, scroll to the current time
  useEffect(() => {
    if (dropdownTimeRef.current) {
      const currentTimeButton = dropdownTimeRef.current.querySelector(
        `button[data-time='${selectedTime}']`
      ) as HTMLButtonElement | null;
      if (currentTimeButton && dropdownTimeRef.current) {
        //  not smooth scroll, direct positioning
        const parent = dropdownTimeRef.current;
        const buttonOffset = currentTimeButton.offsetTop;
        const containerHeight = parent.clientHeight;
        const buttonHeight = currentTimeButton.offsetHeight;

        // Bring the current time to the middle of the container
        parent.scrollTop =
          buttonOffset - containerHeight / 2 + buttonHeight / 2;
      }
    }
  }, [open]);

  const years = Array.from({ length: 300 }, (_, i) => currentYear - 200 + i);

  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    const period = hour < 12 ? "AM" : "PM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour.toString().padStart(2, "0")}:${minute}${period}`;
  });
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  //   console.log("Day in month", daysInMonth);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  //   console.log("FirstDayOfMonth", firstDayOfMonth);
  const generateCalendarDays = () => {
    const days = [];
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    for (let i = 0; i < adjustedFirstDay; i++) {
      const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
      days.push({
        day: prevMonthDays - adjustedFirstDay + i + 1,
        isCurrentMonth: false,
        isPrevMonth: true,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isPrevMonth: false,
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isPrevMonth: false,
      });
    }

    return days;
  };

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleMonthClick = () => {
    setShowMonthDropdown((prev) => !prev);
    setShowYearDropdown(false);
  };

  const handleYearClick = () => {
    setShowYearDropdown((prev) => !prev);
    setShowMonthDropdown(false);
  };

  const handleTimeSlotClick = (time: string) => {
    setSelectedTime(time);
  };
  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
  };
  const formatSelectedDate = () => {
    return selectedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSetDate = () => {
    if (onChange) {
      onChange(selectedDate);
    }
  };
  const isSelectedDay = (day: number) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };
  return (
    <div>
      {/* Date Input */}
      <div className="relative w-full max-w-xl mx-auto p-6 bg-background font-mono">
        <input
          type="text"
          className="border border-border-primary rounded-md p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Select Date"
          value={selectedDate.toLocaleDateString("en-US") + " " + selectedTime}
          readOnly
        />
        <div
          className="absolute top-8 right-8 text-[#797575] cursor-pointer"
          onClick={handleToggle}
        >
          <GoCalendar size={25} />
        </div>

        {/* Toggle Button */}
        {open ? (
          <div className="mt-4 p-2 border border-border-primary rounded-md shadow-sm bg-card">
            <div className="border border-border-primary rounded-md overflow-hidden">
              {/* Calendar Section */}
              <div className=" flex">
                {/* Date Picker Component Goes Here */}
                <div className="flex-1 p-4">
                  <div className="flex gap-2 mb-4">
                    {/* Month Picker */}
                    <div className="relative flex-1">
                      <button
                        onClick={handleMonthClick}
                        className="w-full px-3 py-2 text-sm font-medium text-text-primary border border-border-primary rounded-md  transition-colors flex items-center justify-between"
                      >
                        {months[currentMonth]}
                        <FaChevronDown
                          className={`w-4 h-4 transition-transform ${
                            showMonthDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {showMonthDropdown && (
                        <div className="absolute  px-3 py-2 z-10 w-full mt-1 bg-white border border-border-primary rounded-md shadow-lg  ">
                          <div
                            ref={dropdownMonthRef}
                            className="pl-0.5 pr-3 max-h-85 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent  [&::-webkit-scrollbar-track]:my-2 [&::-webkit-scrollbar-thumb]:bg-scrollbar [&::-webkit-scrollbar-thumb]:rounded"
                          >
                            {months.map((month, index) => (
                              <button
                                key={month}
                                data-month={index}
                                onClick={() => {
                                  setCurrentMonth(index);
                                  setShowMonthDropdown(false);
                                }}
                                className={`w-full px-3 py-2 text-left text-sm transition-colors rounded-md ${
                                  index === currentMonth
                                    ? "bg-button-primary text-white font-bold"
                                    : "text-text-primary font-medium"
                                }`}
                              >
                                {month}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Year Picker */}
                    <div className="relative flex-1">
                      <button
                        onClick={handleYearClick}
                        className="w-full px-3 py-2 text-sm font-medium text-text-primary border border-border-primary rounded-md  transition-colors flex items-center justify-between"
                      >
                        {currentYear}
                        <FaChevronDown
                          className={`w-4 h-4 transition-transform ${
                            showYearDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {showYearDropdown && (
                        <div className="absolute z-10 w-full mt-1 px-3 bg-white border border-border-primary rounded-md shadow-lg ">
                          <div
                            ref={dropdownYearRef}
                            className="pl-0.5 pr-3 max-h-85 overflow-y-auto   [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent  [&::-webkit-scrollbar-track]:my-2 [&::-webkit-scrollbar-thumb]:bg-scrollbar [&::-webkit-scrollbar-thumb]:rounded"
                          >
                            {years.map((year) => (
                              <button
                                key={year}
                                data-year={year}
                                onClick={() => {
                                  setCurrentYear(year);
                                  setShowYearDropdown(false);
                                }}
                                className={`w-full px-3 py-2 text-left text-sm transition-colors rounded-md ${
                                  year === currentYear
                                    ? "bg-button-primary text-white font-bold"
                                    : "text-text-primary font-medium"
                                }`}
                              >
                                {year}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div>
                    {/* Weekdays */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {weekDays.map((day) => (
                        <div
                          key={day}
                          className="text-center text-xs font-medium text-text-primary py-2"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Days */}
                    <div className="grid grid-cols-7 gap-1">
                      {generateCalendarDays().map((dateInfo, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            dateInfo.isCurrentMonth &&
                            handleDateSelect(dateInfo.day)
                          }
                          disabled={!dateInfo.isCurrentMonth}
                          className={`
                      aspect-square flex items-center  justify-center text-sm rounded-full transition-all
                      ${
                        !dateInfo.isCurrentMonth
                          ? "text-border-primary cursor-not-allowed"
                          : "text-text-primary"
                      }
                      ${
                        isSelectedDay(dateInfo.day) && dateInfo.isCurrentMonth
                          ? "bg-button-primary cursor-pointer text-white font-semibold shadow-md"
                          : dateInfo.isCurrentMonth
                          ? "text-text-primary cursor-pointer"
                          : ""
                      }
                    `}
                        >
                          {dateInfo.day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Time Picker Component Goes Here */}
                <div className="w-32 border-l border-border-primary px-2 py-1">
                  <div
                    ref={dropdownTimeRef}
                    className="pr-2 max-h-[424px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent  [&::-webkit-scrollbar-track]:my-2 [&::-webkit-scrollbar-thumb]:bg-scrollbar [&::-webkit-scrollbar-thumb]:rounded"
                  >
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        data-time={time}
                        onClick={() => handleTimeSlotClick(time)}
                        className={`w-full rounded-md px-3 cursor-pointer py-2 text-xs text-left transition-colors ${
                          selectedTime === time
                            ? "bg-button-primary text-white font-semibold"
                            : "text-text-primary font-medium"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center p-4 border-t border-border-primary">
                <button
                  className="px-2.5 py-1.5 border border-border-primary  cursor-pointer bg-destructive rounded-md text-white font-medium"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>

                <div className=" border border-border-primary px-2.5 py-1.5 rounded-md text-text-primary">
                  {formatSelectedDate()} {selectedTime}
                </div>

                <button
                  onClick={handleSetDate}
                  className="px-2.5 py-1.5 cursor-pointer bg-button-primary rounded-md text-white font-medium"
                >
                  Set Date
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {/* Date Picker Modal */}
    </div>
  );
};

export default CustomDatePicker;
