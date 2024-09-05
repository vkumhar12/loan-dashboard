/* eslint-disable jsx-a11y/alt-text */
import { ErrorMessage, Field, Form, Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import * as Yup from "yup";

/* eslint-disable @next/next/no-img-element */
export default function LoginPage() {
  const router = useRouter();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const handleLogin = (values: any) => {
    console.log(values);
    router.push("/user");
    Swal.fire({
      title: "Success!",
      text: "Logged In Successfully!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <>
      <Head>
        <title>Login - MingleLoans</title>
        <meta name="description" content="Login to your MingleLoans" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center shadow-2xl">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <img src="/logo.svg" className="" alt="logo" />
            </div>
            <div className="mt-12 flex flex-col items-center justify-center">
              <div className="w-full flex-1 mt-8">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleLogin}
                >
                  {({ handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                      <div>
                        <Field
                          name="email"
                          type="email"
                          placeholder="Email"
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                      <div className="mt-5">
                        <Field
                          name="password"
                          type="password"
                          placeholder="Password"
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                      <button
                        type="submit"
                        className="mt-5 tracking-wide font-semibold bg-yellow-400 text-white-500 w-full py-4 rounded-lg hover:bg-yellow-700 hover:text-white transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        disabled={isSubmitting}
                      >
                        <span>Login</span>
                      </button>
                    </Form>
                  )}
                </Formik>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by Mingle Loans{" "}
                  <Link
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Terms of Service
                  </Link>{" "}
                  and its{" "}
                  <Link
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <img
              src="/background.svg"
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            />
          </div>
        </div>
      </div>
    </>
  );
}
