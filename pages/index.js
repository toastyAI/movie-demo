import { usePresence } from "@roomservice/react";
import { Cursor } from "../components/Cursor";
import { useStartTyping } from "react-use";
import { useState, useEffect } from "react";

export default function MainPage() {
  const [positions, setMyPosition] = usePresence("cool-room", "positions");
  const [waitlist, setIsInWaitlist] = usePresence("cool-room", "is_waiting");
  const [amIHovering, setAmIHovering] = useState(false);

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

  const areOthersHovering =
    Object.values(waitlist).length > 0 &&
    Object.values(waitlist).every((val) => !!val);

  let message = "Drag your mouse here to signal you're ready!";
  if (areOthersHovering) {
    message = "Everyone else is waiting on you!";
  }

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
        onMouseMove={(e) => {
          setIsInWaitlist(false);
          setAmIHovering(false);
          setMyPosition({
            x: e.clientX,
            y: e.clientY,
          });
        }}
      >
        {cursors}
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
        onMouseMove={(e) => {
          setIsInWaitlist(true);
          setAmIHovering(true);
          setMyPosition({
            x: e.clientX,
            y: e.clientY,
          });
        }}
      >
        {message}
      </div>
    </div>
  );
}
