import {Redirect} from "expo-router";

export default function NotFoundPage() {
  return <Redirect href={"/home" as any} />;
}