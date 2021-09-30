import { EventContext } from "../../contexts/EventContext";
import { useContext } from "react";
const EventsFilterOption = ({ events_filter, setShowDropdown }) => {
  const { listUpcomingEvents } = useContext(EventContext);
  const setActiveFilter = (e) => {
    const filterClicked = e.currentTarget.getAttribute("data-filter");
    listUpcomingEvents(filterClicked);
    setShowDropdown(false);
  };
  return (
    <span
      className="dropdown-item"
      data-filter={events_filter}
      onClick={setActiveFilter}
    >
      {events_filter === "today"
        ? "Today"
        : events_filter === "week"
        ? "This week"
        : "This Month"}
    </span>
  );
};

export default EventsFilterOption;
