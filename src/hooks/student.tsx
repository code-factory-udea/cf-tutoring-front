import { getStudents } from "@services/student";
import { useQuery } from "@tanstack/react-query";

export const useQueryStudents = () =>
  useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });
