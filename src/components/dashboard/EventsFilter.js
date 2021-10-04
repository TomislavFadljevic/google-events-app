import { EventContext } from "../../contexts/EventContext";
import { useContext, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import EventsFilterOption from "./EventsFilterOption";

const EventsFilter = () => {
  const { events_filter } = useContext(EventContext);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <OutsideClickHandler onOutsideClick={() => setShowDropdown(false)}>
      <li className="nav-item dropdown">
        <span
          className={
            showDropdown
              ? "nav-link dropdown-toggle show"
              : "nav-link dropdown-toggle"
          }
          onClick={() => setShowDropdown(!showDropdown)}
          data-bs-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="true"
        >
          {events_filter === "today"
            ? "Today"
            : events_filter === "week"
            ? "Next 7 days"
            : "Next 30 days"}
        </span>
        <div
          className={showDropdown ? "dropdown-menu show" : "dropdown-menu"}
          data-bs-popper="none"
        >
          <EventsFilterOption
            events_filter="today"
            setShowDropdown={setShowDropdown}
          />
          <EventsFilterOption
            events_filter="week"
            setShowDropdown={setShowDropdown}
          />
          <EventsFilterOption
            events_filter="month"
            setShowDropdown={setShowDropdown}
          />
        </div>
      </li>
    </OutsideClickHandler>
  );
};

export default EventsFilter;
