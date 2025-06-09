import { PageHeader } from '@/components/layout/page-header';
import { OrganizationChart } from '@/components/organization/organization-chart';
import { OrgFilters } from '@/components/organization/org-filters';

export default function OrganizationPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Organization Structure" 
        description="View and search your company's organizational structure" 
      />
      <OrgFilters />
      <OrganizationChart />
    </div>
  );
}