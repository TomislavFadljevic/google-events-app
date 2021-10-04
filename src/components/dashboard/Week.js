import moment from "moment";
import Event from "./Event";
const Week = ({ week, weekStart }) => {
  console.log("weekStart:", weekStart);
  return (
    <tbody key={weekStart}>
      <tr className="table-secondary week-start-end">
        <td>
          <h6>
            week{" "}
            <small className="text-muted">
              {moment(weekStart).format("ll") +
                " - " +
                moment(weekStart).add("7", "days").format("ll")}
            </small>
          </h6>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      {week.map((event) => (
        <Event event={event} key={event.id} />
      ))}
    </tbody>
  );
};

export default Week;
