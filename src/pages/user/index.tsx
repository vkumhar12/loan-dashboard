import AppLayout from "@/layout/user";

export default function Dashboard() {
  return (
    <AppLayout title="Dashbaord">
      <section className="admin-container flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">Welcome to Dashbaord</h1>
      </section>
    </AppLayout>
  );
}
