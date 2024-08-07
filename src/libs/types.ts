// add type for UserCard's Props
interface UserCardProps{
    key?: string;
    name?: string;
    imgUrl?: string;
    email?: string;
    address?: string;
}
export type {UserCardProps};
// add type for UserCardDetail's Props
interface UserCardDetailProps{
    email?: string;
    address?: string;
}
export type {UserCardDetailProps};