export interface OwnerFragment {
  name: string;
  username: string;
  url: string;
  thumbnailUrl: string;
  badge?: "verified";
}

export interface VideoFragment {
  id: string;
  title: string;
  thumbnailUrl: string;
  url: string;
  owner: OwnerFragment;
  length: string;
  viewCount: number;
  publishedAt: string;
}
