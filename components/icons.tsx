import {
  Box,
  Code,
  Coins,
  Droplets,
  FlaskConical,
  HeartPulse,
  MapPin,
  ShieldCheck,
  Sprout,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { Medium, SectionType } from "@/lib/blueprints";

export const SECTION_ICONS: Record<SectionType, LucideIcon> = {
  health_risk: HeartPulse,
  application_code: Code,
  mechanical_design: Box,
  spatial_placement: MapPin,
  cost_adoption: Coins,
  limitations_safety: ShieldCheck,
};

export const MEDIUM_ICONS: Record<Medium, LucideIcon> = {
  air: Wind,
  water: Droplets,
  soil: Sprout,
  chemicals: FlaskConical,
};
