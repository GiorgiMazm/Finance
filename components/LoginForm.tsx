"use client";

import {
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spacer,
} from "@nextui-org/react";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here you would handle form submission, e.g., sending the data to your server or API.
  };

  return (
    <Card className="max-w-md mx-auto p-4">
      <CardHeader className="text-3xl">
        <h2 className="text-center w-full">Login</h2>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="mb-4"
          />
          <Spacer y={1} />
          <Input
            label="Password"
            placeholder="Enter your password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="mb-4"
          />
          <Spacer y={1} />
          <Button color="primary" type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </CardBody>
      <CardFooter>
        <p>
          Don&apos;t have an account?{" "}
          <a href="/signUp" className="text-blue-400">
            Sign Up
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
