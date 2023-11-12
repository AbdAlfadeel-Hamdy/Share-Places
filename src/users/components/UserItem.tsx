import { Link } from 'react-router-dom';
import Avatar from '../../shared/components/UIElements/Avatar';
import { User } from '../../store';
import styles from './UserItem.module.css';
import Card from '../../shared/components/UIElements/Card';

interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <li className={styles['user-item']}>
      <Card className={styles['user-item__content']}>
        <Link to={`/${user.id}/places`}>
          <div className={styles['user-item__image']}>
            <Avatar
              image={`${process.env.REACT_APP_BASE_URL?.slice(0, -7)}/${
                user.image
              }`}
              alt={user.name}
            />
          </div>
          <div className={styles['user-item__info']}>
            <h2>{user.name}</h2>
            <h3>
              {user.places.length}{' '}
              {user.places.length === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
