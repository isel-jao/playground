import { NavLink, Outlet } from "react-router";
import { cn } from "@/utils/functions";

const profilesIds = ["profile-1", "profile-2", "profile-3", "profile-11"];

export default function ProfilesLayout() {
  return (
    <main className="flex gap-4 [&>*:nth-child(2)]:flex-1">
      <ul className="flex flex-col gap-2">
        {profilesIds.map((profileId) => (
          <li key={profileId}>
            <NavLink
              to={`/profiles/${profileId}`}
              className={({ isActive }) =>
                cn("inline-block transition-colors hover:text-primary", {
                  "text-primary": isActive,
                })
              }
            >
              {profileId}
            </NavLink>
          </li>
        ))}
      </ul>
      <Outlet />
    </main>
  );
}
