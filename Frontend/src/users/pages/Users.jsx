import UsersList from "../components/UsersList";

export default function Users() {
  const users = [
    {
      id: 'u1',
      name: "John",
      image:
        "https://images.pexels.com/photos/67517/pexels-photo-67517.jpeg?cs=srgb&dl=landscape-mountains-nature-67517.jpg&fm=jpg",
      placeCount: 3,
    },
    {
      id: 'u2',
      name: "Jane",
      image:
        "https://media.licdn.com/dms/image/D4E03AQHHAU3smzu9EA/profile-displayphoto-shrink_800_800/0/1718645759308?e=1724284800&v=beta&t=rZftRivPX6AjC_gIg9WS-YoMHsntkoT8I1BCPfiQuV0",
      placeCount: 1,
    },
  ];
  return <UsersList items={users} />;
}
