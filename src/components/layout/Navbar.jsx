
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  UserRound,
  Heart,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const navigation = [
  { label: "Kategoriler", href: "/kategoriler" },
  { label: "Ürünler", href: "/urunler" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

const mobileBottomLinks = [
  { label: "Kategoriler", href: "/kategoriler" },
  { label: "Ürünler", href: "/urunler" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!searchOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [searchOpen]);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) return;

    setSearchOpen(false);

    router.push(
      `/urunler?search=${encodeURIComponent(query)}`
    );
  };

  const iconClass = `
    group relative flex h-10 w-10
    shrink-0 items-center justify-center
    !text-[#E5B65D]
    transition-all duration-300
    hover:-translate-y-0.5
    hover:!text-[#FFE0A1]
  `;

  const renderNavLink = (item) => {
    const active = pathname === item.href;

    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className="
          group relative whitespace-nowrap
          py-3 text-[11px] font-bold
          uppercase tracking-[0.13em]
          !text-[#F5F0E7]
          transition-colors duration-300
          hover:!text-[#E5B65D]
        "
      >
        {item.label}

        <span
          className={`
            absolute bottom-1 left-0
            h-px w-full bg-[#E5B65D]
            transition-transform duration-300
            ${
              active
                ? "scale-x-100"
                : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"
            }
          `}
        />
      </Link>
    );
  };

  return (
    <>
      {/* MAIN NAVBAR */}
      <header
        className={`
          fixed inset-x-0 top-0 z-[60]
          w-full transition-all duration-500
          ${
            scrolled
              ? "bg-[#171717]/85 shadow-[0_8px_35px_rgba(0,0,0,0.15)] backdrop-blur-xl"
              : "bg-gradient-to-b from-black/65 via-black/20 to-transparent"
          }
        `}
      >
        <div
          className={`
            mx-auto grid w-full max-w-[1700px]
            grid-cols-[1fr_auto_1fr]
            items-center px-3
            transition-[height] duration-500
            sm:px-6 lg:px-8 xl:px-12
            ${
              scrolled
                ? "h-[72px]"
                : "h-[76px] sm:h-[88px] lg:h-[100px]"
            }
          `}
        >
          {/* DESKTOP SEARCH */}
          <div className="hidden min-w-0 items-center lg:flex">
            <form
              role="search"
              onSubmit={handleSearch}
              className="
                flex w-full max-w-[215px]
                items-center gap-3
                border-b border-[#E5B65D]/80
                pb-2
              "
            >
              <button
                type="submit"
                aria-label="Ürün ara"
                className="
                  shrink-0 !text-[#E5B65D]
                  transition-colors
                  hover:!text-[#FFE0A1]
                "
              >
                <Search size={21} strokeWidth={1.8} />
              </button>

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Ürün ara..."
                aria-label="Ürün ara"
                className="
                  w-full min-w-0 border-0
                  bg-transparent text-xs
                  !text-[#F5F0E7]
                  outline-none ring-0
                  placeholder:!text-[#F5F0E7]/80
                  focus:outline-none focus:ring-0
                "
              />
            </form>
          </div>

          {/* MOBILE LEFT SEARCH */}
          <div className="flex min-w-0 items-center lg:hidden">
            <button
              type="button"
              aria-label={
                searchOpen ? "Aramayı kapat" : "Arama yap"
              }
              aria-expanded={searchOpen}
              aria-controls="mobile-search"
              onClick={() =>
                setSearchOpen((previous) => !previous)
              }
              className={iconClass}
            >
              <Search size={22} strokeWidth={1.8} />
            </button>
          </div>

          {/* DESKTOP CENTER NAVIGATION */}
          <nav
            aria-label="Ana navigasyon"
            className="
              hidden items-center justify-center
              gap-4 lg:flex xl:gap-7
            "
          >
            {navigation.slice(0, 2).map(renderNavLink)}

            <Link
              href="/"
              aria-label="Ana sayfa"
              className="
                mx-4 flex shrink-0
                items-center justify-center
                transition-transform duration-500
                hover:scale-[1.04]
                xl:mx-7
              "
            >
              <Image
                src="/images/logo.png"
                alt="Firma logosu"
                width={170}
                height={65}
                priority
                className="
                  h-auto w-[135px]
                  object-contain xl:w-[165px]
                "
              />
            </Link>

            {navigation.slice(2).map(renderNavLink)}
          </nav>

          {/* MOBILE CENTER LOGO */}
          <Link
            href="/"
            aria-label="Ana sayfa"
            className="
              flex min-w-0 items-center
              justify-center lg:hidden
            "
          >
            <Image
              src="/images/logo.png"
              alt="Firma logosu"
              width={130}
              height={50}
              priority
              className="
                h-auto w-[94px]
                object-contain
                min-[390px]:w-[110px]
                sm:w-[125px]
              "
            />
          </Link>

          {/* RIGHT ACTION ICONS */}
          <div
            className="
              flex min-w-0 items-center
              justify-end gap-0
              sm:gap-2
            "
          >
            <Link
              href="/hesabim"
              aria-label="Hesabım"
              className={iconClass}
            >
              <UserRound size={21} strokeWidth={1.8} />
            </Link>

            <Link
              href="/favoriler"
              aria-label="Favoriler"
              className={iconClass}
            >
              <Heart size={21} strokeWidth={1.8} />
            </Link>

            <Link
              href="/sepet"
              aria-label="Sepetim"
              className={iconClass}
            >
              <ShoppingBag size={21} strokeWidth={1.8} />
            </Link>
          </div>
        </div>

        {/* MOBILE SEARCH PANEL */}
        <AnimatePresence>
          {searchOpen && (
            <motion.form
              id="mobile-search"
              role="search"
              onSubmit={handleSearch}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="
                overflow-hidden border-t
                border-[#E5B65D]/20
                bg-[#171717]/90
                backdrop-blur-xl lg:hidden
              "
            >
              <div className="flex items-center gap-3 px-6 py-5">
                <Search
                  size={19}
                  className="!text-[#E5B65D]"
                />

                <input
                  autoFocus
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Ne aramıştınız?"
                  aria-label="Ürün ara"
                  className="
                    w-full min-w-0 border-b
                    border-[#E5B65D]/50
                    bg-transparent py-3
                    text-sm !text-white
                    outline-none ring-0
                    placeholder:!text-[#E5B65D]
                    focus:border-[#E5B65D]
                    focus:outline-none
                  "
                />

                <button
                  type="submit"
                  aria-label="Aramayı başlat"
                  className="shrink-0 !text-[#E5B65D]"
                >
                  <ArrowUpRight size={21} />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </header>

      {/* MOBILE FIXED BOTTOM NAVIGATION */}
      <nav
        aria-label="Mobil alt navigasyon"
        className="
          fixed inset-x-0 bottom-0 z-[60]
          border-t border-[#E5B65D]/35
          bg-[#171717]/90
          backdrop-blur-xl
          lg:hidden
        "
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div
          className="
            mx-auto grid h-[62px]
            w-full max-w-[700px]
            grid-cols-2 items-stretch
            px-4 sm:px-8
          "
        >
          {mobileBottomLinks.map((item, index) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`
                  group relative flex
                  items-center justify-center
                  gap-2 text-[12px]
                  font-bold tracking-[0.09em]
                  normal-case
                  transition-colors duration-300
                  ${
                    active
                      ? "!text-[#E5B65D]"
                      : "!text-[#F5F0E7] hover:!text-[#E5B65D]"
                  }
                  ${
                    index === 0
                      ? "border-r border-[#E5B65D]/25"
                      : ""
                  }
                `}
              >
                <span>{item.label}</span>

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.7}
                  className="
                    !text-[#E5B65D]
                    transition-transform duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />

                {active && (
                  <span
                    className="
                      absolute inset-x-5 top-0
                      h-[2px] bg-[#E5B65D]
                    "
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
