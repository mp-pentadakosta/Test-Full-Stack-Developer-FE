"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Modal,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  useDisclosure,
} from "@heroui/react";
import { ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Toast from "@/core/toast";
import GamesRepository from "@/domain/repository/games.repository";
import { ListDatumModelListGame } from "@/domain/model/model.games";
import { ListDatumModelListCountry } from "@/domain/model/model.country";
import CountryRepository from "@/domain/repository/country.repository";

// SVG Logo
export const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="#ffffff"
      fillRule="evenodd"
    />
  </svg>
);

// Search icon
export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  // @ts-ignore
  width,
  // @ts-ignore
  height,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={height || size}
    role="presentation"
    viewBox="0 0 24 24"
    width={width || size}
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

export const HeaderBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [listGame, setListGame] = useState<ListDatumModelListGame[]>([]);
  const [listCountry, setListCountry] = useState<ListDatumModelListCountry[]>(
    [],
  );
  const [selectedCountry, setSelectedCountry] =
    useState<ListDatumModelListCountry | null>(null);
  const [loading, setLoading] = useState(false);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const codeFromUrl = searchParams.get("code");

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  // Fetch countries and set selected country based on localStorage or URL
  const getListCountry = async () => {
    try {
      const resp = await CountryRepository.getCountry();

      setListCountry(resp.result.listData);

      const matched =
        resp.result.listData.find((c) => c.currencyCode === codeFromUrl) ||
        resp.result.listData.find(
          (c) => c.currencyCode === localStorage.getItem("selectedCountryCode"),
        ) ||
        resp.result.listData[0];

      if (matched) {
        setSelectedCountry(matched);
        localStorage.setItem("selectedCountryCode", matched.currencyCode);
        router.replace(`${pathname}?code=${matched.currencyCode}`);
      }
    } catch (e: any) {
      Toast.callToastError(e.message);
    }
  };

  useEffect(() => {
    getListCountry();
  }, []);

  return (
    <>
      <Navbar
        isBordered
        className="w-full"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="text-white"
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="start">
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit text-white">ACME</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4 w-full" justify="center">
          <AcmeLogo />
          <Autocomplete
            className="w-full"
            isLoading={loading}
            placeholder="Search games..."
            startContent={<SearchIcon height={18} size={18} width={18} />}
            onInputChange={(value) => {
              if (debounceTimer.current) clearTimeout(debounceTimer.current);
              debounceTimer.current = setTimeout(async () => {
                if (value.length > 1) {
                  setLoading(true);
                  try {
                    const resp = await GamesRepository.getSearch(value);

                    setListGame(resp.result.listData);
                  } catch (e: any) {
                    Toast.callToastError(e.message);
                  } finally {
                    setLoading(false);
                  }
                } else {
                  setListGame([]);
                }
              }, 500);
            }}
          >
            {listGame.map((game) => (
              <AutocompleteItem
                key={game.id}
                textValue={game.name}
                onPress={() =>
                  router.push(
                    `/game/${game.id}?code=${selectedCountry?.code || "ph"}`,
                  )
                }
              >
                <div className="flex items-center gap-2">
                  <Avatar alt={game.name} size="lg" src={game.image} />
                  <div className="flex flex-col">
                    <span className="text-small">{game.name}</span>
                    <span className="text-tiny text-default-400">
                      {game.publisher}
                    </span>
                  </div>
                </div>
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            {selectedCountry && (
              <Button
                className="h-9 px-4 py-2 pl-2 pr-3 text-sm font-medium shadow-sm bg-transparent hover:bg-accent/75 hover:text-accent-foreground text-white"
                startContent={
                  <Image
                    alt={selectedCountry.name}
                    height={20}
                    src={selectedCountry.icon}
                    title={selectedCountry.name || ""}
                    width={20}
                  />
                }
                variant="bordered"
                onPress={onOpen}
              >
                {selectedCountry.code}
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={`/${item.toLowerCase().replace(/\s+/g, "-")}?code=${selectedCountry?.currencyCode || "ph"}`}
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-background">
                Choose Country
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-wrap gap-3">
                  {listCountry.map((country, index) => (
                    <Button
                      key={index}
                      className="h-9 px-4 py-2 pl-2 pr-3 text-sm font-medium shadow-sm bg-transparent hover:bg-accent/75 hover:text-accent-foreground text-background"
                      startContent={
                        <Image
                          alt={country.name}
                          height={20}
                          src={country.icon}
                          title={country.code || ""}
                          width={20}
                        />
                      }
                      variant="bordered"
                      onPress={() => {
                        onClose();
                        setSelectedCountry(country);
                        localStorage.setItem(
                          "selectedCountryCode",
                          country.currencyCode,
                        );
                        router.push(`${pathname}?code=${country.currencyCode}`);
                      }}
                    >
                      {country.code}
                    </Button>
                  ))}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
