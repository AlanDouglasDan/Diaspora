export interface LikeUser {
  id: string;
  name: string;
  email: string;
}

export interface Like {
  likedId: string;
  likedAt: string;
  superLike: boolean;
  user?: LikeUser;
  images?: string[];
}

export interface LikeUserPayload {
  likedId: string;
  likerId: string;
  superLike: boolean;
}

export interface DislikeUserPayload {
  dislikedId: string;
  dislikerId: string;
}

export interface Dislike {
  dislikerId: string;
  dislikedId: string;
  dislikedAt: string;
}
