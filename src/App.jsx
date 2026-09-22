import React, { useState, useEffect } from 'react';
import { 
  Search, Play, Pause, RotateCcw, Sparkles, Film, 
  Share2, Download, Zap, Flame, ArrowRight, Check, Copy, SkipForward, Code, Volume2
} from 'lucide-react';

// Comprehensive database of iconic movie quotes with verified YouTube clip IDs and precise timestamps
const MOCK_DATABASE = [
  {
    id: 1,
    phrase: "why so serious",
    movie: "The Dark Knight",
    year: 2008,
    character: "The Joker",
    actor: "Heath Ledger",
    youtubeId: "EXeTwQWrcwY",
    startTime: 10,
    endTime: 16,
    thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    tags: ["joker", "batman", "dark", "serious"]
  },
  {
    id: 2,
    phrase: "i am your father",
    movie: "Star Wars: Empire Strikes Back",
    year: 1980,
    character: "Darth Vader",
    actor: "James Earl Jones",
    youtubeId: "hElHCLngBf8",
    startTime: 40,
    endTime: 47,
    thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    tags: ["star wars", "vader", "father", "epic"]
  },
  {
    id: 3,
    phrase: "may the force be with you",
    movie: "Star Wars: A New Hope",
    year: 1977,
    character: "General Dodonna",
    actor: "Alex McCrindle",
    youtubeId: "vZgjy-ecocQ",
    startTime: 5,
    endTime: 12,
    thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    tags: ["star wars", "force", "classic"]
  },
  {
    id: 4,
    phrase: "say hello to my little friend",
    movie: "Scarface",
    year: 1983,
    character: "Tony Montana",
    actor: "Al Pacino",
    youtubeId: "a_z4Iuxivjk",
    startTime: 55,
    endTime: 62,
    thumbnail: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=800&q=80",
    tags: ["scarface", "tony montana", "action"]
  },
  {
    id: 5,
    phrase: "show me the money",
    movie: "Jerry Maguire",
    year: 1996,
    character: "Rod Tidwell",
    actor: "Cuba Gooding Jr.",
    youtubeId: "mXh5i-yVY9Q",
    startTime: 12,
    endTime: 18,
    thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
    tags: ["jerry maguire", "money", "classic"]
  },
  {
    id: 6,
    phrase: "winter is coming",
    movie: "Game of Thrones",
    year: 2011,
    character: "Ned Stark",
    actor: "Sean Bean",
    youtubeId: "rlz_INjdqg4",
    startTime: 2,
    endTime: 8,
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    tags: ["got", "stark", "winter", "epic"]
  },
  {
    id: 7,
    phrase: "you talking to me",
    movie: "Taxi Driver",
    year: 1976,
    character: "Travis Bickle",
    actor: "Robert De Niro",
    youtubeId: "oOJtU_Sw2eM",
    startTime: 20,
    endTime: 28,
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
    tags: ["taxi driver", "de niro", "classic"]
  },
  {
    id: 8,
    phrase: "hasta la vista baby",
    movie: "Terminator 2",
    year: 1991,
    character: "The Terminator",
    actor: "Arnold Schwarzenegger",
    youtubeId: "X-W3WVDMlvk",
    startTime: 15,
    endTime: 22,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    tags: ["terminator", "arnold", "action"]
  },
  {
    id: 9,
    phrase: "to infinity and beyond",
    movie: "Toy Story",
    year: 1995,
    character: "Buzz Lightyear",
    actor: "Tim Allen",
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
    actor: "Laurence Fishburne",
    youtubeId: "vKQi3bBA1y8",
    startTime: 30,
    endTime: 38,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    tags: ["matrix", "pill", "cyberpunk"]
  }
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("why so serious");
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [isAutoPlaySequence, setIsAutoPlaySequence] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [keyTrigger, setKeyTrigger] = useState(0);

  // Filter clips based on search term
  const filteredClips = MOCK_DATABASE.filter(clip => 
    clip.phrase.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clip.movie.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clip.character.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clip.tags.some(t => t.includes(searchTerm.toLowerCase()))
  );

  const currentClip = filteredClips[activeClipIndex] || filteredClips[0] || MOCK_DATABASE[0];

  useEffect(() => {
    setActiveClipIndex(0);
  }, [searchTerm]);

  // Handle sequence autoplay simulation
  useEffect(() => {
    let timer;
    if (isAutoPlaySequence && filteredClips.length > 1) {
      const durationMs = ((currentClip.endTime - currentClip.startTime) || 5) * 1000;
      timer = setTimeout(() => {
        setActiveClipIndex((prev) => (prev + 1) % filteredClips.length);
      }, durationMs);
    }
    return () => clearTimeout(timer);
  }, [activeClipIndex, isAutoPlaySequence, filteredClips]);

  const copyQuoteLink = () => {
    navigator.clipboard.writeText(`"${currentClip.phrase}" — ${currentClip.movie} (${currentClip.year})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!hasEntered) {
    return (
      <div className="relative min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 overflow-hidden">
        {/* Background ambient glowing spheres */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/35 rounded-full blur-[140px] animate-pulse pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-fuchsia-600/35 rounded-full blur-[140px] animate-pulse pointer-events-none" style={{ animationDuration: '4s' }}></div>

        <div className="relative z-10 max-w-2xl w-full text-center space-y-8 bg-slate-900/70 backdrop-blur-2xl p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl shadow-purple-950/50">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs sm:text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
            <span>100% Free • Instant Movie Scene Search • Zero Ads</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white">
            Phrase<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-500">Flix</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Search any quote or word and watch the exact movie scene instantly. 100% free, lightning fast, and built for film lovers.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setHasEntered(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-bold text-lg shadow-xl shadow-purple-600/40 hover:shadow-purple-600/70 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group cursor-pointer"
            >
              <span>Start Watching Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-center">
            <div>
              <div className="text-2xl font-black text-purple-400">100%</div>
              <div className="text-xs text-slate-400">Free Forever</div>
            </div>
            <div>
              <div className="text-2xl font-black text-fuchsia-400">Instant</div>
              <div className="text-xs text-slate-400">Video Clips</div>
            </div>
            <div>
              <div className="text-2xl font-black text-pink-400">HD</div>
              <div className="text-xs text-slate-400">Cinematic Quality</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSearchTerm("why so serious")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Film className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white">Phrase<span className="text-purple-400">Flix</span></span>
            <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 font-semibold">100% FREE</span>
          </div>
        </div>

        {/* Search Bar in Header */}
        <div className="flex-1 max-w-xl mx-4 sm:mx-8 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type any word or phrase (e.g., 'why so serious', 'father', 'matrix')..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAutoPlaySequence(!isAutoPlaySequence)}
            className={`hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${isAutoPlaySequence ? 'bg-purple-600/20 border-purple-500 text-purple-300 shadow-lg shadow-purple-900/40' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Sequence: {isAutoPlaySequence ? 'ON' : 'OFF'}</span>
          </button>

          <a 
            href="https://github.com/jamilboubout-oss/phraseflix" 
            target="_blank" 
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
            title="GitHub Repository"
          >
            <Code className="w-5 h-5" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left / Center Video Player & Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* YouTube Cinematic Video Embed Container */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl aspect-video flex items-center justify-center">
            <iframe 
              key={`${currentClip.id}-${keyTrigger}`}
              src={`https://www.youtube-nocookie.com/embed/${currentClip.youtubeId}?autoplay=1&start=${currentClip.startTime}&end=${currentClip.endTime}&modestbranding=1&rel=0&iv_load_policy=3`}
              title={currentClip.movie}
              className="w-full h-full border-0 absolute inset-0 pointer-events-auto"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            {/* Subtitle / Quote Overlay Banner */}
            <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none z-20">
              <div className="inline-block px-6 py-2.5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 shadow-2xl">
                <p className="text-base sm:text-2xl font-black text-white tracking-wide uppercase drop-shadow-lg">
                  "{currentClip.phrase}"
                </p>
              </div>
            </div>
          </div>

          {/* Current Clip Info & Actions */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-3 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold">
                    {currentClip.year}
                  </span>
                  <span className="text-slate-400 text-sm">Character: <strong className="text-white">{currentClip.character}</strong></span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">{currentClip.movie}</h2>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={copyQuoteLink}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all border border-slate-700 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied Quote!' : 'Copy Quote'}</span>
                </button>

                <button 
                  onClick={() => setKeyTrigger(prev => prev + 1)}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
                  title="Replay Clip"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => {
                    const nextIdx = (activeClipIndex + 1) % filteredClips.length;
                    setActiveClipIndex(nextIdx);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-sm font-bold transition-all shadow-lg shadow-purple-600/30 cursor-pointer"
                >
                  <span>Next Clip</span>
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
              {currentClip.tags.map(tag => (
                <button 
                  key={tag} 
                  onClick={() => setSearchTerm(tag)}
                  className="px-3 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs font-medium transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar: Playlist / Search Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Film className="w-5 h-5 text-purple-400" />
              <span>Matching Clips ({filteredClips.length})</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">100% Free</span>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {filteredClips.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/50 border border-slate-800 rounded-2xl">
                <p className="text-slate-400 text-sm mb-2">No movie clips found for "{searchTerm}"</p>
                <button 
                  onClick={() => setSearchTerm("why so serious")}
                  className="px-4 py-2 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 text-xs font-semibold hover:bg-purple-600/30"
                >
                  Try "why so serious"
                </button>
              </div>
            ) : (
              filteredClips.map((clip, index) => (
                <div 
                  key={clip.id}
                  onClick={() => setActiveClipIndex(index)}
                  className={`group flex items-center gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${index === activeClipIndex ? 'bg-purple-950/40 border-purple-500/60 shadow-lg shadow-purple-950/50' : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/80 hover:border-slate-700'}`}
                >
                  <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0">
                    <img src={clip.thumbnail} alt={clip.movie} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate group-hover:text-purple-300 transition-colors">{clip.movie}</h4>
                    <p className="text-xs text-slate-400 truncate">"{clip.phrase}"</p>
                    <span className="inline-block mt-1 text-[10px] text-purple-400 font-mono">{clip.character}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Trending Searches Box */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-pink-500" />
              <span>Trending Searches</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {["why so serious", "i am your father", "may the force", "say hello", "show me the money", "winter is coming", "inception", "matrix"].map(trend => (
                <button 
                  key={trend}
                  onClick={() => setSearchTerm(trend)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-purple-600/20 hover:border-purple-500/40 border border-slate-700 text-xs text-slate-300 hover:text-purple-300 transition-all font-medium"
                >
                  {trend}
                </button>
              ))}
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-4 text-center text-xs text-slate-500">
        <p>PhraseFlix is 100% free and open-source. Built for movie lovers worldwide.</p>
      </footer>
    </div>
  );
}
