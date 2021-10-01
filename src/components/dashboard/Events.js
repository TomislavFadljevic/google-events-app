import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { EventContext } from "../../contexts/EventContext";
import Event from "../dashboard/Event";
import EventByWeek from "./EventByWeek";
import EventsHeader from "./EventsHeader";
import NoEvents from "./NoEvents";

const Events = () => {
  const { events_filter, events } = useContext(EventContext);

  const [weekStart, setWeekStart] = useState();
  const [weekEnd, setWeekEnd] = useState();
  const [renderWeekRow, setRenderWeekRow] = useState(false);

  let start = moment(new Date()).utcOffset(0);
  start.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

  // Set weekStart/weekEnd on load of page (This week)
  useEffect(() => {
    setInitialLimits();
  }, []);

  const setInitialLimits = () => {
    // Start
    let wStart = moment(new Date()).utcOffset(0);
    wStart.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    setWeekStart(wStart);
    // End
    let day = wStart.day();
    let wEnd = moment(new Date()).utcOffset(0);
    wEnd.set({ hour: 23, minute: 59, second: 59, millisecond: 0 });
    wEnd.add(7 - day, "days");
    setWeekEnd(wEnd);

    // console.log("s", wStart.toISOString());
    // console.log("e", wEnd.toISOString());
    // console.log("l", limit.toISOString());
  };

  function returnDateLimits() {
    return {
      weekStart: weekStart,
      weekEnd: weekEnd,
    };
  }
  return (
    <div className="container">
      <div className="event-holder">
        <EventsHeader events_filter={events_filter} />
        {events.length > 0 ? (
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
            <tbody>
              {events_filter === "month" && (
                <tr className="table-secondary">
                  <td>
                    <h6>
                      week <small className="text-muted">This week</small>
                    </h6>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
              {
                // Check if "month" (show events grouped in weeks)
                events_filter !== "month"
                  ? events.map((event) => (
                      <Event event={event} key={event.id} />
                    ))
                  : events.map((event) => (
                      <EventByWeek
                        event={event}
                        key={event.id}
                        returnDateLimits={returnDateLimits}
                        setWeekStart={setWeekStart}
                        setWeekEnd={setWeekEnd}
                        renderWeekRow={renderWeekRow}
                        setRenderWeekRow={setRenderWeekRow}
                      />
                    ))
              }
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
