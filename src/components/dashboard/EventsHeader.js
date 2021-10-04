const EventsHeader = ({ events_filter }) => {
  let heading;
  switch (events_filter) {
    case "today":
      heading = "Events today";
      break;
    case "week":
      heading = "Events next 7 days";
      break;
    case "month":
      heading = "Events next 30 days";
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
