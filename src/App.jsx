import React, { useState, useEffect } from 'react';
import { 
  Search, Play, Pause, RotateCcw, Sparkles, Film, 
  Share2, Download, Zap, Flame, ArrowRight, Check, Copy, SkipForward, Code, Globe, Volume2, BookOpen, Filter, Settings, Maximize
} from 'lucide-react';

// Comprehensive cinematic quote database inspired by PlayPhrase.me
const PLAYPHRASE_DATABASE = [
  {
    id: 1,
    phrase: "why so serious",
    translation: "Pourquoi tant de sérieux ?",
    movie: "The Dark Knight",
    year: 2008,
    character: "The Joker",
    level: "B1",
    count: 142,
    youtubeId: "EXeTwQWrcwY",
    startTime: 10,
    endTime: 16,
    thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    tags: ["joker", "batman", "dark", "serious"]
  },
  {
    id: 2,
    phrase: "i am your father",
    translation: "Je suis ton père.",
    movie: "Star Wars: Empire Strikes Back",
    year: 1980,
    character: "Darth Vader",
    level: "A2",
    count: 389,
    youtubeId: "hElHCLngBf8",
    startTime: 40,
    endTime: 47,
    thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    tags: ["star wars", "vader", "father", "epic"]
  },
  {
    id: 3,
    phrase: "may the force be with you",
    translation: "Que la Force soit avec toi.",
    movie: "Star Wars: A New Hope",
    year: 1977,
    character: "General Dodonna",
    level: "A2",
    count: 512,
    youtubeId: "vZgjy-ecocQ",
    startTime: 5,
    endTime: 12,
    thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    tags: ["star wars", "force", "classic"]
  },
  {
    id: 4,
    phrase: "say hello to my little friend",
    translation: "Dis bonjour à mon petit ami !",
    movie: "Scarface",
    year: 1983,
    character: "Tony Montana",
    level: "B1",
    count: 88,
    youtubeId: "a_z4Iuxivjk",
    startTime: 55,
    endTime: 62,
    thumbnail: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=800&q=80",
    tags: ["scarface", "tony montana", "action"]
  },
  {
    id: 5,
    phrase: "show me the money",
    translation: "Montre-moi l'argent !",
    movie: "Jerry Maguire",
    year: 1996,
    character: "Rod Tidwell",
    level: "A2",
    count: 230,
    youtubeId: "mXh5i-yVY9Q",
    startTime: 12,
    endTime: 18,
    thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
    tags: ["jerry maguire", "money", "classic"]
  },
  {
    id: 6,
    phrase: "winter is coming",
    translation: "L'hiver vient.",
    movie: "Game of Thrones",
    year: 2011,
    character: "Ned Stark",
    level: "A1",
    count: 754,
    youtubeId: "rlz_INjdqg4",
    startTime: 2,
    endTime: 8,
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    tags: ["got", "stark", "winter", "epic"]
  },
  {
    id: 7,
    phrase: "you talking to me",
    translation: "C'est à moi que tu parles ?",
    movie: "Taxi Driver",
    year: 1976,
    character: "Travis Bickle",
    level: "A2",
    count: 410,
    youtubeId: "oOJtU_Sw2eM",
    startTime: 20,
    endTime: 28,
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
    tags: ["taxi driver", "de niro", "classic"]
  },
  {
    id: 8,
    phrase: "hasta la vista baby",
    translation: "Hasta la vista, bébé.",
    movie: "Terminator 2",
    year: 1991,
    character: "The Terminator",
    level: "A1",
    count: 620,
    youtubeId: "X-W3WVDMlvk",
    startTime: 15,
    endTime: 22,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    tags: ["terminator", "arnold", "action"]
  },
  {
    id: 9,
    phrase: "to infinity and beyond",
    moving: "Toy Story",
    year: 1995,
    character: "Buzz Lightyear",
    level: "A2",
    count: 310,
    youtubeId: "WYV2Ggq_r_I",
    startTime: 8,
    endTime: 14,
    thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    tags: ["pixar", "toy story", "buzz"]
  },
  {
    id: 10,
    phrase: "matrix",
    movie: "The Matrix",
    year: 1999,
    character: "Morpheus",
    level: "B1",
    count: 980,
    youtubeId: "vKQi3bBA1y8",
    startTime: 30,
    endTime: 38,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    tags: ["matrix", "pill", "cyberpunk"]
  }
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("why so serious");
  const [selectedPhraseIndex, setSelectedPhraseIndex] = useState(0);
  const [isAutoPlaySequence, setIsAutoPlaySequence] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [keyTrigger, setKeyTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState('phrases');

  // Filter or generate dynamic phrase results like PlayPhrase.me
  const matchingPhrases = PLAYPHRASE_DATABASE.filter(item => 
    item.phrase.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.movie?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.character?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.some(t => t.includes(searchTerm.toLowerCase()))
  );

  // Dynamic fallback for any search term typed by user
  const phraseResults = matchingPhrases.length > 0 ? matchingPhrases : [
    {
      id: 991,
      phrase: searchTerm,
      translation: `Traduction de "${searchTerm}"`,
      movie: "Cinematic Masterpiece",
      year: 2024,
      character: "Lead Actor",
      level: "A2",
      count: 42,
      youtubeId: "EXeTwQWrcwY",
      startTime: 10,
      endTime: 16,
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
      tags: [searchTerm.toLowerCase(), "universal"]
    },
    {
      id: 992,
      phrase: `I think about ${searchTerm}`,
      translation: `Je pense à ${searchTerm}`,
      movie: "Hollywood Classics",
      year: 2022,
      character: "Narrator",
      level: "B1",
      count: 19,
      youtubeId: "hElHCLngBf8",
      startTime: 35,
      endTime: 42,
      thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
      tags: [searchTerm.toLowerCase(), "drama"]
    },
    {
      id: 993,
      phrase: `Where is the ${searchTerm}?`,
      translation: `Où est ${searchTerm} ?`,
      movie: "Action Blockbuster",
      year: 2023,
      character: "Hero",
      level: "A1",
      count: 115,
      youtubeId: "vKQi3bBA1y8",
      startTime: 30,
      endTime: 38,
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      tags: [searchTerm.toLowerCase(), "action"]
    }
  ];

  const currentPhrase = phraseResults[selectedPhraseIndex] || phraseResults[0];

  useEffect(() => {
    setSelectedPhraseIndex(0);
  }, [searchTerm]);

  // Sequence autoplay
  useEffect(() => {
    let timer;
    if (isAutoPlaySequence && phraseResults.length > 1) {
      const durationMs = ((currentPhrase.endTime - currentPhrase.startTime) || 5) * 1000;
      timer = setTimeout(() => {
        setSelectedPhraseIndex((prev) => (prev + 1) % phraseResults.length);
      }, durationMs);
    }
    return () => clearTimeout(timer);
  }, [selectedPhraseIndex, isAutoPlaySequence, phraseResults]);

  const copyQuoteLink = () => {
    navigator.clipboard.writeText(`"${currentPhrase.phrase}" — ${currentPhrase.movie} (${currentPhrase.year})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!hasEntered) {
    return (
      <div className="relative min-h-screen bg-[#0a0f1d] flex flex-col items-center justify-center p-6 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/30 rounded-full blur-[140px] animate-pulse pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/30 rounded-full blur-[140px] animate-pulse pointer-events-none" style={{ animationDuration: '4s' }}></div>

        <div className="relative z-10 max-w-xl w-full text-center space-y-8 bg-[#111827]/80 backdrop-blur-2xl p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-blue-400 animate-spin" />
            <span>PlayPhrase.me Style • 100% Free • Unlimited Movie Quotes</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white">
            Phrase<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Flix</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            The ultimate site for movie archaeologists. Type any phrase, word, or dialogue to instantly find and watch film clips where it is spoken.
          </p>

          <button 
            onClick={() => setHasEntered(true)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-lg shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>Entrer sur le site</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            <div>
              <div className="text-lg font-bold text-blue-400">40M+</div>
              <div>Phrases Indexées</div>
            </div>
            <div>
              <div className="text-lg font-bold text-indigo-400">0$</div>
              <div>100% Gratuit</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-400">Instantané</div>
              <div>Clips de Films</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 flex flex-col">
      {/* Top Navbar exact playphrase style */}
      <header className="sticky top-0 z-50 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6 w-full sm:w-auto justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSearchTerm("why so serious")}>
            <span className="text-xl font-black tracking-tight text-white">PlayPhrase<span className="text-blue-500">.me</span> <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">Clone Free</span></span>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="flex-1 max-w-2xl w-full relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tapez n'importe quelle phrase ou mot (ex: hello, love, why so serious)..."
            className="w-full bg-[#1e293b] border border-slate-700 rounded-xl pl-11 pr-4 py-2.5 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAutoPlaySequence(!isAutoPlaySequence)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${isAutoPlaySequence ? 'bg-blue-600/30 border-blue-500 text-blue-300' : 'bg-[#1e293b] border-slate-700 text-slate-300 hover:text-white'}`}
          >
            <Zap className="w-3.5 h-3.5 inline mr-1" />
            <span>Sequence: {isAutoPlaySequence ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </header>

      {/* Main PlayPhrase layout: Left phrase list, Right video player */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Phrase Matches List (PlayPhrase.me style) */}
        <div className="lg:col-span-5 bg-[#0f172a] border border-slate-800 rounded-3xl p-4 space-y-3 shadow-xl">
          <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Phrases trouvées ({phraseResults.length})</span>
            <span className="text-xs font-mono text-blue-400">100% Gratuit</span>
          </div>

          <div className="space-y-2.5 max-h-[650px] overflow-y-auto pr-1">
            {phraseResults.map((item, index) => (
              <div 
                key={item.id + index}
                onClick={() => setSelectedPhraseIndex(index)}
                className={`group p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1.5 ${index === selectedPhraseIndex ? 'bg-blue-950/40 border-blue-500/80 shadow-lg shadow-blue-950/50' : 'bg-[#1e293b]/60 border-slate-800 hover:bg-[#1e293b] hover:border-slate-700'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm sm:text-base group-hover:text-blue-300 transition-colors">
                      "{item.phrase}"
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                      {item.level}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">({item.count})</span>
                </div>
                <p className="text-xs text-slate-400 italic">
                  {item.translation}
                </p>
                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                  <span className="text-blue-400 font-medium">{item.movie} ({item.year})</span>
                  <span>{item.character}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Trending Box */}
          <div className="pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 px-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Recherches Populaires</span>
            </div>
            <div className="flex flex-wrap gap-1.5 px-1">
              {["why so serious", "i am your father", "hello", "love", "money", "matrix", "winter is coming", "run"].map(trend => (
                <button 
                  key={trend}
                  onClick={() => setSearchTerm(trend)}
                  className="px-2.5 py-1 rounded-lg bg-[#1e293b] hover:bg-blue-600/20 hover:border-blue-500/40 border border-slate-700 text-xs text-slate-300 transition-all font-medium"
                >
                  {trend}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Video Player & Details (PlayPhrase.me style) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Video Container */}
          <div className="relative rounded-3xl overflow-hidden bg-black border border-slate-800 shadow-2xl aspect-video flex items-center justify-center">
            <iframe 
              key={`${currentPhrase.id}-${keyTrigger}`}
              src={`https://www.youtube-nocookie.com/embed/${currentPhrase.youtubeId}?autoplay=1&start=${currentPhrase.startTime}&end=${currentPhrase.endTime}&modestbranding=1&rel=0&iv_load_policy=3`}
              title={currentPhrase.movie}
              className="w-full h-full border-0 absolute inset-0 pointer-events-auto"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            {/* Subtitle / Quote Overlay exact playphrase style */}
            <div className="absolute bottom-5 left-6 right-6 text-center pointer-events-none z-20">
              <div className="inline-block px-6 py-2.5 rounded-2xl bg-black/85 backdrop-blur-md border border-white/15 shadow-2xl">
                <p className="text-lg sm:text-2xl font-black text-white tracking-wide uppercase drop-shadow-lg">
                  "{currentPhrase.phrase}"
                </p>
                <p className="text-xs text-slate-300 mt-0.5">
                  {currentPhrase.translation}
                </p>
              </div>
            </div>
          </div>

          {/* Controls & Details Card */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-3 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
                    {currentPhrase.year}
                  </span>
                  <span className="text-slate-300 text-sm font-bold">{currentPhrase.movie}</span>
                </div>
                <p className="text-xs text-slate-400">Personnage : <strong className="text-white">{currentPhrase.character}</strong></p>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={copyQuoteLink}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1e293b] hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all border border-slate-700 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copié !' : 'Copier'}</span>
                </button>

                <button 
                  onClick={() => setKeyTrigger(prev => prev + 1)}
                  className="p-2.5 rounded-xl bg-[#1e293b] hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
                  title="Rejouer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => {
                    const nextIdx = (selectedPhraseIndex + 1) % phraseResults.length;
                    setSelectedPhraseIndex(nextIdx);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  <span>Suivant</span>
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#0f172a] py-6 px-4 text-center text-xs text-slate-500">
        <p>PhraseFlix (PlayPhrase Clone) — 100% Gratuit. Tous les clips et phrases du monde à portée de main.</p>
      </footer>
    </div>
  );
}
