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

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

const images = [
  img01, img02, img03, img04, img05, img06,
  img07, img08, img09, img10, img11, img12,
  img13, img14, img15, img16, img17, img18,
];

export const projects: Project[] = images.map((img, index) => ({
  id: `p${index + 1}`,
  title: `Project ${index + 1}`,
  category: "Creative",
  imageUrl: img,
}));
