import { EventContext } from "../../contexts/EventContext";
import { useContext } from "react";
const EventsFilterOption = ({ events_filter, setShowDropdown }) => {
  const { listUpcomingEvents, setEventsFilter } = useContext(EventContext);
  const setActiveFilter = (e) => {
    const filterClicked = e.currentTarget.getAttribute("data-filter");
    listUpcomingEvents(filterClicked);
    setEventsFilter(filterClicked);
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
        ? "Next 7 days"
        : "Next 30 days"}
    </span>
  );
};

export default EventsFilterOption;
