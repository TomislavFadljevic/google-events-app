import { useContext } from "react";
import { EventContext } from "../../contexts/EventContext";
import Event from "../dashboard/Event";
import Week from "./Week";
import EventsHeader from "./EventsHeader";
import NoEvents from "./NoEvents";

const Events = () => {
  const { events_filter, events } = useContext(EventContext);

  return (
    <div className="container">
      <div className="event-holder">
        <EventsHeader events_filter={events_filter} />
        {events.length > 0 || Object.keys(events).length ? (
          <table className="table table-hover" id="events_table">
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
            {
              // Check if "month" (show events grouped in weeks)
              Array.isArray(events) ? (
                <tbody>
                  {events.map((event) => (
                    <Event event={event} key={event.id} />
                  ))}
                </tbody>
              ) : (
                Object.entries(events).map((week) => (
                  <Week week={week[1]} weekStart={week[0]} key={week[0]} />
                ))
              )
            }
          </table>
        ) : (
          <NoEvents events_filter={events_filter} />
        )}
      </div>
    </div>
  );
};

export default Events;
