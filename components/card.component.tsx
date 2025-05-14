import React from "react";

export default function CardComponent(data: {
  title: string;
  publisher: string;
  imageUrl: string;
  id: string;
}) {
  return (
    <a
      className="relative w-full max-w-[180px] h-[265px] rounded-2xl overflow-hidden bg-muted outline-none transform hover:shadow-2xl hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background duration-300 ease-in-out group"
      href={`/game/${data.id}`}
    >
      <div className="relative w-full h-full">
        <img
          alt={data.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          src={data.imageUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent transition-all duration-300 group-hover:from-background/70" />

        <article className="absolute inset-x-0 bottom-3 z-10 px-3 sm:px-4">
          <h2 className="truncate text-sm font-semibold text-white sm:text-base">
            {data.title}
          </h2>
          <p className="truncate text-xxs text-white sm:text-xs">
            {data.publisher}
          </p>
        </article>
      </div>
    </a>
  );
}
