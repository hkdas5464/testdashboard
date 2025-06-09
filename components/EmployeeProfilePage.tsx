"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Save } from "lucide-react";
import { useState } from "react";

type Employee = {
  id: string;
  name: string;
  position: string;
  department: string;
  location: string;
  startDate: string;
  avatar: string;
  initials: string;
  status: string;
  email: string;
  phone: string;
};

export default function EmployeeProfilePage({
  params,
  employee,
}: {
  params: { id: string };
  employee: Employee;
}) {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<Employee>(employee);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (section: string) => {
    setEditingSection(section);
  };

  const handleSave = (section: string) => {
    setEditingSection(null);
    console.log(`Saved section: ${section}`, formData);
    // In a real app, send formData to an API here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Employee) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500 text-white";
      case "inactive":
        return "bg-red-500 text-white";
      case "on leave":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const EditButton = ({ section }: { section: string }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleEdit(section)}
      className="absolute top-4 right-4 transition-all duration-300 hover:scale-105 hover:bg-primary/10"
    >
      <Pencil className="h-4 w-4 mr-2" />
      Edit
    </Button>
  );

  const SaveButton = ({ section }: { section: string }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleSave(section)}
      className="absolute top-4 right-4 transition-all duration-300 hover:scale-105 hover:bg-primary/10"
    >
      <Save className="h-4 w-4 mr-2" />
      Save
    </Button>
  );

  if (!employee) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center text-red-500"
      >
        Employee not found
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="cursor-pointer hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-card to-card-foreground/5">
              <CardContent className="flex items-center gap-6 p-6">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback>{employee.initials}</AvatarFallback>
                  </Avatar>
                </motion.div>
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold">{employee.name}</h1>
                  <p className="text-muted-foreground">{formData.position}</p>
                  <motion.div
                    className="flex items-center gap-2 mt-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <Badge className={getStatusBadgeClass(formData.status)}>
                      {formData.status}
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {formData.department}
                    </Badge>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-card to-card-foreground/5">
          <DialogHeader>
            <DialogTitle>Employee Profile</DialogTitle>
          </DialogHeader>
          <motion.div
            className="flex flex-col items-center gap-4 p-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <Avatar className="h-32 w-32">
                <AvatarImage src={employee.avatar} alt={employee.name} />
                <AvatarFallback>{employee.initials}</AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">{employee.name}</h3>
              <p className="text-sm text-muted-foreground">{formData.position}</p>
              <motion.div
                className="flex justify-center gap-2"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <Badge className={getStatusBadgeClass(formData.status)}>
                  {formData.status}
                </Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {formData.department}
                </Badge>
              </motion.div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="mt-4 border-primary/20 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
              Close
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="job-details" className="space-y-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 h-auto gap-2">
            {[
              "job-details",
              "work-profile",
              "personal-info",
              "contacts",
              "documents",
              "bank-info",
              "employment",
              "services",
              "compensation",
              "comp-history",
            ].map((tab, index) => (
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <TabsTrigger value={tab} className="hover:bg-primary/10 transition-all duration-300">
                  {tab
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
        </motion.div>

        <AnimatePresence>
          <TabsContent value="job-details">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="relative bg-gradient-to-br from-card to-card-foreground/5">
                {editingSection === "job-details" ? (
                  <>
                    <SaveButton section="job-details" />
                    <CardHeader>
                      <CardTitle>Job Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        {["position", "department", "location", "startDate"].map((field, index) => (
                          <motion.div
                            key={field}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                          >
                            <p className="text-sm font-medium text-muted-foreground">
                              {field.charAt(0).toUpperCase() + field.slice(1)}
                            </p>
                            <Input
                              type={field === "startDate" ? "date" : "text"}
                              value={formData[field as keyof Employee]}
                              onChange={(e) => handleInputChange(e, field as keyof Employee)}
                              className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-primary"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <>
                    <EditButton section="job-details" />
                    <CardHeader>
                      <CardTitle>Job Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                     <div className="grid gap-4 md:grid-cols-2">
  {[
    { label: "Position", value: formData.position || "N/A" },
    { label: "Department", value: formData.department || "N/A" },
    { label: "Location", value: formData.location || "N/A" },
    {
      label: "Start Date",
      value: formData.startDate
        ? isValidDate(new Date(formData.startDate))
          ? new Date(formData.startDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "N/A"
        : "N/A",
    },
  ].map((item, index) => (
    <motion.div
      key={item.label}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
      <p className="text-sm">{item.value}</p>
    </motion.div>
  ))}
</div>
                    </CardContent>
                  </>
                )}
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="work-profile">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="relative bg-gradient-to-br from-card to-card-foreground/5">
                <EditButton section="work-profile" />
                <CardHeader>
                  <CardTitle>Work Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Skills & Expertise</h3>
                      <motion.div
                        className="flex gap-2 flex-wrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      >
                        {["Leadership", "Project Management", "Strategic Planning"].map(
                          (skill, index) => (
                            <motion.div
                              key={skill}
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Badge
                                variant="secondary"
                                className="bg-primary/10 text-primary transition-all duration-300"
                              >
                                {skill}
                              </Badge>
                            </motion.div>
                          )
                        )}
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Certifications</h3>
                      <motion.ul
                        className="list-disc list-inside text-sm space-y-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                      >
                        <li>Project Management Professional (PMP)</li>
                        <li>Certified Scrum Master</li>
                      </motion.ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="personal-info">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="relative bg-gradient-to-br from-card to-card-foreground/5">
                {editingSection === "personal-info" ? (
                  <>
                    <SaveButton section="personal-info" />
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        {[
                          { label: "Date of Birth", field: "startDate", type: "date" },
                          { label: "Gender", field: "status" },
                          { label: "Nationality", field: "location" },
                          { label: "Marital Status", field: "department" },
                        ].map((item, index) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                          >
                            <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                            <Input
                              type={item.type || "text"}
                              value={formData[item.field as keyof Employee]}
                              onChange={(e) => handleInputChange(e, item.field as keyof Employee)}
                              className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-primary"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <>
                    <EditButton section="personal-info" />
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        {[
                          { label: "Date of Birth", value: "January 15, 1985" },
                          { label: "Gender", value: "Female" },
                          { label: "Nationality", value: "American" },
                          { label: "Marital Status", value: "Married" },
                        ].map((item, index) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                          >
                            <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                            <p className="text-sm">{item.value}</p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </>
                )}
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="contacts">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="relative bg-gradient-to-br from-card to-card-foreground/5">
                {editingSection === "contacts" ? (
                  <>
                    <SaveButton section="contacts" />
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">Primary Contact</h3>
                          <div className="grid gap-4 md:grid-cols-2">
                            {["email", "phone"].map((field, index) => (
                              <motion.div
                                key={field}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                              >
                                <p className="text-sm font-medium text-muted-foreground">
                                  {field.charAt(0).toUpperCase() + field.slice(1)}
                                </p>
                                <Input
                                  value={formData[field as keyof Employee]}
                                  onChange={(e) => handleInputChange(e, field as keyof Employee)}
                                  className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-primary"
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Emergency Contact</h3>
                          <div className="grid gap-4 md:grid-cols-2">
                            {[
                              { label: "Name", value: "Sarah Johnson" },
                              { label: "Relationship", value: "Spouse" },
                              { label: "Phone", value: "+1 (555) 987-6543" },
                            ].map((item, index) => (
                              <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                              >
                                <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                                <Input
                                  value={item.value}
                                  className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-primary"
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <>
                    <EditButton section="contacts" />
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">Primary Contact</h3>
                          <div className="grid gap-4 md:grid-cols-2">
                            {[
                              { label: "Email", value: formData.email },
                              { label: "Phone", value: formData.phone },
                            ].map((item, index) => (
                              <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                              >
                                <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                                <p className="text-sm">{item.value}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Emergency Contact</h3>
                          <div className="grid gap-4 md:grid-cols-2">
                            {[
                              { label: "Name", value: "Sarah Johnson" },
                              { label: "Relationship", value: "Spouse" },
                              { label: "Phone", value: "+1 (555) 987-6543" },
                            ].map((item, index) => (
                              <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                              >
                                <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                                <p className="text-sm">{item.value}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </>
                )}
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="documents">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="relative bg-gradient-to-br from-card to-card-foreground/5">
                <EditButton section="documents" />
                <CardHeader>
                  <CardTitle>Identity Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        { label: "SSN", value: "XXX-XX-1234" },
                        { label: "Driver's License", value: "DL12345678" },
                        { label: "Passport Number", value: "P12345678" },
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                          <p className="text-sm">{item.value}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="bank-info">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="relative bg-gradient-to-br from-card to-card-foreground/5">
                <EditButton section="bank-info" />
                <CardHeader>
                  <CardTitle>Banking Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Primary Account</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        {[
                          { label: "Bank Name", value: "Chase Bank" },
                          { label: "Account Type", value: "Checking" },
                          { label: "Account Number", value: "XXXX-XXXX-1234" },
                          { label: "Routing Number", value: "XXX-XXX-XXX" },
                        ].map((item, index) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                          >
                            <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                            <p className="text-sm">{item.value}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="employment">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="relative bg-gradient-to-br from-card to-card-foreground/5">
                <EditButton section="employment" />
                <CardHeader>
                  <CardTitle>Employment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-l-2 border-primary/60 pl-4 space-y-6">
                      {[
                        {
                          title: "Senior HR Manager",
                          status: "Current",
                          duration: "Jan 15, 2022 - Present",
                          description: "Leading HR initiatives and strategic planning",
                        },
                        {
                          title: "HR Manager",
                          duration: "Mar 2019 - Dec 2021",
                          description: "Managed HR operations and team development",
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{item.title}</h3>
                            {item.status && (
                              <Badge variant="outline" className="border-primary/20">
                                {item.status}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{item.duration}</p>
                          <p className="text-sm mt-2">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="services">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="relative bg-gradient-to-br from-card to-card-foreground/5">
                <EditButton section="services" />
                <CardHeader>
                  <CardTitle>Service Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        { label: "Service Line", value: "Human Resources" },
                        { label: "Role Level", value: "Senior Manager" },
                        { label: "Reports To", value: "HR Director" },
                        { label: "Direct Reports", value: "4" },
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                          <p className="text-sm">{item.value}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="compensation">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="relative bg-gradient-to-br from-card to-card-foreground/5">
                <EditButton section="compensation" />
                <CardHeader>
                  <CardTitle>Compensation Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Current Package</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        {[
                          { label: "Base Salary", value: "$120,000" },
                          { label: "Bonus", value: "15%" },
                        ].map((item, index) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                          >
                            <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                            <p className="text-sm">{item.value}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Benefits</h3>
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      >
                        {[
                          "Health Insurance (Family Coverage)",
                          "401(k) with 6% match",
                          "20 days PTO",
                          "Life Insurance",
                        ].map((benefit, index) => (
                          <p key={benefit} className="text-sm">
                            • {benefit}
                          </p>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="comp-history">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="relative bg-gradient-to-br from-card to-card-foreground/5">
                <EditButton section="comp-history" />
                <CardHeader>
                  <CardTitle>Compensation History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-l-4 border-primary/60 pl-4 space-y-6">
                      {[
                        {
                          year: "2023",
                          type: "Annual Review",
                          details: ["Base Salary: $120,000 (+8%)", "Bonus: $15,000"],
                        },
                        {
                          year: "2022",
                          type: "Promotion",
                          details: ["Base Salary: $111,000 (+12%)", "Bonus: $12,000"],
                        },
                        {
                          year: "2021",
                          type: "Annual Review",
                          details: ["Base Salary: $99,000 (+5%)", "Bonus: $8,000"],
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={item.year}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <h3 className="font-semibold">{item.year}</h3>
                          <p className="text-sm text-muted-foreground">{item.type}</p>
                          <div className="mt-2 space-y-1">
                            {item.details.map((detail, detailIndex) => (
                              <p key={detailIndex} className="text-sm">{detail}</p>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
}