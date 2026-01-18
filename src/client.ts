import type { AxiosInstance, AxiosError } from "axios";
import axios from "axios";
import { StorageService } from "./service/storage.service";

export interface ClientOptions {
  accessKey: string;
  secretKey: string;
}

export class StorageError extends Error {
  public statusCode: number;
  public response: unknown;

  constructor(message: string, statusCode: number, response?: unknown) {
    super(message);
    this.name = "StorageError";
    this.statusCode = statusCode;
    this.response = response;
  }
}

export class Client {
  private accessKey: string;
  private secretKey: string;
  public httpClient: AxiosInstance;

  constructor(props: ClientOptions) {
    this.accessKey = props.accessKey;
    this.secretKey = props.secretKey;
    this.httpClient = axios.create({
      baseURL: "https://jcstorage.jcdev.com.br/api",
      headers: {
        access_key: this.accessKey,
        secret_key: this.secretKey,
        Accept: "application/json",
      },
    });

    this.httpClient.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const statusCode = error.response?.status || 500;
        const responseData = error.response?.data as { message?: string } | undefined;
        const message = responseData?.message || error.message || "Unknown error";

        throw new StorageError(message, statusCode, responseData);
      }
    );
  }

  public storage() {
    return new StorageService(this);
  }
}
