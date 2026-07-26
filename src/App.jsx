import React, { useState, useEffect } from 'react';
import './App.css';

// STORE ALL SYLLABUS DATA IN ONE PLACE
const SYLLABUS_DATA = {
  English: [
    {
      title: "English Topics",
      topics: [
        "Reading and comprehension",
        "Writer's effect",
        "Summary",
        "Text Analysis",
        "Directed Writing",
        "Composition"
      ]
    }
  ],
  Enterprise: [
    {
      title: "Enterprise Topics",
      topics: [
        "Introduction to enterprise",
        "Setting up a new enterprise",
        "Enterprise skills",
        "Enterprise opportunities, risk, legal obligations and ethical considerations",
        "Negotiation",
        "Finance",
        "Business planning",
        "Markets and customers",
        "Help and support for enterprise",
        "Communication"
      ]
    }
  ],
  French: [
    {
      title: "French Topics",
      topics: [
        "Everyday activities",
        "Personal and social life",
        "The world around us",
        "The world of work",
        "The international world"
      ]
    }
  ],
  History: [
    {
      title: "Core Content: Option B",
      topics: [
        "Was the Treaty of Versailles fair?",
        "To what extent was the League of Nations a success?",
        "How far was Hitler’s foreign policy to blame for the outbreak of war in Europe in 1939?",
        "Who was to blame for the Cold War?",
        "How effectively did the United States contain the spread of communism?",
        "How secure was the USSR’s control over Eastern Europe, 1948–c.1989?"
      ]
    },
    {
      title: "Germany Depth Study",
      topics: [
        "Was the Weimar Republic doomed from the start?",
        "Why was Hitler able to dominate Germany by 1934?",
        "How effectively did the Nazis control Germany, 1933–45?",
        "What was it like to live in Nazi Germany?"
      ]
    }
  ],
  ICT: [
    {
      title: "Theory Content",
      topics: [
        "Types and components of a computer system",
        "Input and output devices",
        "Storage devices and media",
        "Networks and the effects of using them",
        "The effects of using IT",
        "ICT applications",
        "System analysis and design",
        "Safety and security",
        "Audience",
        "Communication"
      ]
    },
    {
      title: "Practical Content",
      topics: [
        "File management",
        "Images",
        "Layout",
        "Styles",
        "Proofing",
        "Graphs and charts",
        "Document production",
        "Databases",
        "Presentations",
        "Spreadsheets",
        "Website authoring"
      ]
    }
  ],
  Science: [
    {
      title: "Biology",
      topics: [
        "B1 Characteristics of living organisms",
        "B2 Cells",
        "B3 Movement into and out of cells",
        "B4 Biological molecules",
        "B5 Enzymes",
        "B6 Plant nutrition",
        "B7 Human nutrition",
        "B8 Transport in plants",
        "B9 Transport in animals",
        "B10 Diseases and immunity",
        "B11 Gas exchange in humans",
        "B12 Respiration",
        "B13 Coordination and response",
        "B14 Drugs",
        "B15 Reproduction",
        "B16 Inheritance",
        "B17 Variation and selection",
        "B18 Organisms and their environment",
        "B19 Human influences on ecosystems"
      ]
    },
    {
      title: "Chemistry",
      topics: [
        "C1 States of matter",
        "C2 Atoms, elements and compounds",
        "C3 Stoichiometry",
        "C4 Electrochemistry",
        "C5 Chemical energetics",
        "C6 Chemical reactions",
        "C7 Acids, bases and salts",
        "C8 The Periodic Table",
        "C9 Metals",
        "C10 Chemistry of the environment",
        "C11 Organic chemistry",
        "C12 Experimental techniques and chemical analysis"
      ]
    },
    {
      title: "Physics",
      topics: [
        "P1 Motion, forces and energy",
        "P2 Thermal physics",
        "P3 Waves",
        "P4 Electricity and magnetism",
        "P5 Nuclear physics",
        "P6 Space physics"
      ]
    }
  ],
  Maths: [
    {
      title: "Maths Topics",
      topics: [
        "Number",
        "Algebra and graphs",
        "Coordinate geometry",
        "Geometry",
        "Mensuration",
        "Trigonometry",
        "Transformations and vectors",
        "Probability",
        "Statistics"
      ]
    }
  ]
};

