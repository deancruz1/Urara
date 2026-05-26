import { Link } from "react-router-dom";
import { useState } from "react";
import { useCurrentBirthdays } from "../hooks";
import Container from "../components/Container";
import { Helmet } from "react-helmet-async";
import heroBg from "../assets/home-hero.webp";
import HomeNavbar from "../components/HomeNavbar";

interface BirthdayCharacter {
  birth_day: number;
  birth_month: number;
  game_id: number;
  id: number;
  name_en: string;
  name_jp: string;
  preferred_url: string;
  sns_icon: string;
}

interface BirthdaysResponse {
  current_birthdays: BirthdayCharacter[];
  next_birthdays: BirthdayCharacter[];
}

const featuredTracks = [
  {
    id: 397,
    name: "バクシンバクシンバクシンシン",
    name_en: "Bakushin Bakushin Bakushinshin",
    artist: "Sakura Bakushin O",
    image:
      "https://medium-media.vgm.io/albums/02/118220/118220-e9a81a7ad680.png",
    preview_url:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/3e/d6/b6/3ed6b6f6-4e98-c0db-3fa0-d06854c4ed93/mzaf_13636965349081312278.plus.aac.p.m4a",
    singerIcon:
      "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/c7c9b4ed17414f0b9fa0daeb55a4af55/sakurabakushino_icon.png",
  },
  {
    id: 211,
    name: "武名疾走!",
    name_en: "Bumei Shissou!",
    artist: "Yaeno Muteki",
    image:
      "https://medium-media.vgm.io/albums/52/116825/116825-27a0ae27b19f.jpg",
    preview_url:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/e4/76/cc/e476cc31-7b59-b999-3cca-2412ae4de3e2/mzaf_17384693243123477592.plus.aac.ep.m4a",
    singerIcon:
      "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/fa8ece356e6c484eae1cc8584b6e0d39/yaenomuteki_icon.png",
  },
  {
    id: 28,
    name: "帝笑歌劇〜讃えよ永久に〜",
    name_en: "TM Opera ~Tataeyo Towa Ni~",
    artist: "T.M. Opera O",
    image: "https://medium-media.vgm.io/albums/05/64650/64650-1491148785.jpg",
    preview_url:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview128/v4/63/5f/b0/635fb050-a2e3-bbb4-b8f9-102649c9e64e/mzaf_228176902886548968.plus.aac.ep.m4a",
    singerIcon:
      "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/66919331e5644e6da2a72a42aeca4449/tmoperao_icon.png",
  },
  {
    id: 145,
    name: "Secret GRADUATION",
    name_en: "Secret GRADUATION",
    artist: "Grass Wonder",
    image:
      "https://medium-media.vgm.io/albums/39/113493/113493-8a10898dc72f.jpg",
    preview_url:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/85/86/f5/8586f540-9a30-01e0-e9a8-d5ae42f66cc7/mzaf_16890940316618246631.plus.aac.ep.m4a",
    singerIcon:
      "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/41146e002c394fbb897be86d4add3ff1/grasswonder_icon.png",
  },
  {
    id: 9,
    name: "DREAM JACK",
    name_en: "DREAM JACK",
    artist: "Fuji Kiseki",
    image:
      "https://medium-media.vgm.io/albums/19/113491/113491-ae5c8e61f402.jpg",
    preview_url:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/3b/a2/79/3ba2799d-0b69-7894-12a0-d952c9fbaa20/mzaf_2452716236320655205.plus.aac.ep.m4a",
    singerIcon:
      "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/0294fa4b5199451282856fe3a1e41f1a/fujikiseki_icon.png",
  },
];

