/** Curated songs for the home page's "Winning Live" list. */
interface FeaturedTrack {
  id: number;
  /** Japanese title */
  name: string;
  name_en: string;
  artist: string;
  /** Album art */
  image: string;
  preview_url: string;
  singerIcon: string;
}

export const featuredTracks: FeaturedTrack[] = [
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
