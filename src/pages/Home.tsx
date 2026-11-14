import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useCharacterInfo, useLatestNews } from "../hooks";
import { todayJST } from "../lib/jst";
import { todaysBirthdays, upcomingGroups } from "../lib/birthdays";
import { lastActivity, mmdd, newsMMDD } from "../lib/format";
import { TitleBlock } from "../components/home/TitleBlock";
import { BirthdaysSection } from "../components/home/BirthdaysSection";
import { FeaturedField } from "../components/home/FeaturedField";
import { WinningLive } from "../components/home/WinningLive";
import { NewsPreview } from "../components/home/NewsPreview";

const Home = () => {
  const [today] = useState(() => todayJST());
  const info = useCharacterInfo();
  const news = useLatestNews(5, 0);

  const characters = info.data;
  let nextBirthday: string | undefined;
  if (characters) {
    if (todaysBirthdays(characters, today).length > 0) {
      nextBirthday = mmdd(today.month, today.day);
    } else {
      const next = upcomingGroups(characters, today, 1)[0];
      nextBirthday = next ? mmdd(next.month, next.day) : undefined;
    }
  }
  const latest = news.data?.[0];

  return (
    <>
      <Helmet>
        <title>Home | Urara</title>
        <meta
          name="description"
          content="Profiles, voice lines, songs and birthdays for every Umamusume Pretty Derby character, plus the latest news."
        />
      </Helmet>

      <TitleBlock
        count={characters?.length}
        nextBirthday={nextBirthday}
        latestNews={latest ? newsMMDD(lastActivity(latest)) : undefined}
      />
      <BirthdaysSection
        characters={characters}
        isLoading={info.isLoading}
        isError={info.isError}
        today={today}
      />
      <FeaturedField
        characters={characters}
        isLoading={info.isLoading}
        isError={info.isError}
        today={today}
      />
      <div className="wrap flex flex-wrap gap-12 pt-16">
        <WinningLive />
        <NewsPreview posts={news.data} isLoading={news.isLoading} isError={news.isError} />
      </div>
    </>
  );
};

export default Home;
