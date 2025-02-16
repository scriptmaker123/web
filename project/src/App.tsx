import React from 'react';
import {
  BookOpen,
  Code,
  Palette,
  Music,
  Camera,
  Briefcase,
  X,
  Play,
  Pause,
} from 'lucide-react';

interface Cheat {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  videoUrl: string;
  image: string;
  buyUrl?: string;
}

const Cheats: Cheat[] = [
  {
    id: 1,
    title: "Invision Cheats",
    description:
      "Get the undetected CS2 Cheat by InvisionCheats. This is an premium external CS2 Hack with many features. We provide the best CS2 Cheats on the market.",
    price: 9.99,
    category: "Paid Cs2 Cheats",
    videoUrl: "https://www.youtube.com/embed/NjzyNb_Zkm4",
    image: "https://invisionCheats.com/data/assets/nodeicons/invisionicon.png",
    buyUrl: "https://example.com/buy-invision",
  },
  {
    id: 2,
    title: "orbit",
    description: "21.",
    price: 0,
    category: "Free Cs2 Cheats",
    videoUrl: "https://www.youtube.com/embed/2s8fTVOkTB4",
    image:
      "https://yt3.googleusercontent.com/43OCRtbBKmLvCWFClkHT9zk7s50rRVXKKgQVVDJ6ez7YwJkj1SQ0hTURCwEvTX_oLGdSSu1pFA=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
    buyUrl: "https://example.com/buy-art",
  },
  {
    id: 3,
    title: "Mesachanger",
    description: "A Premium Inventory Changer for CS2",
    price: 6,
    category: "Skin Changer",
    videoUrl: "https://www.youtube.com/embed/JK3dwaxt9jU",
    image: "https://mesachanger.com/assets/images/logo/logo-light.png",
    buyUrl: "https://mesachanger.com/forum/account/upgrades",
  },
    {
    id: 3,
    title: "Mesachanger",
    description: "A Premium Inventory Changer for CS2",
    price: 6,
    category: "Skin Changer",
    videoUrl: "https://www.youtube.com/embed/JK3dwaxt9jU",
    image: "https://mesachanger.com/assets/images/logo/logo-light.png",
    buyUrl: "https://mesachanger.com/forum/account/upgrades",
  },
    {
    id: 4,
    title: "Mesachanger",
    description: "A Premium Inventory Changer for CS2",
    price: 6,
    category: "Skin Changer",
    videoUrl: "https://www.youtube.com/embed/JK3dwaxt9jU",
    image: "https://mesachanger.com/assets/images/logo/logo-light.png",
    buyUrl: "https://mesachanger.com/forum/account/upgrades",
  },
    {
    id: 5,
    title: "Mesachanger",
    description: "A Premium Inventory Changer for CS2",
    price: 6,
    category: "Skin Changer",
    videoUrl: "https://www.youtube.com/embed/JK3dwaxt9jU",
    image: "https://mesachanger.com/assets/images/logo/logo-light.png",
    buyUrl: "https://mesachanger.com/forum/account/upgrades",
  },
];

const categories = [
  { name: "All", icon: BookOpen },
  { name: "Paid Cs2 Cheats", icon: Code },
  { name: "Free Cs2 Cheats", icon: Code },
  { name: "Skin Changer", icon: Palette },
];

