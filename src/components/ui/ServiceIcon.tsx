import {
  Grid3x3,
  Users,
  MonitorPlay,
  Coffee,
  Wifi,
  Tv,
  ShieldCheck,
  Snowflake,
  Sofa,
  ParkingCircle,
  type LucideProps,
} from "lucide-react";
import type { Service } from "@/lib/data/services";

const icons: Record<Service["icon"], React.ComponentType<LucideProps>> = {
  Grid3x3,
  Users,
  MonitorPlay,
  Coffee,
  Wifi,
  Tv,
  ShieldCheck,
  Snowflake,
  Sofa,
  ParkingCircle,
};

export function ServiceIcon({ name, ...props }: { name: Service["icon"] } & LucideProps) {
  const Icon = icons[name];
  return <Icon {...props} />;
}
