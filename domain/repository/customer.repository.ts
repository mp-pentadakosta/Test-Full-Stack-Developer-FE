import { deleted, get, post } from "@/core/api";
import { ConvertModelListData } from "@/domain/model/model.customer";

class CustomerRepository {
  public async getList(page: number, limit: number) {
    const resp = await get("/example?page=" + page + "&limit=" + limit);

    return ConvertModelListData.toModelListData(resp);
  }

  public async getSearch(search: string) {
    const resp = await get("/example/search?search=" + search);

    return ConvertModelListData.toModelListData(resp);
  }

  public async getDetail(id: number) {
    const resp = await get("/example/detail/" + id);

    return ConvertModelListData.toModelData(resp);
  }

  public async upsertData(data: {
    id?: number | null;
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    address?: string;
    dob: string;
  }) {
    const resp = await post("/auth/upsert-user", data);

    return JSON.parse(resp);
  }

  public async deleteData(id: number) {
    const resp = await deleted("/auth/delete-user/" + id, {});

    return JSON.parse(resp);
  }
}

export default new CustomerRepository();
