import { get } from "@/core/api";
import { ConvertModelListCountry } from "@/domain/model/model.country";

class CountryRepository {
  constructor() {}

  async getCountry() {
    const resp = await get("/country");

    return ConvertModelListCountry.toModelListCountry(resp);
  }
}

export default new CountryRepository();
