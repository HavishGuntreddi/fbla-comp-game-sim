import React, { useState, useEffect } from "react";

const HubWorld = ({ onEnterCareer, completedCareers, isMiniGameActive }) => {
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 50 });
  const [keys, setKeys] = useState({});
  const [nearbyPortal, setNearbyPortal] = useState(null);

  // Portal positions (matching CSS positions)
  const portalPositions = {
    engineer: { x: 15, y: 85, range: 15 }, // top: 15% = y: 85% (inverted)
    nurse: { x: 85, y: 85, range: 15 },
    business: { x: 15, y: 20, range: 15 }, // bottom: 20% = y: 20%
    lawyer: { x: 85, y: 20, range: 15 },
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: true }));

      // Handle space key for entering portals - only if mini-game is not active
      if (e.key === " " && nearbyPortal && !isMiniGameActive) {
        e.preventDefault();
        handlePortalEnter(nearbyPortal);
      }
    };

    const handleKeyUp = (e) => {
      setKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [nearbyPortal, completedCareers, isMiniGameActive]);

  useEffect(() => {
    const speed = 0.5;
    const interval = setInterval(() => {
      setCharacterPosition((prev) => {
        let { x, y } = prev;

        if (keys["arrowup"] || keys["w"]) {
          y = Math.min(85, y + speed);
        }
        if (keys["arrowdown"] || keys["s"]) {
          y = Math.max(15, y - speed);
        }
        if (keys["arrowleft"] || keys["a"]) {
          x = Math.max(5, x - speed);
        }
        if (keys["arrowright"] || keys["d"]) {
          x = Math.min(95, x + speed);
        }

        return { x, y };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [keys]);

  // Check proximity to portals
  useEffect(() => {
    let closestPortal = null;
    let closestDistance = Infinity;

    Object.entries(portalPositions).forEach(([careerType, portalPos]) => {
      const distance = Math.sqrt(
        Math.pow(characterPosition.x - portalPos.x, 2) +
          Math.pow(characterPosition.y - portalPos.y, 2),
      );

      if (distance < portalPos.range && distance < closestDistance) {
        closestDistance = distance;
        closestPortal = careerType;
      }
    });

    setNearbyPortal(closestPortal);
  }, [characterPosition]);

  const handlePortalEnter = (careerType) => {
    if (completedCareers.has(careerType)) {
      return; // Silently ignore if already completed
    }
    onEnterCareer(careerType);
  };

  const handlePortalClick = (careerType) => {
    handlePortalEnter(careerType);
  };

  return (
    <div className="hub-world">
      <h2 className="hub-title">🌟 CAREER HUB</h2>

      <div
        className="character"
        style={{
          left: `${characterPosition.x}%`,
          bottom: `${characterPosition.y}%`,
        }}
      >
        <div className="character-sprite"></div>
      </div>

      {/* Proximity indicator */}
      {nearbyPortal && !completedCareers.has(nearbyPortal) && (
        <div
          className="proximity-indicator"
          style={{
            position: "absolute",
            left: `${characterPosition.x}%`,
            bottom: `${characterPosition.y + 8}%`,
            transform: "translateX(-50%)",
            background: "rgba(0, 217, 255, 0.95)",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            fontFamily: "Space Mono, monospace",
            fontSize: "0.9rem",
            fontWeight: "bold",
            zIndex: 60,
            boxShadow: "0 5px 20px rgba(0, 217, 255, 0.5)",
            animation: "bounce 0.6s ease-in-out infinite",
            whiteSpace: "nowrap",
          }}
        >
          Press SPACE to enter
        </div>
      )}

      <div
        className={`portal engineer ${completedCareers.has("engineer") ? "completed" : ""}`}
        onClick={() => handlePortalClick("engineer")}
      >
        <div className="portal-glow"></div>
        <div className="portal-icon">💻</div>
        <div className="portal-label">Software Engineer</div>
      </div>

      <div
        className={`portal nurse ${completedCareers.has("nurse") ? "completed" : ""}`}
        onClick={() => handlePortalClick("nurse")}
      >
        <div className="portal-glow"></div>
        <div className="portal-icon">❤️</div>
        <div className="portal-label">Nurse</div>
      </div>

      <div
        className={`portal business ${completedCareers.has("business") ? "completed" : ""}`}
        onClick={() => handlePortalClick("business")}
      >
        <div className="portal-glow"></div>
        <div className="portal-icon">📊</div>
        <div className="portal-label">Business Analyst</div>
      </div>

      <div
        className={`portal lawyer ${completedCareers.has("lawyer") ? "completed" : ""}`}
        onClick={() => handlePortalClick("lawyer")}
      >
        <div className="portal-glow"></div>
        <div className="portal-icon">⚖️</div>
        <div className="portal-label">Lawyer</div>
      </div>

      <div className="hub-instructions">
        Use <strong>ARROW KEYS</strong> or <strong>WASD</strong> to move • Walk
        to portals and press <strong>SPACE</strong> to enter
      </div>
    </div>
  );
};

export default HubWorld;
