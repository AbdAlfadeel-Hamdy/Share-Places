import Card from "../../shared/components/UIElements/Card";
import { User } from "../../store";
import UserItem from "./UserItem";
import { faker } from "@faker-js/faker";

import styles from "./UserList.module.css";

const USERS: User[] = [
  {
    id: 1,
    name: "hoss",
    image: faker.image.avatar(),
    placeCount: 5,
  },
];

const UserList: React.FC = () => {
  let content;
  if (!USERS.length)
    content = (
      <div className="center">
        <Card>
          <h2>No Users</h2>
        </Card>
      </div>
    );
  else content = USERS.map((user) => <UserItem key={user.id} user={user} />);
  return <ul className={styles["users-list"]}>{content}</ul>;
};

export default UserList;
