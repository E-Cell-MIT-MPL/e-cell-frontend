/** Supplied E-Cell photography. Stable IDs preserve the approved collage slots.
 * The lower-right slot is split to show both presentation photographs.
 * Original file mapping is documented in public/images/business-clinic/hero/README.md.
 */
type HeroPhotograph = { image: string; alt: string; position: string };
type HeroMedia = HeroPhotograph & {
  id: string;
  depth: number;
  companion?: HeroPhotograph;
};

const mediaRoot = "/images/business-clinic/hero/";
export const clinicHeroLogo = {
  src: mediaRoot + "business-clinic-logo.png",
  width: 285,
  height: 326,
};
export const clinicHeroMedia: HeroMedia[] = [
  {
    id: "community",
    image: mediaRoot + "panel-discussion.webp",
    alt: "Panel members listening as a seated speaker speaks into a microphone",
    position: "53% 52%",
    depth: 0.7,
  },
  {
    id: "presentation",
    image: mediaRoot + "guest-speaker.webp",
    alt: "A guest speaker addressing attendees at MES",
    position: "43% 45%",
    depth: -0.5,
  },
  {
    id: "conversations",
    image: mediaRoot + "entrepreneurship-interaction.webp",
    alt: "Students discussing a display with a participant at an outdoor entrepreneurship stall",
    position: "58% 45%",
    depth: 1,
  },
  {
    id: "founders",
    image: mediaRoot + "fireside-chat.webp",
    alt: "A seated fireside-chat speaker holding a microphone beside a presentation screen",
    position: "40% 80%",
    depth: -0.8,
  },
  {
    id: "audience",
    image: mediaRoot + "student-pitch.webp",
    alt: "A student pitching an idea beside a presentation display",
    position: "53% 57%",
    depth: 0.6,
  },
  {
    id: "gathering",
    image: mediaRoot + "laptop-presentation.webp",
    alt: "Two students presenting together behind a laptop",
    position: "58% 36%",
    depth: -0.6,
  },
  {
    id: "team",
    image: mediaRoot + "classroom-presentation.webp",
    alt: "A student group presenting to a classroom audience",
    position: "64% 68%",
    depth: 0.8,
    companion: {
      image: mediaRoot + "group-presentation.webp",
      alt: "A student speaking alongside a group in front of a classroom display",
      position: "50% 58%",
    },
  },
];
