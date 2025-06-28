import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const data = await fetch(
    "http://localhost:1337/api/articles?populate[0]=image"
  );
  const articles = (await data.json()).data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {(articles || []).map((article: any) => (
        <div
          className="rounded overflow-hidden shadow-lg flex flex-col border border-gray-300"
          key={article.id}
        >
          <div className="relative">
            <Link href={`/${article.slug}`}>
              <Image
                className="w-full"
                src={article.image.url}
                alt="Sunset in the mountains"
                width={500}
                height={500}
              />
              <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left- opacity-25"></div>
            </Link>
          </div>
          <div className="px-6 py-4 mb-auto">
            <a
              href="#"
              className="font-medium text-lg hover:text-indigo-600 transition duration-200 ease-in-out mb-2"
            >
              {article.title}
            </a>
            <p className="text-gray-500 text-sm">{article.description}</p>
          </div>
          <div className="px-6 py-3 flex flex-row items-center justify-between">
            <span className="py-1 text-xs font-regular mr-1 flex flex-row items-center">
              <svg
                height="13px"
                width="13px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <path
                      fill="currentColor"
                      d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"
                    ></path>
                  </g>
                </g>
              </svg>
              <span className="ml-1">
                {Intl.DateTimeFormat("es-ES", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).format(new Date(article.createdAt))}
              </span>
            </span>

            <span className="py-1 text-xs font-regular mr-1 flex flex-row items-center">
              <svg
                className="h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                ></path>
              </svg>
              <span className="ml-1">{article.author}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
