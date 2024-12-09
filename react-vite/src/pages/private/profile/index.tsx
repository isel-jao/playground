import { useParams } from "react-router";

export default function ProfilePage() {
  const { profileId } = useParams<{ profileId: string }>();
  return <main>ProfilePage: {profileId}</main>;
}
