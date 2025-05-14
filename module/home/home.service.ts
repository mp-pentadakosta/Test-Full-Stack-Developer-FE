"use client";
import { useEffect, useState } from "react";

import { ListDatumModelListGame } from "@/domain/model/model.games";
import Toast from "@/core/toast";
import GamesRepository from "@/domain/repository/games.repository";

export const HomeService = () => {
  const [listGame, setListGame] = useState<ListDatumModelListGame[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    getListGame();
  }, []);

  const getListGame = async () => {
    setLoading(true);
    try {
      const resp = await GamesRepository.getGames({
        page: page,
        limit: 5,
      });

      setListGame(resp.result.listData);
    } catch (e: any) {
      Toast.callToastError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const getListGamePaginate = async (page: number) => {
    setLoadingPage(true);
    try {
      const resp = await GamesRepository.getGames({
        page: page,
        limit: 5,
      });

      setListGame((prevList) => [...prevList, ...resp.result.listData]);
      setPage(page);
    } catch (e: any) {
      Toast.callToastError(e.message);
    } finally {
      setLoadingPage(false);
    }
  };

  return {
    listGame,
    getListGamePaginate,
    page,
    loading,
    loadingPage,
  };
};
