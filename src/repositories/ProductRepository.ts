import api from "../lib/axios";
import type { ProductPayload, ProductUpdatePayload } from "../types/type";

export class ProductRepository {
  async getProducts() {
    const response = await api.get("items");
    return response.data;
  }

  async showProduct(id: number) {
    const response = await api.get(`items/${id}`);
    return response.data;
  }

  async addProduct(payload: ProductPayload): Promise<string> {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("price", payload.price);
    formData.append("image", payload?.image);

    const response = await api.post("items", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }

  async deleteProduct(id: number) {
    const response = await api.delete(`items/${id}`);
    return response.data;
  }

  async updateProduct(id: number, payload: ProductUpdatePayload) {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("price", payload.price);
 formData.append("_method", "PUT");
    if (payload.image) {
      formData.append("image", payload.image);
    }

    const response = await api.post(`items/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
}
