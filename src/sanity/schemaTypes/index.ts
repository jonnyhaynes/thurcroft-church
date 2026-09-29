import { blockContent } from "./blockContent";
import { churchEvent } from "./event";
import { galleryImage } from "./galleryImage";
import { newsPost } from "./newsPost";
import { page } from "./page";
import { person } from "./person";
import { seo } from "./seo";
import { serviceTime } from "./serviceTime";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  siteSettings,
  page,
  serviceTime,
  churchEvent,
  newsPost,
  galleryImage,
  person,
  seo,
  blockContent,
];
