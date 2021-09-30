import { useContext, useState } from "react";
import ReactModal from "react-modal";
import { UserContext } from "../../contexts/UserContext";
import DatetimeRangePicker from "react-datetime-range-picker";
import moment from "moment";
import { EventContext } from "../../contexts/EventContext";
import { GoogleLogout } from "react-google-login";
import EventsFilter from "./EventsFilter";

ReactModal.setAppElement("#root");

const addEventStyles = {
  content: {
    width: "500px",
    height: "650px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "0px",
    border: "none",
  },
};
const logOutStyles = {
  content: {
    minWidth: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "0px",
    border: "none",
  },
};

const Navbar = () => {
  const { user, logoutSuccess, logoutFaliure } = useContext(UserContext);
  const { addEvent } = useContext(EventContext);

  // Add event modal functions
  const [eventModalIsOpen, setEventModalIsOpen] = useState(false);

  function openAddEventModal() {
    setEventModalIsOpen(true);
  }
  function closeAddEventModal() {
    setEventModalIsOpen(false);
  }

  // Logout modal functions
  const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);

  function openLogoutModal() {
    setLogoutModalIsOpen(true);
  }
  function closeLogoutModal() {
    setLogoutModalIsOpen(false);
  }

  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // Handle submit of new event
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent user errors
    if (!eventName || !startDate || !endDate) {
      alert("All fields are necessary! Please fill out the form.");
      return;
    }

    var event = {
      summary: eventName,
      start: {
        dateTime: startDate,
      },
      end: {
        dateTime: endDate,
      },
    };

    // Add event to google calendar
    addEvent(event);
    // Close modal
    closeAddEventModal();
  };

  // Input props (placeholder for dates)
  let inputProps = {
    placeholder: "Select date",
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <span className="navbar-brand">
          EVENT<span className="text-muted">APP</span>
        </span>

        <div className="navbar-collapse collapse" id="navbarColor03">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <button
                id="promptAddEventModal"
                type="button"
                className="btn btn-dark btn-sm"
                onClick={openAddEventModal}
              >
                Add event
              </button>
              <ReactModal
                isOpen={eventModalIsOpen}
                onRequestClose={closeAddEventModal}
                style={addEventStyles}
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add new event</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={closeAddEventModal}
                        aria-label="Close"
                      >
                        <span aria-hidden="true"></span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label className="col-form-label col-form-label-sm mt-4">
                            Event name
                          </label>
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            placeholder="Enter name"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="col-form-label col-form-label-sm mt-4">
                            Event start/end time
                          </label>
                          <DatetimeRangePicker
                            value="Select Date"
                            inputProps={inputProps}
                            onStartDateChange={(date) =>
                              setStartDate(moment(date).toISOString())
                            }
                            onEndDateChange={(date) =>
                              setEndDate(moment(date).toISOString())
                            }
                          />
                        </div>
                        <div className="modal-footer">
                          <input
                            type="submit"
                            className="btn btn-primary btn-sm"
                            value="Add"
                          />
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={closeAddEventModal}
                          >
                            Close
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </ReactModal>
            </li>
            <EventsFilter />
          </ul>
          <div className="d-flex">
            <ul className="navbar-nav">
              <li className="flexcenter">
                <div className="rounded-img">
                  <img
                    className="profile-img"
                    alt="profile"
                    src={user.userProfile.imageUrl}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={openLogoutModal}
                >
                  {user.userProfile.givenName}
                </button>
                <ReactModal
                  isOpen={logoutModalIsOpen}
                  onRequestClose={closeLogoutModal}
                  style={logOutStyles}
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">
                          Logged in as:{" "}
                          {user.userProfile.givenName +
                            " " +
                            user.userProfile.familyName}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={closeLogoutModal}
                          aria-label="Close"
                        >
                          <span aria-hidden="true"></span>
                        </button>
                      </div>
                      <div className="modal-body">
                        Do you want to log out of EVENTAPP?
                      </div>
                      <div className="modal-footer">
                        <GoogleLogout
                          clientId="953904536832-f9n1591em77rroae9uokdp439qluifmm.apps.googleusercontent.com"
                          buttonText="Logout"
                          onLogoutSuccess={logoutSuccess}
                          onFailure={logoutFaliure}
                        />
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={closeLogoutModal}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </ReactModal>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
