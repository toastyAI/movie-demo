import { usePresence, useMap } from "@roomservice/react";
import { Cursor } from "../components/Cursor";
import { useState, useEffect, useRef } from "react";

export default function MainPage() {
  const [positions, setMyPosition] = usePresence("cool-room", "positions");
  const [waitlist, setWaitlist] = useMap("cool-room", "waitlist");
  const [amIHovering, setAmIHovering] = useState(false);
  const bounding = useRef();

  const cursors = Object.entries(positions).map(([key, value]) => {
    return (
      <div
        style={{
          top: value.y,
          left: value.x,
          position: "relative",
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
    );
  });

  const areOthersHovering =
    Object.values(waitlist).length > 0 &&
    Object.values(waitlist).every((val) => !!val);

  const [movie, setMovie] = useMap("cool-room", "movie");
  useEffect(() => {
    if (!movie) return; // loading...
    if (areOthersHovering && amIHovering) {
      setMovie(movie.set("shown", true));
    } else {
      setMovie(movie.set("shown", false));
    }
  }, [areOthersHovering, amIHovering]);

  let message = "Drag your mouse here to signal you're ready!";
  if (amIHovering) {
    message = "Waiting for everyone else...";
  }
  if (areOthersHovering && !amIHovering) {
    message = "Everyone else is waiting on you!";
  }
  if (areOthersHovering && amIHovering) {
    message = "Starting....";
  }

  return (
    <div
      style={{
        height: "1024px",
        width: "720px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        fontSize: 18,
        position: "relative",
      }}
      ref={bounding}
      onMouseMove={(e) => {
        var rect = bounding.current.getBoundingClientRect();

        setMyPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
    >
      <div
        style={{
          position: "fixed",
        }}
      >
        {cursors}
      </div>
      <div
        style={{
          display: "relative",
        }}
        onMouseMove={(e) => {
          setIsInWaitlist(false);
          setAmIHovering(false);
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            opacity: movie && movie.get("shown") ? 1 : 0,
          }}
          src="https://media.giphy.com/media/aIR1vdOsUuNhe/giphy.gif"
        />
      </div>

      <div
        style={{
          justifySelf: "flex-end",
          width: "100%",
          height: 256,
          background: "#F3EAC4",
          border: "4px solid #27302D",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url("seats.png")`,
        }}
        onMouseMove={(e) => {
          setIsInWaitlist(true);
          setAmIHovering(true);
        }}
      >
        <div
          style={{
            background: "white",
            padding: 24,
            borderRadius: 8,
          }}
        >
          <h2>Seating Area</h2>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {Object.entries(waitlist).map(([key, here]) => (
          <div
            style={{
              background: here && "white",
              border: "1px solid white",
              margin: 24,
              width: 24,
              height: 24,
              borderRadius: 24,
            }}
            key={key}
          />
        ))}
      </div>
    </div>
  );
}
