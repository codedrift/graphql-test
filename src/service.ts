import { User } from "./model";

export function getUsers(): User[] {
  return [
    {
      name: "fuglu",
      cool: true
    },
    {
      name: "codedrift",
      cool: true
    },
    {
      name: "nightillusions",
      cool: true
    }
  ];
}
