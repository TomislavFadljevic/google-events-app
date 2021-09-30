import { useContext } from "react";
import { EventContext } from "../../contexts/EventContext";
import Event from "../dashboard/Event";
import EventsHeader from "./EventsHeader";
import NoEvents from "./NoEvents";

const Events = () => {
  const { events_filter, events } = useContext(EventContext);

  console.log("filter", events_filter);
  return (
    <div className="container">
      <div className="event-holder">
        <EventsHeader events_filter={events_filter} />
        {events.length > 0 ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Event name</th>
                <th scope="col" className="text-center">
                  Date
                </th>
                <th scope="col" className="text-center">
                  Start
                </th>
                <th scope="col" className="text-center">
                  End
                </th>
                <th scope="col" className="text-center">
                  Remove event
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <Event event={event} key={event.id} />
              ))}
            </tbody>
          </table>
        ) : (
          <NoEvents events_filter={events_filter} />
        )}
      </div>
    </div>
  );
};

export default Events;
