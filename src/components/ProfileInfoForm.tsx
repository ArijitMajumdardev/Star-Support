"use client";

import { saveProfile } from "@/actions/profileInfoActions";
import { signOut } from "next-auth/react";
import UploadButton from "./UploadButton";
import { useState } from "react";
import { ProfileInfo } from "@/models/profileInfo";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

type Props = {
  profileInfo: ProfileInfo | null;
};

export default function ProfileInfoForm({ profileInfo }: Props) {
  const [coverUrl, setCoverUrl] = useState(profileInfo?.coverUrl);
  const [avatarUrl, setAvatarUrl] = useState(profileInfo?.avatarUrl);

  async function handleFormAction(formdata: FormData) {
    const result = await saveProfile(formdata);

    if (result) {
      toast.success("Profile saved!");
    }
  }

  return (
    <form className=" w-full min-h-[100vh] p-24 " action={handleFormAction}>
      <Toaster position="top-center" />
      <div className="bg-gray-300 w-full h-[30vh] rounded-xl relative">
        {coverUrl ? (
          <Image
            src={coverUrl || ""}
            alt="cover image"
            width={1024}
            height={1024}
            className="w-full h-48 object-cover object-center rounded-lg"
          />
        ) : (
          <></>
        )}

        <div className="bg-gray-100 border size-20 rounded-lg absolute left-4 -bottom-4 ">
          {avatarUrl ? (
            <Image
              src={avatarUrl || ""}
              alt="avatar"
              width={100}
              height={100}
              className="size-20 object-cover object-center rounded-lg"
            />
          ) : (
            <></>
          )}

          <div className="absolute -bottom-2 -right-2">
            <UploadButton onUploadComplete={setAvatarUrl} />

            <input type="hidden" name="avatarUrl" value={avatarUrl} />
          </div>
        </div>

        <div className="absolute right-2 bottom-2">
          <UploadButton onUploadComplete={setCoverUrl} />
          <input type="hidden" name="coverUrl" value={coverUrl} />
        </div>
      </div>

      <div className="">
        <div className="grid grid-cols-2 gap-2">
          <div className="w-2/3 h-[10vh] flex-col p-2 mb-8">
            <label className="input-label " htmlFor="usernameIn">
              username
            </label>
            <input
              className="w-full p-2 rounded-md outline-none border"
              name="username"
              id="usernameIn"
              type="text"
              placeholder="username"
              defaultValue={profileInfo?.username}
            />
          </div>
          <div className="w-2/3 h-[10vh] flex-col p-2 mb-8">
            <label className=" input-label " htmlFor="displayNameIn">
              display name
            </label>
            <input
              className="w-full p-2 rounded-md outline-none border"
              name="displayName"
              id="displayNameIn"
              type="text"
              placeholder="display name"
              defaultValue={profileInfo?.displayName}
            />
          </div>
        </div>
      
        <div className="w-full h-[10vh] flex-col p-2 mb-20">
          <label className="input-label" htmlFor="bioIn">
            bio
          </label>
          <textarea
            className="w-full p-2 rounded-md outline-none border"
            id="bioIn"
            name="bio"
            placeholder="bio"
            defaultValue={profileInfo?.bio}
          ></textarea>
        </div>

        <div className="flex mt-8 justify-between items-center h-40 ">
          <button className="mt-4  bg-yellow-300 px-4 py-2 rounded-lg flex gap-2 items-center">
            Save profile
          </button>
          <button
            className="mt-4 bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg flex gap-2 items-center hover:bg-black hover:delay-100 transition hover:text-white  "
            type="button"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      </div>
    </form>
  );
}