const Home = () => {
  const { data: birthdaysData } = useCurrentBirthdays();
  const birthdays = birthdaysData as BirthdaysResponse | undefined;
  const [activeTab, setActiveTab] = useState<"today" | "calendar">("today");
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);

  // Get current date
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // Group birthdays by month for calendar view
  const allBirthdays = birthdays
    ? [
        ...(birthdays.current_birthdays || []),
        ...(birthdays.next_birthdays || []),
      ]
    : [];

  const birthdaysByMonth = allBirthdays.reduce(
    (acc: Record<number, BirthdayCharacter[]>, char) => {
      const month = char.birth_month;
      if (!acc[month]) acc[month] = [];
      acc[month].push(char);
      return acc;
    },
    {},
  );

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Check if today is someone's birthday
  const todaysBirthdays = birthdays?.current_birthdays || [];

  const handlePlay = (trackId: number) => {
    if (playingTrackId === trackId) {
      setPlayingTrackId(null);
    } else {
      setPlayingTrackId(trackId);
    }
  };

  return (
    <>
      <Helmet>
        <title>Home | Urara</title>
        <meta
          name="description"
          content="Your complete guide to characters, music, and news from Umamusume Pretty Derby."
        />
        <meta property="og:title" content="Urara | Umamusume Pretty Derby" />
        <meta
          property="og:description"
          content="Your complete guide to characters, music, and news from Umamusume Pretty Derby."
        />
      </Helmet>

      <div className="min-h-screen bg-bg-primary shadow-xl">
        {/* Hero Section with integrated navbar */}
        <section className="relative h-screen w-full overflow-hidden">
          {/* Content container with flex */}
          <div className="relative z-10 flex h-full w-full">
            {/* Left Sidebar Nav */}
            <div className="lg:w-[15%] z-20 relative">
              <HomeNavbar />
            </div>

            {/* Right Content - 85% width with background image */}
            <div className="w-full lg:w-[85%] relative">
              {/* Background Image - only in right side */}
              <img
                src={heroBg}
                alt="Hero background"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Birthdays Section with Tabs */}
        <section className="py-16">
          <Container>
            {/* Tab Buttons */}
            <div className="flex gap-2 mb-8 border-b border-border">
              <button
                onClick={() => setActiveTab("today")}
                className={`px-6 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === "today"
                    ? "text-accent border-b-2 border-accent"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Today's Birthdays 🎂
                {todaysBirthdays.length > 0 && (
                  <span className="ml-2 text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                    {todaysBirthdays.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("calendar")}
                className={`px-6 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === "calendar"
                    ? "text-accent border-b-2 border-accent"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Upcoming Birthdays this Month 📅
              </button>
            </div>

            {/* Today's Birthdays Tab */}
            {activeTab === "today" && (
              <>
                {!birthdays ? (
                  <p className="text-text-secondary">Loading birthdays...</p>
                ) : todaysBirthdays.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-text-secondary">No birthdays today.</p>
                    <p className="text-text-secondary text-sm mt-2">
                      Check the calendar for upcoming birthdays!
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-4">
                    {todaysBirthdays.map((char) => (
                      <Link
                        key={char.id}
                        to={`/characters/${char.id}`}
                        className="flex items-center gap-3 rounded-xl bg-bg-secondary p-4 transition-transform hover:scale-105 flex-1 min-w-[200px]"
                      >
                        <img
                          src={char.sns_icon}
                          alt={char.name_en}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-text-primary">
                            {char.name_en}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {char.name_jp}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Birthday Calendar Tab - Full Width List */}
            {activeTab === "calendar" && (
              <>
                {!birthdays ? (
                  <p className="text-text-secondary">Loading birthdays...</p>
                ) : (
                  <div className="flex flex-col gap-8 w-full">
                    {monthNames.map((month, index) => {
                      const monthNumber = index + 1;
                      const monthBirthdays = birthdaysByMonth[monthNumber];

                      if (!monthBirthdays || monthBirthdays.length === 0)
                        return null;

                      return (
                        <div
                          key={month}
                          className="rounded-2xl bg-bg-secondary p-6 w-full"
                        >
                          <h3 className="mb-4 text-xl font-bold text-text-primary border-b border-border pb-2">
                            {month}
                          </h3>
                          <div className="flex flex-wrap gap-4">
                            {monthBirthdays
                              .sort((a, b) => a.birth_day - b.birth_day)
                              .map((char) => {
                                const isToday =
                                  monthNumber === currentMonth &&
                                  char.birth_day === currentDay;
                                return (
                                  <Link
                                    key={char.id}
                                    to={`/characters/${char.id}`}
                                    className={`flex items-center gap-3 rounded-xl bg-bg-tertiary p-4 transition-transform hover:scale-105 flex-1 min-w-[200px] ${
                                      isToday
                                        ? "ring-2 ring-accent bg-accent/5"
                                        : ""
                                    }`}
                                  >
                                    <img
                                      src={char.sns_icon}
                                      alt={char.name_en}
                                      className="h-12 w-12 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                      <p className="font-semibold text-text-primary">
                                        {char.name_en}
                                      </p>
                                      <p className="text-xs text-text-secondary">
                                        {char.name_jp}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm font-semibold text-accent">
                                        {month} {char.birth_day}
                                      </p>
                                      {isToday && (
                                        <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full">
                                          Today
                                        </span>
                                      )}
                                    </div>
                                  </Link>
                                );
                              })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </Container>
        </section>

        {/* Featured Music */}
        <section className="py-16">
          <Container>
            <p className="mb-6 text-sm font-bold tracking-widest text-accent uppercase">
              Featured Music
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {featuredTracks.map((track) => (
                <div
                  key={track.id}
                  className="group relative overflow-hidden rounded-2xl bg-bg-secondary"
                >
                  <img
                    src={track.image}
                    alt={track.name_en}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Singer Icon - Top Right (below overlay) */}
                  {track.singerIcon && (
                    <div className="absolute top-3 right-3 z-0">
                      <img
                        src={track.singerIcon}
                        alt={track.artist}
                        className="h-12 w-12 rounded-full border-2 border-white/80 object-cover shadow-lg"
                      />
                    </div>
                  )}

                  {/* Overlay - covers everything including singer icon on hover */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/70 via-black/40 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10">
                    <div>
                      <p className="text-xs font-semibold text-white line-clamp-2">
                        {track.name_en}
                      </p>
                      <p className="text-xs text-white/80">{track.artist}</p>
                      <button
                        onClick={() => handlePlay(track.id)}
                        className="mt-2 rounded-full bg-accent p-2 text-white transition-transform hover:scale-105 cursor-pointer w-8 h-8 flex items-center justify-center"
                      >
                        {playingTrackId === track.id ? (
                          <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                          </svg>
                        ) : (
                          <svg
                            className="h-4 w-4 ml-0.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                to="/music"
                className="inline-block rounded-full border border-border px-6 py-2 text-sm font-semibold text-text-primary transition-colors duration-300 hover:border-accent"
              >
                Browse All Music
              </Link>
            </div>
          </Container>
        </section>
      </div>

      {/* Audio Player */}
      {playingTrackId && (
        <audio
          key={playingTrackId}
          src={featuredTracks.find((t) => t.id === playingTrackId)?.preview_url}
          autoPlay
          onEnded={() => setPlayingTrackId(null)}
          className="hidden"
        />
      )}
    </>
  );
};

export default Home;
