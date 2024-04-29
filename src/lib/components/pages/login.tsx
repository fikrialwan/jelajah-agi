import LoginForm from "../features/login/form";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function Login() {
  return (
    <main className="w-full h-screen flex justify-center items-center bg-primary p-3 text-foreground">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <h1 className="font-semibold text-2xl">Login</h1>
          <p className="font-light text-muted-foreground">
            Please sign in to continue
          </p>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
