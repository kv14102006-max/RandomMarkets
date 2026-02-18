import { useState, useEffect, useCallback, useRef } from "react";

// ─── ICONS ─────────────────────────────────────────────────────────────────
const CoinIcon = ({ size = 20, spinning = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={spinning ? { animation: 'coinSpin 1s ease-in-out' } : {}}>
    <circle cx="12" cy="12" r="10" fill="#F7931A" stroke="#E8850A" strokeWidth="1.5"/>
    <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">$</text>
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const TrophyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);

const FireIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const WalletIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
    <path d="M18 12a1 1 0 0 0 0 2h4v-2Z"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const BookmarkIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
  </svg>
);

const ShareIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const HeadsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#22c55e" opacity="0.15" stroke="#22c55e" strokeWidth="2"/>
    <text x="24" y="29" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="800">H</text>
  </svg>
);

const TailsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="2"/>
    <text x="24" y="29" textAnchor="middle" fill="#ef4444" fontSize="16" fontWeight="800">T</text>
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
  </svg>
);

const DiceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M16 8h.01"/><path d="M12 12h.01"/><path d="M8 16h.01"/>
  </svg>
);

const HistoryIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>
  </svg>
);

// ─── DATA ─────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'all', label: 'All', icon: '🎯' },
  { id: '0-50', label: '$0 - $50', icon: '💵' },
  { id: '50-100', label: '$50 - $100', icon: '💰' },
  { id: '100-500', label: '$100 - $500', icon: '🤑' },
  { id: '500-1000', label: '$500 - $1K', icon: '💎' },
  { id: '1000-5000', label: '$1K - $5K', icon: '🏆' },
  { id: '5000+', label: '$5K+', icon: '👑' },
];

const AVATARS = ['🦊','🐺','🦁','🐯','🐻','🐼','🦅','🦈','🐙','🎭','👻','🤖','💀','🔥','⚡','🌊','🎲','🎯','💎','🃏'];

const generateUser = () => {
  const names = ['CryptoKing','FlipMaster','LuckyDoge','MoonShot','DiamondHands','NightOwl','ShadowBet','GoldenFlip','IronWolf','SilverFox','DarkHorse','WildCard','HighRoller','SharpShooter','ThunderBolt','PhantomAce','NeonViper','StormChaser','BlazeRunner','FrostByte'];
  return { name: names[Math.floor(Math.random()*names.length)] + Math.floor(Math.random()*999), avatar: AVATARS[Math.floor(Math.random()*AVATARS.length)] };
};

const generateMatches = () => {
  const statuses = ['live','waiting','completed'];
  const matches = [];
  for (let i = 0; i < 24; i++) {
    const status = statuses[Math.floor(Math.random()*3)];
    const betAmount = [10,25,50,100,250,500,1000,2500,5000,10000][Math.floor(Math.random()*10)];
    const creator = generateUser();
    const opponent = status !== 'waiting' ? generateUser() : null;
    const headsOdds = Math.floor(Math.random()*30) + 35;
    const result = status === 'completed' ? (Math.random() > 0.5 ? 'heads' : 'tails') : null;
    const timeAgo = status === 'completed' ? `${Math.floor(Math.random()*59)+1}m ago` : status === 'live' ? 'LIVE' : `${Math.floor(Math.random()*15)+1}m`;
    matches.push({
      id: `match-${i}`,
      creator,
      opponent,
      betAmount,
      status,
      headsOdds,
      tailsOdds: 100 - headsOdds,
      result,
      timeAgo,
      creatorChoice: Math.random() > 0.5 ? 'heads' : 'tails',
      totalVolume: betAmount * 2,
      participants: status === 'waiting' ? 1 : 2,
      bookmarked: Math.random() > 0.8,
      streak: Math.floor(Math.random()*8),
      createdAt: Date.now() - Math.floor(Math.random()*3600000),
    });
  }
  return matches;
};

const generateLeaderboard = () => {
  const leaders = [];
  for (let i = 0; i < 20; i++) {
    const u = generateUser();
    leaders.push({
      rank: i + 1,
      ...u,
      winRate: Math.floor(Math.random()*30) + 50,
      totalWins: Math.floor(Math.random()*500) + 10,
      totalBets: Math.floor(Math.random()*800) + 50,
      profit: Math.floor(Math.random()*50000) - 5000,
      volume: Math.floor(Math.random()*200000) + 1000,
    });
  }
  return leaders.sort((a,b) => b.profit - a.profit).map((l,i) => ({...l, rank: i+1}));
};

const generateHistory = () => {
  const hist = [];
  for (let i = 0; i < 15; i++) {
    const won = Math.random() > 0.45;
    const amount = [10,25,50,100,250,500][Math.floor(Math.random()*6)];
    const opp = generateUser();
    hist.push({
      id: `hist-${i}`,
      opponent: opp,
      amount,
      won,
      result: Math.random() > 0.5 ? 'heads' : 'tails',
      myChoice: Math.random() > 0.5 ? 'heads' : 'tails',
      time: `${Math.floor(Math.random()*23)+1}h ago`,
    });
  }
  return hist;
};