function App() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>("All");
  const [selectedCheat, setSelectedCheat] = React.useState<Cheat | null>(null);

  // Control modal panel scale for zoom animation.
  const [modalScale, setModalScale] = React.useState("scale-90");
  // Control the overlay's opacity (dark background) separately.
  const [overlayVisible, setOverlayVisible] = React.useState(false);

  // For controlling the hidden music player.
  const [musicPlayer, setMusicPlayer] = React.useState<any>(null);
  const [isMusicPlaying, setIsMusicPlaying] = React.useState<boolean>(false);

  // When a category other than "All" is selected, just filter normally.
  const filteredCheats =
    selectedCategory === "All"
      ? Cheats
      : Cheats.filter((cheat) => cheat.category === selectedCategory);

  // When "All" is selected, group cheats by their assigned category.
  const groupedCheats = React.useMemo(() => {
    const groups: { [key: string]: Cheat[] } = {};
    Cheats.forEach((cheat) => {
      if (!groups[cheat.category]) {
        groups[cheat.category] = [];
      }
      groups[cheat.category].push(cheat);
    });
    return groups;
  }, []);

  // Load YouTube IFrame API and initialize the hidden music player.
  React.useEffect(() => {
    if (!document.getElementById("youtube-api")) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.id = "youtube-api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
    (window as any).onYouTubeIframeAPIReady = () => {
      const player = new (window as any).YT.Player("music-player", {
        height: "0",
        width: "0",
        videoId: "lH_9m8CCjUU", // Music video ID
        playerVars: {
          autoplay: 0, // Do not autoplay.
          controls: 0,
          enablejsapi: 1,
          modestbranding: 1,
          showinfo: 0,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            setMusicPlayer(event.target);
          },
        },
      });
    };
  }, []);

  // Animate modal panel on open.
  React.useEffect(() => {
    if (selectedCheat) {
      setModalScale("scale-90");
      setTimeout(() => {
        setModalScale("scale-100");
      }, 10);
      setTimeout(() => {
        setOverlayVisible(true);
      }, 300);
    }
  }, [selectedCheat]);

  const closeModal = () => {
    setOverlayVisible(false);
    setModalScale("scale-90");
    setTimeout(() => {
      setSelectedCheat(null);
    }, 300);
  };

  const toggleMusic = () => {
    if (musicPlayer) {
      if (isMusicPlaying) {
        musicPlayer.pauseVideo();
        setIsMusicPlaying(false);
      } else {
        musicPlayer.playVideo();
        setIsMusicPlaying(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Hidden music player container (positioned off-screen) */}
      <div id="music-player" style={{ position: "absolute", left: "-9999px" }}></div>

      {/* Media Controls in the top right with AdBlock notice */}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <button
          onClick={toggleMusic}
          className="p-2 bg-gray-800 rounded-full text-gray-300 hover:bg-gray-700"
        >
          {isMusicPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </button>
        <span className="text-xs text-gray-400">
          (AdBlock users may need to click the music player)
        </span>
      </div>

      {/* Header */}
      <header className="bg-gray-800 border-b border-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src="https://yt3.googleusercontent.com/2cMaiWFIKtHW89EQZH5mSYTDfLEyCR2RDYyu0fNOLLWFm_xCDMntd7iBZrILZvnDYudSH6GQBwQ=s160-c-k-c0x00ffffff-no-rj"
              alt="Agawa Logo"
              className="h-8 w-8 rounded-full"
            />
            <h1 className="text-2xl font-bold text-white">Agawa</h1>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                  selectedCategory === category.name
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                } transition-colors duration-200 shadow-lg border border-purple-900/20`}
              >
                <Icon className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Cheat Grid */}
        {selectedCategory === "All" ? (
          // Render groups by category.
          Object.keys(groupedCheats).map((group) => (
            <div key={group} className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">{group}</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {groupedCheats[group].map((cheat) => (
                  <div
                    key={cheat.id}
                    className="bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:shadow-purple-900/20 transition-shadow duration-200 border border-purple-900/20"
                  >
                    <img
                      src={cheat.image}
                      alt={cheat.title}
                      className="w-full h-32 object-contain bg-gray-900 p-2"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white">
                        {cheat.title}
                      </h3>
                      <p className="mt-2 text-gray-400">{cheat.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-purple-400 font-semibold">
                          ${cheat.price}
                        </span>
                        <button
                          onClick={() => setSelectedCheat(cheat)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
                        >
                          View Cheat
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          // Render the filtered grid normally.
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCheats.map((cheat) => (
              <div
                key={cheat.id}
                className="bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:shadow-purple-900/20 transition-shadow duration-200 border border-purple-900/20"
              >
                <img
                  src={cheat.image}
                  alt={cheat.title}
                  className="w-full h-32 object-contain bg-gray-900 p-2"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white">
                    {cheat.title}
                  </h3>
                  <p className="mt-2 text-gray-400">{cheat.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-purple-400 font-semibold">
                      ${cheat.price}
                    </span>
                    <button
                      onClick={() => setSelectedCheat(cheat)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
                    >
                      View Cheat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cheat Modal with overlay click-to-dismiss and zoom animation */}
      {selectedCheat && (
        <div
          onClick={closeModal}
          className={`fixed inset-0 flex items-center justify-center p-4 transition-opacity duration-300 ${
            overlayVisible
              ? "opacity-100 bg-black bg-opacity-75"
              : "opacity-0 bg-black bg-opacity-0"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-gray-800 rounded-lg max-w-3xl w-full border border-purple-900/20 p-6 relative transform transition-transform duration-300 ${modalScale}`}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-300"
              onClick={closeModal}
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold text-white">
              {selectedCheat.title}
            </h2>
            <div className="mt-4 aspect-video">
              <iframe
                src={selectedCheat.videoUrl}
                title={selectedCheat.title}
                className="w-full h-full rounded-lg"
                allowFullScreen
              ></iframe>
            </div>
            <p className="mt-4 text-gray-300">{selectedCheat.description}</p>
            <p className="text-lg font-semibold text-purple-400 mt-2">
              ${selectedCheat.price}
            </p>
            <button
              className="mt-4 w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200"
              onClick={() => window.open(selectedCheat.buyUrl, "_blank")}
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
