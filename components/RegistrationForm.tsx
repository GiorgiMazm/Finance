"use client";
import {
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { useState } from "react";

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here you would handle form submission, e.g., sending the data to your server or API.
  };

  return (
    <Card className="max-w-md mx-auto p-4">
      <CardHeader className="text-3xl">
        <h2 className="text-center w-full">Sign up</h2>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            placeholder="Enter your first name"
            fullWidth
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            className="mb-4"
          />
          <Input
            label="Last Name"
            placeholder="Enter your last name"
            fullWidth
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            className="mb-4"
          />
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="mb-4"
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="mb-4"
          />
          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            fullWidth
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            className="mb-4"
          />
          <Button color="primary" type="submit" className="w-full">
            Register
          </Button>
        </form>
      </CardBody>
      <CardFooter>
        <p>
          Already have an account?{" "}
          <a href="/login" className="text-blue-400">
            Sign In
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegistrationForm;
