import { useContext } from "react";
import { EventContext } from "../../contexts/EventContext";

const RemoveEventBtn = ({ event }) => {
  const { removeEvent } = useContext(EventContext);
  return (
    <button
      className="btn btn-danger btn-sm"
      key={event.id}
      id={event.id}
      onClick={() => removeEvent(event.id)}
    >
      Remove
    </button>
  );
};

export default RemoveEventBtn;
