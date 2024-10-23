import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  EduzyLogoWithTitle,
  EduzyLogoWithTransparentBG,
} from "@/components/icons";
import { ApiService } from "@/lib/services/api-service";
import { Constants } from "@/lib/utils/constants";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>("");
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    const apiService = ApiService.getInstance();

    console.log(username, password);
    if (!username || !password) {
      setError("Please enter username and password");
      setIsSubmitting(false);

      return;
    }
    const response = await apiService.signIn(username, password);

    if (response?.accessToken) {
      localStorage.setItem(
        Constants.LocalStorageAccessTokenKey,
        response.accessToken,
      );
      navigate(Constants.routes.home);
    } else {
      setError("Invalid username or password");
      setIsSubmitting(false);
    }
    setUsername("");
    setPassword("");
  }

  return (
    <div className="bg-primary-gradient relative w-screen h-screen flex flex-col items-center justify-center">
      <Card
        className="min-w-[300px] w-[60%] py-5 max-w-96 self-center"
        radius="sm"
        shadow="sm"
      >
        <CardHeader className="justify-center">
          <EduzyLogoWithTitle className="w-[5em] h-[3em]" />
        </CardHeader>
        <CardBody className="px-5 py-2 justify-center">
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <Input
              fullWidth
              isRequired
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              fullWidth
              isRequired
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="px-2 text-red-500">{error}</div>}

            <div className="flex gap-2 justify-end">
              <Button
                fullWidth
                color="primary"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
      <div className="absolute bottom-3 right-3">
        <EduzyLogoWithTransparentBG size={"6em"} />
      </div>
    </div>
  );
};

export default LoginPage;
