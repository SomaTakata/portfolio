import Image from "next/image";
import ViewAll from "./ViewAll";

const ProfileCard = () => {
  return (
    <div className="mx-auto max-w-sm rounded-xl border-2 border-black bg-white p-10">
      <div className="mb-4 flex justify-center">
        <div className="relative w-48 h-48 overflow-hidden rounded-full border-2 border-black">
          <Image
            src="/avatar.png"
            alt="Soma Takata's profile image"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="text-center">
        <h2 className="mt-3 font-roboto text-4xl font-bold tracking-widest text-white text-stroke-1">
          PROFILE
        </h2>
        <p className="mt-3 font-roboto text-sm font-bold text-black">
          Web Engineer
        </p>
        <h1 className="mt-1 font-roboto text-3xl font-extrabold">
          SOMA TAKATA
        </h1>
        <p className="mt-3 text-start font-roboto text-sm font-semibold text-black">
          HELLO WORLD, This is the portfolio site of Soma Takata, a Japanese man
          web engineer based in Tokyo. I am a student of SIT.
        </p>
      </div>

      <ViewAll
        text="View More"
        position="center"
        width="w-full"
        href="/profile"
      />
    </div>
  );
};

export default ProfileCard;
