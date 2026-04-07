import { useQueryClient } from "@tanstack/react-query"

export const queryKeys = {
  applications: {
    all: ["applications"] as const,
    list: () => [...queryKeys.applications.all, "list"] as const,
    detail: (id: string) => [...queryKeys.applications.all, "detail", id] as const
  },
  stats: {
    all: ["stats"] as const
  }
}

export async function invalidateApplicationQueries(queryClient: ReturnType<typeof useQueryClient>) {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: queryKeys.applications.all }),
    queryClient.invalidateQueries({ queryKey: queryKeys.stats.all})
  ])
}
