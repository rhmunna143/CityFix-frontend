import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode, memo } from "react";

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
  filterValue?: string;
  onSelect?: (value: string) => void;
}

export const StatCard = memo(function StatCard({
  title,
  value,
  description,
  icon,
  className,
  onClick,
  filterValue,
  onSelect,
}: StatCardProps) {
  const handleClick = () => {
    if (onSelect && filterValue !== undefined) {
      onSelect(filterValue);
    } else if (onClick) {
      onClick();
    }
  };

  const isClickable = !!onClick || !!onSelect;

  return (
    <Card
      onClick={isClickable ? handleClick : undefined}
      className={`${
        isClickable
          ? "cursor-pointer hover:border-primary/50 hover:shadow-xs transition-all"
          : ""
      } ${className || ""}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
});
