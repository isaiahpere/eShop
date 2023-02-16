import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import { useUser } from "@auth0/nextjs-auth0/client";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserImage = styled.img`
  border-radius: 50%;
  width: 20px;
  height: 20px;
`;

const ProfileIcon = styled(FaUserCircle)`
  font-size: 18px;
`;

const CustomTitle = styled.h3`
  font-size: 12px;
  padding: 6px;
  color: var(--secondary);
`;

const User = () => {
  // router
  const router = useRouter();

  // user
  const { user } = useUser();

  // direct to login page
  const handleLogin = () => {
    router.push("/api/auth/login");
  };

  // direct to user profile page
  const handleProfile = () => {
    router.push("/profile");
  };

  if (!user) {
    return (
      <Container onClick={handleLogin}>
        <ProfileIcon />
        <CustomTitle>Login</CustomTitle>
      </Container>
    );
  }

  return (
    <Container onClick={handleProfile}>
      <UserImage src={user.picture} alt="photo of user"></UserImage>
      <CustomTitle>{user.name}</CustomTitle>
    </Container>
  );
};

export default User;
