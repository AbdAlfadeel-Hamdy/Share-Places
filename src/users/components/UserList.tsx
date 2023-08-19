import { useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { User, useFetchUsersQuery } from "../../store";
import UserItem from "./UserItem";

import styles from "./UserList.module.css";

const UserList: React.FC = () => {
  const { isFetching, data, error } = useFetchUsersQuery(
    {},
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );
  const [errorModal, setErrorModal] = useState(!!error);

  let content;
  if (isFetching)
    content = (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  else if (error)
    content = (
      <>
        {errorModal && (
          <ErrorModal
            error={
              (error as { status: number; data: { message: string } }).data
                .message
            }
            onClear={() => setErrorModal(false)}
          />
        )}
      </>
    );
  else if (!data.users.length)
    content = (
      <div className="center">
        <Card>
          <h2>No Users Found.</h2>
        </Card>
      </div>
    );
  else
    content = data.users.map((user: User) => (
      <UserItem key={user.id} user={user} />
    ));

  return <ul className={styles["users-list"]}>{content}</ul>;
};

export default UserList;
