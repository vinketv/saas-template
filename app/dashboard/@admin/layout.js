import { DrawerProvider } from "@/components/Admin/toggle";

export default async function ProfileLayout({ children }) {
  return (
    <>
      <DrawerProvider>{children}</DrawerProvider>
    </>
  );
}
