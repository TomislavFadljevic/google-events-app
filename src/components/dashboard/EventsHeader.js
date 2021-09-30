const EventsHeader = ({ events_filter }) => {
  let heading;
  switch (events_filter) {
    case "today":
      heading = "Events today";
      break;
    case "week":
      heading = "Events this week";
      break;
    case "month":
      heading = "Events this month";
      break;
    default:
      heading = "List of your upcoming events";
  }
  return (
    <div className="table-header">
      <h2>{heading}</h2>
    </div>
  );
};

export default EventsHeader;
