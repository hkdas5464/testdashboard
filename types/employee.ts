export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  location: string;
  status: "Active" | "On Leave" | "Inactive";
  startDate: string;
  avatar: string;
  initials: string;
  manager: string | null;
}