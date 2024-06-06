"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function Selected({ role }) {
  const [selectedRole, setSelectedRole] = useState(role);

  useEffect(() => {
    setSelectedRole(role);
  }, [role]);

  const handleRoleChange = (newValue) => {
    setSelectedRole(newValue);
  };

  return (
    <>
      <Select value={selectedRole} onValueChange={handleRoleChange}>
        <SelectTrigger className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <SelectValue>{selectedRole}</SelectValue>{" "}
          {/* Assurez-vous que cette ligne affiche correctement la valeur */}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">admin</SelectItem>
          <SelectItem value="user">user</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
