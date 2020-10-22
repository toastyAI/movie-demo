import { usePresence } from "@roomservice/react";
import { useEffect, useState } from "react";
import { Cursor } from "../components/Cursor";

function useMouseCursors(room) {
  const [positions, setMyPosition] = usePresence(room, "positions");

  useEffect(() => {
    function mousemove(e) {
      setMyPosition({
        x: e.clientX,
        y: e.clientY,
      });
    }

    document.addEventListener("mousemove", mousemove);
    return () => document.removeEventListener("mousemove", mousemove);
  }, []);

  return positions;
}

export default function MainPage() {
  const positions = useMouseCursors("cool-room");
  const [waitlist, setIsInWaitlist] = usePresence("cool-room", "is_waiting");
  const [isHovering, setIsHovering] = useState(false);

  const cursors = Object.entries(positions).map(([key, value]) => (
    <div
      style={{
        top: value.y,
        left: value.x,
        position: "absolute",
        transition: "all 0.25s",
      }}
    >
      <Cursor />
      <img
        src="kevin.jpg"
        style={{
          width: 48,
          height: 48,
          borderRadius: 1000,
        }}
      />
    </div>
  ));

  const totalWaitlist = Object.values(waitlist).concat([isHovering]);

  const isReadyToStartMeeting =
    totalWaitlist.length !== 0 &&
    totalWaitlist.every((value) => value === true);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontSize: 18,
        position: "relative",
      }}
    >
      <div
        style={{
          flex: 1,
        }}
      >
        {cursors}

        <pre>{JSON.stringify(positions)}</pre>
        <pre>{JSON.stringify(waitlist)}</pre>

        <pre>{JSON.stringify(Object.values(totalWaitlist))}</pre>

        {isReadyToStartMeeting ? (
          <img src="https://media.giphy.com/media/KEVNWkmWm6dm8/giphy.gif" />
        ) : (
          <img src="https://media.giphy.com/media/a9xhxAxaqOfQs/giphy.gif" />
        )}
      </div>

      <div
        style={{
          justifySelf: "flex-end",
          width: "100%",
          height: 256,
          background: "#F3EAC4",
          borderTop: "4px solid #27302D",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onMouseEnter={() => {
          setIsHovering(true);
          setIsInWaitlist(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
          setIsInWaitlist(false);
        }}
      >
        "Waiting Room"
      </div>
    </div>
  );
}
