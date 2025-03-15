export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
}

export interface Short {
  id: string;
  title: string;
  description: string;
  duration: number;
  width: number;
  height: number;
  author: {
    id: string;
    name: string;
    avatarURL: string;
  };
  url: string;
  thumbnailURL: string;
  subtitles: {
    languageCode: string;
    origin?: boolean;
    type: string;
    url: string;
  }[];
  tags: string[];
  likes: number;
  views: number;
  shares: number;
  publishedAt: Date;
  comments: Comment[];
}
