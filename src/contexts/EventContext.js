import { createContext, useState, useEffect } from "react";

export const EventContext = createContext();

const EventContextProvider = (props) => {
  const [events, setEvents] = useState([]);

  // Google Events

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  function handleClientLoad() {
    window.gapi.load("client:auth2", () => {
      console.log("Client loaded!!");

      window.gapi.client.init({
        apiKey: "AIzaSyC3JqOLPmTmouQX9kBuKI0OfCYCnP1I9O4",
        clientId:
          "953904536832-f9n1591em77rroae9uokdp439qluifmm.apps.googleusercontent.com",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/calendar.events",
      });

      window.gapi.client.load("calendar", "v3", () => {
        console.log("Calendar loaded!!");
        //   List events after calendar is loaded
        listUpcomingEvents();
      });
    });
  }

  useEffect(() => {
    //   On app render call
    handleClientLoad();
  }, []);

  // Function called to fetch users google calendar events
  const listUpcomingEvents = () => {
    window.gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      })
      .then(function (response) {
        var events = response.result.items;
        console.log("Events:", events);
        // Set events
        setEvents([...events]);
      });
  };

  //   Insert new event
  const addEvent = () => {
    var event = {
      summary: "Awesome Event!",
      start: {
        dateTime: "2021-09-30T09:00:00-07:00",
      },
      end: {
        dateTime: "2021-09-30T17:00:00-07:00",
      },
    };

    var request = window.gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    request.execute((event) => {
      console.log(event);
      // Update events in state
      setEvents([...events, event]);
    });
  };

  //   Remove event
  const removeEvent = (id) => {
    var request = window.gapi.client.calendar.events.delete({
      calendarId: "primary",
      eventId: id,
    });
    request.execute(function (response) {
      if (response.error || response == false) {
        alert("Oops, something went wrong!");
      } else {
        // Filter out deleted event from "events" array
        const filteredEvents = events.filter((event) => event.id === id);
        setEvents([...filteredEvents]);
      }
    });
  };

  return (
    <EventContext.Provider value={{ events, addEvent, removeEvent }}>
      {props.children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
