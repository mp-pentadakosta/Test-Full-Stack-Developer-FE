import { get } from "@/core/api";
import { ConvertModelPrefixCode } from "@/domain/model/model.prefix.code";

class PrefixCodeRepository {
  async getPrefixCode(idGame: string) {
    const resp = await get(`/prefix/${idGame}`);

    return ConvertModelPrefixCode.toModelPrefixCode(resp);
  }
}

export default new PrefixCodeRepository();
