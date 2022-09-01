import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import UpsertProfileModal from "../components/UpsertProfileModal";
import { Database } from "../database";
import { supabase } from "../lib/supabase";

const Home: NextPage = () => {
  const [profiles, setProfiles] = useState<
    Database["public"]["Tables"]["profile"]["Row"][]
  >([]);
  const [upsertProfile, setUpsertProfile] = useState<
    Database["public"]["Tables"]["profile"]["Row"] | boolean
  >(false);

  useEffect(() => {
    getProfiles();
  }, []);

  async function getProfiles() {
    const { data } = await supabase
      .from("profile")
      .select("id,username,role")
      .order("username", { ascending: false })
      .throwOnError();
    if (data) setProfiles(data);
  }

  return (
    <div className="w-full h-full p-5 flex flex-col">
      <UpsertProfileModal
        profile={typeof upsertProfile !== "boolean" ? upsertProfile : undefined}
        onClose={() => setUpsertProfile(false)}
        open={Boolean(upsertProfile)}
      />

      <PageHeader
        title={"Profiles"}
        primaryAction={
          <Button
            size="small"
            style="primary"
            text="Add"
            onClick={() => setUpsertProfile(true)}
          />
        }
        secondaryActions={[]}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="relative flex items-center space-x-3 rounded-lg border border-neutral-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:border-neutral-400"
          >
            <div className="min-w-0 flex-1">
              <a
                href="#"
                className="focus:outline-none"
                onClick={() => setUpsertProfile(profile)}
              >
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-neutral-900">
                  {profile.username}
                </p>
                <p className="truncate text-sm text-neutral-500">
                  {profile.role}
                </p>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
