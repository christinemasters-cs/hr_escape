import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Users, 
  FileText, 
  Heart, 
  Smile, 
  ChevronRight,
  RefreshCw,
  Unlock,
  Monitor,
  Inbox,
  LogOut,
  X,
  Sun,
  Cloud
} from 'lucide-react';

// --- Data & Content ---

const SCENARIOS = [
  {
    id: 'hiring',
    category: 'Hiring',
    label: "The Overflowing Inbox",
    icon: <Inbox className="w-8 h-8 md:w-10 md:h-10" />,
    // Sits on the desk, left side
    position: "bottom-24 left-4 md:bottom-32 md:left-24", 
    color: "text-amber-600",
    bg: "bg-amber-100",
    title: "The Resume Avalanche",
    story: "You look at your inbox. Budget was approved yesterday, and you already have resumes coming in from email, LinkedIn, and sticky notes.",
    options: [
      { text: "I lose track of candidates constantly", weight: 'hiring', type: 'pain' },
      { text: "Collaboration with hiring managers is messy", weight: 'hiring', type: 'pain' },
      { text: "It's actually organized fine", weight: 'neutral', type: 'safe' }
    ]
  },
  {
    id: 'onboarding',
    category: 'Onboarding',
    label: "New Hire Packet",
    icon: <Smile className="w-8 h-8 md:w-10 md:h-10" />,
    // Sits on the desk, right side
    position: "bottom-24 right-4 md:bottom-32 md:right-24",
    color: "text-blue-600",
    bg: "bg-blue-100",
    title: "The First Day Scramble",
    story: "It’s a new hire’s first morning. They are standing at your desk asking where to find policies, how to request time off, and who approves what.",
    options: [
      { text: "I answer these same questions every time", weight: 'hiring', type: 'pain' },
      { text: "Some things are automated, some are paper", weight: 'hiring', type: 'pain' },
      { text: "Our onboarding is smooth already", weight: 'neutral', type: 'safe' }
    ]
  },
  {
    id: 'time',
    category: 'Time & Attendance',
    label: "The Wall Clock",
    icon: <Clock className="w-8 h-8 md:w-10 md:h-10" />,
    // Hanging on the wall, center-ish
    position: "top-12 right-1/2 translate-x-1/2 md:top-16 md:right-1/3 md:translate-x-0",
    color: "text-red-500",
    bg: "bg-red-100",
    title: "Time & Attendance",
    story: "You glance at the clock. Payroll is due at 5pm. Someone just messaged you that their hours look wrong from two weeks ago.",
    options: [
      { text: "This happens every pay period", weight: 'payroll', type: 'pain' },
      { text: "It happens occasionally", weight: 'payroll', type: 'pain' },
      { text: "Rarely an issue", weight: 'neutral', type: 'safe' }
    ]
  },
  {
    id: 'payroll',
    category: 'Payroll',
    label: "The Laptop",
    icon: <Monitor className="w-8 h-8 md:w-10 md:h-10" />,
    // Center of the desk
    position: "bottom-16 left-1/2 -translate-x-1/2 md:bottom-24",
    color: "text-indigo-600",
    bg: "bg-indigo-100",
    title: "The Payroll Export",
    story: "You have 4 spreadsheets open on your screen. You're about to export data, double check numbers manually, and hold your breath.",
    options: [
      { text: "Manual steps make me nervous", weight: 'payroll', type: 'pain' },
      { text: "We have integrations but still recheck", weight: 'payroll', type: 'pain' },
      { text: "Confident and clean", weight: 'neutral', type: 'safe' }
    ]
  },
  {
    id: 'engagement',
    category: 'Culture',
    label: "Team Photo",
    icon: <Heart className="w-8 h-8 md:w-10 md:h-10" />,
    // On the shelf, top right
    position: "top-20 right-8 md:top-24 md:right-16",
    color: "text-pink-500",
    bg: "bg-pink-100",
    title: "The Empty Chair",
    story: "You look at the team photo. You suspect burnout is happening, but you won't know for sure until the resignation letters start dropping.",
    options: [
      { text: "We usually react too late", weight: 'culture', type: 'pain' },
      { text: "We have some signals, but not enough", weight: 'culture', type: 'pain' },
      { text: "We feel deeply connected to our people", weight: 'neutral', type: 'safe' }
    ]
  }
];

