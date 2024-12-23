import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function UserAvatar() {
  const session = await getServerSession(authOptions);
  console.log("components/UserAvatar", session);
  if (!session?.user) return null;

  return (
    <div>
      <Link
        href={`/profile/${session.user.User_Id}`}
        className="flex items-center justify-start gap-1"
      >
        <Image
          src={session?.user?.picture}
          alt="image"
          width={48}
          height={48}
        />
      </Link>
    </div>
  );
}
