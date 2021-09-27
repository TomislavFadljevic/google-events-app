import { useContext } from "react";
import { EventContext } from "../../contexts/EventContext";

const RemoveEventBtn = ({ event }) => {
  const { removeEvent } = useContext(EventContext);
  return (
    <button key={event.id} id={event.id} onClick={() => removeEvent(event.id)}>
      Remove
    </button>
  );
};

export default RemoveEventBtn;
