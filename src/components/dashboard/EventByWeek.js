import moment from "moment";
import { useEffect } from "react";
import RemoveEventBtn from "./RemoveEventBtn";
const EventByWeek = ({
  event,
  returnDateLimits,
  setWeekStart,
  setWeekEnd,
  renderWeekRow,
  setRenderWeekRow,
  setEventStart,
}) => {
  // Time Limitations object
  const limits = returnDateLimits();
  // Date of event currently being rendered (parse into moment obj)
  const evDate = moment(event.start.dateTime);
  // End of week date (last day of the week)
  const wEnd = limits.weekEnd;
  // Boolean, renderWeek
  let renderWeek = false;

  useEffect(() => {
    if (renderWeekRow) setRenderWeekRow(false);
    // Check if current event "start" date is bigger than "weekEnd" date in limitations object
    if (evDate.isAfter(wEnd)) {
      setWeekStart(wEnd);
      const day = wEnd.day();
      setWeekEnd(wEnd.add(7 - day, "days"));
      setRenderWeekRow(true);
    }
  }, []);

  // let newWeekStart, newWeekEnd;
  // if (evDate.isAfter(wEnd)) {
  //   renderWeek = true;
  //   newWeekStart = wEnd;
  //   const day = wEnd.day();
  //   newWeekEnd = wEnd.add(7 - day, "days");
  // }

  // console.log("start:", limits.weekStart.toISOString());
  // console.log("end:", limits.weekEnd.toISOString());
  // console.log("lastDay:", limits.lastDay.toISOString());

  return (
    <>
      {renderWeekRow && (
        <tr className="table-secondary">
          <td>
            <h6>
              week{" "}
              <small className="text-muted">
                {limits.weekStart.format("ll") +
                  " - " +
                  limits.weekEnd.format("ll")}
              </small>
            </h6>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      )}
      <tr className="table-secondary" key={event.id}>
        <th>{event.summary}</th>
        <td className="text-center">
          {moment(event.start.dateTime).format("ll")}
        </td>
        <td className="text-center">
          {moment(event.start.dateTime).format("LT")}
        </td>
        <td className="text-center">
          {moment(event.end.dateTime).format("LT")}
        </td>
        <td className="text-center">
          <RemoveEventBtn event={event} />
        </td>
      </tr>
    </>
  );
};

export default EventByWeek;
