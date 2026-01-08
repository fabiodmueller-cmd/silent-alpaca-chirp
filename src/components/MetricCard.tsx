"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  icon?: React.ElementType;
  percentage?: string;
  variant?: "default" | "green" | "orange";
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  percentage,
  variant = "default",
}) => {
  const cardClasses = cn(
    "bg-dashboard-secondary-blue text-white",
    variant === "green" && "bg-dashboard-accent-green",
    variant === "orange" && "bg-dashboard-accent-orange",
  );

  const iconBgClasses = cn(
    "rounded-full p-2",
    variant === "default" && "bg-dashboard-primary-blue",
    variant === "green" && "bg-green-700",
    variant === "orange" && "bg-orange-700",
  );

  return (
    <Card className={cardClasses}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && (
          <div className={iconBgClasses}>
            <Icon className="h-4 w-4 text-white" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {percentage && <p className="text-xs text-gray-300">{percentage}</p>}
      </CardContent>
    </Card>
  );
};

export default MetricCard;