function App() {
  // ZONE 1: STATE MANAGEMENT 🧠

  // Navigation & Subject selection
  const [page, setPage] = useState('home');
  const [selectedSubject, setSelectedSubject] = useState(null);

  // 1. Completed topics state with LocalStorage
  const [completedTopics, setCompletedTopics] = useState(() => {
    const saved = localStorage.getItem('igcse_completed_topics');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Form inputs state for Record feature
  const [inputDate, setInputDate] = useState('');
  const [inputSubject, setInputSubject] = useState('');

  // 3. Study records state with LocalStorage
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem('igcse_study_records');
    return saved ? JSON.parse(saved) : [];
  });

  // LOCAL STORAGE EFFECTS 💾
  useEffect(() => {
    localStorage.setItem('igcse_completed_topics', JSON.stringify(completedTopics));
  }, [completedTopics]);

  useEffect(() => {
    localStorage.setItem('igcse_study_records', JSON.stringify(records));
  }, [records]);

  // FLIPDOWN.JS INITIALIZATION EFFECT ⏱️
  useEffect(() => {
    if (page === 'countdown') {
      // 1. Target date in Unix timestamp (seconds) for 24 September 2026
      const examTimestamp = Math.floor(new Date('2026-09-24T00:00:00').getTime() / 1000);

      // 2. Clear element to avoid duplicate clocks when switching views
      const container = document.getElementById('flipdown');
      if (container) {
        container.innerHTML = '';
      }

      // 3. Instantiate FlipDown if CDN script is loaded
      if (window.FlipDown) {
        new window.FlipDown(examTimestamp, 'flipdown', {
          theme: 'dark'
        })
          .start()
          .ifEnded(() => {
            console.log('Exams have started!');
          });
      }
    }
  }, [page]);

  // ZONE 2: HANDLER FUNCTIONS ⚡
  const openSubject = (subjectName) => {
    setSelectedSubject(subjectName);
    setPage('tracker');
  };

  const toggleTopic = (inputId) => {
    if (completedTopics.includes(inputId)) {
      setCompletedTopics(completedTopics.filter(id => id !== inputId));
    } else {
      setCompletedTopics([...completedTopics, inputId]);
    }
  };

  const addRecord = () => {
    if (!inputDate || !inputSubject) return;
    
    const newRecord = { date: inputDate, subject: inputSubject };
    setRecords([...records, newRecord]);

    setInputDate('');
    setInputSubject('');
  };

  const deleteRecord = (indexToRemove) => {
    setRecords(records.filter((_, index) => index !== indexToRemove));
  };

  // ZONE 3: UI LAYOUT 🖼️
  return (
    <div>
      {/* 1. HOMEPAGE VIEW */}
      {page === 'home' && (
        <div>
          <img src="image.png" className="cambridge" alt="Cambridge Logo" />
          <h1 className="h1">Cambridge IGCSE Syllabus Tracker</h1>
          <button className="start-button" onClick={() => setPage('subjects')}>
            Start
          </button>
        </div>
      )}

      {/* NAVBAR */}
      {page !== 'home' && (
        <nav className="navbar" aria-label="Main Navigation">
          <div className="logo">
            <img src="image.png" height="40px" width="40px" alt="Logo" />
            <span>IGCSE Syllabus Tracker</span>
          </div>
          <ul className="nav-links">
            <li><a href="#subjects" onClick={() => setPage('subjects')}>Subjects</a></li>
            <li><a href="#countdown" onClick={() => setPage('countdown')}>Exam Countdown</a></li>
            <li><a href="#record" onClick={() => setPage('record')}>Record</a></li>
          </ul>
        </nav>
      )}

      {/* 2. SUBJECTS SELECTION GRID */}
      {page === 'subjects' && (
        <div className="body">
          <h1 className="main-title">Subjects</h1>
          <div className="matrix-grid">
            <div className="card" onClick={() => openSubject('Maths')}>
              <h1 className="subjects">🔢</h1>
              <h2 className="text">Maths</h2>
            </div>
            <div className="card" onClick={() => openSubject('English')}>
              <h1 className="subjects">✍🏻</h1>
              <h2 className="text">English</h2>
            </div>
            <div className="card" onClick={() => openSubject('Science')}>
              <h1 className="subjects">🧪</h1>
              <h2 className="text">Science</h2>
            </div>
            <div className="card" onClick={() => openSubject('History')}>
              <h1 className="subjects">⌛</h1>
              <h2 className="text">History</h2>
            </div>
            <div className="card" onClick={() => openSubject('French')}>
              <h1 className="subjects">🗼</h1>
              <h2 className="text">French</h2>
            </div>
            <div className="card" onClick={() => openSubject('ICT')}>
              <h1 className="subjects">🖥️</h1>
              <h2 className="text">ICT</h2>
            </div>
            <div className="card" onClick={() => openSubject('Enterprise')}>
              <h1 className="subjects">💸</h1>
              <h2 className="text">Enterprise</h2>
            </div>
          </div>
        </div>
      )}

      {/* 3. DYNAMIC TOPIC TRACKER VIEW */}
      {page === 'tracker' && selectedSubject && (
        <div className="tracker-container">
          {SYLLABUS_DATA[selectedSubject]?.map((section, sIndex) => (
            <div key={sIndex} className="topic-group">
              <h1>{section.title}</h1>
              {section.topics.map((topic, tIndex) => {
                const inputId = `${selectedSubject}-${sIndex}-${tIndex}`;
                return (
                  <React.Fragment key={tIndex}>
                    <input 
                      type="checkbox" 
                      id={inputId} 
                      className="check-box"
                      checked={completedTopics.includes(inputId)}
                      onChange={() => toggleTopic(inputId)}
                    />
                    <label htmlFor={inputId}>{topic}</label>
                  </React.Fragment>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* 4. FLIPDOWN COUNTDOWN VIEW */}
      {page === 'countdown' && (
        <div className="countdown-page">
          <div className="example">
            <h1>IGCSE Final Exams</h1>
            <p>⏰ Countdown to 24 September 2026</p>
            <div id="flipdown" className="flipdown"></div>
          </div>
        </div>
      )}

      {/* 5. STUDY RECORD LOG VIEW */}
      {page === 'record' && (
        <div className="record-container">
          <h1 className="main-title">Study Record Log</h1>

          <div className="record-form">
            <input 
              type="date" 
              value={inputDate} 
              onChange={(e) => setInputDate(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Subject name..." 
              value={inputSubject} 
              onChange={(e) => setInputSubject(e.target.value)} 
            />
            <button onClick={addRecord}>Add</button>
          </div>

          <table className="record-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Subject</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.subject}</td>
                  <td>
                    <button onClick={() => deleteRecord(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;