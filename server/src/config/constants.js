export const DB_NAME = "mobileRepairDB";

export const ROLES = {
  ADMIN: "admin",
  MECHANIC: "mechanic"
};

export const JOB_STATUS = {
  ASSIGNED: "Assigned",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  DELIVERED: "Delivered"
};

export const PART_TYPES = {
  ORIGINAL: "original",
  COPY: "copy"
};

// Environment check
export const isProd = process.env.NODE_ENV === "production";
export const isDev = process.env.NODE_ENV === "development";
