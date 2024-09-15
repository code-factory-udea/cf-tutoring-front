import { getStudents, getTutorByUsername } from "@services/student";
import { useQuery } from "@tanstack/react-query";

export const useQueryStudents = () =>
  useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

export const useQueryTutorByUsername = (username: string) =>
  useQuery({
    queryKey: ["tutorByUsername", username],
    queryFn: () => getTutorByUsername(username),
  });
