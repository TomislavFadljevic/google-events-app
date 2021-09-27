import { useContext } from "react";
import { EventContext } from "../../contexts/EventContext";
import Event from "../dashboard/Event";

const Events = () => {
  const { events } = useContext(EventContext);

  console.log("In Events", events);
  return (
    //   { events.length === 0 ? "true" : "false" }

    <div className="event-holder">
      <div className="table-header">List of your upcoming events</div>
      <table className="table table-hover">
        <tbody>
          {events.map((event) => (
            <Event event={event} key={event.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Events;
