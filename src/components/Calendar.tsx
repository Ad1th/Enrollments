import { useState } from "react";
import "../components/Calendar.css";

interface CalendarProps {
  selectDate: (date: number) => void;
}

const YEAR = 2026;
const MONTH = 9; // October (JavaScript months start from 0)



const Calendar: React.FC<CalendarProps> = ({ selectDate }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Calculate the weekday on which October begins.
  // Convert Sunday-first indexing to Monday-first indexing.
  const firstDay = new Date(YEAR, MONTH, 1).getDay();
  const startingDay = (firstDay + 6) % 7;

  // Calculate the total number of days in October.
  const daysInMonth = new Date(YEAR, MONTH + 1, 0).getDate();

  const handleSelect = (date: number) => {
    setSelectedDate(date);
    selectDate(date);
  };

  const renderDate = (date: number) => {
    const isSelected = selectedDate === date;

    return (
      <li key={date}>
        <span
          onClick={() => handleSelect(date)}
          className={`date ${
            "clickable" 
          } ${isSelected ? "selected" : ""}`}
        >
          {date}
        </span>
      </li>
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="month">
        <ul>
          <li>October 2026</li>
        </ul>
      </div>

      <ul className="weekdays">
        <li>Mo</li>
        <li>Tu</li>
        <li>We</li>
        <li>Th</li>
        <li>Fr</li>
        <li>Sa</li>
        <li>Su</li>
      </ul>

      <ul className="days">
        {/* Empty cells before October 1 */}
        {Array.from({ length: startingDay }, (_, i) => (
          <li key={`empty-${i}`}>
            <span className="deactive"></span>
          </li>
        ))}

        {/* All dates in October */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
          renderDate
        )}
      </ul>
    </div>
  );
};

export default Calendar;