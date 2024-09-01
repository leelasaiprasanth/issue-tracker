"use client";

import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/app/components/";
import { Issue } from "@prisma/client";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60 seconds
    retry: 3,
  });

  if (isLoading) return <Skeleton />;

  if (error) return null;

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || ""}
      onValueChange={(userId) => {
        axios.patch("/api/issues/" + issue.id, {
          assignedToUserId: userId || null,
        });
      }}
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="''">Unassigned</Select.Item>
          <Select.Separator />
          {user?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
