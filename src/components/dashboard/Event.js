import moment from "moment";
import RemoveEventBtn from "./RemoveEventBtn";

const Event = ({ event }) => {
  return (
    <tr className="table-secondary" key={event.id}>
      <th>{event.summary}</th>
      <td className="text-center">
        {moment(event.start.dateTime).format("ll")}
      </td>
      <td className="text-center">
        {moment(event.start.dateTime).format("LT")}
      </td>
      <td className="text-center">{moment(event.end.dateTime).format("LT")}</td>
      <td className="text-center">
        <RemoveEventBtn event={event} />
      </td>
    </tr>
  );
};

export default Event;
