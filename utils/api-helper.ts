import { APIRequestContext, APIResponse } from "@playwright/test";

interface APIError {
  status: number;
  message: string;
  data?: unknown;
}

export class APIHelper {
  readonly apiContext: APIRequestContext;
  readonly baseURL: string;

  constructor(apiContext: APIRequestContext, baseURL: string = "http://localhost:3000/api") {
    this.apiContext = apiContext;
    this.baseURL = baseURL;
  }

  async get(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`;
    return await this.apiContext.get(url, { headers });
  }

  async post(
    endpoint: string,
    data: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`;
    return await this.apiContext.post(url, {
      data,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
  }

  async put(
    endpoint: string,
    data: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`;
    return await this.apiContext.put(url, {
      data,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
  }

  async delete(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`;
    return await this.apiContext.delete(url, { headers });
  }

  async loginAPI(email: string, password: string): Promise<Record<string, any>> {
    const response = await this.post("/auth/login", { email, password });
    await this.assertStatusCode(response, 200);
    const data = await response.json();
    return data;
  }

  async getProducts(filters?: Record<string, any>): Promise<Record<string, any>[]> {
    let endpoint = "/products";
    if (filters) {
      const params = new URLSearchParams(filters).toString();
      endpoint += `?${params}`;
    }
    const response = await this.get(endpoint);
    await this.assertStatusCode(response, 200);
    const data = await response.json();
    return data.products || data;
  }

  async getCart(userId: string): Promise<Record<string, any>> {
    const response = await this.get(`/cart/${userId}`);
    await this.assertStatusCode(response, 200);
    const data = await response.json();
    return data;
  }

  async addToCart(
    userId: string,
    productId: string,
    quantity: number
  ): Promise<Record<string, any>> {
    const response = await this.post(`/cart/${userId}/items`, {
      productId,
      quantity,
    });
    await this.assertStatusCode(response, 201);
    const data = await response.json();
    return data;
  }

  async removeFromCart(userId: string, itemId: string): Promise<void> {
    const response = await this.delete(`/cart/${userId}/items/${itemId}`);
    await this.assertStatusCode(response, 204);
  }

  async createOrder(userId: string, orderData: Record<string, any>): Promise<Record<string, any>> {
    const response = await this.post(`/orders`, {
      userId,
      ...orderData,
    });
    await this.assertStatusCode(response, 201);
    const data = await response.json();
    return data;
  }

  async getOrder(orderId: string): Promise<Record<string, any>> {
    const response = await this.get(`/orders/${orderId}`);
    await this.assertStatusCode(response, 200);
    const data = await response.json();
    return data;
  }

  async applyPromoCode(code: string): Promise<Record<string, any>> {
    const response = await this.post(`/promo/validate`, { code });
    await this.assertStatusCode(response, 200);
    const data = await response.json();
    return data;
  }

  async getResponseData(response: APIResponse): Promise<Record<string, any> | null> {
    try {
      return await response.json();
    } catch (error) {
      console.error("Failed to parse response JSON:", error);
      return null;
    }
  }

  async assertStatusCode(response: APIResponse, expectedStatus: number): Promise<void> {
    if (response.status() !== expectedStatus) {
      const body = await this.getResponseData(response);
      const errorMessage = body?.message || "Unknown error";
      throw new Error(
        `Expected status ${expectedStatus}, but got ${response.status()}. Error: ${errorMessage}`
      );
    }
  }
}
