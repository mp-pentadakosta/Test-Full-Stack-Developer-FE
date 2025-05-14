import { get } from "@/core/api";
import {
  ConvertModelDetailGame,
  ConvertModelListGame,
} from "@/domain/model/model.games";

class GamesRepository {
  constructor() {}

  async getGames(data: { page: number; limit: number }) {
    const resp = await get("/games?page=" + data.page + "&limit=" + data.limit);

    return ConvertModelListGame.toModelListGame(resp);
  }

  async getGameDetail(id: string) {
    const resp = await get(`/games/detail/${id}`);

    return ConvertModelDetailGame.toModelDetailGame(resp);
  }

  async getSearch(search: string) {
    const resp = await get("/games/search?search=" + search);

    return ConvertModelListGame.toModelListGame(resp);
  }
}

export default new GamesRepository();
