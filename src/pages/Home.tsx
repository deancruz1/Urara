import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCharacterList, useCurrentBirthdays } from "../hooks";
import Container from "../components/Container";
import { Helmet } from "react-helmet-async";

const HARU_URARA_URL =
  "https://images.microcms-assets.io/assets/973fc097984b400db8729642ddff5938/ab34862a2ae0421ca01b42c161761f21/haruurara_list.png";

const Home = () => {
  const { data: characters, isLoading } = useCharacterList();
  const { data: birthdays } = useCurrentBirthdays();

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
  </Helmet>;

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-linear-to-br from-[#FA7395]/20 via-bg-primary to-[#EDE04B]/10" />

        {/* Character Image */}
        <div className="absolute right-0 bottom-0 h-full w-full md:w-1/2 flex items-end justify-center md:justify-end">
          <img
            src={HARU_URARA_URL}
            alt="Haru Urara"
            className="h-full w-auto object-contain object-bottom"
          />
        </div>

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-bg-primary via-bg-primary/80 to-transparent" />

        {/* Text Content */}
        <Container>
          <div className="relative z-10 flex h-screen flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-2 text-sm font-bold tracking-widest text-accent uppercase"
            >
              Umamusume Pretty Derby
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 text-6xl font-bold text-text-primary md:text-8xl"
            >
              Urara
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 max-w-md text-lg text-text-secondary"
            >
              Your complete guide to characters, music, and news from Umamusume
              Pretty Derby.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                to="/characters"
                className="inline-block rounded-full bg-accent px-8 py-3 text-sm font-bold text-white transition-opacity duration-300 hover:opacity-80"
              >
                Browse Characters
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Birthday Spotlight */}
      {birthdays && (
        <section className="py-16">
          <Container>
            <p className="mb-6 text-sm font-bold tracking-widest text-accent uppercase">
              Today's Birthdays
            </p>
            <div className="flex flex-wrap gap-4">
              <p className="text-text-secondary">No birthdays today.</p>
            </div>
          </Container>
        </section>
      )}

      {/* Featured Characters */}
      <section className="py-16">
        <Container>
          <p className="mb-6 text-sm font-bold tracking-widest text-accent uppercase">
            Characters
          </p>
          {isLoading ? (
            <p className="text-text-secondary">Loading...</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {characters?.slice(0, 12).map((char) => (
                <Link key={char.id} to="/characters">
                  <div className="group relative overflow-hidden rounded-2xl bg-bg-secondary">
                    <img
                      src={char.thumb_img}
                      alt={char.name_en}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-xs font-semibold text-white">
                        {char.name_en}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="mt-8">
            <Link
              to="/characters"
              className="inline-block rounded-full border border-border px-6 py-2 text-sm font-semibold text-text-primary transition-colors duration-300 hover:border-accent"
            >
              View All Characters
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
