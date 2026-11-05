
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
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const navigation = [
  { label: "Kategoriler", href: "/kategoriler" },
  { label: "Ürünler", href: "/urunler" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

const ease = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();
    if (!query) return;

    setSearchOpen(false);
    setMenuOpen(false);

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
        className={`
          group relative whitespace-nowrap
          py-3 text-[11px] font-bold
          uppercase tracking-[0.13em]
          !text-[#F5F0E7]
          transition-colors duration-300
          hover:!text-[#E5B65D]
        `}
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
      {/* NAVBAR */}
      <header
        className={`
          fixed inset-x-0 top-0 z-[60]
          w-full transition-all duration-500
          ${
            scrolled || menuOpen
              ? "bg-[#171717]/85 shadow-[0_8px_35px_rgba(0,0,0,0.15)] backdrop-blur-xl"
              : "bg-gradient-to-b from-black/65 via-black/20 to-transparent"
          }
        `}
      >
        <div
          className={`
            mx-auto grid w-full max-w-[1700px]
            grid-cols-[1fr_auto_1fr]
            items-center px-4
            transition-[height] duration-500
            sm:px-8 xl:px-12
            ${
              scrolled
                ? "h-[72px]"
                : "h-[88px] lg:h-[100px]"
            }
          `}
        >
          {/* LEFT - DESKTOP SEARCH */}
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
                className="shrink-0 !text-[#E5B65D] transition-colors hover:!text-[#FFE0A1]"
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

          {/* MOBILE - PREMIUM HAMBURGER */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              aria-label={
                menuOpen ? "Menüyü kapat" : "Menüyü aç"
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => {
                setMenuOpen((prev) => !prev);
                setSearchOpen(false);
              }}
              className="
                group relative flex h-11 w-11
                items-center justify-center
                border border-[#E5B65D]/60
                !text-[#E5B65D]
                transition-all duration-300
                hover:border-[#E5B65D]
                hover:bg-[#E5B65D]/10
              "
            >
              <span className="relative block h-5 w-6">
                <span
                  className={`
                    absolute left-0 top-[5px]
                    h-[2px] bg-[#E5B65D]
                    transition-all duration-300
                    ${
                      menuOpen
                        ? "w-6 translate-y-[5px] rotate-45"
                        : "w-6 group-hover:w-4"
                    }
                  `}
                />

                <span
                  className={`
                    absolute right-0 top-[15px]
                    h-[2px] bg-[#E5B65D]
                    transition-all duration-300
                    ${
                      menuOpen
                        ? "w-6 -translate-y-[5px] -rotate-45"
                        : "w-4 group-hover:w-6"
                    }
                  `}
                />
              </span>
            </button>
          </div>

          {/* CENTER - DESKTOP NAVIGATION */}
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

          {/* MOBILE LOGO */}
          <Link
            href="/"
            aria-label="Ana sayfa"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center lg:hidden"
          >
            <Image
              src="/images/logo.png"
              alt="Firma logosu"
              width={130}
              height={50}
              priority
              className="
                h-auto w-[105px]
                object-contain sm:w-[125px]
              "
            />
          </Link>

          {/* RIGHT - ACTION ICONS */}
          <div className="flex items-center justify-end gap-0 sm:gap-2">
            <button
              type="button"
              aria-label="Arama"
              aria-expanded={searchOpen}
              onClick={() => {
                setSearchOpen((prev) => !prev);
                setMenuOpen(false);
              }}
              className={`${iconClass} lg:hidden`}
            >
              <Search size={20} strokeWidth={1.8} />
            </button>

            <Link
              href="/hesabim"
              aria-label="Hesabım"
              className={`${iconClass} hidden sm:flex`}
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

        {/* MOBILE SEARCH */}
        <AnimatePresence>
          {searchOpen && !menuOpen && (
            <motion.form
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
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Ne aramıştınız?"
                  aria-label="Ürün ara"
                  className="
                    w-full border-b
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
                  className="!text-[#E5B65D]"
                >
                  <ArrowUpRight size={21} />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobil navigasyon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.35,
              ease,
            }}
            className="
              fixed inset-0 z-[50]
              flex flex-col overflow-y-auto
              bg-[#11110F]/70
              px-7 pb-8 pt-28
              backdrop-blur-[22px]
              sm:px-12
              lg:hidden
            "
          >
            <nav
              aria-label="Mobil menü"
              className="
                mx-auto flex w-full max-w-lg
                flex-1 flex-col justify-center
                py-8
              "
            >
              {/* MENU LABEL */}
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-8 bg-[#E5B65D]" />

                <span
                  className="
                    text-[10px] font-bold
                    uppercase tracking-[0.3em]
                    !text-[#E5B65D]
                  "
                >
                  Navigasyon
                </span>
              </div>

              {/* MENU LINKS */}
              {navigation.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.07,
                    ease,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="
                      group flex items-center
                      justify-between gap-4
                      border-b border-[#E5B65D]/35
                      py-5
                      font-display
                      text-[clamp(2.5rem,9vw,4.5rem)]
                      leading-none
                      !text-[#F5F0E7]
                      transition-colors duration-300
                      hover:!text-[#E5B65D]
                    "
                  >
                    <span>{item.label}</span>

                    <ArrowRight
                      size={22}
                      strokeWidth={1.6}
                      className="
                        shrink-0 !text-[#E5B65D]
                        transition-transform duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </Link>
                </motion.div>
              ))}

              {/* MOBILE QUICK ACTIONS */}
              <div
                className="
                  mt-10 grid grid-cols-3
                  border-t border-[#E5B65D]/25
                  pt-7
                "
              >
                {[
                  {
                    label: "Hesabım",
                    href: "/hesabim",
                    Icon: UserRound,
                  },
                  {
                    label: "Favoriler",
                    href: "/favoriler",
                    Icon: Heart,
                  },
                  {
                    label: "Sepetim",
                    href: "/sepet",
                    Icon: ShoppingBag,
                  },
                ].map(({ label, href, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="
                      group flex flex-col
                      items-center justify-center
                      gap-3 border-r
                      border-[#E5B65D]/25
                      last:border-r-0
                    "
                  >
                    <Icon
                      size={23}
                      strokeWidth={1.6}
                      className="
                        !text-[#E5B65D]
                        transition-transform duration-300
                        group-hover:-translate-y-1
                      "
                    />

                    <span
                      className="
                        text-[10px] font-semibold
                        uppercase tracking-[0.1em]
                        !text-[#F5F0E7]
                      "
                    >
                      {label}
                    </span>
                  </Link>
                ))}
              </div>
            </nav>

            {/* MENU FOOTER */}
            <div
              className="
                mx-auto w-full max-w-lg
                border-t border-[#E5B65D]/30
                pt-6
              "
            >
              <div className="flex items-center gap-4">
                <span className="h-px flex-1 bg-[#E5B65D]/60" />

                <span
                  className="
                    whitespace-nowrap text-[9px]
                    font-bold uppercase
                    tracking-[0.2em]
                    !text-[#E5B65D]
                  "
                >
                  Doğanın Ruhunu Keşfet
                </span>

                <span className="h-px flex-1 bg-[#E5B65D]/60" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
