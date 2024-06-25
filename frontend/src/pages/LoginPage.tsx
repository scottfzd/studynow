import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import heroImage from "@/assets/images/hero_login_page.png";
import { useForm } from "react-hook-form";
import { LoginFormSchema } from "@/lib/form/login.form";
import { RegisterFormSchema } from "@/lib/form/register.form";
import { fetchApi } from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {

     const { setToken } = useAuth();

    const loginForm = useForm({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
            },
    });

    const registerForm = useForm({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            },
    });

    const onSubmitLogin = async (values) => {

        const response = await fetchApi("POST", "login", values)
        const data = response.data;
        toast("super cool") // a dégager, on utilise shadeUI plutôt
        // setToken(data.accessToken, data.accessTokenExpiration, data.refreshToken, data.refreshTokenExpiration);

    };

    const onSubmitRegister = (values) => {
        console.log(values);
    };

    return (
      <>
        <Navbar />
        <div className="flex min-h-screen bg-gray-200">
          <div className="max-w-md m-auto">
            <Tabs defaultValue="login" className="w-[450px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Rentrez vos identifiants.</CardDescription>
                  </CardHeader>
                  <Form {...loginForm}>
                    <form
                      onSubmit={loginForm.handleSubmit(onSubmitLogin)}
                      className="space-y-8"
                    >
                      <CardContent className="space-y-2">
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="votre.email@example.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mot de passe</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="********"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                      <CardFooter>
                        <Button type="submit">Se connecter</Button>
                      </CardFooter>
                    </form>
                  </Form>
                </Card>
              </TabsContent>

              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Création de votre compte</CardDescription>
                  </CardHeader>
                  <Form {...registerForm}>
                    <form
                      onSubmit={registerForm.handleSubmit(onSubmitRegister)}
                      className="space-y-8"
                    >
                      <CardContent className="space-y-2">
                        <FormField
                          control={registerForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom d'utilisateur</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Votre nom d'utilisateur"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="votre.email@example.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mot de passe</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="********"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirmer le mot de passe</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="********"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                      <CardFooter>
                        <Button type="submit">Créer un compte</Button>
                      </CardFooter>
                    </form>
                  </Form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div className="hidden lg:flex w-1/2 items-center">
            <div className="m-4">
              <img src={heroImage} alt="Hero" className="rounded-md" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
};

export default LoginPage;
