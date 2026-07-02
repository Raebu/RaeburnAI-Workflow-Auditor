import { AccountManagementPanel } from '@/components/account-management-panel';

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
            Account administration
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Users, roles and audit events</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Invite teammates, update roles and review durable security audit events for your organisation workspace.
          </p>
        </div>
        <AccountManagementPanel />
      </div>
    </main>
  );
}
