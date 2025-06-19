import Image from "next/image";
import React from "react";
// import BlocksRendererLocal from "./BlocksRendererLocal";
// import Markdown from "react-markdown";

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const response = await fetch(
    `http://localhost:1337/api/articles?populate=*&filters[slug][$eq]=${slug}`
  );
  const data = await response.json();
  const article = data?.data[0];

  if (!article) {
    return <div>Post not found</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 w-full max-w-[1080px]">
        <div className="max-w-[900px] mx-auto w-full">
          <Image
            src={article.image.url}
            alt={article.title}
            width={500}
            height={500}
            className="w-full"
          />
          <h1 className="text-4xl mt-6">{article.title}</h1>

          <div className="py-1 flex flex-row items-center justify-between">
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
        <section className="mt-8">
          {/* <BlocksRendererLocal content={article.blocks} /> */}
          {/* <Markdown
            components={{
              p: ({ children }) => <p className={`leading-8`}>{children}</p>,
              hr: () => <hr className={`my-8`} />,
            }}
          >
            {article.markdown}
          </Markdown> */}
        </section>
      </main>
    </div>
  );
};

export default PostPage;
