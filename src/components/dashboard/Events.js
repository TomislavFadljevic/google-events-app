import { useContext } from "react";
import { EventContext } from "../../contexts/EventContext";
import Event from "../dashboard/Event";

const Events = () => {
  const { events } = useContext(EventContext);
  return (
    //   { events.length === 0 ? "true" : "false" }
    <div className="container">
      <div className="event-holder">
        <div className="table-header">List of your upcoming events</div>
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
      </div>
    </div>
  );
};

export default Events;
