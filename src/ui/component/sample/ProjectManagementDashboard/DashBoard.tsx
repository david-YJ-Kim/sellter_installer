/* eslint-disable prettier/prettier */
import React from 'react';
import './DashBoard.css';

// REF
// https://codepen.io/aybukeceylan/pen/OJRNbZp

function AppSidBar() {
  return (
    <div className="app-sidebar">
      <a href="" className="app-sidebar-link active">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-home"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </a>
      <a href="" className="app-sidebar-link">
        <svg
          className="link-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="feather feather-pie-chart"
          viewBox="0 0 24 24"
        >
          <defs />
          <path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z" />
        </svg>
      </a>
      <a href="" className="app-sidebar-link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-calendar"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </a>
      <a href="" className="app-sidebar-link">
        <svg
          className="link-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="feather feather-settings"
          viewBox="0 0 24 24"
        >
          <defs />
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      </a>
    </div>
  );
}

function ItemStatus(props) {
  return (
    <div className="item-status">
      <span className="status-number">{props.number}</span>
      <span className="status-type">{props.type}</span>
    </div>
  );
}

function ProjectBoxWrapper(props) {
  return (
    <div className="project-box-wrapper">
      <div className="project-box">
        <div className="project-box-header">
          <span>{props.date}</span>
          <div className="more-wrapper">
            <button className="project-btn-more">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-more-vertical"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
          </div>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">{props.header}</p>
          <p className="box-content-subheader">{props.subHeader}</p>
        </div>
        <div className="box-progress-wrapper">
          <p className="box-progress-header">{props.status}</p>
          <div className="box-progress-bar">
            <span
              className="box-progress"
              style={{ width: props.percentage, color: props.color }}
            />
          </div>
          <p className="box-progress-percentage">${props.percentage}</p>
        </div>
        <div className="project-box-footer">
          <div className="participants">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
              alt="participant"
            />
            <img
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
              alt="participant"
            />
            <button className="add-participant" style={{ color: props.color }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-plus"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
          <div className="days-left" style={{ color: props.color }}>
            {props.dayLeft}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectSection(props) {
  return (
    <div className="projects-section">
      <div className="projects-section-header">
        <p>{props.title}</p>
        <p className="time">{props.today}</p>
      </div>
      <div className="projects-section-line">
        <div className="projects-status">
          <ItemStatus number="45" type="In Progress"></ItemStatus>
          <ItemStatus number="24" type="Upcoming"></ItemStatus>
          <ItemStatus number="62" type="Total Projects"></ItemStatus>
        </div>
        <div className="view-actions">
          <button className="view-btn list-view" title="List View">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-list"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
          <button className="view-btn grid-view active" title="Grid View">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-grid"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>
        </div>
      </div>
      <div className="project-boxes jsGridView">
        <ProjectBoxWrapper
          date="December 10, 2020"
          color="#ff942e"
          header="Web Designing"
          subHeader="Prototyping"
          status="Progress"
          percentage="60%"
          dayLeft="2 Days Left"
        ></ProjectBoxWrapper>

        <ProjectBoxWrapper
          date="December 10, 2020"
          color="#4f3ff0"
          header="Testing"
          subHeader="Prototyping"
          status="Progress"
          percentage="50%"
          dayLeft="2 Days Left"
        ></ProjectBoxWrapper>

        <ProjectBoxWrapper
          date="December 10, 2020"
          color="#096c86"
          header="Svg Animations"
          subHeader="Prototyping"
          status="Progress"
          percentage="80%"
          dayLeft="2 Days Left"
        ></ProjectBoxWrapper>

        <ProjectBoxWrapper
          date="December 10, 2020"
          color="#34c471"
          header="Data Analysis"
          subHeader="Prototyping"
          status="Progress"
          percentage="60%"
          dayLeft="2 Days Left"
        ></ProjectBoxWrapper>

        <ProjectBoxWrapper
          date="December 10, 2020"
          color="#4067f9"
          header="Svg Animations"
          subHeader="Prototyping"
          status="Progress"
          percentage="40%"
          dayLeft="2 Days Left"
        ></ProjectBoxWrapper>
      </div>
    </div>
  );
}

function MessageBox(props) {
  return (
    <div className="message-box">
      <img
        src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
        alt="profile image"
      />
      <div className="message-content">
        <div className="message-header">
          <div className="name">{props.name}</div>
          <div className="star-checkbox">
            <input type="checkbox" id="star-2" />
            <label htmlFor="star-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-star"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </label>
          </div>
        </div>
        <p className="message-line">{props.content}</p>
        <p className="message-line time">{props.date}</p>
      </div>
    </div>
  );
}
function MessagsSection(props) {
  return (
    <div className="messages-section">
      <button className="messages-close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-x-circle"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </button>
      <div className="projects-section-header">
        <p>{props.title}</p>
      </div>
      <div className="messages">
        <MessageBox
          name="Stephanie"
          content="I got your first assignment. It was quite good. 🥳 We can continue
          with the next assignment."
          date="Dec, 12"
        ></MessageBox>

        <MessageBox
          name="Mark"
          content="Hey, can tell me about progress of project? I'm waiting for your
          response."
          date="Dec, 12"
        ></MessageBox>

        <MessageBox
          name="David"
          content="Awesome! 🤩 I like it. We can schedule a meeting for the next one."
          date="Dec, 12"
        ></MessageBox>

        <MessageBox
          name="Jessica"
          content="I am really impressed! Can't wait to see the final result."
          date="Dec, 11"
        ></MessageBox>
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <div className="app-content">
      <AppSidBar />
      <ProjectSection title="Projects" today="December, 12" />
      <MessagsSection title="Clinet Message" />
    </div>
  );
}

export default AppContent;
