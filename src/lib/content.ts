import { getCollection } from "astro:content";

export async function getProjects() {
  const projects = await getCollection("projects");
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export async function getResearch() {
  const research = await getCollection("research");
  return research.sort((a, b) => a.data.order - b.data.order);
}
