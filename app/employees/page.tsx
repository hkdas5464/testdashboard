import { PageHeader } from '@/components/layout/page-header';
import { EmployeeList } from '@/components/employees/employee-list';

export default function EmployeesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Employees" 
        description="Manage your employee information" 
      />
      <EmployeeList />
    </div>
  );
}