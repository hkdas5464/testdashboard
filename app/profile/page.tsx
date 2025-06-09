"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { employee } from "@/data/employees";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Menu, X ,PanelLeftOpen, ChevronsRight} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EmployeeProfilePage() {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("job-details");

  const handleEdit = (section: string) => {
    setEditingSection(section);
    console.log(`Editing section: ${section}`);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  const EditButton = ({ section }: { section: string }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="absolute top-4 right-4"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleEdit(section)}
        className="flex items-center gap-2"
      >
        <Pencil className="h-4 w-4" />
        Edit
      </Button>
    </motion.div>
  );

  const tabItems = [
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
  ];

  return (
    <motion.div
      className="space-y-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Menu Button for Mobile */}
     <motion.div>
  {isSidebarOpen ? (
    <X
      className="h-6 w-6 text-primary cursor-pointer lg:hidden md:hidden"
      onClick={toggleSidebar}
    />
  ) : (
    <ChevronsRight
      className="h-6 w-6 text-primary cursor-pointer lg:hidden md:hidden"
      onClick={toggleSidebar}
    />
  )}
</motion.div>

      {/* Sidebar for Mobile */}
    <AnimatePresence>
  {isSidebarOpen && (
    <motion.div
      className="md:hidden fixed inset-0 bg-background/50 backdrop-blur-sm z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="fixed bottom-0 left-0 w-full bg-white/10 backdrop-blur-md border-t border-white/20 shadow-lg p-4 rounded-t-2xl md:w-72 md:h-full md:ml-auto md:bg-gradient-to-b md:from-card md:to-card/80 md:rounded-none md:border-none"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <img
              src="https://qubitara.com/assets/logo/qubit_2.png"
              alt="Qubitara Logo"
              className="h-8 w-auto"
            />
            <h2 className="text-lg font-semibold text-white/90">Qubitara</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <X className="h-6 w-6 text-white/90" />
          </Button>
        </div>
        <nav className="space-y-2">
          {tabItems.map((tab, index) => (
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Button
                variant={activeTab === tab ? "default" : "ghost"}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeTab === tab
                    ? "bg-primary/20 text-primary/90"
                    : "text-white/90 hover:bg-white/20"
                }`}
                onClick={() => handleTabChange(tab)}
              >
                {tab
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Button>
            </motion.div>
          ))}
        </nav>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      {/* Profile Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
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
              <motion.h1
                className="text-2xl font-bold"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {employee.name}
              </motion.h1>
              <motion.p
                className="text-muted-foreground"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                {employee.position}
              </motion.p>
              <motion.div
                className="flex items-center gap-2 mt-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Badge>{employee.status}</Badge>
                <Badge variant="outline">{employee.department}</Badge>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        {/* Tabs for Desktop */}
        <motion.div
          className="hidden md:block"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <TabsList className="grid grid-cols-5 lg:grid-cols-10 h-auto gap-2">
            {tabItems.map((tab, index) => (
              <motion.div
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
              >
                <TabsTrigger value={tab} className="w-full">
                  {tab
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <TabsContent value="job-details">
            <motion.div
              key="job-details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="relative">
                <EditButton section="job-details" />
                <CardHeader>
                  <CardTitle>Job Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      { label: "Position", value: employee.position },
                      { label: "Department", value: employee.department },
                      { label: "Location", value: employee.location },
                      {
                        label: "Start Date",
                        value: new Date(employee.startDate).toLocaleDateString(),
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                        <p className="text-sm">{item.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="work-profile">
            <motion.div
              key="work-profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="relative">
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
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {["Leadership", "Project Management", "Strategic Planning"].map(
                          (skill, index) => (
                            <motion.div
                              key={skill}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2, delay: 0.2 + index * 0.1 }}
                            >
                              <Badge variant="secondary">{skill}</Badge>
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
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        {["Project Management Professional (PMP)", "Certified Scrum Master"].map(
                          (cert, index) => (
                            <motion.li
                              key={cert}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ duration: 0.2, delay: 0.4 + index * 0.1 }}
                            >
                              {cert}
                            </motion.li>
                          )
                        )}
                      </motion.ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="personal-info">
            <motion.div
              key="personal-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="relative">
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
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                        <p className="text-sm">{item.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="contacts">
            <motion.div
              key="contacts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="relative">
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
                          { label: "Email", value: employee.email },
                          { label: "Phone", value: employee.phone },
                        ].map((item, index) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
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
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
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

          <TabsContent value="documents">
            <motion.div
              key="documents"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="relative">
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
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
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
              key="bank-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="relative">
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
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
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
              key="employment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="relative">
                <EditButton section="employment" />
                <CardHeader>
                  <CardTitle>Employment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-l-2 border-primary/20 pl-4 space-y-6">
                      {[
                        {
                          title: "Senior HR Manager",
                          status: "Current",
                          period: "Jan 2022 - Present",
                          description: "Leading HR initiatives and strategic planning",
                        },
                        {
                          title: "HR Manager",
                          period: "Mar 2019 - Dec 2021",
                          description: "Managed HR operations and team development",
                        },
                      ].map((job, index) => (
                        <motion.div
                          key={job.title}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{job.title}</h3>
                            {job.status && <Badge variant="outline">{job.status}</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{job.period}</p>
                          <p className="text-sm mt-2">{job.description}</p>
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
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="relative">
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
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
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
              key="compensation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="relative">
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
                          { label: "Bonus Target", value: "15%" },
                        ].map((item, index) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
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
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {[
                          "Health Insurance (Family Coverage)",
                          "401(k) with 6% match",
                          "20 days PTO",
                          "Life Insurance",
                        ].map((benefit, index) => (
                          <motion.p
                            key={benefit}
                            className="text-sm"
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.3 + index * 0.1 }}
                          >
                            • {benefit}
                          </motion.p>
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
              key="comp-history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="relative">
                <EditButton section="comp-history" />
                <CardHeader>
                  <CardTitle>Compensation History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-l-2 border-primary/20 pl-4 space-y-6">
                      {[
                        {
                          year: "2023",
                          type: "Annual Review",
                          details: [
                            { label: "Base Salary", value: "$120,000 (+8%)" },
                            { label: "Bonus", value: "$15,000" },
                          ],
                        },
                        {
                          year: "2022",
                          type: "Promotion",
                          details: [
                            { label: "Base Salary", value: "$111,000 (+12%)" },
                            { label: "Bonus", value: "$12,000" },
                          ],
                        },
                        {
                          year: "2021",
                          type: "Annual Review",
                          details: [
                            { label: "Base Salary", value: "$99,000 (+5%)" },
                            { label: "Bonus", value: "$8,000" },
                          ],
                        },
                      ].map((entry, index) => (
                        <motion.div
                          key={entry.year}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <h3 className="font-medium">{entry.year}</h3>
                          <p className="text-sm text-muted-foreground">{entry.type}</p>
                          <div className="mt-2 space-y-1">
                            {entry.details.map((detail, dIndex) => (
                              <motion.p
                                key={detail.label}
                                className="text-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.1 + dIndex * 0.05 }}
                              >
                                {detail.label}: {detail.value}
                              </motion.p>
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