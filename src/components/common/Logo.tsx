import Link from "next/link";
const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <img src="/logo.svg" alt="" height={25} width={25} />
      <span className="text-2xl font-bold">Books</span>
    </Link>
  );
};

export default Logo;