// ─── ANIMATED COIN ────────────────────────────────────────────────────────
const AnimatedCoin = ({ flipping, result }) => {
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    if (!flipping) return;
    let frame;
    let r = 0;
    const animate = () => {
      r += 18;
      setRotation(r);
      if (r < 1800) frame = requestAnimationFrame(animate);
      else setRotation(result === 'heads' ? 0 : 180);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [flipping, result]);

  const isHeads = Math.floor(rotation / 180) % 2 === 0;

  return (
    <div style={{
      width: 120, height: 120, perspective: 600, margin: '0 auto',
    }}>
      <div style={{
        width: '100%', height: '100%', borderRadius: '50%',
        transform: `rotateX(${rotation}deg)`,
        transition: flipping ? 'none' : 'transform 0.3s ease',
        background: isHeads
          ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)'
          : 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: isHeads
          ? '0 0 40px rgba(34,197,94,0.4), inset 0 -4px 12px rgba(0,0,0,0.3)'
          : '0 0 40px rgba(239,68,68,0.4), inset 0 -4px 12px rgba(0,0,0,0.3)',
        border: '3px solid rgba(255,255,255,0.2)',
      }}>
        <span style={{ fontSize: 48, fontWeight: 900, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.4)', fontFamily: "'DM Serif Display', serif" }}>
          {isHeads ? 'H' : 'T'}
        </span>
      </div>
    </div>
  );
};

