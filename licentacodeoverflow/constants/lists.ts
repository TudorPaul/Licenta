export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}
export const themes = [
  { value: "light", label: "Light", icon: "/sun.svg" },
  { value: "dark", label: "Dark", icon: "/moon.svg" },
  { value: "system", label: "System", icon: "/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/question.svg",
    route: "/askquestions",
    label: "Ask a question",
  },
];

export const AnswerFilters = [
  { name: "Most Recent", value: "recent" },
  { name: "Oldest", value: "old" },
];

export const UserFilters = [
  { name: "New Users", value: "new_users" },
  { name: "Old Users", value: "old_users" },
  { name: "Top Contributors", value: "top_contributors" },
];

export const QuestionFilters = [
  { name: "Most Recent", value: "most_recent" },
  { name: "Oldest", value: "oldest" },
  { name: "Most Viewed", value: "most_viewed" },
  { name: "Most Answered", value: "most_answered" },
];

export const TagFilters = [
  { name: "Popular", value: "popular" },
  { name: "Recent", value: "recent" },
  { name: "Name", value: "name" },
  { name: "Old", value: "old" },
];

export const HomePageFilters = [
  { name: "Newest", value: "newest" },
  { name: "Recommended", value: "recommended" },
  { name: "Frequent", value: "frequent" },
  { name: "Unanswered", value: "unanswered" },
];

export const GlobalSearchFilters = [
  { name: "Question", value: "question" },
  { name: "Answer", value: "answer" },
  { name: "User", value: "user" },
  { name: "Tag", value: "tag" },
];
