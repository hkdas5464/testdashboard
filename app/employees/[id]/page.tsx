// app/employees/[id]/page.tsx
import { mockEmployees } from "@/data/employees";
import EmployeeProfilePage from "@/components/EmployeeProfilePage";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  return mockEmployees.map((employee) => ({
    id: employee.id.toString(),
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  const employee = mockEmployees.find((emp) => emp.id === params.id);
  if (!employee) {
    return <div>Employee not found</div>;
  }
  return <EmployeeProfilePage params={params} employee={employee} />;
}