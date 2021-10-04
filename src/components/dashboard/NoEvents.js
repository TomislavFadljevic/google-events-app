const NoEvents = ({ events_filter }) => {
  let heading;
  switch (events_filter) {
    case "today":
      heading = "No events today";
      break;
    case "week":
      heading = "No events next 7 days";
      break;
    case "month":
      heading = "No events next 30 days";
      break;
    default:
      heading = "No events";
  }
  return (
    <div className="no-events">
      <h5 className="text-muted">{heading}</h5>
    </div>
  );
};

export default NoEvents;
