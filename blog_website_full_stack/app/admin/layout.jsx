import AdminToast from "@/Componenets/AdminComponents/AdminToast";

export default function Layout({ children }) {
  return (
    <>
      <AdminToast />
      {children}
    </>
  );
}
