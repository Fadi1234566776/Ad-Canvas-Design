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

// New batch
import img19 from "@assets/post1_1774544714504.png";
import img20 from "@assets/logitech_2_1774544754767.png";
import img21 from "@assets/sport_1774544758846.png";
import img22 from "@assets/Logitech_G__1774544765543.png";
import img23 from "@assets/sport5_1774544773227.png";
import img24 from "@assets/sport_3_1774544793888.png";
import img25 from "@assets/WhatsApp_Image_2022-12-12_at_1.44.13_PM_(1)_1774544900302.jpeg";
import img26 from "@assets/WhatsApp_Image_2022-12-12_at_1.44.06_PM_1774544908821.jpeg";
import img27 from "@assets/v_1774545004527.png";

// New batch 4 — Smartwatch band (9:16 + 1:1)
import img49 from "@assets/6_1774548311275.png";
import img50 from "@assets/2_1774548311278.png";
import img51 from "@assets/5_1774548311279.png";
import img52 from "@assets/3_1774548311279.png";
import img53 from "@assets/1_1774548311279.png";
import img54 from "@assets/4_1774548311279.png";

// New batch 3 — OrthoEase pillows (1:1)
import img37 from "@assets/5_1774547589399.png";
import img38 from "@assets/4_1774547589399.png";
import img39 from "@assets/3_1774547589400.png";
import img40 from "@assets/1_1774547589400.png";
import img41 from "@assets/2_1774547589401.png";
import img42 from "@assets/6_1774547589401.png";
// New batch 3 — STRYX FORCE PRO (9:16)
import img43 from "@assets/4_1774547594604.png";
import img44 from "@assets/6_1774547594605.png";
import img45 from "@assets/3_1774547594606.png";
import img46 from "@assets/2_1774547594608.png";
import img47 from "@assets/1_1774547594609.png";
import img48 from "@assets/5_1774547594613.png";

// New batch 2
import img28 from "@assets/1b2f04199441167.66518c0f9166c_1774546159569.webp";
import img29 from "@assets/6_1774546477416.png";
import img30 from "@assets/3_1774546477417.png";
import img31 from "@assets/1_1774546477417.png";
import img32 from "@assets/5_1774546477418.png";
import img33 from "@assets/2_1774546477418.png";
import img34 from "@assets/4_1774546477418.png";
import img35 from "@assets/Artboard_1_1774546665807.png";
import img36 from "@assets/Artboard_2_copy_1774546672371.png";
import metaFeed12 from "@assets/meta-feed-12.jpg";
import metaFeed13 from "@assets/meta-feed-13.jpg";
import metaFeed14 from "@assets/meta-feed-14.png";
import metaFeed15 from "@assets/meta-feed-15.png";
import storyAd01 from "@assets/story-batch-01.png";
import storyAd02 from "@assets/story-batch-02.png";
import storyAd03 from "@assets/story-batch-03.png";
import metaFeed16 from "@assets/meta-feed-16.png";
import metaFeed17 from "@assets/meta-feed-17.png";
import metaFeed18 from "@assets/meta-feed-18.png";
import metaFeed19 from "@assets/meta-feed-19.png";
import metaFeed20 from "@assets/meta-feed-20.png";
import storyAd04 from "@assets/story-batch-04.png";
import storyAd05 from "@assets/story-batch-05.png";
import storyAd06 from "@assets/story-batch-06.png";
import storyAd07 from "@assets/story-batch-07.png";
import storyAd08 from "@assets/story-batch-08.png";
import squareAd01 from "@assets/square-batch-01.png";
import squareAd02 from "@assets/square-batch-02.png";
import squareAd03 from "@assets/square-batch-03.png";
import squareAd04 from "@assets/square-batch-04.png";
import squareAd05 from "@assets/square-batch-05.png";

export type AdFormat = "4:5" | "9:16" | "1:1";

export interface Project {
  id: string;
  imageUrl: string;
  format: AdFormat;
}

// 4:5 — portrait feed ads (1080×1350 style)
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
  { id: "f10", imageUrl: img35, format: "4:5" }, // Burgan Bank "Crafted for The Confident"
  { id: "f11", imageUrl: img36, format: "4:5" }, // Burgan Bank "Shop smart 50% back"
  { id: "f12", imageUrl: metaFeed12, format: "4:5" },
{ id: "f13", imageUrl: metaFeed13, format: "4:5" },
{ id: "f14", imageUrl: metaFeed14, format: "4:5" },
  { id: "f15", imageUrl: metaFeed15, format: "4:5" },
  { id: "f16", imageUrl: metaFeed16, format: "4:5" },
{ id: "f17", imageUrl: metaFeed17, format: "4:5" },
{ id: "f18", imageUrl: metaFeed18, format: "4:5" },
{ id: "f19", imageUrl: metaFeed19, format: "4:5" },
{ id: "f20", imageUrl: metaFeed20, format: "4:5" },
  { id: "q2", imageUrl: img16, format: "1:1" },
  { id: "q3", imageUrl: img18, format: "1:1" },
]; 

