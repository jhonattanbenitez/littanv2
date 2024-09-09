import Link from "next/link";

const dataFooter = [
  {
    id: 1,
    name: "Sobre nosotros",
    link: "#",
  },
  {
    id: 2,
    name: "Productos",
    link: "#",
  },
  {
    id: 3,
    name: "Mi cuenta",
    link: "#",
  },
  {
    id: 4,
    name: "Política de privacidad",
    link: "#",
  },
];
const year = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className="mt-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <p>
            <span className="font-bold mr-0.5">Littan</span>
            E-commerce
          </p>

          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            {dataFooter.map((data) => (
              <li key={data.id}>
                <Link href={data.link} className="hover:underline me-4 md:me-6">
                  {data.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          &copy; {year} {" "}
          <Link href="#">Littan</Link>
          {" "}
          Todos los derechos reservados
        </span>
      </div>
    </footer>
  );
};

export default Footer;
