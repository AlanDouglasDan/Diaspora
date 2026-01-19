export interface ProfileView {
  isNew: boolean;
  viewedAt: string;
  viewer: {
    id: string;
    displayName: string;
    image: string;
  };
}
