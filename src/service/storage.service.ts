import type { Client } from "../client";
import FormData from "form-data";

export type UploadParams = {
  bucket: string;
  buffer: ArrayBuffer;
  filename: string;
  mimeType: string;
  isPrivate?: boolean;
};

export type UploadResponse = {
  file: {
    id: string;
    filename: string;
    is_private: boolean;
    path: string;
    bucket_id: string;
    size: number;
    mime_type: string;
    updated_at: string;
    created_at: string;
  };
  url?: string | null;
};

export type PrivateFileUrlResponse = {
  url: string;
  expires_at: string;
};

export class StorageService {
  constructor(private readonly client: Client) {}

  async upload(data: UploadParams): Promise<UploadResponse> {
    const form = new FormData();

    const ext = data.mimeType.split("/")[1];

    const filename = data?.filename.includes(".")
      ? data.filename
      : `${data.filename}.${ext}`;

    form.append("file", data.buffer, { filename, contentType: data.mimeType });
    form.append("bucket", data.bucket);
    form.append(
      "isPrivate",
      String(typeof data?.isPrivate === "boolean" ? data.isPrivate : false),
    );
    form.append("filename", filename);

    const res = await this.client.httpClient.post("/upload", form);

    return {
      file: res.data?.file,
      url: (res.data?.url as string) || null,
    };
  }

  async delete(fileId: string): Promise<void> {
    await this.client.httpClient.delete(`/files/${fileId}`);
  }

  async getPrivateFileUrl(fileId: string): Promise<PrivateFileUrlResponse> {
    const res = await this.client.httpClient.get(
      `/files/${fileId}/generate-signed-url`,
    );
    return {
      url: res.data?.url,
      expires_at: res.data?.expires_at,
    };
  }
}