const RESULTS_CONFIG = {
  hiring: {
    title: "Hiring & Onboarding",
    headline: "Stop chasing signatures. Start building your team.",
    description: "You are spending too much time acting as a traffic cop for information. BambooHR automates the busywork so you can focus on the people work.",
    features: ["Applicant Tracking System", "Automated Onboarding", "E-Signatures"]
  },
  payroll: {
    title: "Payroll & Time Tracking",
    headline: "Pay day should be a celebration, not a panic.",
    description: "Manual data entry is the enemy of accuracy. Connect your time tracking directly to payroll and stop holding your breath every other Friday.",
    features: ["Time Tracking", "Payroll Records", "Benefits Administration"]
  },
  culture: {
    title: "Employee Experience",
    headline: "Spot burnout before it becomes turnover.",
    description: "You need more than gut feelings. Get real data on sentiment and performance so you can nurture your culture proactively.",
    features: ["Performance Management", "eNPS Surveys", "Employee Wellbeing"]
  },
  neutral: { 
    title: "HR Data & Reporting",
    headline: "You've got the basics down. Now optimize.",
    description: "Since your core processes are stable, it's time to leverage that data for strategic insights and executive reporting.",
    features: ["People Data & Analytics", "Custom Reporting", "Workflows"]
  }
};

