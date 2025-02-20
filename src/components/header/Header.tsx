import { FC, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { DialogCloseButton } from "../modal/Modal";
import { DataProvider } from "@/providers/DataProvider";
import { removeUserToLocalStorage, saveUserToLocalStorage } from "@/helpers/localStore";
import { Button } from "../ui/button";
import { Role } from "@/providers/types";
import { LuUserRound } from "react-icons/lu";
import { EditUser } from "../modal/EditUser";
import { ref, update } from "firebase/database";
import { auth, database } from "@/firebase/firebase";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { getMassege } from "@/helpers/getMassege";

const Header: FC = () => {
  const navigate = useNavigate();
  const { setUserState, removeCookie, userRole, userState, setData} = useContext(DataProvider);
  const [open, setOpen] = useState(false);
  const access = userRole === Role.Admin || userRole === Role.Moderator ? true : false;

  const logout = () => {
    removeCookie('idToken');
    setUserState(null);
    navigate('/');
    removeUserToLocalStorage();
    setData([]);
  }

  const setName = (newName: string) => {
    const userRef = ref(database, `users/${userState.uid}`);
    const user = auth.currentUser;
    if (user) {
      const promises = [
        update(userRef, {
          username: newName
        }),
        updateProfile(user, {
          displayName: newName
        })
      ];

      Promise.all(promises)
        .then(() => {
          userState.displayName = newName;
          saveUserToLocalStorage(userState);
          setOpen(false);
          toast.success("Name successfully updated");
        })
        .catch((error) => {
          toast.error(getMassege(error.message) || "An error occurred");
        });
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-2">
        <div className="flex justify-between items-center h-16">
          <div className="flex gap-2 text-xl flex-1">
            <p>Hello, <span className="font-medium">{userState?.displayName}</span>!</p>
            <EditUser setName={setName} open={open} setOpen={setOpen} />
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-4xl font-bold text-gray-900">Zuma Sales</h1>
          </div>
          <div className="flex-1 flex justify-end">
            {access && <Button onClick={() => navigate('/admin')} className="mx-2"><LuUserRound />Users</Button>}
            <DialogCloseButton
              handleLogout={logout}
              confirmBtn="Logout"
              descText="Do you really want to log out of your account?" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