// 9:16 — story / tall portrait (1080×1920 style)
export const storyAds: Project[] = [
    { id: "s22", imageUrl: storyAd04, format: "9:16" },
{ id: "s23", imageUrl: storyAd05, format: "9:16" },
{ id: "s24", imageUrl: storyAd06, format: "9:16" },
{ id: "s25", imageUrl: storyAd07, format: "9:16" },
{ id: "s26", imageUrl: storyAd08, format: "9:16" },
  { id: "s1", imageUrl: img09, format: "9:16" },
  { id: "s2", imageUrl: img11, format: "9:16" },
  { id: "s3", imageUrl: img12, format: "9:16" },
  { id: "s4", imageUrl: img13, format: "9:16" },
  { id: "s5", imageUrl: img14, format: "9:16" },
  { id: "s6", imageUrl: img17, format: "9:16" },
  // New: tall sport ads detected as 9:16
  { id: "s7", imageUrl: img21, format: "9:16" },
  { id: "s8", imageUrl: img23, format: "9:16" },
  // New: STRYX FORCE PRO (9:16)
  { id: "s9", imageUrl: img43, format: "9:16" },
  { id: "s10", imageUrl: img44, format: "9:16" },
  { id: "s11", imageUrl: img45, format: "9:16" },
  { id: "s12", imageUrl: img46, format: "9:16" },
  { id: "s13", imageUrl: img47, format: "9:16" },
  { id: "s14", imageUrl: img48, format: "9:16" },
  // New: smartwatch band tall ads (9:16)
  { id: "s15", imageUrl: img49, format: "9:16" },
  { id: "s16", imageUrl: img50, format: "9:16" },
  { id: "s17", imageUrl: img51, format: "9:16" },
  { id: "s18", imageUrl: img52, format: "9:16" },
 { id: "s19", imageUrl: storyAd01, format: "9:16" },
{ id: "s20", imageUrl: storyAd02, format: "9:16" },
{ id: "s21", imageUrl: storyAd03, format: "9:16" },
];

// 1:1 — square ads
export const squareAds: Project[] = [
    { id: "q26", imageUrl: squareAd01, format: "1:1" },
{ id: "q27", imageUrl: squareAd02, format: "1:1" },
{ id: "q28", imageUrl: squareAd03, format: "1:1" },
{ id: "q29", imageUrl: squareAd04, format: "1:1" },
  { id: "q1", imageUrl: img10, format: "1:1" },
  // New: square ads
  { id: "q4", imageUrl: img19, format: "1:1" }, // Korean BBQ — square
  { id: "q5", imageUrl: img20, format: "1:1" }, // Logitech Level Up — square
  { id: "q6", imageUrl: img22, format: "1:1" }, // Logitech Sound — square
  { id: "q8", imageUrl: img25, format: "1:1" }, // Spirit of Kings — square
  { id: "q9", imageUrl: img26, format: "1:1" }, // Fratelli Diamanti — square
  { id: "q10", imageUrl: img27, format: "1:1" }, // V Super Soda — square
  { id: "q11", imageUrl: img28, format: "1:1" }, // Bestway CoolerZ — square
  { id: "q12", imageUrl: img29, format: "1:1" }, // Triple Chocolate Mousse Cake — square
  { id: "q13", imageUrl: img30, format: "1:1" }, // Huff & Puff burger — square
  { id: "q14", imageUrl: img31, format: "1:1" }, // Amazon Natural Honey — square
  { id: "q15", imageUrl: img32, format: "1:1" }, // BMW X6 — square
  { id: "q16", imageUrl: img33, format: "1:1" }, // Dior Hypnotic Poison — square
  { id: "q17", imageUrl: img34, format: "1:1" }, // Vertex Gaming Ready to Play — square
  // New: OrthoEase pillows (1:1)
  { id: "q18", imageUrl: img37, format: "1:1" },
  { id: "q19", imageUrl: img38, format: "1:1" },
  { id: "q20", imageUrl: img39, format: "1:1" },
  { id: "q21", imageUrl: img40, format: "1:1" },
  { id: "q22", imageUrl: img41, format: "1:1" },
  { id: "q23", imageUrl: img42, format: "1:1" },
  // New: smartwatch band square ads (1:1)
  { id: "q24", imageUrl: img53, format: "1:1" },
{ id: "q30", imageUrl: squareAd05, format: "1:1" },
  ];


// Flat list for lightbox
export const allProjects: Project[] = [...feedAds, ...storyAds, ...squareAds];
