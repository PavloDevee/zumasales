import React, { createContext, useEffect, useState } from 'react';
import { Inspection, IProps, IState, Role, User } from './types';
import { getUserToLocalStorage } from '@/helpers/localStore';
import { useCookies } from 'react-cookie';
import { child, get, onValue, ref } from 'firebase/database';
import { toast } from 'react-toastify';
import { database } from '@/firebase/firebase';

export const DataProvider = createContext<IState>({
  userState: {},
  setUserState: () => { },
  cookies: {},
  setCookie: () => { },
  removeCookie: () => { },
  data: [],
  setData: () => { },
  userRole: Role.User,
});

export const MyDataProvider: React.FC<IProps> = ({ children }) => {
  const [userState, setUserState] = useState<User>(getUserToLocalStorage());
  const [cookies, setCookie, removeCookie] = useCookies(['idToken']);
  const [data, setData] = useState<Inspection[]>([]);
  const [userRole, setUserRole] = useState(Role.User);

  useEffect(() => {
    if (userState) {
      const dbRef = ref(database);
      get(child(dbRef, `users/${userState.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setUserRole(snapshot.val().role);
          if (userRole === Role.Admin) { //get all inspection or only for one user
            getAllData();
          } else {
            getData();
          }
        } else {
          toast.error("No data available");
        }
      }).catch((error) => {
        toast.error(error);
      });
    }
  }, [userState,userRole])

  const getAllData = () => {
    const starCountRef = ref(database, `users`);
    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        const obj = snapshot.val();
        const inspection = [];
        for (const key in obj) {
          obj[key].id = key;
          if (obj[key].inspections) {
            for (const keyIns in obj[key].inspections) {
              obj[key].inspections[keyIns].id = keyIns;
              obj[key].inspections[keyIns].userID = key;
              obj[key].inspections[keyIns].email = obj[key].email
            }
            obj && inspection.push(...Object.values(obj[key].inspections) as Inspection[]);
          }
        }
        setData(inspection);
      } else {
        toast.error("No data available");
      }
    });
  }

  const getData = () => {
    if (userState) {
      const starCountRef = ref(database, `users/${userState.uid}`);
      onValue(starCountRef, (snapshot) => {
        if (snapshot.exists()) {
          const obj = snapshot.val().inspections;
          for (const key in obj) {
            obj[key].id = key;
          }
          obj && setData(Object.values(obj));
        } else {
          toast.error("No data available");
        }
      });
    }
  }

  return (
    <DataProvider.Provider value={{
      userState,
      setUserState,
      cookies,
      setCookie,
      removeCookie,
      data,
      setData,
      userRole,
    }}>
      {children}
    </DataProvider.Provider>
  );
};
