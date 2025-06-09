import { Employee } from "@/types/employee";

export const employee: Employee = {
  id: "1",
  name: "Alexandra Johnson",
  email: "alexandra.j@example.com",
  phone: "+1 (555) 123-4567",
  position: "HR Director",
  department: "Human Resources",
  location: "New York",
  status: "Active",
  startDate: "2019-03-15",
  avatar: "https://images.pexels.com/photos/3746314/pexels-photo-3746314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  initials: "AJ",
  manager: null,
};

export const mockEmployees: Employee[] = [
  employee,
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@example.com",
    phone: "+1 (555) 234-5678",
    position: "Software Engineer",
    department: "Engineering",
    location: "San Francisco",
    status: "Active",
    startDate: "2020-06-01",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    initials: "MC",
    manager: "1"
  },
  {
    id: "3",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    phone: "+1 (555) 345-6789",
    position: "Marketing Manager",
    department: "Marketing",
    location: "Chicago",
    status: "On Leave",
    startDate: "2021-02-15",
    avatar: "https://images.pexels.com/photos/3775131/pexels-photo-3775131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    initials: "SW",
    manager: "1"
  },
  {
    id: "4",
    name: "David Rodriguez",
    email: "david.r@example.com",
    phone: "+1 (555) 456-7890",
    position: "Sales Director",
    department: "Sales",
    location: "Miami",
    status: "Active",
    startDate: "2019-08-01",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    initials: "DR",
    manager: "1"
  },
  {
    id: "5",
    name: "Emily Taylor",
    email: "emily.t@example.com",
    phone: "+1 (555) 567-8901",
    position: "Product Manager",
    department: "Product",
    location: "Seattle",
    status: "Inactive",
    startDate: "2020-11-15",
    avatar: "https://images.pexels.com/photos/3776932/pexels-photo-3776932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    initials: "ET",
    manager: "1"
  },
  {
    id: "6",
    name: "James Wilson",
    email: "james.w@example.com",
    phone: "+1 (555) 678-9012",
    position: "UX Designer",
    department: "Design",
    location: "Austin",
    status: "Active",
    startDate: "2021-04-01",
    avatar: "https://images.pexels.com/photos/2379885/pexels-photo-2379885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    initials: "JW",
    manager: "1"
  }
];