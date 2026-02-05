import { useEffect, useLayoutEffect, useState } from "react";
import TaskModal from "../components/TaskModal";
import secureLocalStorage from "react-secure-storage";
interface Task {
  label: string;
  description: string;
  title: string;
  resources: string[];
  for: string;
}

interface Props {
  selectedSubDomain: string;
  setSelectedSubDomain: React.Dispatch<React.SetStateAction<string>>;
}
// const DesignTask = ({ selectedSubDomain, setSelectedSubDomain }: Props) => {
//   const [filteredTasks, setFilteredTask] = useState<Task[]>([]);
//   useEffect(() => {
//     const filteredTask = designTaskData.filter(
//       (task) => task.label === selectedSubDomain
//     );
//     if (filteredTask) {
//       setFilteredTask(filteredTask);
//     }
//   }, [selectedSubDomain]);
const DesignTask = ({ selectedSubDomain, setSelectedSubDomain }: Props) => {
  const [filteredTasks, setFilteredTask] = useState<Task[]>([]);
  const [isSC, setIsSC] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  // const [showModal, setShowModal] = useState(false);
  // const [taskState, setTaskState] = useState("");
  useEffect(() => {
    // Based on the subdomain we are filtering the task
    const filteredTask = designTaskData.filter(
      (task) =>
        task.label === selectedSubDomain
       //&&(isSC === true ? task.for === "senior" : task.for === "junior")
    );
    //console.log("hello",isSC)
    if (filteredTask) {
      setFilteredTask(filteredTask);
    }
  }, [selectedSubDomain, isSC]);
  useLayoutEffect(() => {
    try {
      const userDetailsstore = secureLocalStorage.getItem("userDetails");
      if (!userDetailsstore || typeof userDetailsstore !== "string") {
        setIsSC(false);
        return;
      }
      const userDetails = JSON.parse(userDetailsstore);
      setIsSC(Boolean(userDetails?.data?.isSC));
    } catch {
      setIsSC(false);
    }
  }, []);

  return (
    <div
      className={`w-full h-full overflow-y-hidden -task-container ${
        selectedSubDomain === "" ? "flex items-center" : ""
      }`}
    >
      {selectedSubDomain === "" && (
        <div className="flex justify-center flex-wrap w-full gap-2 md:gap-3">
          <button
            type="button"
            onClick={() => setSelectedSubDomain("poster")}
            className="nes-btn is-error w-[47%] md:w-[22%] py-3 md:py-4 custom-nes-error text-xs hover:scale-105 transition-transform duration-200"
          >
            Graphic Design
          </button>
          <button
            type="button"
            onClick={() => setSelectedSubDomain("ui")}
            className="nes-btn is-error w-[47%] md:w-[22%] py-3 md:py-4 custom-nes-error text-xs hover:scale-105 transition-transform duration-200"
          >
            UI/UX
          </button>
          <button
            type="button"
            onClick={() => setSelectedSubDomain("video")}
            className="nes-btn is-error w-[47%] md:w-[22%] py-3 md:py-4 custom-nes-error text-xs hover:scale-105 transition-transform duration-200"
          >
            Video Editing
          </button>
        </div>
      )}

      {selectedSubDomain !== "" && (
        <div className="task-list-container">
          <div className="task-list-header">
            <span className="task-list-count">{filteredTasks.length} Tasks Available</span>
          </div>
          <div className="task-list-grid">
            {filteredTasks.map((task, index) => (
              <div
                className="task-item"
                key={index}
                onClick={() => {
                  setActiveTask(task);
                  setShowModal(true);
                }}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="task-item-header">
                  <span className="task-item-number">Task {index + 1}</span>
                  <span className="task-item-badge">{task.for === "senior" ? "SC" : "Jr"}</span>
                </div>
                <h3 className="task-item-title">{task.title}</h3>
                {task.resources && task.resources.length > 0 && (
                  <div className="task-item-resources">
                    📎 {task.resources.length} resource{task.resources.length > 1 ? 's' : ''}
                  </div>
                )}
                <div className="task-item-footer">
                  <span className="task-item-cta">View Details →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showModal && activeTask && (
        <TaskModal
          task={activeTask}
          onClose={() => {
            setShowModal(false);
            setActiveTask(null);
          }}
        />
      )}
    </div>
  );
};

export default DesignTask;

const designTaskData: Task[] = [
  {
    label: "ui",
    title:
      "Recommendation Engine UI",
    description:
      "Create a sleek, context-aware interface for a recommendation engine that suggests media based on current mood, time availability, and social trends.\n\nBase Requirements: 1) Contextual Logic: Filtering systems for mood-based discovery and time-constrained viewing options.\n2) Social Integration: UI elements that highlight friend activity and community-driven suggestions.\n\nDeliverables: 1) Interactive Wireframes: Key screens for recommendation flows, browsing, and user preference settings.\n2) Engagement Suite: Designs for quick recommendation cards and a streamlined onboarding process.",
    resources: [],
    for: "senior",
  },
  {
    label: "ui",
    title:
      "Food Delivery App UI",
    description:
      "Simplify a high-friction food delivery interface by stripping away cognitive overload and streamlining the path to purchase.\n\nBase Requirements: 1) Information Architecture: Strategic reduction of visual noise in dense menus and restaurant listings.\n2) Frictionless Navigation: A logical, high-clarity ordering journey that prioritizes speed and readability.\n\nDeliverables:1) High-Clarity Layouts: Redesigned screens for the home feed, restaurant cards, and live order tracking.\n2) Refined Component Set: A simplified design system for menu browsing and status indicators.",
    resources: [],
    for: "junior",
  },
  {
    label: "ui",
    title: "Student Wellness App UI",
    description:
      "Design a calming, gamified UI/UX for a student wellness app focused on habit building and mood tracking.\n\nBase Requirements: 1) Engagement Mechanics: Integration of streaks, rewards, and 'wellness quests' to drive habit consistency.\n2) Aesthetic Identity: A minimal, calming interface optimized for student stress reduction and simple navigation.\n\nDeliverables: 1) Core Wireframes: Mid-fidelity screens for the dashboard, habit tracker, and motivation hub.\n2) Functional Flow: A streamlined onboarding process and integrated mood-logging interface.",
    resources: [],
    for: "junior",
  },
  {
    label: "video",
    title: "Mood Montage",
    description:
      "Your task is to create a video sequence that conveys a very specific mood or vibe, (e.g., Cyberpunk, Vintage 90s, or Melancholic Rainy Day). You may use your own footage or copyright free stock footage. The focus should be on how the visual style makes the viewer feel. Time Limit: Min 15 seconds - Max 30 seconds.\n\nExample: A video of the college campus at sunset, edited with warm, golden tones and soft visuals to create a nostalgic and peaceful feeling.",
    resources: [],
    for: "junior",
  },
  {
    label: "video",
    title: "Technical Teaser",
    description:
      "Your task is to create a high energy teaser video for an imaginary tech fest. Select a fast paced music track and edit footage so that the visuals change or react perfectly to the rhythm of the music.\nTime Limit: Min 30 seconds - Max 45 seconds.\n\nExample: A compilation of gaming or coding clips where every time the bass drops or the drum hits in the song, the video cuts to a new scene instantly.",
    resources: [],
    for: "senior",
  },
  {
    label: "video",
    title: "Animated Annotations",
    description:
      "Your task is to explain a simple tech concept (like 'What is a Browser?' or 'Open Source') using primarily text and simple background elements. You do not need to film yourself, focus on how the text moves and appears on the screen.\nTime Limit: Min 15 seconds - Max 30 seconds.\n\nExample: A video where the words Fast,Secure, and Private fly onto the screen and animate in time with the background music. ",
    resources: [],
    for: "senior",
  },
  {
    label: "video",
    title: "Regular Remixing",
    description:
      "Description: Your task is to record a short video of a daily activity (like walking to class or making coffee) but remove the original audio. You must then add sound effects (footsteps, wind, pouring sounds) from scratch to make it sound realistic and immersive.\nTime Limit: Min 20 seconds - Max 40 seconds.\n\nExample: A video of someone typing on a keyboard, where you have added exaggerated, crisp 'click-clack' sounds and the subtle hum of a computer fan to enhance the experience.",
    resources: [],
    for: "junior",
  },

  {
    label: "poster",
    title: "Lyrical Layout",
    description:
      "Design a poster that translates the song’s mood, energy, and emotion into visual form. Use colour, typography, and abstract or symbolic elements to capture the atmosphere of the music. Your poster should feel like the song brought to life through graphics, expressing its vibe in a bold and creative way.",
    resources: [],
    for: "junior",
  },
  {
    label: "poster",
    title: "Creative Characterization",
    description:
      "Your task is to craft a poster that visually represents your personal design identity. This may include your interests, aesthetic preferences, inspirations, or future aspirations. Use typography, shapes, textures, or illustrations that express who you are as a designer. The composition should be visually balanced, memorable, and reflective of your unique style. Include a short rationale describing the symbolism or choices behind your poster, and be prepared to discuss your creative approach during evaluation.",
    resources: [],
    for: "junior",
    
  },
  {
    label: "poster",
    title: "Paradoxical Portrait",
    description:
      "Choose any contrasting pair (for e.g. - order vs. chaos, light vs. dark, or technology vs. nature) and reinterpret these ideas through a single cohesive composition. Use contrasting colours, balanced layouts, or mirrored elements to highlight the differences between the two themes while maintaining overall harmony. Ensure your poster feels visually striking, conceptually clear, and creatively expressive of the duality you selected.",
    resources: [],
    for: "senior",
    
  },
];