// --- Components ---

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
  const baseStyle = "px-6 py-3 rounded-full font-semibold transition-all duration-200 transform flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-[#88C425] hover:bg-[#7ab31f] text-white shadow-lg shadow-green-100 active:scale-95",
    secondary: "bg-white text-slate-600 border border-slate-200 hover:border-green-400 hover:text-green-600 shadow-sm active:scale-95",
    ghost: "bg-transparent text-slate-500 hover:text-green-600",
    disabled: "bg-slate-200 text-slate-400 cursor-not-allowed"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${disabled ? variants.disabled : variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// --- Main Application ---

export default function App() {
  const [view, setView] = useState('entry'); // entry, room, results
  const [completedScenarios, setCompletedScenarios] = useState({}); // { id: answerWeight }
  const [activeScenarioId, setActiveScenarioId] = useState(null); // Which modal is open
  const [isRoomLoaded, setIsRoomLoaded] = useState(false);

  const startEscape = () => {
    setView('room');
    setTimeout(() => setIsRoomLoaded(true), 100); // Trigger enter animation
  };

  const handleObjectClick = (id) => {
    if (!completedScenarios[id]) {
      setActiveScenarioId(id);
    }
  };

  const handleAnswer = (scenarioId, weight) => {
    setCompletedScenarios(prev => ({
      ...prev,
      [scenarioId]: weight
    }));
    setActiveScenarioId(null);
  };

  const checkCompletion = () => {
    return SCENARIOS.every(s => completedScenarios[s.id]);
  };

  const finishEscape = () => {
    setView('results');
  };

  const getDominantResult = () => {
    const weights = Object.values(completedScenarios);
    const tally = weights.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

    let winner = 'neutral';
    let maxCount = -1;

    ['hiring', 'payroll', 'culture'].forEach(key => {
        if (tally[key] > maxCount) {
            maxCount = tally[key];
            winner = key;
        }
    });
    
    if (maxCount === -1 || maxCount === undefined) return RESULTS_CONFIG.neutral;
    return RESULTS_CONFIG[winner] || RESULTS_CONFIG.neutral;
  };

  // --- Sub-Views ---

  const EntryView = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-green-50/50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 opacity-10 transform -rotate-12">
        <FileText className="w-40 h-40 text-green-800" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10 transform rotate-12">
        <Clock className="w-40 h-40 text-green-800" />
      </div>

      <div className="max-w-md w-full text-center space-y-8 animate-fade-in relative z-10">
        <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-6 transform rotate-3 border-4 border-green-50">
          <Unlock className="w-10 h-10 text-[#88C425]" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-tight">
            The Office Escape Room
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Your desk is a mess of inefficiencies. <br/>
            Find and solve the <span className="font-bold text-slate-800">5 hidden headaches</span> to unlock the door.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <Button onClick={startEscape} className="w-full shadow-xl shadow-green-200/50 text-lg py-4">
            Enter the Office <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="ghost" className="w-full text-sm">
            Skip the game, show me the demo
          </Button>
        </div>
      </div>
    </div>
  );

  const RoomView = () => {
    const isComplete = checkCompletion();
    const activeScenario = SCENARIOS.find(s => s.id === activeScenarioId);

    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
        
        {/* Header / Instructions */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-10 bg-gradient-to-b from-slate-100 to-transparent h-32">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 drop-shadow-sm">The Desk of Chaos</h2>
            <p className="text-sm text-slate-600 font-medium">Click the pulsing items to clear your workload.</p>
          </div>
          <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-sm border border-slate-200 flex items-center gap-2">
            <span className="text-sm font-bold text-slate-600">
              {Object.keys(completedScenarios).length} / 5 Solved
            </span>
          </div>
        </div>

        {/* The Room Container */}
        <div 
          className={`relative w-full max-w-5xl aspect-[4/3] md:aspect-video bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-slate-200 transition-all duration-1000 ${isRoomLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          
          {/* --- SCENIC BACKGROUND --- */}
          
          {/* Wall: BambooHR Green */}
          <div className="absolute top-0 left-0 w-full h-[65%] bg-[#88C425]">
             {/* Window */}
             <div className="absolute top-10 left-10 md:left-20 w-24 h-32 md:w-32 md:h-40 bg-sky-200 border-4 border-white shadow-inner rounded-lg overflow-hidden hidden sm:block">
                <div className="absolute top-2 right-2 text-white/60"><Sun className="w-8 h-8" /></div>
                <div className="absolute bottom-4 left-4 text-white/40"><Cloud className="w-10 h-10" /></div>
                {/* Window Pane Cross */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-full h-2 bg-white/80"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="h-full w-2 bg-white/80"></div>
                </div>
             </div>

             {/* Shelf: White */}
             <div className="absolute top-32 right-8 md:right-16 w-32 md:w-48 h-3 bg-white rounded-full shadow-lg"></div>
          </div>

          {/* Floor: Dark Slate (Bamboo Secondary) */}
          <div className="absolute bottom-0 left-0 w-full h-[35%] bg-slate-700 border-t border-slate-600">
            {/* Rug (optional decorative) - Made lighter to pop against dark floor */}
            <div className="absolute bottom-4 right-1/4 w-40 h-10 bg-white/10 rounded-[100%] transform skew-x-12 blur-sm"></div>
          </div>

          {/* The Desk Surface: Brown Wood */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] h-[30%] bg-[#8B5E3C] rounded-t-[3rem] shadow-2xl border-t-[6px] border-[#6F4E37] z-0 flex justify-center">
              {/* Desk leg shadow hint */}
              <div className="absolute -bottom-4 w-[90%] h-4 bg-black/30 blur-xl rounded-full"></div>
          </div>

          {/* --- INTERACTIVE ITEMS --- */}

          {SCENARIOS.map((item) => {
            const isSolved = completedScenarios[item.id];
            
            return (
              <button
                key={item.id}
                onClick={() => handleObjectClick(item.id)}
                disabled={isSolved}
                className={`absolute transform transition-all duration-300 group z-10 ${item.position} ${isSolved ? 'opacity-80 cursor-default scale-95' : 'hover:scale-105 cursor-pointer animate-float'}`}
                style={{ animationDelay: `${Math.random() * 2}s` }} // Stagger float animations
              >
                {/* Tooltip Label */}
                <div className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none mb-2 shadow-lg`}>
                  {item.label}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-800"></div>
                </div>

                {/* The Object Icon Container */}
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-xl flex items-center justify-center border-b-4 relative transition-colors duration-300 ${isSolved ? 'bg-green-50 border-green-200 text-[#88C425]' : `bg-white ${item.color} border-slate-200 hover:border-green-400`}`}>
                  {isSolved ? <CheckCircle2 className="w-8 h-8" /> : item.icon}
                  
                  {/* Pulse Effect for unsolved items */}
                  {!isSolved && (
                    <span className={`absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3`}>
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75`}></span>
                      <span className={`relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white`}></span>
                    </span>
                  )}
                </div>
                
                {/* Object Shadow to ground it */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/20 rounded-full blur-sm"></div>
              </button>
            );
          })}

          {/* The Exit Door (Only appears when complete) */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700 ${isComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
             <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-center border border-green-100 animate-bounce-gentle ring-8 ring-green-400/30">
                <div className="w-16 h-16 bg-green-100 text-[#88C425] rounded-full flex items-center justify-center mx-auto mb-4">
                  <LogOut className="w-8 h-8 ml-1" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Room Cleared!</h3>
                <p className="text-slate-500 mb-6">You've organized the chaos.</p>
                <Button onClick={finishEscape}>
                  Escape to BambooHR <ArrowRight className="w-4 h-4" />
                </Button>
             </div>
          </div>
        </div>

        {/* Question Modal Overlay */}
        {activeScenario && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-slide-up">
              <div className={`h-2 ${activeScenario.bg} w-full`}></div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${activeScenario.bg} ${activeScenario.color}`}>
                      {activeScenario.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{activeScenario.category}</p>
                      <h3 className="text-xl font-bold text-slate-800">{activeScenario.title}</h3>
                    </div>
                  </div>
                  <button onClick={() => setActiveScenarioId(null)} className="text-slate-300 hover:text-slate-500">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {activeScenario.story}
                </p>

                <div className="space-y-3">
                  {activeScenario.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(activeScenario.id, opt.weight)}
                      className="w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-[#88C425] hover:bg-green-50/50 transition-all duration-200 group flex items-center justify-between"
                    >
                      <span className="font-medium text-slate-700 group-hover:text-slate-900">{opt.text}</span>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#88C425]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  };

  const ResultsView = () => {
    const result = getDominantResult();

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
        <div className="max-w-2xl w-full animate-fade-in-up">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">You made it out.</h2>
            <p className="text-slate-500">Here is the key to keeping your office this calm forever.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-[#88C425] p-1"></div>
            
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                
                <div className="flex-1 space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                      Your Priority
                    </span>
                    <h3 className="text-3xl font-bold text-slate-800 mb-4">{result.title}</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {result.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {result.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-slate-700">
                        <CheckCircle2 className="w-5 h-5 text-[#88C425] flex-shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-64 bg-slate-50 rounded-2xl p-6 flex flex-col items-center text-center space-y-4 border border-slate-100">
                   <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-2xl">
                     🎋
                   </div>
                   <div>
                     <p className="text-sm text-slate-500 mb-1">Recommended Solution</p>
                     <p className="font-bold text-slate-800">BambooHR {result.title.split('&')[0]}</p>
                   </div>
                   <Button className="w-full text-sm">
                     See this in BambooHR
                   </Button>
                </div>

              </div>
            </div>
            
            <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <p className="text-sm text-slate-500 max-w-md">
                "It's not about escaping work. It's about escaping the things that keep you from doing your best work."
              </p>
              <button 
                onClick={startEscape}
                className="text-sm font-semibold text-slate-500 hover:text-[#88C425] flex items-center gap-2 transition-colors"
              >
                <RefreshCw className="w-4 h-4" /> Restart Experience
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
             <p className="text-slate-400 text-sm">BambooHR Privacy Policy | Terms of Service</p>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="font-sans text-slate-900 selection:bg-green-100 selection:text-green-900">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>
      {view === 'entry' && <EntryView />}
      {view === 'room' && <RoomView />}
      {view === 'results' && <ResultsView />}
    </div>
  );
}
