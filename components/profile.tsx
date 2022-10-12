import { getUserAvatar } from 'lib/pocketbase';
import { User } from 'pocketbase';
import Image from 'next/image';
import profile, { username, additionalInformation } from 'styles/components/profile.css';
import { image } from 'styles/components/avatar.css';

interface Props {
  data: User
}

export default function Profile({ data }: Props) {
  if (!data || !data.profile) return <p>No se encontró información del usuario.</p>;

  return (
    <div className={profile}>
      <Image
        className={image}
        src={getUserAvatar(data.profile.id, data.profile.avatar)}
        alt={`${data.profile.name}'s avatar`}
        width={128}
        height={128}
      />
      <h1 className={username}>{data.profile.name}</h1>
      <p className={additionalInformation}>
        {data.id}
        {' - '}
        {data.email}
      </p>
    </div>
  );
}
