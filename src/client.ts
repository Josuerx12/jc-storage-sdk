import type { AxiosInstance } from "axios";
import axios from "axios";
import { StorageService } from "./service/storage.service";

export interface ClientOptions {
  accessKey: string;
  secretKey: string;
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
  }

  public storage() {
    return new StorageService(this);
  }
}
