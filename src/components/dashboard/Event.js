import moment from "moment";
import RemoveEventBtn from "./RemoveEventBtn";

const Event = ({ event }) => {
  console.log("In Event", event);
  return (
    <tr className="table-active" key={event.id}>
      <th>{event.summary}</th>
      <td>{moment(event.start.dateTime).format("ll")}</td>
      <td>{moment(event.start.dateTime).format("LT")}</td>
      <td>{moment(event.end.dateTime).format("LT")}</td>
      <td>
        <RemoveEventBtn event={event} />
      </td>
    </tr>
  );
};

export default Event;
