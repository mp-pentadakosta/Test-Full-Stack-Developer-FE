"use client";

import * as React from "react";
import { Button } from "@heroui/react";

import { HomeService } from "@/module/home/home.service";
import CardComponent from "@/components/card.component";
import CarouselComponent from "@/components/carousel.component";

export default function HomeView() {
  const { listGame, getListGamePaginate, page, loadingPage, loading } =
    HomeService();

  return (
    <div
      className={`flex flex-col items-center w-full h-full px-8 lg:px-96 overflow-auto`}
    >
      <CarouselComponent />
      <div className={`flex flex-col w-full mt-8`}>
        <div className={`flex flex-col w-full text-white`}>
          <div className={`font-semibold text-lg`}>List Game</div>
          <div className={`text-sm text-gray-500`}>
            List of games available for top-up
          </div>
        </div>
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-screen-2xl items-center justify-center mt-4`}
        >
          {listGame.map((value) => {
            return CardComponent({
              id: value.id.toString(),
              title: value.name,
              publisher: value.publisher,
              imageUrl: value.image,
            });
          })}
        </div>
      </div>
      <Button
        className={`mt-4`}
        color="default"
        isLoading={loading || loadingPage}
        onPress={() => {
          getListGamePaginate(page + 1);
        }}
      >
        Show More...
      </Button>
    </div>
  );
}
