export interface LikeUser {
  id: string;
  name: string;
  email: string;
  age: number;
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

export interface RewindDislikePayload {
  dislikerId: string;
  dislikedId: string;
}

export interface MutualLikeUser {
  id: string;
  name: string;
  email: string;
  age: number;
}

export interface MutualLike {
  userId: string;
  likedAt: string;
  superLike: boolean;
  user?: MutualLikeUser;
  images?: string[] | null;
  age: number;
}
