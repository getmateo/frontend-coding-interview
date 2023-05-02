import { FC, FormEvent, useRef } from "react";
import Input from "./Input";
import FormGridLayout from "./FormGridLayout";
import FormModal from "./FormModal";
import { Database } from "../database";
import useMutation from "use-mutation";
import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export type UpsertProfileModalProps = {
  open: boolean;
  onClose: () => void;
  profile?: Database["public"]["Tables"]["profile"]["Row"];
};

const UpsertProfileModal: FC<UpsertProfileModalProps> = ({
  open,
  onClose,
  profile,
}) => {
  const [upsert, { status }] = useMutation<
    Database["public"]["Tables"]["profile"]["Insert"],
    Database["public"]["Tables"]["profile"]["Row"],
    PostgrestError
  >(
    async (input) => {
      const { data } = await supabase
        .from("profile")
        .upsert({ ...input, id: profile?.id })
        .select("id,username,role")
        .throwOnError()
        .single();

      if (!data) throw new Error("Upsert did not return any data");

      return data;
    },
    {
      onSuccess: onClose,
    }
  );

  return (
    <FormModal
      open={open}
      labels={{ submit: "Submit", cancel: "Cancel" }}
      title="Update Profile"
      onClose={onClose}
      loading={status === "running"}
      onSubmit={async (event: FormEvent<HTMLFormElement>) => {
        // TODO
      }}
    >
      <FormGridLayout>
        <FormGridLayout.FullWidth>
          <Input
            label="Username"
            type="text"
            disabled={status === "running"}
            name="username"
            defaultValue={profile?.username ?? undefined}
          />
        </FormGridLayout.FullWidth>
        <FormGridLayout.FullWidth>
          <Input
            label="Role"
            type="text"
            disabled={status === "running"}
            name="role"
            defaultValue={profile?.role ?? undefined}
          />
        </FormGridLayout.FullWidth>
      </FormGridLayout>
    </FormModal>
  );
};

export default UpsertProfileModal;
