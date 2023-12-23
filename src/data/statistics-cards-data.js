import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Total Clubs",
    value: "20",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Total Presidents",
    value: "20",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "Total Teams",
    value: "20",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Total Managers",
    value: "20",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than last week",
    },
  },
];

export default statisticsCardsData;
