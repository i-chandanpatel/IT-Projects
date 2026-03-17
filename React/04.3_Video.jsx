import { useRef } from "react"

/*
  ==========================================================
  COMPONENT : Video (with full controls)
  ==========================================================

  This component demonstrates controlling a <video> element
  in React using the useRef hook. Now it includes:
  - Start
  - Pause
  - Restart
  - +10 seconds
  - -10 seconds
*/

export function Video() {

    // Reference to the video DOM element
    const videoRef = useRef(null);

    // Start video playback
    function handleStart() {
        videoRef.current.play();
    }

    // Pause video playback
    function handleStop() {
        videoRef.current.pause();
    }

    // Restart video from the beginning
    function handleRestart() {
        videoRef.current.currentTime = 0;
        videoRef.current.play(); // optional: play immediately after restart
    }

    // Jump forward 10 seconds
    function handleForward() {
        /*
          currentTime is in seconds.
          Adding 10 moves the playback forward.
          If it exceeds video duration, video will stop at the end.
        */
        videoRef.current.currentTime += 10;
    }

    // Jump backward 10 seconds
    function handleBackward() {
        /*
          Subtract 10 seconds.
          If currentTime < 0, it will stay at 0.
        */
        videoRef.current.currentTime -= 10;
        if (videoRef.current.currentTime < 0) {
            videoRef.current.currentTime = 0;
        }
    }

    return (
        <>
            {/* Video element */}
            <video
                ref={videoRef}
                src="" // replace with actual video URL
                width={300}
                height="300"
                controls // optional: shows default video controls
            ></video>

            <div style={{ marginTop: "10px" }}>
                {/* Buttons trigger video control functions */}
                <button onClick={handleStart}>Start</button>
                <button onClick={handleStop}>Pause</button>
                <button onClick={handleRestart}>Restart</button>
                <button onClick={handleForward}>+10 Sec</button>
                <button onClick={handleBackward}>-10 Sec</button>
            </div>
        </>
    )
}

/*
  ==========================================================
  KEY CONCEPTS DEMONSTRATED
  ==========================================================

  1️⃣ useRef
  ----------
  - Stores a mutable reference to the video DOM node
  - Does not trigger re-renders
  - Accessed via videoRef.current

  2️⃣ Video element methods
  ------------------------
  - play(): start playback
  - pause(): pause playback
  - currentTime: get/set playback position in seconds

  3️⃣ Implementing custom controls
  -------------------------------
  - You can manipulate currentTime to jump forward/backward
  - You can restart the video by setting currentTime = 0

  4️⃣ Practical use cases
  ----------------------
  - Custom video players with advanced controls
  - Training/tutorial videos with skip or replay features
  - Interactive apps where precise timing matters
*/
