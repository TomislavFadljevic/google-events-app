import { useContext } from "react";
import { EventContext } from "../../contexts/EventContext";

const AddEventBtn = () => {
  const { addEvent } = useContext(EventContext);
  return <button onClick={addEvent}>Add Event</button>;
};

export default AddEventBtn;
