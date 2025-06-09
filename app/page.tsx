import { DashboardOverview } from '@/components/dashboard/dashboard-overview';
import { PageHeader } from '@/components/layout/page-header';

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Employee Dashboard" 
        description="Welcome back, Alexandra Johnson" 
      />
      <DashboardOverview />
    </div>
  );
}