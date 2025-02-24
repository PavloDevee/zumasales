import { FC, useContext, useEffect, useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { IoMdLogIn } from "react-icons/io";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { auth, database } from "@/firebase/firebase";
import { FormSchema } from "../validations/validations";
import { InputField } from "../Input/InputField";
import { getMassege } from "@/helpers/getMassege";
import { DataProvider, } from "@/providers/DataProvider";
import { saveUserToLocalStorage } from "@/helpers/localStore";
import { userField } from "@/helpers/getUserField";
import { writeUser } from "@/firebase/writeUser";
import { child, get, ref } from "firebase/database";
import { ResetPassword } from "@/components/modal/ResetPassword";

interface LoginFormProps {
  login: boolean;
}

const LoginForm: FC<LoginFormProps> = ({ login }) => {
  const { setUserState, setCookie } = useContext(DataProvider);
  const navigate = useNavigate();
  const validForm = FormSchema(login);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof validForm>>({
    resolver: zodResolver(validForm),
    defaultValues: {
      password: "",
      email: "",
      displayName: "", // Only necessary for signup
    },
  });

  useEffect(() => {
    form.reset();
  }, [login, form.reset]);

  const onSubmit = (data: z.infer<typeof validForm>) => {
    if (!login) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: data.displayName
          })
            .then(() => {
              user.getIdToken(true)
                .then((idToken) => {
                  saveUserToLocalStorage(userField(user));
                  setUserState([userField(user)]);
                  writeUser(user.uid, data.displayName || 'Guest', data.email);
                  setCookie('idToken', idToken);
                  navigate('/inspections');
                })
                .catch((error) => {
                  toast.error(getMassege(error.message));
                });
            })
            .catch((error) => {
              toast.error(getMassege(error.message));
            });
        })
        .catch((error) => {
          toast.error(getMassege(error.message));
        });
    }
    else {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          //get tocken
          user.getIdToken(true)
            .then((idToken) => {
              saveUserToLocalStorage(userField(user));
              setUserState([userField(user)]);
              setCookie('idToken', idToken);
              navigate('/inspections');
            })
            .catch((error) => {
              toast.error(getMassege(error.message));
            });
        })
        .catch((error) => {
          toast.error(getMassege(error.message));
        });
    }
  };

  const singInGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        saveUserToLocalStorage(userField(user));
        setUserState([userField(user)]);
        setCookie('idToken', token);
        const dbRef = ref(database);
        get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
          if (!snapshot.exists()) {
            writeUser(user.uid, user.displayName || 'Guest', user.email || '');
          }
          navigate('/inspections');
        }).catch((error) => {
          const errorMessage = error.message;
          toast.error(getMassege(errorMessage));
        });

      }).catch((error) => {
        const errorMessage = error.message;
        toast.error(getMassege(errorMessage));
      });
  }

  const resetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setOpen(false);
        toast.success('A confirmation to reset your password has been sent to your email.');
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(getMassege(errorMessage));
      });
  }

  return (
    <div className="w-full">
      <h2 className="font-bold leading-tight tracking-tight text-gray-900 text-2xl dark:text-white my-3">
        {login ? "Sign in to your account" : "Create a new account"}
      </h2>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid gap-2">
          {!login && (
            <InputField
              name="displayName"
              label="User Name"
              placeholder="Choose your username"
              control={form.control}
              errors={form.formState.errors.displayName?.message}
              Icon={<FiUser className="text-gray-500 absolute top-1/2 left-2 transform -translate-y-1/2" />}
            />
          )}
          <InputField
            name="email"
            label="Email"
            placeholder="user@zumasales.com"
            control={form.control}
            errors={form.formState.errors.email?.message}
            Icon={<HiOutlineMail className="text-gray-500 absolute top-1/2 left-2 transform -translate-y-1/2" />}
          />
          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password here"
            control={form.control}
            errors={form.formState.errors.password?.message}
            reset={login && <ResetPassword resetPassword={resetPassword} open={open} setOpen={setOpen} />}
            Icon={<RiLockPasswordLine className="text-gray-500 absolute top-1/2 left-2 transform -translate-y-1/2" />}
          />
          <div className="grid gap-2 max-w-[250px] w-full mx-auto">
            <Button type="button" className="w-full" onClick={singInGoogle}>
              <FcGoogle />
              {login ? "Sign In with Google" : "Sign Up with Google"}
            </Button>
            <Button type="submit" className="w-full" size="default">
              <IoMdLogIn />
              {login ? "Log In" : "Sing Up"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