// ─── SPARKLINE ────────────────────────────────────────────────────────────
const Sparkline = ({ data, color = '#22c55e', width = 80, height = 24 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ');
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────
export default function RandomMarkets() {
  const [page, setPage] = useState('matches');
  const [category, setCategory] = useState('all');
  const [matches, setMatches] = useState(generateMatches);
  const [leaderboard] = useState(generateLeaderboard);
  const [history] = useState(generateHistory);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMatchDetail, setShowMatchDetail] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [statusFilter, setStatusFilter] = useState('all');
  const [userBalance] = useState(4827.50);
  const [notifications] = useState(3);

  const filteredMatches = matches.filter(m => {
    if (category !== 'all') {
      const amt = m.betAmount;
      const ranges = { '0-50': [0,50], '50-100': [50,100], '100-500': [100,500], '500-1000': [500,1000], '1000-5000': [1000,5000], '5000+': [5000, Infinity] };
      const [min, max] = ranges[category] || [0, Infinity];
      if (amt < min || amt > max) return false;
    }
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return m.creator.name.toLowerCase().includes(q) || (m.opponent?.name.toLowerCase().includes(q));
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'newest') return b.createdAt - a.createdAt;
    if (sortBy === 'highest') return b.betAmount - a.betAmount;
    if (sortBy === 'lowest') return a.betAmount - b.betAmount;
    return 0;
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d1117',
      color: '#e6edf3',
      fontFamily: "'Satoshi', 'DM Sans', -apple-system, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&family=JetBrains+Mono:wght@400;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 3px; }

        @keyframes coinSpin { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(1080deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes livePulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); } 50% { box-shadow: 0 0 0 8px rgba(34,197,94,0); } }
        @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

        .nav-item { padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: all 0.2s; font-size: 14px; font-weight: 500; color: #8b949e; border: none; background: none; white-space: nowrap; }
        .nav-item:hover { color: #e6edf3; background: rgba(255,255,255,0.04); }
        .nav-item.active { color: #e6edf3; background: rgba(255,255,255,0.08); }

        .cat-pill { padding: 6px 14px; border-radius: 20px; cursor: pointer; transition: all 0.2s; font-size: 13px; font-weight: 500; color: #8b949e; border: 1px solid transparent; background: none; white-space: nowrap; display: flex; align-items: center; gap: 6px; }
        .cat-pill:hover { color: #e6edf3; background: rgba(255,255,255,0.04); border-color: #30363d; }
        .cat-pill.active { color: #e6edf3; background: rgba(22,163,74,0.12); border-color: #22c55e; }

        .match-card { background: #161b22; border: 1px solid #21262d; border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.25s cubic-bezier(.4,0,.2,1); animation: fadeInUp 0.4s ease backwards; position: relative; overflow: hidden; }
        .match-card:hover { border-color: #30363d; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
        .match-card.live { border-color: rgba(34,197,94,0.3); }
        .match-card.live::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #22c55e, #16a34a, #22c55e); background-size: 200% 100%; animation: gradientMove 2s ease infinite; }

        .btn-primary { background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px; }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(34,197,94,0.3); }

        .btn-secondary { background: rgba(255,255,255,0.06); color: #e6edf3; border: 1px solid #30363d; padding: 10px 20px; border-radius: 8px; font-weight: 500; font-size: 14px; cursor: pointer; transition: all 0.2s; }
        .btn-secondary:hover { background: rgba(255,255,255,0.1); border-color: #484f58; }

        .btn-heads { background: rgba(34,197,94,0.1); color: #22c55e; border: 1px solid rgba(34,197,94,0.3); padding: 8px 24px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.2s; flex: 1; }
        .btn-heads:hover { background: rgba(34,197,94,0.2); border-color: #22c55e; }

        .btn-tails { background: rgba(239,68,68,0.1); color: #ef4444; border: 1px solid rgba(239,68,68,0.3); padding: 8px 24px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.2s; flex: 1; }
        .btn-tails:hover { background: rgba(239,68,68,0.2); border-color: #ef4444; }

        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center; animation: fadeIn 0.2s ease; }
        .modal-content { background: #161b22; border: 1px solid #30363d; border-radius: 16px; padding: 32px; width: 90%; max-width: 520px; animation: scaleIn 0.3s ease; max-height: 90vh; overflow-y: auto; }

        .input-field { width: 100%; background: #0d1117; border: 1px solid #30363d; border-radius: 8px; padding: 12px 16px; color: #e6edf3; font-size: 14px; outline: none; transition: border-color 0.2s; font-family: inherit; }
        .input-field:focus { border-color: #22c55e; }
        .input-field::placeholder { color: #484f58; }

        .status-live { color: #22c55e; font-weight: 600; font-size: 12px; display: flex; align-items: center; gap: 5px; }
        .status-live::before { content: ''; width: 7px; height: 7px; background: #22c55e; border-radius: 50%; animation: pulse 1.5s ease infinite; }

        .status-waiting { color: #f59e0b; font-weight: 600; font-size: 12px; display: flex; align-items: center; gap: 5px; }
        .status-waiting::before { content: ''; width: 7px; height: 7px; background: #f59e0b; border-radius: 50%; animation: pulse 2s ease infinite; }

        .status-completed { color: #8b949e; font-weight: 500; font-size: 12px; }

        .badge { padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; }

        .leaderboard-row { display: grid; grid-template-columns: 50px 1fr 100px 100px 120px; align-items: center; padding: 14px 20px; border-bottom: 1px solid #21262d; transition: background 0.2s; }
        .leaderboard-row:hover { background: rgba(255,255,255,0.02); }

        .tab-btn { padding: 10px 20px; border: none; background: none; color: #8b949e; font-size: 14px; font-weight: 500; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; }
        .tab-btn:hover { color: #e6edf3; }
        .tab-btn.active { color: #22c55e; border-bottom-color: #22c55e; }

        .profile-dropdown { position: absolute; top: 50px; right: 0; background: #161b22; border: 1px solid #30363d; border-radius: 12px; padding: 8px; min-width: 200px; animation: slideDown 0.2s ease; z-index: 100; }
        .profile-dropdown button { width: 100%; text-align: left; padding: 10px 14px; border: none; background: none; color: #e6edf3; font-size: 14px; cursor: pointer; border-radius: 8px; transition: background 0.15s; display: flex; align-items: center; gap: 10px; }
        .profile-dropdown button:hover { background: rgba(255,255,255,0.06); }

        .volume-bar { height: 4px; border-radius: 2px; background: #21262d; overflow: hidden; }
        .volume-bar-fill { height: 100%; border-radius: 2px; transition: width 0.6s ease; }

        .stat-card { background: #161b22; border: 1px solid #21262d; border-radius: 12px; padding: 20px; }

        .notification-badge { position: absolute; top: -4px; right: -4px; background: #ef4444; color: #fff; font-size: 10px; font-weight: 700; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
      `}</style>

      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <header style={{
        borderBottom: '1px solid #21262d',
        background: 'rgba(13,17,23,0.95)',
        backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: 64, gap: 24 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flexShrink: 0 }} onClick={() => setPage('matches')}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 2px 12px rgba(34,197,94,0.3)',
            }}>
              <CoinIcon size={22} />
            </div>
            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px', fontFamily: "'DM Sans', sans-serif" }}>
              Random<span style={{ color: '#22c55e' }}>Markets</span>
            </span>
          </div>

          {/* Search */}
          <div style={{ flex: 1, maxWidth: 480, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#484f58' }}><SearchIcon /></div>
            <input
              className="input-field"
              placeholder="Search matches, players..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: 42, background: '#161b22', border: '1px solid #21262d', borderRadius: 10, height: 40, fontSize: 13 }}
            />
            <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#484f58', fontSize: 12, border: '1px solid #30363d', borderRadius: 4, padding: '1px 6px', fontFamily: "'JetBrains Mono', monospace" }}>/</div>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {[
              { id: 'matches', label: 'Matches', icon: <DiceIcon /> },
              { id: 'leaderboard', label: 'Leaderboard', icon: <TrophyIcon /> },
              { id: 'history', label: 'My Bets', icon: <HistoryIcon /> },
            ].map(item => (
              <button key={item.id} className={`nav-item ${page === item.id ? 'active' : ''}`}
                onClick={() => setPage(item.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
            {/* Balance */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, background: '#161b22', border: '1px solid #21262d',
              borderRadius: 10, padding: '6px 14px', cursor: 'pointer',
            }}>
              <WalletIcon />
              <span style={{ fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}>
                ${userBalance.toLocaleString()}
              </span>
            </div>

            {/* Notification bell */}
            <button style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer', position: 'relative', padding: 8 }}>
              <BellIcon />
              {notifications > 0 && <span className="notification-badge">{notifications}</span>}
            </button>

            {/* Profile */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowProfileMenu(!showProfileMenu)} style={{
                width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: '2px solid #21262d', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, transition: 'border-color 0.2s',
              }}>🦊</button>
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div style={{ padding: '10px 14px', borderBottom: '1px solid #21262d', marginBottom: 4 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>CryptoWolf_42</div>
                    <div style={{ color: '#8b949e', fontSize: 12 }}>Win Rate: 58%</div>
                  </div>
                  <button onClick={() => { setPage('history'); setShowProfileMenu(false); }}><HistoryIcon /> My Bets</button>
                  <button><SettingsIcon /> Settings</button>
                  <button style={{ color: '#ef4444' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ───────────────────────────────────────────────── */}
      <main style={{ maxWidth: 1400, margin: '0 auto', padding: '24px' }}>

        {/* ── MATCHES PAGE ─────────────────────────────────────────────── */}
        {page === 'matches' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            {/* Hero Stats Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
              {[
                { label: 'Total Volume', value: '$2.4M', change: '+12.3%', color: '#22c55e', sparkData: [20,35,28,42,38,55,48,62,58,72] },
                { label: 'Active Matches', value: '847', change: '+5.7%', color: '#22c55e', sparkData: [100,120,115,140,130,155,148,160,158,170] },
                { label: 'Players Online', value: '3,241', change: '-2.1%', color: '#ef4444', sparkData: [400,380,395,370,385,360,375,350,365,345] },
                { label: 'Biggest Flip Today', value: '$10,000', change: 'CryptoKing', color: '#f59e0b', sparkData: [1000,2000,1500,3000,2500,5000,4000,7000,6000,10000] },
              ].map((stat, i) => (
                <div key={i} className="stat-card" style={{ animationDelay: `${i * 0.05}s`, animation: 'fadeInUp 0.4s ease backwards' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <span style={{ color: '#8b949e', fontSize: 13 }}>{stat.label}</span>
                    <Sparkline data={stat.sparkData} color={stat.color} />
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{stat.value}</div>
                  <span style={{ color: stat.color, fontSize: 12, fontWeight: 500 }}>{stat.change}</span>
                </div>
              ))}
            </div>

            {/* Category Pills + Filters + Create Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 6, overflow: 'auto', flex: 1, paddingBottom: 4 }}>
                {CATEGORIES.map(cat => (
                  <button key={cat.id} className={`cat-pill ${category === cat.id ? 'active' : ''}`}
                    onClick={() => setCategory(cat.id)}>
                    <span>{cat.icon}</span> {cat.label}
                  </button>
                ))}
              </div>

              {/* Status filter */}
              <div style={{ display: 'flex', gap: 4, background: '#161b22', borderRadius: 8, padding: 3, border: '1px solid #21262d' }}>
                {['all','live','waiting','completed'].map(s => (
                  <button key={s} onClick={() => setStatusFilter(s)} style={{
                    padding: '5px 12px', borderRadius: 6, border: 'none', fontSize: 12, fontWeight: 500, cursor: 'pointer',
                    background: statusFilter === s ? 'rgba(255,255,255,0.08)' : 'transparent',
                    color: statusFilter === s ? '#e6edf3' : '#8b949e', transition: 'all 0.15s', textTransform: 'capitalize',
                  }}>{s}</button>
                ))}
              </div>

              {/* Sort */}
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                background: '#161b22', border: '1px solid #21262d', borderRadius: 8, padding: '6px 12px',
                color: '#e6edf3', fontSize: 12, cursor: 'pointer', outline: 'none',
              }}>
                <option value="newest">Newest</option>
                <option value="highest">Highest Stake</option>
                <option value="lowest">Lowest Stake</option>
              </select>

              {/* Create Match */}
              <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
                <PlusIcon /> Create Match
              </button>
            </div>

            {/* Match Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
              {filteredMatches.map((match, i) => (
                <MatchCard key={match.id} match={match} index={i} onClick={() => setShowMatchDetail(match)} />
              ))}
            </div>
            {filteredMatches.length === 0 && (
              <div style={{ textAlign: 'center', padding: 80, color: '#484f58' }}>
                <DiceIcon /><br/>
                <span style={{ fontSize: 16, marginTop: 12, display: 'block' }}>No matches found</span>
                <span style={{ fontSize: 13, marginTop: 4, display: 'block' }}>Try changing filters or create a new match</span>
              </div>
            )}
          </div>
        )}

        {/* ── LEADERBOARD PAGE ─────────────────────────────────────────── */}
        {page === 'leaderboard' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>🏆 Leaderboard</h1>
                <p style={{ color: '#8b949e', fontSize: 14, marginTop: 4 }}>Top players ranked by profit</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Daily','Weekly','Monthly','All Time'].map((t, i) => (
                  <button key={t} className={`tab-btn ${i === 2 ? 'active' : ''}`} style={{ padding: '8px 16px', fontSize: 13, borderRadius: 8, borderBottom: 'none', background: i === 2 ? 'rgba(34,197,94,0.1)' : 'transparent' }}>{t}</button>
                ))}
              </div>
            </div>

            {/* Top 3 Podium */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
              {[1, 0, 2].map((idx) => {
                const p = leaderboard[idx];
                const isFirst = idx === 0;
                const medals = ['🥇','🥈','🥉'];
                const gradients = [
                  'linear-gradient(135deg, rgba(234,179,8,0.15), rgba(234,179,8,0.05))',
                  'linear-gradient(135deg, rgba(192,192,192,0.15), rgba(192,192,192,0.05))',
                  'linear-gradient(135deg, rgba(205,127,50,0.15), rgba(205,127,50,0.05))',
                ];
                const borders = ['rgba(234,179,8,0.3)','rgba(192,192,192,0.3)','rgba(205,127,50,0.3)'];
                return (
                  <div key={idx} style={{
                    background: '#161b22', border: `1px solid ${borders[idx]}`, borderRadius: 16, padding: 28,
                    textAlign: 'center', transform: isFirst ? 'scale(1.05)' : 'none',
                    backgroundImage: gradients[idx], animation: 'fadeInUp 0.5s ease backwards',
                    animationDelay: `${idx * 0.1}s`, order: idx === 0 ? -1 : idx === 1 ? -2 : 0,
                  }}>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>{medals[idx]}</div>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{p.avatar}</div>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{p.name}</div>
                    <div style={{ color: '#22c55e', fontWeight: 700, fontSize: 22, fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>
                      +${p.profit.toLocaleString()}
                    </div>
                    <div style={{ color: '#8b949e', fontSize: 13 }}>{p.winRate}% win rate · {p.totalWins} wins</div>
                  </div>
                );
              })}
            </div>

            {/* Table */}
            <div style={{ background: '#161b22', border: '1px solid #21262d', borderRadius: 12, overflow: 'hidden' }}>
              <div className="leaderboard-row" style={{ borderBottom: '2px solid #21262d', color: '#8b949e', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                <span>Rank</span><span>Player</span><span style={{ textAlign: 'right' }}>Win Rate</span><span style={{ textAlign: 'right' }}>Wins</span><span style={{ textAlign: 'right' }}>Profit</span>
              </div>
              {leaderboard.slice(3).map((p, i) => (
                <div key={i} className="leaderboard-row" style={{ animation: 'fadeInUp 0.3s ease backwards', animationDelay: `${i * 0.03}s` }}>
                  <span style={{ fontWeight: 600, color: '#8b949e', fontFamily: "'JetBrains Mono', monospace" }}>#{p.rank}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{p.avatar}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                      <div style={{ color: '#8b949e', fontSize: 12 }}>{p.totalBets} bets</div>
                    </div>
                  </div>
                  <span style={{ textAlign: 'right', fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}>{p.winRate}%</span>
                  <span style={{ textAlign: 'right', fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}>{p.totalWins}</span>
                  <span style={{ textAlign: 'right', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: p.profit >= 0 ? '#22c55e' : '#ef4444' }}>
                    {p.profit >= 0 ? '+' : ''}${p.profit.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── MY BETS / HISTORY PAGE ───────────────────────────────────── */}
        {page === 'history' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>📊 My Bets</h1>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
              {[
                { label: 'Total Bets', value: '142', icon: '🎲' },
                { label: 'Win Rate', value: '58.4%', icon: '📈' },
                { label: 'Total Profit', value: '+$2,847', icon: '💰' },
                { label: 'Best Streak', value: '7 wins', icon: '🔥' },
              ].map((s, i) => (
                <div key={i} className="stat-card" style={{ animation: 'fadeInUp 0.4s ease backwards', animationDelay: `${i * 0.05}s` }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ color: '#8b949e', fontSize: 13, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #21262d', marginBottom: 20 }}>
              {['All Bets', 'Wins', 'Losses', 'Active'].map((t, i) => (
                <button key={t} className={`tab-btn ${i === 0 ? 'active' : ''}`}>{t}</button>
              ))}
            </div>

            {/* History List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {history.map((h, i) => (
                <div key={h.id} style={{
                  background: '#161b22', border: '1px solid #21262d', borderRadius: 12, padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: 16, animation: 'fadeInUp 0.3s ease backwards',
                  animationDelay: `${i * 0.03}s`, transition: 'background 0.2s', cursor: 'pointer',
                }}>
                  {/* Result indicator */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    background: h.won ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                    border: `1px solid ${h.won ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
                  }}>
                    <span style={{ fontSize: 20 }}>{h.won ? '✅' : '❌'}</span>
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 600 }}>vs {h.opponent.avatar} {h.opponent.name}</span>
                      <span className="badge" style={{
                        background: h.result === 'heads' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                        color: h.result === 'heads' ? '#22c55e' : '#ef4444',
                      }}>
                        {h.result === 'heads' ? '🪙 Heads' : '🪙 Tails'}
                      </span>
                    </div>
                    <div style={{ color: '#8b949e', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <ClockIcon /> {h.time} · You picked {h.myChoice}
                    </div>
                  </div>

                  {/* Amount */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontWeight: 700, fontSize: 16, fontFamily: "'JetBrains Mono', monospace",
                      color: h.won ? '#22c55e' : '#ef4444',
                    }}>
                      {h.won ? '+' : '-'}${h.amount.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ── CREATE MATCH MODAL ─────────────────────────────────────────── */}
      {showCreateModal && (
        <CreateMatchModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(match) => {
            setMatches(prev => [match, ...prev]);
            setShowCreateModal(false);
          }}
        />
      )}

      {/* ── MATCH DETAIL MODAL ─────────────────────────────────────────── */}
      {showMatchDetail && (
        <MatchDetailModal
          match={showMatchDetail}
          onClose={() => setShowMatchDetail(null)}
          onJoin={(choice) => {
            setMatches(prev => prev.map(m => m.id === showMatchDetail.id ? { ...m, status: 'live', opponent: generateUser(), opponentChoice: choice } : m));
            setShowMatchDetail(null);
          }}
        />
      )}
    </div>
  );
}

// ─── MATCH CARD COMPONENT ──────────────────────────────────────────────
function MatchCard({ match, index, onClick }) {
  const { creator, opponent, betAmount, status, headsOdds, tailsOdds, result, timeAgo, creatorChoice } = match;

  return (
    <div className={`match-card ${status === 'live' ? 'live' : ''}`} onClick={onClick} style={{ animationDelay: `${index * 0.04}s` }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))',
            border: '1px solid rgba(99,102,241,0.2)', fontSize: 20,
          }}>
            {creator.avatar}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{creator.name}</div>
            <div style={{ fontSize: 12, color: '#8b949e', display: 'flex', alignItems: 'center', gap: 4 }}>
              picks {creatorChoice === 'heads' ? '🟢 Heads' : '🔴 Tails'}
            </div>
          </div>
        </div>

        {/* Status */}
        {status === 'live' && <span className="status-live">LIVE</span>}
        {status === 'waiting' && <span className="status-waiting">Waiting</span>}
        {status === 'completed' && (
          <span className="badge" style={{
            background: result === 'heads' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
            color: result === 'heads' ? '#22c55e' : '#ef4444',
          }}>
            {result === 'heads' ? 'Heads' : 'Tails'} won
          </span>
        )}
      </div>

      {/* VS Section */}
      {opponent && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16, padding: '12px 0', background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24 }}>{creator.avatar}</div>
            <div style={{ fontSize: 11, fontWeight: 600, marginTop: 2 }}>{creator.name.slice(0,10)}</div>
          </div>
          <div style={{
            fontSize: 12, fontWeight: 800, color: '#484f58', background: '#21262d', padding: '4px 10px', borderRadius: 6,
          }}>VS</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24 }}>{opponent.avatar}</div>
            <div style={{ fontSize: 11, fontWeight: 600, marginTop: 2 }}>{opponent.name.slice(0,10)}</div>
          </div>
        </div>
      )}

      {/* Bet Amount */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: '#8b949e', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Stake</div>
        <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", background: 'linear-gradient(135deg, #22c55e, #16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          ${betAmount.toLocaleString()}
        </div>
      </div>

      {/* Odds Bar */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
          <span style={{ color: '#22c55e', fontWeight: 600 }}>Heads {headsOdds}%</span>
          <span style={{ color: '#ef4444', fontWeight: 600 }}>Tails {tailsOdds}%</span>
        </div>
        <div style={{ display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', background: '#21262d' }}>
          <div style={{ width: `${headsOdds}%`, background: 'linear-gradient(90deg, #22c55e, #16a34a)', borderRadius: '3px 0 0 3px', transition: 'width 0.6s ease' }} />
          <div style={{ width: `${tailsOdds}%`, background: 'linear-gradient(90deg, #dc2626, #ef4444)', borderRadius: '0 3px 3px 0', transition: 'width 0.6s ease' }} />
        </div>
      </div>

      {/* Action Buttons */}
      {status === 'waiting' && (
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-heads" onClick={e => { e.stopPropagation(); }}>🟢 Heads</button>
          <button className="btn-tails" onClick={e => { e.stopPropagation(); }}>🔴 Tails</button>
        </div>
      )}

      {status !== 'waiting' && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#8b949e', fontFamily: "'JetBrains Mono', monospace" }}>
            ${(betAmount * 2).toLocaleString()} Vol.
          </span>
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{ background: 'none', border: 'none', color: '#484f58', cursor: 'pointer', padding: 2 }} onClick={e => e.stopPropagation()}>
              <ShareIcon />
            </button>
            <button style={{ background: 'none', border: 'none', color: match.bookmarked ? '#f59e0b' : '#484f58', cursor: 'pointer', padding: 2 }} onClick={e => e.stopPropagation()}>
              <BookmarkIcon filled={match.bookmarked} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CREATE MATCH MODAL ───────────────────────────────────────────────
function CreateMatchModal({ onClose, onCreate }) {
  const [amount, setAmount] = useState('');
  const [choice, setChoice] = useState('heads');
  const [isPrivate, setIsPrivate] = useState(false);
  const presets = [10, 25, 50, 100, 250, 500, 1000];

  const handleCreate = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    const creator = { name: 'CryptoWolf_42', avatar: '🦊' };
    onCreate({
      id: `match-new-${Date.now()}`,
      creator,
      opponent: null,
      betAmount: parseFloat(amount),
      status: 'waiting',
      headsOdds: 50,
      tailsOdds: 50,
      result: null,
      timeAgo: 'Just now',
      creatorChoice: choice,
      totalVolume: parseFloat(amount),
      participants: 1,
      bookmarked: false,
      streak: 0,
      createdAt: Date.now(),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>Create Match</h2>
            <p style={{ color: '#8b949e', fontSize: 13, marginTop: 2 }}>Set your stake and pick a side</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#8b949e', cursor: 'pointer', padding: 8, borderRadius: 8, transition: 'background 0.15s' }}>
            <XIcon />
          </button>
        </div>

        {/* Amount */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#8b949e', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Bet Amount</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 20, fontWeight: 700, color: '#22c55e' }}>$</span>
            <input
              className="input-field"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              style={{ paddingLeft: 36, fontSize: 24, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", height: 56, textAlign: 'left' }}
            />
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            {presets.map(p => (
              <button key={p} onClick={() => setAmount(String(p))} style={{
                padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                background: amount === String(p) ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${amount === String(p) ? 'rgba(34,197,94,0.3)' : '#30363d'}`,
                color: amount === String(p) ? '#22c55e' : '#8b949e',
                fontFamily: "'JetBrains Mono', monospace",
              }}>${p}</button>
            ))}
          </div>
        </div>

        {/* Pick Side */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#8b949e', display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Your Pick</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <button onClick={() => setChoice('heads')} style={{
              padding: 20, borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center',
              background: choice === 'heads' ? 'rgba(34,197,94,0.12)' : '#0d1117',
              border: `2px solid ${choice === 'heads' ? '#22c55e' : '#21262d'}`,
              boxShadow: choice === 'heads' ? '0 0 24px rgba(34,197,94,0.15)' : 'none',
            }}>
              <HeadsIcon />
              <div style={{ fontWeight: 700, fontSize: 16, marginTop: 8, color: choice === 'heads' ? '#22c55e' : '#8b949e' }}>Heads</div>
              <div style={{ fontSize: 12, color: '#484f58', marginTop: 2 }}>50% chance</div>
            </button>
            <button onClick={() => setChoice('tails')} style={{
              padding: 20, borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center',
              background: choice === 'tails' ? 'rgba(239,68,68,0.12)' : '#0d1117',
              border: `2px solid ${choice === 'tails' ? '#ef4444' : '#21262d'}`,
              boxShadow: choice === 'tails' ? '0 0 24px rgba(239,68,68,0.15)' : 'none',
            }}>
              <TailsIcon />
              <div style={{ fontWeight: 700, fontSize: 16, marginTop: 8, color: choice === 'tails' ? '#ef4444' : '#8b949e' }}>Tails</div>
              <div style={{ fontSize: 12, color: '#484f58', marginTop: 2 }}>50% chance</div>
            </button>
          </div>
        </div>

        {/* Private Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#0d1117', borderRadius: 10, border: '1px solid #21262d', marginBottom: 24 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Private Match</div>
            <div style={{ color: '#8b949e', fontSize: 12 }}>Only invited players can join</div>
          </div>
          <button onClick={() => setIsPrivate(!isPrivate)} style={{
            width: 44, height: 24, borderRadius: 12, cursor: 'pointer', transition: 'background 0.2s', border: 'none',
            background: isPrivate ? '#22c55e' : '#30363d', position: 'relative',
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3,
              left: isPrivate ? 23 : 3, transition: 'left 0.2s ease',
            }} />
          </button>
        </div>

        {/* Summary */}
        {amount && parseFloat(amount) > 0 && (
          <div style={{ padding: 16, background: 'rgba(34,197,94,0.06)', borderRadius: 10, border: '1px solid rgba(34,197,94,0.15)', marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#8b949e', fontSize: 13 }}>Your Stake</span>
              <span style={{ fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>${parseFloat(amount).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#8b949e', fontSize: 13 }}>Potential Win</span>
              <span style={{ fontWeight: 700, color: '#22c55e', fontFamily: "'JetBrains Mono', monospace" }}>${(parseFloat(amount) * 2).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#8b949e', fontSize: 13 }}>Platform Fee (2%)</span>
              <span style={{ fontWeight: 500, fontFamily: "'JetBrains Mono', monospace", color: '#8b949e' }}>${(parseFloat(amount) * 0.02).toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Create Button */}
        <button className="btn-primary" onClick={handleCreate} style={{
          width: '100%', justifyContent: 'center', padding: 14, fontSize: 16, borderRadius: 12,
          opacity: !amount || parseFloat(amount) <= 0 ? 0.5 : 1,
          pointerEvents: !amount || parseFloat(amount) <= 0 ? 'none' : 'auto',
        }}>
          <CoinIcon size={20} /> Create Match · ${amount ? parseFloat(amount).toLocaleString() : '0'}
        </button>
      </div>
    </div>
  );
}

// ─── MATCH DETAIL MODAL ───────────────────────────────────────────────
function MatchDetailModal({ match, onClose, onJoin }) {
  const [selectedSide, setSelectedSide] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipResult, setFlipResult] = useState(null);

  const handleFlip = () => {
    if (match.status !== 'waiting' || !selectedSide) return;
    setIsFlipping(true);
    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'heads' : 'tails';
      setFlipResult(result);
      setIsFlipping(false);
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 560 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {match.status === 'live' && <span className="status-live">LIVE</span>}
            {match.status === 'waiting' && <span className="status-waiting">Waiting for opponent</span>}
            {match.status === 'completed' && <span className="status-completed">Completed</span>}
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#8b949e', cursor: 'pointer', padding: 8, borderRadius: 8 }}>
            <XIcon />
          </button>
        </div>

        {/* Coin Animation */}
        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <AnimatedCoin flipping={isFlipping} result={flipResult || match.result || 'heads'} />
          {flipResult && (
            <div style={{ marginTop: 16, animation: 'fadeInUp 0.3s ease' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: flipResult === 'heads' ? '#22c55e' : '#ef4444' }}>
                {flipResult === 'heads' ? '🟢 Heads!' : '🔴 Tails!'}
              </div>
              <div style={{ color: '#8b949e', fontSize: 14, marginTop: 4 }}>
                {flipResult === selectedSide ? '🎉 You won!' : '😔 You lost!'}
              </div>
            </div>
          )}
        </div>

        {/* Players */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 24, padding: 20, background: '#0d1117', borderRadius: 12, border: '1px solid #21262d' }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 36, marginBottom: 6 }}>{match.creator.avatar}</div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{match.creator.name}</div>
            <div style={{ fontSize: 12, color: match.creatorChoice === 'heads' ? '#22c55e' : '#ef4444', fontWeight: 600, marginTop: 2 }}>
              {match.creatorChoice === 'heads' ? '🟢 Heads' : '🔴 Tails'}
            </div>
          </div>
          <div style={{
            fontSize: 14, fontWeight: 800, color: '#484f58', background: '#21262d', padding: '8px 16px', borderRadius: 8,
          }}>VS</div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            {match.opponent ? (
              <>
                <div style={{ fontSize: 36, marginBottom: 6 }}>{match.opponent.avatar}</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{match.opponent.name}</div>
                <div style={{ fontSize: 12, color: match.creatorChoice === 'heads' ? '#ef4444' : '#22c55e', fontWeight: 600, marginTop: 2 }}>
                  {match.creatorChoice === 'heads' ? '🔴 Tails' : '🟢 Heads'}
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 36, marginBottom: 6, opacity: 0.3 }}>❓</div>
                <div style={{ fontWeight: 500, fontSize: 14, color: '#484f58' }}>Waiting...</div>
              </>
            )}
          </div>
        </div>

        {/* Stake */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: '#8b949e', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600, marginBottom: 4 }}>Total Pot</div>
          <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", background: 'linear-gradient(135deg, #22c55e, #16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ${(match.betAmount * (match.opponent ? 2 : 1)).toLocaleString()}
          </div>
        </div>

        {/* Join Actions */}
        {match.status === 'waiting' && !flipResult && (
          <>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#8b949e', display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Pick Your Side</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <button onClick={() => setSelectedSide('heads')} style={{
                  padding: 16, borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center',
                  background: selectedSide === 'heads' ? 'rgba(34,197,94,0.12)' : 'transparent',
                  border: `2px solid ${selectedSide === 'heads' ? '#22c55e' : '#21262d'}`,
                  opacity: match.creatorChoice === 'heads' ? 0.4 : 1,
                  pointerEvents: match.creatorChoice === 'heads' ? 'none' : 'auto',
                }}>
                  <div style={{ fontWeight: 700, color: selectedSide === 'heads' ? '#22c55e' : '#8b949e', fontSize: 15 }}>🟢 Heads</div>
                  {match.creatorChoice === 'heads' && <div style={{ fontSize: 11, color: '#484f58', marginTop: 2 }}>Taken</div>}
                </button>
                <button onClick={() => setSelectedSide('tails')} style={{
                  padding: 16, borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center',
                  background: selectedSide === 'tails' ? 'rgba(239,68,68,0.12)' : 'transparent',
                  border: `2px solid ${selectedSide === 'tails' ? '#ef4444' : '#21262d'}`,
                  opacity: match.creatorChoice === 'tails' ? 0.4 : 1,
                  pointerEvents: match.creatorChoice === 'tails' ? 'none' : 'auto',
                }}>
                  <div style={{ fontWeight: 700, color: selectedSide === 'tails' ? '#ef4444' : '#8b949e', fontSize: 15 }}>🔴 Tails</div>
                  {match.creatorChoice === 'tails' && <div style={{ fontSize: 11, color: '#484f58', marginTop: 2 }}>Taken</div>}
                </button>
              </div>
            </div>

            <button className="btn-primary" onClick={handleFlip} style={{
              width: '100%', justifyContent: 'center', padding: 14, fontSize: 16, borderRadius: 12,
              opacity: !selectedSide ? 0.5 : 1, pointerEvents: !selectedSide ? 'none' : 'auto',
            }}>
              <CoinIcon size={20} /> Join & Flip · ${match.betAmount.toLocaleString()}
            </button>
          </>
        )}

        {/* Match Info */}
        <div style={{ marginTop: 20, padding: 16, background: '#0d1117', borderRadius: 10, border: '1px solid #21262d' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ color: '#8b949e', fontSize: 13 }}>Match ID</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#484f58' }}>{match.id}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ color: '#8b949e', fontSize: 13 }}>Entry Fee</span>
            <span style={{ fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>${match.betAmount.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#8b949e', fontSize: 13 }}>Created</span>
            <span style={{ fontSize: 13 }}>{match.timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
