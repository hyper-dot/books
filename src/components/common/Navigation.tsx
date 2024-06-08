import Link from "next/link";
import { MoveLeft, MoveRight } from "lucide-react";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";

const menus = [
  { title: "Home", to: "/" },
  { title: "About", to: "/about" },
  { title: "Services", to: "/services" },
  { title: "Contact", to: "/contact" },
];

export const Navigation = () => {
  let token;
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <Logo />
      <ul className="flex gap-3 font-medium">
        {menus.map((m, idx) => (
          <li key={idx}>
            <Link href={m.to}>{m.title}</Link>
          </li>
        ))}

        <ModeToggle />
      </ul>
      <div>
        {token ? (
          <>
            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 font-medium text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
              >
                Dashboard
              </Link>
              <button className="group flex items-center gap-2 font-medium text-red-500 dark:text-red-400">
                Log Out
                <MoveLeft
                  className="transition-all duration-200 group-hover:-translate-x-1"
                  size={16}
                />
              </button>
            </div>
          </>
        ) : (
          <Link
            href="/login"
            className="group flex items-center gap-2 font-medium text-blue-600 dark:text-blue-400"
          >
            Log In
            <MoveRight
              className="transition-all duration-200 group-hover:translate-x-1"
              size={16}
            />
          </Link>
        )}
      </div>
    </div>
  );
};
