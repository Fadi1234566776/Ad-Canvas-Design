import img01 from "@assets/MAR23S_-_MSFB_011_Static_PreMenoMetabolism_V3_Chart_4x5_1774543193042.png";
import img02 from "@assets/GFSS026_O30HS_V3_4-5_1774543249504.png";
import img03 from "@assets/1_1774543451456.png";
import img04 from "@assets/Concept2_Google_Static_1080x1350_v2_1774543469388.jpg";
import img05 from "@assets/Concept1_Google_Static_1080x1350_v4_1774543487196.jpg";
import img06 from "@assets/55555_1774543500978.png";
import img07 from "@assets/4_1774543557194.jpg";
import img08 from "@assets/5_1774543557195.jpg";
import img09 from "@assets/Artboard_1_1774543630315.png";
import img10 from "@assets/2-qHL80nOx7-transformed_1774543672986.png";
import img11 from "@assets/78_1774543703486.png";
import img12 from "@assets/1080x1920_1774543769614.jpg";
import img13 from "@assets/1080x1920_1774543781049.jpg";
import img14 from "@assets/story_1774543797661.png";
import img15 from "@assets/O30HS_036_Static_LumpyLegs_V2_Illustration_4-5_1774543903363.png";
import img16 from "@assets/2_1774543934817.png";
import img17 from "@assets/GFSS017_03OHS_V1_DS_XX_9x16_1774543983284.png";
import img18 from "@assets/2_1774543995248.png";

export type AdFormat = "4:5" | "9:16" | "1:1";

export interface Project {
  id: string;
  imageUrl: string;
  format: AdFormat;
}

// 4:5 — identified by filename keywords: 4x5, 4-5, 1080x1350
export const feedAds: Project[] = [
  { id: "f1", imageUrl: img01, format: "4:5" },
  { id: "f2", imageUrl: img02, format: "4:5" },
  { id: "f3", imageUrl: img03, format: "4:5" },
  { id: "f4", imageUrl: img04, format: "4:5" },
  { id: "f5", imageUrl: img05, format: "4:5" },
  { id: "f6", imageUrl: img06, format: "4:5" },
  { id: "f7", imageUrl: img07, format: "4:5" },
  { id: "f8", imageUrl: img08, format: "4:5" },
  { id: "f9", imageUrl: img15, format: "4:5" },
];

// 9:16 — identified by filename keywords: 9x16, 1080x1920, story, and Wellsite tall creatives
export const storyAds: Project[] = [
  { id: "s1", imageUrl: img09, format: "9:16" },
  { id: "s2", imageUrl: img11, format: "9:16" },
  { id: "s3", imageUrl: img12, format: "9:16" },
  { id: "s4", imageUrl: img13, format: "9:16" },
  { id: "s5", imageUrl: img14, format: "9:16" },
  { id: "s6", imageUrl: img17, format: "9:16" },
];

// 1:1 — remaining images with square-ish compositions
export const squareAds: Project[] = [
  { id: "q1", imageUrl: img10, format: "1:1" },
  { id: "q2", imageUrl: img16, format: "1:1" },
  { id: "q3", imageUrl: img18, format: "1:1" },
];

// Flat list for lightbox navigation
export const allProjects: Project[] = [...feedAds, ...storyAds, ...squareAds];
