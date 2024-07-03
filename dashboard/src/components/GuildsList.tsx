"use client";

import { Loader2, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "../lib/utils";

const SIGNIN_URL = "https://api-ticket-it.vercel.app/auth/signin";

interface Guilds {
  id: string;
  name: string;
  icon: string;
}

export default function GuildsList() {
  const [guilds, setGuilds] = useState<Guilds[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const res = await fetch(
          "https://api-ticket-it.vercel.app/dashboard/@me/guilds"
        );

        if (!res.ok) {
          switch (res.status) {
            case 401:
              console.log("error 401");

            default:
              console.log("An error occurred");
          }
        }

        const guilds = await res.json();

        setGuilds(guilds);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    })();
  }, []);

  async function handleRefresh() {
    setLoading(true);

    try {
      const res = await fetch(
        "https://api-ticket-it.vercel.app/dashboard/@me/guilds?skipcache=true"
      );

      if (!res.ok) {
        throw new Error("An error occurred");
      }

      const guilds = await res.json();

      setGuilds(guilds);
      console.log(guilds)
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <div>
      <button
        disabled={loading}
        className="btn mx-auto mb-5 flex items-center gap-x-2 btn-sm"
        onClick={handleRefresh}
      >
        <RefreshCcw className={cn("size-4", loading && "animate-spin")} />
        <span>Refresh</span>
      </button>

      <div className="flex flex-wrap items-center justify-center gap-5 w-fit mx-auto">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="size-12 animate-spin" />
          </div>
        ) : (
          <>
            {!guilds?.length ? (
              <p>No servers found</p>
            ) : (
              <>
                {guilds.map((guild) => (
                  <div
                    key={guild.id}
                    className="flex flex-col p-4 border border-gray-200/25 hover:border-gray-200/50 transition-colors rounded-md mb-2 justify-center items-center relative overflow-hidden w-full max-w-80 sm:w-52 hover:drop-shadow-2xl"
                  >
                    {guild.icon ? (
                      <>
                        <img
                          src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=256`}
                          alt={guild.name}
                          className="absolute inset-0 blur-sm w-full h-1/2 -z-20 object-cover brightness-[20%]"
                          aria-hidden
                        />
                        <img
                          src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=128`}
                          alt={guild.name}
                          className="size-14 rounded-full mb-2"
                        />
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gray-600 blur-sm w-full h-1/2 -z-20 object-cover brightness-[20%]" />
                        <div className="size-14 rounded-full mb-2 bg-accent p-2 flex items-center justify-center">
                          <FaDiscord className="size-8" />
                        </div>
                      </>
                    )}
                    <h3 className="mb-4 font-semibold text-center line-clamp-1">
                      {guild.name}
                    </h3>

                    <Link
                      href={`/guilds/${guild.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      Configure
                    </Link>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
      <div className="flex items-center justify-center mt-5 font-medium text-base h-20">
        <div className="text-center">
          Your guild is not here? <br />{" "}
          <Link
            href={
              "https://discord.com/oauth2/authorize?client_id=1206601079601635381&permissions=8&scope=bot"
            }
            className={buttonVariants({
              variant: "default",
              size: "sm",
              className: "mt-1 text-lg",
            })}
          >
            Add it now!
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}
