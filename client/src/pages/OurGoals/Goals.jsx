import React from "react";
import "./Goal.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const goals = [
  {
    title: "Innovation",
    description: "Continuously innovate to stay ahead in our industry.",
    icon: "💡",
  },
  {
    title: "Effectiveness",
    description: "Deliver solutions that are both efficient and impactful to meet objectives seamlessly.",
    icon: "🚀",
  },
  {
    title: "Uniqueness",
    description: "Stand out by offering creative solutions and distinctive value in all we do.",
    icon: "🌟",
  },
];

function Goal() {
  return (
    <>
    <div className="app">
      <header className="goaltitle">
        <h1>Our Company Goals</h1>
      </header>
      <main className="main">
        <div className="goals-container">
          {goals.map((goal, index) => (
            <div className="goal-card" key={index}>
              <div className="goal-icon">{goal.icon}</div>
              <h2>{goal.title}</h2>
              <p>{goal.description}</p>
            </div>
          ))}
        </div>
      </main>

    </div>

    </>
  );

}

export default Goal;
