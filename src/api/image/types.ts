export interface UploadUrlData {
  cloudName: string;
  upload_preset: string;
  apiKey: string;
  timestamp: string;
  signature: string;
  folder: string;
}

export interface ImageUpload {
  imageUrl: string;
  order: number;
}

export interface SaveImagesPayload {
  userId: string;
  images: ImageUpload[];
}

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  url: string;
  asset_id: string;
  version_id: string;
  format: string;
  width: number;
  height: number;
}
